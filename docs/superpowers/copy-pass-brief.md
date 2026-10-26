# Copy pass brief (26 Oct 2026, second pass)

The site at purcellventures.co was rebuilt today and is live. Elijah read it and said the writing "still sounds very AI in some places and needs to be redone", then "I just gave some examples out of like 5 minutes of looking but check everything everywhere please." This pass rewrites the words. It does not change the layout.

Work in the git worktree `/Users/elijahpurcell/.pv-cleanup-wt`. Do not run git. Do not run `next build`, `next start` or `next dev`, because other agents share this folder. Type-check with `./node_modules/.bin/tsc --noEmit -p .` only. Edit only the files your prompt assigns you.

Read `docs/superpowers/page-build-brief.md` first. Its writing rules, banned words and Facts section still apply in full. Everything below is on top of it.

## The two sentences he quoted, and why they fail

1. "The short factual version of who Elijah Purcell is has its own page."
   It is a sentence about the website's own structure. Nobody says this out loud. A link with a plain label ("Who is Elijah Purcell") does the job.
2. "The HVAC contractor, the barber and the florist work long hours with little technical support. I build tools for them."
   A neat triad of stock characters followed by a short punchline sentence. It reads as a crafted line. A person would say "Most of my clients are local service businesses, like contractors and salons, that have nobody on staff to run their website."

He also called a section titled "The mark" cheesy. Clever section names are out.

## What still reads as AI after the word and punctuation checks pass

Hunt these in every visible string: headings, ledes, intros, list items, buttons, captions, alt text, metadata titles and descriptions, FAQ answers, JSON-LD answer text.

- Sentences about the page or the site itself ("This page lists...", "has its own page", "Below is...", "Each entry shows...").
- Triads of example people or things used for rhythm.
- A long sentence followed by a short punchline sentence. Two short declaratives in a row for effect ("I build tools for them.", "That is the job.").
- Aphorisms and summary lines that restate the paragraph ("The work is the proof.", "Small teams need small tools.").
- Clever or poetic section names. Use plain topic names: "Prices", "What is included", "How a project runs", "Background".
- Abstract nouns where a fact belongs ("clarity", "ownership", "peace of mind"). Replace with the concrete fact or cut.
- Over-explaining motive ("because small businesses need these tools now"). State what he does and for whom.
- Hedged or inflated claims, and any claim not backed by a fact on the page.
- Headings that are full sentences with a period at the end, unless it is the page's main H1 and reads naturally.
- Repeated sentence openings, especially "I" three times in a row.

The test for each sentence: would Elijah say it, in these words, to a business owner across a table? If not, rewrite it so he would, or cut it. Shorter is usually right. Keep his first person ("I"). Keep every fact, price, number, link, button and form field, unless the rule below removes it.

## Content to remove anywhere you find it

- His singing, voice part, vocal range, choir, worship leading or any music performance. It must never appear publicly. Remove it from page text, FAQ answers, JSON-LD and metadata.
- Hobby and personal-interest lines that a client would not care about (debate, apologetics competitions, hobbies). Missions stays, see below.
- Anything about his money, family or private life.

If a page has a personal section, the only personal material that stays is this: he is called to missions, has been on mission trips to North Carolina, the Bahamas and Hawaii, and has a heart for the nations, with Acts 1:8 cited from the NASB: "but you will receive power when the Holy Spirit has come upon you; and you shall be My witnesses both in Jerusalem, and in all Judea and Samaria, and even to the remotest part of the earth." Keep scripture exactly as quoted, with (NASB).

## Report

Write JSON to the path your prompt gives: `{ "files": [ { "file", "changes": n, "removed": [ "what you removed and why" ] } ], "unsure": [ ... ] }`. Then reply with a short summary and the tsc result.
