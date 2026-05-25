import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail, isResendConfigured } from "@/lib/resend-client";

/**
 * Stripe Webhook — handles checkout.session.completed for ALL PV products.
 *
 * For digital downloads (Starter Kit, Cold Email Pack, Subject Lines):
 *   Stripe's own digital fulfillment delivers the file. We just log the sale.
 *
 * For paid Telegram subscriptions (Wallet Tracker Premium):
 *   We generate a one-time Telegram invite link via Bot API + email it.
 *
 * Setup:
 * 1. Set STRIPE_SECRET_KEY env var
 * 2. Set STRIPE_WEBHOOK_SECRET env var (from Stripe dashboard → Webhooks)
 * 3. Set TELEGRAM_BOT_TOKEN env var (from BotFather)
 * 4. Set TELEGRAM_PREMIUM_CHAT_ID env var (negative numeric ID of premium channel)
 * 5. Configure Stripe webhook endpoint: https://purcellventures.co/api/stripe-webhook
 *    Listen for: checkout.session.completed
 * 6. Optionally set RESEND_API_KEY for email confirmations
 *
 * Stripe Payment Links can include a `metadata.product` field — we use that
 * to route to the right fulfillment flow.
 */

export async function POST(req: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeKey || !webhookSecret) {
    console.error("[STRIPE WEBHOOK] Missing env vars");
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  }

  const stripe = new Stripe(stripeKey);

  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const body = await req.text();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("[STRIPE WEBHOOK] Signature verification failed", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    // Acknowledge but don't process other event types
    return NextResponse.json({ ok: true, ignored: event.type });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const email = session.customer_email || session.customer_details?.email;
  const product = session.metadata?.product || "unknown";
  const amount = session.amount_total ? session.amount_total / 100 : 0;

  console.log("[STRIPE WEBHOOK] Sale", {
    product,
    amount,
    email,
    sessionId: session.id,
    customerId: session.customer,
    referrer: session.client_reference_id, // affiliate ref if any
  });

  // Route to the right fulfillment flow
  switch (product) {
    case "wallet-tracker-premium":
      return await fulfillWalletTrackerPremium(email);
    case "starter-kit":
    case "cold-email-pack":
    case "subject-lines":
      // Stripe handles digital fulfillment automatically
      return NextResponse.json({ ok: true, product, fulfillment: "stripe-automatic" });
    default:
      return NextResponse.json({ ok: true, product, fulfillment: "logged-only" });
  }
}

async function fulfillWalletTrackerPremium(email: string | null | undefined): Promise<NextResponse> {
  if (!email) {
    console.error("[STRIPE WEBHOOK] No email for wallet-tracker-premium");
    return NextResponse.json({ error: "Missing email" }, { status: 400 });
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const premiumChatId = process.env.TELEGRAM_PREMIUM_CHAT_ID;

  if (!botToken || !premiumChatId) {
    console.error("[STRIPE WEBHOOK] Telegram env vars missing for premium fulfillment");
    return NextResponse.json({ error: "Telegram not configured" }, { status: 500 });
  }

  // Generate a one-time invite link to the premium Telegram channel
  // member_limit: 1 → single-use link, prevents sharing
  // expire_date: now + 24 hours → must be redeemed within a day
  try {
    const inviteRes = await fetch(`https://api.telegram.org/bot${botToken}/createChatInviteLink`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: premiumChatId,
        member_limit: 1,
        expire_date: Math.floor(Date.now() / 1000) + 86400,
        name: `Premium-${email.split("@")[0]}-${Date.now()}`,
      }),
    });

    const inviteData = await inviteRes.json();

    if (!inviteData.ok) {
      console.error("[STRIPE WEBHOOK] Telegram invite creation failed", inviteData);
      return NextResponse.json({ error: "Invite creation failed" }, { status: 500 });
    }

    const inviteLink = inviteData.result.invite_link;

    // Email the invite link to the buyer
    if (isResendConfigured()) {
      const sendResult = await sendEmail({
        to: email,
        subject: "Your Premium Whale Alerts access",
        html: `
          <div style="font-family: 'Inter', sans-serif; max-width: 560px; margin: 40px auto; padding: 32px; background: #1a1612; color: #e8dfd0;">
            <h1 style="color: #d4af37; font-family: 'Cinzel', Georgia, serif;">Welcome to Premium Whale Alerts</h1>
            <p>You're in. Click the link below to join the premium Telegram channel:</p>
            <p style="text-align: center; margin: 32px 0;">
              <a href="${inviteLink}" style="display: inline-block; padding: 14px 32px; background: #d4af37; color: #0c0a08; text-decoration: none; font-weight: 700;">
                Join Premium Channel →
              </a>
            </p>
            <p style="font-size: 13px; color: #a89889;">
              <strong>Important:</strong> This link expires in 24 hours and can only be used once. If you miss the window, reply to this email and I'll regenerate.
            </p>
            <p style="font-size: 13px; color: #a89889;">
              You're now part of a small group getting real-time whale movement alerts across 6 chains, with risk-scored tokens and position sizing recommendations.
            </p>
            <p style="margin-top: 32px;">
              — Elijah Purcell<br>
              <span style="color: #a89889; font-size: 12px;">Purcell Ventures · elijah@purcell-ventures.com</span>
            </p>
          </div>
        `,
        text: `Welcome to Premium Whale Alerts.\n\nJoin the channel: ${inviteLink}\n\nLink expires 24 hours from now and is single-use.\n\nIf you miss the window, reply to this email and I'll regenerate.\n\n— Elijah`,
        replyTo: "elijah@purcell-ventures.com",
        tags: [
          { name: "product", value: "wallet-tracker-premium" },
          { name: "type", value: "fulfillment" },
        ],
      });

      console.log("[STRIPE WEBHOOK] Invite email sent", { ok: sendResult.ok, id: sendResult.id });
    } else {
      console.warn("[STRIPE WEBHOOK] Resend not configured — manual fulfillment needed for", email, "link:", inviteLink);
    }

    return NextResponse.json({
      ok: true,
      product: "wallet-tracker-premium",
      inviteLink: inviteLink.slice(0, 30) + "...",
      emailSent: isResendConfigured(),
    });
  } catch (err) {
    console.error("[STRIPE WEBHOOK] Fulfillment error", err);
    return NextResponse.json({ error: "Fulfillment failed" }, { status: 500 });
  }
}
