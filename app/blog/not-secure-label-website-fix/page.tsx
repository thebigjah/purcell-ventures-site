import Link from "next/link";
import PostByline from "@/app/components/PostByline";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import PostFaq from "@/app/components/PostFaq";
import { PostLayout } from "@/app/components/ui";

// Written by the daily blog engine (~/blog-engine), held overnight for Elijah's veto.

const TITLE = "\"Not secure\" website: what it means and how to fix it";
const DESCRIPTION = "What \"Not secure\" means in Chrome, whether the site is dangerous, why every site can show it, and how to remove it from your own website for free.";

const FAQ: [string, string][] = [
  [
    "What does \"Not secure\" mean on a website?",
    "It means the page loads over plain http, without the encryption that https adds. Anything a visitor types on that page travels as readable text. Chrome also shows the label when a site's certificate has expired or fails to match the address.",
  ],
  [
    "Is a \"Not secure\" website dangerous to visit?",
    "Reading a \"Not secure\" page usually carries little risk. The label describes the connection and says nothing about scams or malware on the site. The risk comes from what you type, so skip passwords and card numbers on that page. Chrome warns about known phishing and malware sites with a separate red full-page warning.",
  ],
  [
    "Why does every website say \"Not secure\"?",
    "When the label shows up on sites you know use https, the cause usually sits on your side. Common causes include a wrong date or time on your device, antivirus software that scans HTTPS traffic, and hotel or coffee shop Wi-Fi that wants you to sign in first. Fix the clock, finish the Wi-Fi sign-in, or try another network.",
  ],
  [
    "How do I remove \"Not secure\" from my own website?",
    "Install a free SSL certificate through your host, turn on a redirect that sends every http visitor to https, and change any image or script address inside your pages from http to https. On most small business hosts the whole fix takes an afternoon.",
  ],
];

export const metadata = {
  alternates: { canonical: "/blog/not-secure-label-website-fix" },
  title: { absolute: TITLE },
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/blog/not-secure-label-website-fix",
    type: "article",
    images: ["/opengraph-image"],
  },
};

