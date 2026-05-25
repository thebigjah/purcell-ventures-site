/**
 * Email templates rendered as HTML strings.
 *
 * Keep these small + brand-consistent. Inline CSS only (most email clients
 * strip <style> blocks). Use system fonts since web fonts don't render.
 */

const FONT_STACK = "'Cinzel', Georgia, serif";
const BODY_FONT = "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
const BG = "#1a1612";
const BG_ALT = "#221d18";
const TEXT = "#e8dfd0";
const TEXT_MUTED = "#a89889";
const ACCENT = "#d4af37";

function wrap(content: string, opts?: { subject?: string }): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${opts?.subject || "Purcell Ventures"}</title>
</head>
<body style="margin:0;padding:0;background:${BG};color:${TEXT};font-family:${BODY_FONT};line-height:1.6;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${BG};padding:32px 16px;">
  <tr><td align="center">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="background:${BG_ALT};border:1px solid #3a3530;border-radius:0;max-width:600px;">
      <tr><td style="padding:32px 36px;">
        <div style="font-family:${FONT_STACK};font-size:24px;color:${ACCENT};font-weight:700;letter-spacing:0.04em;margin-bottom:24px;">Purcell Ventures</div>
        ${content}
        <div style="border-top:1px solid #3a3530;margin-top:32px;padding-top:20px;font-size:11px;color:${TEXT_MUTED};letter-spacing:0.1em;">
          Purcell Ventures LLC · Acworth, GA · <a href="https://purcellventures.co" style="color:${ACCENT};text-decoration:none;">purcellventures.co</a>
        </div>
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

/**
 * Welcome email after someone signs up at /free for the cold email templates.
 */
export function leadMagnetWelcome(firstName: string | undefined): { subject: string; html: string; text: string } {
  const greeting = firstName ? `Hi ${firstName},` : "Hi there,";
  const subject = "Your 10 free cold outreach templates";
  const html = wrap(`
    <p style="font-size:16px;margin:0 0 16px;">${greeting}</p>
    <p style="font-size:15px;margin:0 0 16px;">Here&apos;s what you signed up for: 10 industry-specific cold outreach templates that actually get replies. Tested in production at Purcell Ventures.</p>
    <p style="font-size:15px;margin:0 0 24px;">You can view them anytime at:</p>
    <p style="text-align:center;margin:24px 0;">
      <a href="https://purcellventures.co/free" style="display:inline-block;padding:14px 32px;background:${ACCENT};color:${BG};text-decoration:none;font-family:${FONT_STACK};font-weight:700;font-size:15px;letter-spacing:0.04em;">See the 10 templates →</a>
    </p>
    <p style="font-size:15px;margin:24px 0 16px;">If you want the full pack (90 more templates + 80 subject lines + 30 reply-handling scripts + cadence playbooks), it&apos;s <strong style="color:${ACCENT};">$29</strong> at <a href="https://purcellventures.co/shop/cold-email-pack" style="color:${ACCENT};">/shop/cold-email-pack</a>.</p>
    <p style="font-size:15px;margin:0 0 16px;">Either way — go use these. If even one of them earns you a reply this week, the free pack paid off.</p>
    <p style="font-size:15px;margin:24px 0 0;">— Elijah Purcell<br><span style="color:${TEXT_MUTED};font-size:13px;">Purcell Ventures</span></p>
  `, { subject });
  const text = `${greeting}\n\nHere are your 10 cold outreach templates: https://purcellventures.co/free\n\nWant the full pack? https://purcellventures.co/shop/cold-email-pack ($29)\n\n— Elijah`;
  return { subject, html, text };
}

/**
 * Steady intake confirmation — when someone fills out /steady/start.
 */
export function steadyIntakeConfirmation(firstName: string, intakeSummary: string): { subject: string; html: string; text: string } {
  const subject = `We got your Steady intake, ${firstName}`;
  const html = wrap(`
    <p style="font-size:16px;margin:0 0 16px;">Hi ${firstName},</p>
    <p style="font-size:15px;margin:0 0 16px;">Got your Steady intake. Here&apos;s what you told us:</p>
    <div style="padding:16px 20px;background:${BG};border-left:3px solid ${ACCENT};margin:16px 0;font-size:13px;color:${TEXT_MUTED};white-space:pre-wrap;">${intakeSummary}</div>
    <p style="font-size:15px;margin:16px 0;">I&apos;ll personally read this within 24 hours and reply with a recommended plan — or an honest &quot;you don&apos;t need me.&quot; No automated tier-pushing.</p>
    <p style="font-size:15px;margin:0;">— Elijah Purcell</p>
  `, { subject });
  const text = `Hi ${firstName},\n\nGot your Steady intake. I'll reply within 24 hours with a recommended plan.\n\n— Elijah`;
  return { subject, html, text };
}

/**
 * Rep onboarding welcome — when a new rep is added via /rep-portal/onboard.
 */
