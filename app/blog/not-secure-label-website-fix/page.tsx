import Link from "next/link";
import PostByline from "@/app/components/PostByline";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { PostLayout } from "@/app/components/ui";

// Written by the daily blog engine (~/blog-engine), held overnight for Elijah's veto.

const TITLE = "What the \"Not secure\" label next to your website means, and how to fix it";
const DESCRIPTION = "Why Chrome shows \"Not secure\" next to your business web address, and the steps to fix it on a typical small business host this week.";

export const metadata = {
  alternates: { canonical: "/blog/not-secure-label-website-fix" },
  title: { absolute: TITLE + ", by Elijah Purcell" },
  description: DESCRIPTION,
};

export default function Post() {
  return (
    <PostLayout
      crumbs={<Breadcrumbs trail={[
        { name: "Home", href: "/" },
        { name: "Writing", href: "/blog" },
        { name: TITLE, href: "/blog/not-secure-label-website-fix" },
      ]} />}
      kicker="Guide"
      title={TITLE}
      meta="24 October 2026, 5 minute read"
    >
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
        entering passwords or credit card numbers on the page. That message sits one click
        away from anyone who wonders whether your site is safe.
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
        &quot;force HTTPS.&quot; The button names change from host to host. The two steps stay the
        same.
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

      <h2>Your checklist for this week</h2>
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

      <PostByline post={{
        slug: "not-secure-label-website-fix",
        title: TITLE,
        description: DESCRIPTION,
        published: "2026-10-24",
      }} />
    </PostLayout>
  );
}
