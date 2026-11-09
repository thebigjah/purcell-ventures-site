// Questions for /ai-visibility-check. Shared by the visible list on the page and the
// FAQPage schema in the layout, so the two cannot drift apart.

export const QA: [string, string][] = [
  ["What does the AI visibility check look at?",
   "It reads your home page, your robots.txt file and your llms.txt file. It reports whether five AI crawlers may read the site, whether the page has a title, a meta description and business structured data, whether a phone number, an address and opening hours appear as text, how many words the page shows before JavaScript runs, and whether the site uses https."],
  ["Does the check store my website address?",
   "No. The server fetches the three files, sends the findings back to your browser and keeps nothing. There is no account and no email step."],
  ["Why does the check count so few words on my home page?",
   "The check reads the page the way the server sends it, before any JavaScript runs. Some site builders and app frameworks send a nearly empty page and draw the text in the browser. A crawler that skips scripts sees that empty page."],
  ["Should I block GPTBot and ClaudeBot?",
   "Those two crawlers collect pages for model training. A business that sells its writing or research may reasonably block them. OpenAI says ChatGPT search uses OAI-SearchBot, so blocking GPTBot alone leaves a site eligible for ChatGPT search answers. Most local businesses leave all five open."],
  ["If every check passes, will ChatGPT recommend my business?",
   "Nobody can promise that. The check covers the parts of your own site that you control. Assistants also read your Google Business Profile, directories and reviews, and none of them publish how they pick a business."],
  ["Why does it say there is no phone number when my number is on the site?",
   "The check looks for a US-format number in the readable text. A number inside an image, a number that appears only in a click-to-call button, or a number drawn by JavaScript does not count, and those are the same cases a crawler misses."],
];