export default function Post() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "Blog", href: "/blog" },
        { name: TITLE, href: "/blog/not-secure-label-website-fix" },
      ]} />}
      kicker="Guide"
      title={TITLE}
      meta="24 October 2026, 8 minute read"
    >
      <p>
        The words &quot;Not secure&quot; in the address bar mean the page loads over plain http,
        without the encryption that https adds. Anything a visitor types on that page
        travels as readable text. Chrome also shows the label when a site&apos;s certificate
        has expired or fails to match the address.
      </p>

      <p>
        Open your business website in Google Chrome and look at the left edge of the address
        bar. If you see the words &quot;Not secure,&quot; every Chrome visitor sees them too. I build and
        fix websites for local businesses around Tuscaloosa. The fix usually fits inside an
        afternoon on the kind of hosting most small businesses use.
      </p>

      <h2>What the label tells your visitors</h2>
      <p>
        Every website address starts with either http or https. The s at the end stands for
        secure. When a site uses https, the browser and your web server encrypt the
        information that passes between them. Someone on the same coffee shop Wi-Fi cannot
        read it.
      </p>
      <p>
        When a site uses plain http, that information travels as readable text. Chrome puts
        &quot;Not secure&quot; next to the address to warn the visitor. Safari, Firefox and Edge show
        their own warnings, and they show stronger ones on pages with a form.
      </p>
      <p>
        Click the label in Chrome and a small panel opens. It tells the visitor to avoid
        entering passwords or credit card numbers on the page. Any visitor who wonders
        whether your site is safe can read that message with one click.
      </p>

      <h2>Why does Chrome say &quot;Not secure&quot;?</h2>
      <p>
        Chrome puts the label on every page that loads over plain http. Click it and the
        panel reads &quot;Your connection to this site is not secure.&quot; Chrome makes no
        exception for small sites, old sites or sites without a form.
      </p>
      <p>
        Chrome also flags https pages that have a certificate problem. The certificate may
        have expired, it may name a different address, or the browser may not trust the
        company that issued it. In those cases Chrome often stops the visitor with a
        full-page warning that reads &quot;Your connection is not private&quot; before the page
        loads at all.
      </p>

      <h2>Is a &quot;Not secure&quot; website dangerous to visit?</h2>
      <p>
        Reading a &quot;Not secure&quot; page usually carries little risk. The label describes the
        connection between you and the site. It says nothing about whether the site hosts
        scams or malware.
      </p>
      <p>
        The risk comes from what you type. On a page without https, someone on the same
        network could read a password, card number or phone number as you send it. Skip
        those fields on any page that carries the label.
      </p>
      <p>
        Chrome uses a separate warning for sites it knows host phishing or malware. That
        warning fills the whole screen in red before the page opens. If you see it, close
        the tab.
      </p>

      <h2>Why does every website say &quot;Not secure&quot;?</h2>
      <p>
        If the label shows up on sites you know use https, such as Google or your bank, the
        cause usually sits on your side. The common ones are below.
      </p>
      <ul>
        <li>
          Your device clock is wrong. Certificates carry start and end dates, so a computer
          set to the wrong day can treat every valid certificate as expired. Set the date and
          time to update on their own.
        </li>
        <li>
          Your antivirus scans HTTPS traffic. Some security programs place their own
          certificate between the browser and each site. When that setup breaks, browsers
          flag sites that work fine elsewhere. Update the program, or turn off its HTTPS or
          web scanning option and test again.
        </li>
        <li>
          You joined Wi-Fi that wants a sign-in first. Hotels, airports and coffee shops often
          catch every request until you accept their terms page. Finish that sign-in and the
          warnings should stop.
        </li>
        <li>
          A school or workplace network inspects traffic. Ask the people who run that network
          before you change anything on a device they manage.
        </li>
      </ul>
      <p>
        A quick test separates the two cases. Switch your phone from Wi-Fi to mobile data and
        load the same site. If the warning disappears, the network caused it.
      </p>

      <h2>Why browsers show it on a site that sells nothing</h2>
      <p>
        Owners often tell me their site has no checkout, so the warning should not matter.
        The browser has no way to know what your site sells. It shows the same label on a
        church homepage that it shows on a payment page.
      </p>
      <p>
        Your contact form, appointment request and newsletter signup all collect names,
        phone numbers and email addresses. Without https, that information travels as
        readable text. A customer who sees the warning right before typing their phone
        number has a reason to close the tab and call someone else.
      </p>
      <p>
        Google also uses https as a small signal when it ranks pages. I can&apos;t promise any
        change in search position from fixing it. Leaving the warning up does give visitors
        one more reason to leave.
      </p>

      <h2>How do I remove &quot;Not secure&quot; from my own website?</h2>
      <ol>
        <li>
          Get a free SSL certificate. Most hosts issue one from Let&apos;s Encrypt with a
          button in the control panel.
        </li>
        <li>
          Force https redirects, so anyone who types the http address lands on the https
          version.
        </li>
        <li>
          Fix mixed content. Change every image, script and link address inside your pages
          from http to https.
        </li>
        <li>
          Check the result. Load your homepage, contact page and any form page in Chrome, with
          and without www, and look for the padlock.
        </li>
      </ol>
      <p>
        The sections below walk through each step on cPanel and WordPress.
      </p>

      <h2>What fixing it involves</h2>
      <p>
        The fix has three parts. First, your site needs an SSL certificate. That is a small
        file on your web server that proves your site belongs to your domain and lets the
        browser use https.
      </p>
      <p>
        Second, your site needs to send every visitor to the https version, even if they
        type the old http address. Third, every image, script and link inside your pages
        needs to load over https too.
      </p>
      <p>
        Most hosts hand out free certificates from Let&apos;s Encrypt, a nonprofit certificate
        provider. A basic business site rarely needs a paid certificate. If your host offers
        to sell you one, ask whether they have a free option first.
      </p>

      <h2>Doing it on a cPanel host</h2>
      <p>
        Many budget hosts give you a control panel called cPanel. Log in to your hosting
        account and open it.
      </p>
      <p>
        Find the Security section and click SSL/TLS Status. You will see a list of your
        domains, both with and without www. If any show a red warning, click Run AutoSSL.
        AutoSSL requests a free certificate and installs it for you. Give it a few minutes,
        then refresh the page.
      </p>
      <p>
        Next, go back to the cPanel home screen and click Domains. Find your domain in the
        list and turn on the toggle in the Force HTTPS Redirect column. That sends anyone
        who types the http address to the https version.
      </p>
      <p>
        If your host uses a different panel, search their help pages for &quot;free SSL&quot; and
        &quot;force HTTPS.&quot; The button names vary from host to host, but the two steps are
        the same.
      </p>
      <p>
        If your site runs on Wix or Squarespace, the platform supplies the certificate once
        your domain connects. If you still see the warning there, compare your domain
        settings against their domain setup guide and contact their support.
      </p>

      <h2>WordPress and mixed content</h2>
      <p>
        If your site runs on WordPress, log in and go to Settings, then General. Change both
        the WordPress Address (URL) and Site Address (URL) fields so they start with https.
        Click Save Changes. You may need to log in again afterward.
      </p>
      <p>
        Then check for mixed content. Mixed content happens when a page loads over https but
        pulls an image or script over plain http. Chrome may block those files or show a
        warning instead of the padlock.
      </p>
      <p>
        To find them, right-click the page in Chrome, choose Inspect, and click the Console
        tab. Any line that mentions Mixed Content names the file still loading over http.
        Edit that page or setting and change the address to https.
      </p>
      <p>
        Older sites with lots of posts can hold many of these links. A free plugin called
        Better Search Replace can swap your old http address for the https one across the
        whole database. Make a full backup before you run it.
      </p>

      <h2>What to check this week</h2>
      <p>
        Open your site in Chrome on your phone and on a computer. Look at the address bar on
        your homepage, your contact page and any page with a form.
      </p>
      <p>
        Type your address with www and without it. Then type it again starting with http://
        and confirm the browser lands on the https version.
      </p>
      <p>
        Put a reminder on your calendar to check again in a few months. Free certificates
        renew on their own, but renewal can fail if someone changes your domain settings.
      </p>

      <p>
        I check small business websites around Tuscaloosa for problems like these. If you
        want me to look at yours, <Link href="/contact">send me the address</Link>.
      </p>

      <PostFaq qa={FAQ} />

      <PostByline post={{
        slug: "not-secure-label-website-fix",
        title: TITLE,
        description: DESCRIPTION,
        published: "2026-10-24",
      }} />
    </PostLayout>
  );
}
