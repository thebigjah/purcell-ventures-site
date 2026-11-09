// Every source behind /ai-small-business-statistics. Each URL below was opened on
// 9 Nov 2026 and each figure on the page was read off that page before it went in.
// Figures that could not be opened at their primary source were left out, which is why
// the McKinsey and OECD surveys are missing (both refused the fetch on 9 Nov 2026).

export type Source = {
  name: string;   // publisher, as cited inline
  title: string;  // the page or report title, or a plain label where the title breaks the site's word list
  date: string;   // publication date, as printed on the page
  short: string;  // short date for inline citations
  url: string;
  note: string;   // who was surveyed and when
};

export const SOURCES = {
  census: {
    name: "U.S. Census Bureau",
    title: "Large Firms With at Least 20 Employees Biggest AI Users (Business Trends and Outlook Survey)",
    date: "26 May 2026",
    short: "May 2026",
    url: "https://www.census.gov/library/stories/2026/05/ai-use-businesses.html",
    note: "BTOS responses from 14 December 2025 to 3 May 2026. Asks whether a business used AI in any business function in the past two weeks.",
  },
  fedNote: {
    name: "Federal Reserve Board",
    title: "Monitoring AI Adoption in the U.S. Economy (FEDS Notes)",
    date: "3 April 2026",
    short: "April 2026",
    url: "https://www.federalreserve.gov/econres/notes/feds-notes/monitoring-ai-adoption-in-the-u-s-economy-20260403.html",
    note: "Reviews Census BTOS and other surveys of AI adoption through year-end 2025.",
  },
  sba: {
    name: "SBA Office of Advocacy",
    title: "New Advocacy Article Highlights Small Businesses Closing the AI Adoption Gap",
    date: "24 September 2025",
    short: "September 2025",
    url: "https://advocacy.sba.gov/2025/09/24/new-advocacy-article-highlights-small-businesses-closing-the-ai-adoption-gap/",
    note: "Summarizes the research spotlight AI in Business: Small Firms Closing In, built on Census BTOS data. Small means fewer than 250 employees.",
  },
  sbcs: {
    name: "Federal Reserve Banks, Small Business Credit Survey",
    title: "2026 Report on Employer Firms",
    date: "3 March 2026",
    short: "March 2026",
    url: "https://www.fedsmallbusiness.org/reports/survey/2026/2026-report-on-employer-firms",
    note: "6,525 employer firms with 1 to 499 employees, surveyed 3 September to 14 November 2025. The sample is a weighted convenience sample.",
  },
  chamber: {
    name: "U.S. Chamber of Commerce",
    title: "2025 report on technology and U.S. small business",
    date: "18 August 2025",
    short: "August 2025",
    url: "https://www.uschamber.com/technology/empowering-small-business-the-impact-of-technology-on-u-s-small-business",
    note: "National survey of U.S. small businesses by the Chamber's Technology Engagement Center with Teneo Research.",
  },
  goldman: {
    name: "Goldman Sachs 10,000 Small Businesses Voices",
    title: "Press release on the 2026 small business AI survey",
    date: "17 March 2026",
    short: "March 2026",
    url: "https://www.goldmansachs.com/pressroom/press-releases/2026/small-businesses-embrace-ai-but-need-training-and-support-to-fully-harness-it",
    note: "1,256 participants of the Goldman Sachs 10,000 Small Businesses program, surveyed by Babson College and David Binder Research, 27 January to 4 February 2026. The sample covers program participants only.",
  },
  intuit: {
    name: "Intuit QuickBooks",
    title: "QuickBooks Small Business Insights, April 2025 survey",
    date: "25 June 2025",
    short: "2025",
    url: "https://quickbooks.intuit.com/r/small-business-data/april-2025-survey/",
    note: "More than 2,200 U.S. businesses with up to 100 employees, commissioned April 2025.",
  },
  salesforce: {
    name: "Salesforce",
    title: "News story on the SMB AI trends research",
    date: "4 December 2024",
    short: "December 2024",
    url: "https://www.salesforce.com/news/stories/smbs-ai-trends-2025/",
    note: "3,350 leaders of businesses with 200 employees or fewer in North America, Latin America, Asia-Pacific and Europe, surveyed 3 August to 16 September 2024.",
  },
  gallup: {
    name: "Gallup",
    title: "Global Indicator: Artificial Intelligence",
    date: "updated 2026, figures as of May 2026",
    short: "May 2026",
    url: "https://www.gallup.com/699797/indicator-artificial-intelligence.aspx",
    note: "U.S. employees, Gallup Panel.",
  },
  pewChatgpt: {
    name: "Pew Research Center",
    title: "34% of U.S. adults have used ChatGPT, about double the share in 2023",
    date: "25 June 2025",
    short: "June 2025",
    url: "https://www.pewresearch.org/short-reads/2025/06/25/34-of-us-adults-have-used-chatgpt-about-double-the-share-in-2023/",
    note: "5,123 U.S. adults, surveyed 24 February to 2 March 2025.",
  },
  pewClicks: {
    name: "Pew Research Center",
    title: "Google users are less likely to click on links when an AI summary appears in the results",
    date: "22 July 2025",
    short: "July 2025",
    url: "https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/",
    note: "Browsing data from 900 U.S. adults in March 2025, covering 68,879 Google searches.",
  },
  pewAi2026: {
    name: "Pew Research Center",
    title: "Americans and AI 2026: Chatbots, Smart Devices and Views on Impact",
    date: "17 June 2026",
    short: "June 2026",
    url: "https://www.pewresearch.org/internet/2026/06/17/americans-and-ai-2026-chatbots-smart-devices-and-views-on-impact/",
    note: "5,119 U.S. adults, surveyed 17 to 23 February 2026.",
  },
  aiIndex: {
    name: "Stanford HAI",
    title: "The 2026 AI Index Report",
    date: "2026",
    short: "2026",
    url: "https://hai.stanford.edu/ai-index/2026-ai-index-report",
    note: "Annual report. Its organizational adoption figure covers organizations worldwide, mostly larger ones.",
  },
} satisfies Record<string, Source>;

export type SourceKey = keyof typeof SOURCES;