export function repOnboardingWelcome(name: string, password: string, tier: string): { subject: string; html: string; text: string } {
  const subject = `You&apos;re on the Purcell Ventures sales team, ${name}`;
  const html = wrap(`
    <p style="font-size:16px;margin:0 0 16px;">Hi ${name},</p>
    <p style="font-size:15px;margin:0 0 16px;">You&apos;re officially on the team. Welcome.</p>
    <p style="font-size:15px;margin:0 0 16px;"><strong style="color:${ACCENT};">Rep portal login:</strong></p>
    <ul style="font-size:14px;margin:0 0 16px;padding-left:20px;">
      <li>URL: <a href="https://purcellventures.co/rep-portal/login" style="color:${ACCENT};">purcellventures.co/rep-portal/login</a></li>
      <li>Password: <code style="background:${BG};padding:2px 8px;color:${ACCENT};font-family:monospace;">${password}</code></li>
    </ul>
    <p style="font-size:15px;margin:0 0 16px;"><strong style="color:${ACCENT};">Your tier: ${tier}</strong></p>
    <p style="font-size:15px;margin:0 0 16px;">Day-one reading (10 min total):</p>
    <ul style="font-size:14px;margin:0 0 16px;padding-left:20px;">
      <li><a href="https://purcellventures.co/rep-portal/handbook" style="color:${ACCENT};">Handbook</a></li>
      <li><a href="https://purcellventures.co/rep-portal/pricing" style="color:${ACCENT};">Pricing reference</a></li>
      <li><a href="https://purcellventures.co/rep-portal/playbook" style="color:${ACCENT};">In-call playbook</a></li>
    </ul>
    <p style="font-size:15px;margin:24px 0;">Looking forward to working with you. Reply if you have questions.</p>
    <p style="font-size:15px;margin:0;">— Elijah</p>
  `, { subject });
  const text = `Hi ${name},\n\nYou're officially on the Purcell Ventures sales team.\n\nLogin: https://purcellventures.co/rep-portal/login\nPassword: ${password}\nTier: ${tier}\n\nRead the handbook + pricing + playbook (links in the email).\n\n— Elijah`;
  return { subject, html, text };
}

/**
 * Admin daily digest — sent to Elijah with overdue tasks, hot deals, etc.
 */
export function adminDailyDigest(summary: {
  overdueCount: number;
  todayCount: number;
  openPipeline: number;
  hotDeals: Array<{ name: string; stage: string; value: number }>;
  leadsCapturedToday: number;
}): { subject: string; html: string; text: string } {
  const subject = `PV daily — ${new Date().toLocaleDateString()} — ${summary.overdueCount} overdue · $${summary.openPipeline.toLocaleString()} open`;
  const hotList = summary.hotDeals.length === 0 ? "No hot deals flagged today." : summary.hotDeals.map((d) => `<li>${d.name} (${d.stage}, $${d.value.toLocaleString()})</li>`).join("");
  const html = wrap(`
    <p style="font-size:16px;margin:0 0 16px;">Morning summary — ${new Date().toLocaleDateString()}</p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:16px 0;">
      <tr>
        <td width="33%" style="text-align:center;padding:12px;background:${BG};">
          <div style="font-size:28px;color:${summary.overdueCount > 0 ? "#e54a28" : ACCENT};font-family:${FONT_STACK};font-weight:700;">${summary.overdueCount}</div>
          <div style="font-size:10px;color:${TEXT_MUTED};letter-spacing:0.15em;text-transform:uppercase;">Overdue</div>
        </td>
        <td width="33%" style="text-align:center;padding:12px;background:${BG};">
          <div style="font-size:28px;color:${ACCENT};font-family:${FONT_STACK};font-weight:700;">${summary.todayCount}</div>
          <div style="font-size:10px;color:${TEXT_MUTED};letter-spacing:0.15em;text-transform:uppercase;">Today</div>
        </td>
        <td width="33%" style="text-align:center;padding:12px;background:${BG};">
          <div style="font-size:28px;color:${ACCENT};font-family:${FONT_STACK};font-weight:700;">$${summary.openPipeline.toLocaleString()}</div>
          <div style="font-size:10px;color:${TEXT_MUTED};letter-spacing:0.15em;text-transform:uppercase;">Open</div>
        </td>
      </tr>
    </table>

    <h3 style="font-family:${FONT_STACK};font-size:16px;color:${ACCENT};margin:24px 0 8px;">Hot deals to push today</h3>
    <ul style="font-size:14px;margin:0 0 16px;padding-left:20px;color:${TEXT};">${hotList}</ul>

    <p style="font-size:13px;color:${TEXT_MUTED};margin:24px 0;">${summary.leadsCapturedToday} new lead${summary.leadsCapturedToday === 1 ? "" : "s"} captured.</p>

    <p style="text-align:center;margin:24px 0;">
      <a href="https://purcellventures.co/rep-portal" style="display:inline-block;padding:12px 24px;background:${ACCENT};color:${BG};text-decoration:none;font-family:${FONT_STACK};font-weight:700;font-size:14px;">Open dashboard</a>
    </p>
  `, { subject });
  const text = `PV Daily Digest\n\nOverdue: ${summary.overdueCount}\nToday: ${summary.todayCount}\nOpen pipeline: $${summary.openPipeline.toLocaleString()}\nNew leads: ${summary.leadsCapturedToday}`;
  return { subject, html, text };
}
