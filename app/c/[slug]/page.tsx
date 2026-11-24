import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CARDS, fullName, getCard } from "@/lib/cards";

// The web card. An iPhone with the PV Card App Clip never lands here from a tag: iOS
// opens the clip instead. Android phones, older iPhones and anyone opening the link in a
// browser get this page, and its one job is the Save contact button.

export const dynamicParams = false;

export function generateStaticParams() {
  return CARDS.map((c) => ({ slug: c.slug }));
}

// Set once the app has an App Store ID. Safari then shows the App Clip card on this
// page, so an iPhone that opens the link in a browser still gets the checkmark that saves.
const APP_STORE_ID = "";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const card = getCard((await params).slug);
  if (!card) return {};
  const line = [card.jobTitle, card.organization].filter(Boolean).join(", ");
  return {
    title: { absolute: fullName(card) },
    description: line ? `${fullName(card)}, ${line}. Save the contact to your phone.` : `Save ${fullName(card)} to your phone.`,
    robots: { index: false, follow: false },
    alternates: { canonical: `/c/${card.slug}` },
    other: APP_STORE_ID
      ? { "apple-itunes-app": `app-id=${APP_STORE_ID}, app-clip-bundle-id=co.purcellventures.card.Clip, app-clip-display=card` }
      : undefined,
  };
}

function pretty(phone: string) {
  const d = phone.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "");
  return d.length === 10 ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` : phone;
}

// Dark text on a light accent, white on a dark one, so any business colour stays readable.
function inkFor(hex: string) {
  const v = parseInt(hex.replace("#", ""), 16);
  const lin = (c: number) => ((c /= 255) <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  const L = 0.2126 * lin((v >> 16) & 255) + 0.7152 * lin((v >> 8) & 255) + 0.0722 * lin(v & 255);
  return (1.05 / (L + 0.05)) >= ((L + 0.05) / 0.05) ? "#ffffff" : "#17150e";
}

function host(url: string) {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}

const CSS = `
.pvc{--pvc-bg:#f7f5f0;--pvc-fg:#17150e;--pvc-muted:#5f5a4e;min-height:100dvh;background:var(--pvc-bg);color:var(--pvc-fg);font-family:var(--font-body);display:flex;justify-content:center;padding:40px 16px 56px}
@media (prefers-color-scheme:dark){.pvc{--pvc-bg:#12110d;--pvc-fg:#f2eee4;--pvc-muted:#a49d8c}}
.pvc main{width:100%;max-width:420px;display:flex;flex-direction:column;align-items:center;text-align:center}
.pvc img{width:132px;height:132px;border-radius:50%;object-fit:cover}
.pvc h1{font-family:var(--font-display);font-size:34px;line-height:1.1;font-weight:600;margin:20px 0 6px}
.pvc .role{color:var(--pvc-muted);font-size:17px;margin:0}
.pvc .save{display:block;width:100%;margin:28px 0 8px;padding:16px;border-radius:14px;background:var(--pvc-accent);color:var(--pvc-ink);font-size:18px;font-weight:600;text-decoration:none}
.pvc a:focus-visible{outline:2px solid var(--pvc-accent);outline-offset:3px}
.pvc .hint{color:var(--pvc-muted);font-size:14px;margin:0 0 24px;display:none}
.pvc[data-ios] .hint-ios,.pvc[data-android] .hint-android{display:block}
.pvc ul{list-style:none;margin:8px 0 0;padding:0;width:100%;display:flex;flex-direction:column;gap:2px}
.pvc li a{display:flex;justify-content:space-between;gap:16px;padding:12px 2px;color:var(--pvc-fg);text-decoration:none;font-size:16px;text-align:left}
.pvc li a span:last-child{color:var(--pvc-muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
`;

export default async function CardPage({ params }: { params: Promise<{ slug: string }> }) {
  const card = getCard((await params).slug);
  if (!card) notFound();
  const role = [card.jobTitle, card.organization].filter(Boolean).join(", ");
  const accent = card.accent ?? "#17150e";

  return (
    <div className="pvc" id="pvc" style={{ ["--pvc-accent" as string]: accent, ["--pvc-ink" as string]: inkFor(accent) }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      {/* The iPhone preview sheet's checkmark closes without saving, so iPhones get a line
          that names the right button. The App Clip makes this unnecessary where it runs. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `var u=navigator.userAgent,e=document.getElementById("pvc");if(/iPhone|iPad|iPod/.test(u))e.setAttribute("data-ios","");else if(/Android/.test(u))e.setAttribute("data-android","")`,
        }}
      />
      <main>
        {card.photo && <img src={card.photo} alt={fullName(card)} width={132} height={132} />}
        <h1>{fullName(card)}</h1>
        {role && <p className="role">{role}</p>}
        <a className="save" href={`/c/${card.slug}/contact.vcf`}>
          Save contact
        </a>
        <p className="hint hint-ios">On the card that opens, scroll down and tap Create New Contact.</p>
        <p className="hint hint-android">When the download finishes, tap Open to add it to Contacts.</p>
        <ul>
          {card.textNumber && (
            <li>
              <a href={`sms:${card.textNumber}`}>
                <span>Text</span>
                <span>{pretty(card.textNumber)}</span>
              </a>
            </li>
          )}
          {card.phones.map((p) => (
            <li key={p.value}>
              <a href={`tel:${p.value}`}>
                <span>Call {p.label === "mobile" ? "cell" : p.label}</span>
                <span>{pretty(p.value)}</span>
              </a>
            </li>
          ))}
          {card.emails.map((e) => (
            <li key={e.value}>
              <a href={`mailto:${e.value}`}>
                <span>Email {e.label}</span>
                <span>{e.value}</span>
              </a>
            </li>
          ))}
          {card.urls.map((u) => (
            <li key={u.value}>
              <a href={u.value}>
                <span>{u.label === "homepage" ? "Website" : u.label}</span>
                <span>{host(u.value)}</span>
              </a>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
