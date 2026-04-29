"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import VideoEmbed from "@/app/components/VideoEmbed";
import { PanopticonMark } from "@/app/components/PanopticonMark";

const VALID_CODE = process.env.NEXT_PUBLIC_COURSE_ACCESS_CODE ?? "COLLEGE2026";
type GateState = "loading" | "locked" | "unlocked";

// ── localStorage helpers ──────────────────────────────────────────────────────
function getProgress(): string[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem("pv_college_progress") || "[]"); } catch { return []; }
}
function markDone(id: string): void {
  const p = getProgress();
  if (!p.includes(id)) localStorage.setItem("pv_college_progress", JSON.stringify([...p, id]));
}
function saveCurrent(id: string): void {
  localStorage.setItem("pv_college_current", id);
}

// ── Course data ───────────────────────────────────────────────────────────────
interface Lesson { id: string; moduleId: string; title: string; duration: string; format: string; videoUrl: string | null; notes: { intro: string[]; takeaways: string[] }; }
interface Module  { id: string; num: string; title: string; lessons: Lesson[]; }

const MODULES: Module[] = [
  {
    id: "module-1", num: "01", title: "The Truth About Admissions",
    lessons: [
      {
        id: "1-1", moduleId: "module-1", title: "How the system actually works", duration: "12 min", format: "Camera", videoUrl: null,
        notes: {
          intro: [
            "Most students approach college admissions like a job application — they try to look as impressive as possible and hope for the best. That's not how it works. Colleges aren't hiring; they're building a class. Every acceptance is a decision about who they want in the room with everyone else.",
            "Admissions officers read thousands of applications. At most schools, your file gets 8–12 minutes of attention total. The question isn't 'is this student qualified?' — it's 'does this student make our class more interesting?' That distinction changes everything about how you should present yourself.",
            "Selective admissions is partly a numbers game and partly not. The numbers (GPA, test scores) get you past the first filter. After that, it's about story, fit, and what you add to the school's needs that cycle. A school short on bassoonists, first-generation students, or students from Wyoming might accept someone they'd otherwise waitlist. Understanding this removes some of the mystery — and a lot of the self-blame.",
            "Financial considerations also shape acceptance decisions in ways schools don't advertise. Need-blind admissions is real at a handful of schools. At most schools, whether your family can pay full freight — or whether you'd qualify for institutional aid the school has budgeted — is factored in. This isn't a reason to avoid schools. It's a reason to understand which ones want you.",
          ],
          takeaways: [
            "Colleges are building a class, not hiring individuals — your story matters more than your stats above the filter threshold",
            "An application gets 8–12 minutes of total attention; first impressions in the first page are everything",
            "Fit, class composition, and financial considerations all affect decisions independently of merit",
            "Understanding why schools admit who they admit removes mystery and helps you position yourself accurately",
          ],
        },
      },
      {
        id: "1-2", moduleId: "module-1", title: "The timeline: 9th grade through senior fall", duration: "8 min", format: "Screen share", videoUrl: null,
        notes: {
          intro: [
            "The students who get the best outcomes don't suddenly get serious senior year. They've been building a story since 9th grade — not because they were planning everything perfectly, but because they were doing things they cared about consistently. That record is what applications are made of.",
            "9th and 10th grade: this is when you explore. Try things. Some will stick, some won't. The goal isn't to look impressive — it's to find the 2–3 things you're genuinely interested in enough to keep doing for three years. Depth in a few areas beats breadth in many.",
            "11th grade: this is the most important year of high school for college applications. Junior year GPA is the most scrutinized. PSAT/SAT/ACT testing, AP coursework, and the beginning of your activities list all take shape. This is also when you should start researching schools seriously and visiting if possible.",
            "Summer before senior year: write your personal statement. Not in September — in June or July, when you have time to think and revise. Students who write their essays under deadline pressure produce work that reads like it was written under deadline pressure.",
            "Senior fall: submit Early Action or Early Decision applications in November. Regular Decision deadlines are January 1 or January 15 for most schools. Managing 15–30 applications means having a submission system from day one.",
          ],
          takeaways: [
            "Consistent depth in 2–3 areas across four years is far stronger than breadth across many",
            "Junior year GPA is weighted most heavily — protect it above everything",
            "Write your personal statement the summer before senior year, not the week it's due",
            "Early Action is almost always the right move — more time, more options, same or better acceptance rates",
            "Build a submission tracking system in 9th grade and update it every semester",
          ],
        },
      },
    ],
  },
  {
    id: "module-2", num: "02", title: "Building Your School List",
    lessons: [
      {
        id: "2-1", moduleId: "module-2", title: "How I found 98 schools — live spreadsheet walkthrough", duration: "14 min", format: "Screen share", videoUrl: null,
        notes: {
          intro: [
            "Most students apply to 8–12 schools. I applied to more. The reason isn't that I wanted to collect acceptances — it's that a larger list, built methodically, dramatically increases your expected scholarship offers. With the right list, you can engineer a situation where multiple schools compete for you.",
            "My process started with Niche, College Board's BigFuture, and College Confidential — not for their rankings, but for their filter tools. I filtered by: size, location preference, acceptance rate range, known merit scholarship programs, and specific majors I was considering. That initial pull gave me ~150 schools, which I narrowed to 98 based on deeper research.",
            "For each school, I tracked: acceptance rate, average merit scholarship offered (not just available — average offered to students with my profile), known scholarship programs with specific dollar amounts, cost of attendance, net price calculator result, application requirements, and deadline. This spreadsheet became my operating system for the entire application season.",
            "The list wasn't random. It was built in tiers — schools where my stats put me in the top 25% of admitted students (high scholarship likelihood), schools where I was solidly mid-range (match), and schools where I was a stretch. The top-25% schools are where the money is.",
          ],
          takeaways: [
            "A larger, methodically built list with a scholarship lens produces more money than a small prestige-focused list",
            "Track average merit offered, not just maximum available — those are very different numbers",
            "Build your tracking spreadsheet in a tool you'll actually use (Google Sheets works fine)",
            "Filter for schools where your stats put you in the top 25% of admitted students — that's where merit aid concentrates",
            "Use net price calculators at every school before finalizing your list",
          ],
        },
      },
      {
        id: "2-2", moduleId: "module-2", title: "Reach, match, safety — the real math", duration: "10 min", format: "Camera", videoUrl: null,
        notes: {
          intro: [
            "Reach, match, and safety aren't fixed categories — they're relative to your stats. A school that's a reach for a 3.5 GPA student is a match for a 4.0 student. The categories only mean something in context of your actual profile.",
            "A true safety is a school you'd be happy attending, where you're certain of acceptance, and where you'd receive significant merit aid. If the only schools on your safety tier are ones you'd be miserable at, they're not functioning as safeties. A school that demoralizes you is not a fallback — it's a trap.",
            "The common advice is '3–4 safety, 3–4 match, 3–4 reach.' That's fine for a traditional application strategy. If you're optimizing for scholarship money, weight your list toward schools where you're in the top 25% of their admitted class. That's where you get leveraged offers. Reaches are exciting but rarely the schools that give you the most money.",
            "Acceptance rate is a rough proxy for selectivity, not a perfect measure. A 40% acceptance rate school can be harder to get into than a 15% school if your profile is unusual. Look at where your test scores and GPA sit relative to the middle 50% of admitted students — that's a more accurate signal.",
          ],
          takeaways: [
            "Reach/match/safety only make sense relative to your specific stats — build your own assessment",
            "A safety school should be one you'd genuinely attend, not just a backup you'd be miserable at",
            "Top-25% placement in admitted class statistics predicts merit aid better than acceptance rate",
            "Weight your list toward match/upper-match schools if scholarship maximization is the goal",
            "Middle 50% test score and GPA ranges are more useful than acceptance rate for predicting your odds",
          ],
        },
      },
      {
        id: "2-3", moduleId: "module-2", title: "Scholarship hunting before you apply", duration: "11 min", format: "Camera + Screen", videoUrl: null,
        notes: {
          intro: [
            "There are two kinds of scholarships: institutional (given by the college itself) and external (given by foundations, companies, and organizations). Most students know about both but focus only on one at a time. The strategy is to run both tracks simultaneously.",
            "Institutional merit scholarships — the ones built into financial aid packages — are the highest-value target. A $20,000/year scholarship from the university is worth $80,000 over four years and renews automatically if you meet GPA requirements. These are the numbers that make $505k possible. The key is applying to enough schools that compete for students like you.",
            "External scholarships ($500–$50,000 one-time or annual) are worth pursuing but require volume. Most $1,000 scholarships take 2–4 hours of work. That's $250–$500 per hour — not bad, but not your primary strategy. Use external scholarships to build early momentum and add small but real dollar amounts.",
            "Before you apply to any school, look for: named merit scholarships (these often require a separate application or are automatically considered), honors college scholarships (often the most generous per-school offers), and departmental scholarships for your intended major. These require research but aren't well-publicized.",
          ],
          takeaways: [
            "Institutional scholarships built into financial aid packages are higher value than most external awards",
            "Run external scholarship applications in parallel — they require volume but are worth the hours",
            "Research named scholarships and honors college awards before applying to each school",
            "Departmental scholarships for specific majors are often less competitive than general merit awards",
            "Track every scholarship with deadlines, amounts, requirements, and status in your spreadsheet",
          ],
        },
      },
    ],
  },
  {
    id: "module-3", num: "03", title: "Your Application Foundation",
    lessons: [
      {
        id: "3-1", moduleId: "module-3", title: "The activities list — making anything count", duration: "9 min", format: "Camera", videoUrl: null,
        notes: {
          intro: [
            "The Common App activities section gives you 10 slots and 150 characters per description. It's the most underused, undertreated part of most applications — students list what they did without explaining what it meant or what they built.",
            "Order matters. List your most significant activities first. Significance means: time invested, leadership demonstrated, impact created, or uniqueness. A summer job you worked 20 hours a week for two years is more significant than a club you attended biweekly.",
            "150 characters is tight. Every word has to work. Lead with a verb. Cut articles (a, the) where possible. Quantify where you can — 'managed social media: grew following 340% in 6 months' says more than 'managed social media accounts.' Numbers are specificity; specificity is credibility.",
            "Non-traditional activities count. Work, caregiving, religious leadership, self-directed projects — these belong on the list. A student who worked 25 hours per week to help their family has demonstrated character that clubs don't. Don't undersell your real life.",
          ],
          takeaways: [
            "List activities by significance, not chronology or prestige",
            "Lead every description with an active verb and a specific result or number where possible",
            "Non-traditional activities (work, caregiving, religious leadership) are legitimate and often distinctive",
            "The 150-character limit means every word must earn its place — cut all filler",
            "Leadership within an activity matters more than the activity's prestige level",
          ],
        },
      },
      {
        id: "3-2", moduleId: "module-3", title: "Honors, awards, and where to find more", duration: "8 min", format: "Camera", videoUrl: null,
        notes: {
          intro: [
            "The honors section of the Common App is limited to 5 entries. Most students leave it half-empty because they don't think of themselves as 'award winners.' The section is broader than it sounds.",
            "What counts as an honor or award: academic recognition (honor roll, dean's list, department awards), competition placements (not just first — semifinalist, regional qualifier, top 10% all count), scholarships you've already received, recognition from organizations you're involved in, and significant external recognition of any kind.",
            "If your list is thin, there are legitimate ways to add to it before your applications are due. Academic competitions — AMC math, Science Olympiad, debate tournaments, speech competitions, writing contests — are open to anyone, often free, and produce credentials within weeks. Apply, compete, and list the result whatever it is.",
            "Recognitions from community organizations, religious institutions, and employers also count. If your employer gave you employee-of-the-month or a performance commendation, that's an honor. If your church recognized your leadership, that's an honor. Think broadly.",
          ],
          takeaways: [
            "The honors section is broader than formal awards — recognition of any meaningful kind qualifies",
            "Competition placements beyond first place (semifinalist, top 10%, regional qualifier) belong on the list",
            "Academic competitions can be entered and completed quickly — don't leave slots empty",
            "Existing scholarships received, employer recognition, and community awards all qualify",
            "Five slots — fill them all",
          ],
        },
      },
      {
        id: "3-3", moduleId: "module-3", title: "Letters of rec strategy", duration: "7 min", format: "Camera", videoUrl: null,
        notes: {
          intro: [
            "Letters of recommendation don't make applications — but weak ones can break them. The goal is to get letters that add specific, personal evidence about who you are that your transcript and activities list can't show.",
            "Choose recommenders who know you well over recommenders who are impressive. A letter from a teacher who watched you struggle with and eventually master something specific is worth more than a letter from a principal who vaguely remembers you. Specificity signals authenticity.",
            "Give your recommenders a 'brag sheet' — a one-page document with your activities, achievements, and 2–3 specific moments in their class or context that you'd want them to highlight. Most teachers write dozens of recommendations; the ones who get good letters are the ones who make it easy for the teacher to write something real.",
            "Ask early — ideally in the spring of junior year or the first week of senior year. Teachers who agree to write letters have a queue. Get in it before it fills up. If a teacher hesitates or seems unenthusiastic, find someone else. A willing letter is better than a reluctant one.",
          ],
          takeaways: [
            "Choose recommenders based on how well they know you, not their title or prestige",
            "Provide a brag sheet with specific moments and achievements you want highlighted",
            "Ask in spring of junior year or first week of senior year — never at the last minute",
            "A teacher who's enthusiastic about recommending you will write a better letter than one who agrees reluctantly",
            "Follow up once at the two-week-before-deadline mark — a gentle reminder is expected, not rude",
          ],
        },
      },
    ],
  },
  {
    id: "module-4", num: "04", title: "The Essays",
    lessons: [
      {
        id: "4-1", moduleId: "module-4", title: "What admissions actually wants from your personal statement", duration: "13 min", format: "Camera", videoUrl: null,
        notes: {
          intro: [
            "The personal statement is not a resume in prose form. It is not a list of your accomplishments. It is not proof that you are impressive. It is evidence of who you are — how you think, what you notice, what you care about. Admissions officers already have your transcript and activities list. The essay is the one place they get to hear your voice.",
            "The most common mistake: students write about what they did instead of what they thought. 'I led my team to the state championship' is an activity. 'The moment I realized winning wasn't the point was when...' is an essay. The essay has to go somewhere the rest of the application can't.",
            "The topic matters less than most students think. An essay about a mundane subject — learning to cook, driving to school, a broken piece of equipment — can be one of the strongest essays in a cycle if it reveals something real about the writer's mind. A dramatic topic (tragedy, immigration, illness) can produce a weak essay if it focuses on the event instead of the person.",
            "Admissions officers read hundreds of essays. They are looking for a reason to be interested. The first paragraph either creates that interest or doesn't. If your opening sentence is a dictionary definition, a quote, or a rhetorical question, rewrite it.",
          ],
          takeaways: [
            "The essay reveals how you think — not what you've done",
            "Focus on your response to events, not the events themselves",
            "The topic matters far less than the execution and authenticity",
            "Your first paragraph is your only guaranteed chance to create interest — use it",
            "Write the way you actually talk when you're thinking hard about something",
          ],
        },
      },
      {
        id: "4-2", moduleId: "module-4", title: "Writing your essay live", duration: "18 min", format: "Screen share", videoUrl: null,
        notes: {
          intro: [
            "In this lesson, I walk through the actual process I used to draft my personal statement — from the blank page to a working first draft. The lesson is a screen share so you can see exactly how I think through it.",
            "The process I use: start with a list of 10 experiences that felt meaningful, then identify which ones have something interesting to say about how I see the world. Not the most impressive — the most revealing. From that list, draft three different opening sentences for the top two candidates and see which one has more energy.",
            "First drafts are supposed to be bad. The students who struggle most with essays are perfectionists who can't tolerate writing something rough. Write the whole thing badly, all the way to the end, before you edit anything. You can't fix a blank page.",
            "The revision process is where the essay becomes good. In the first draft, you find out what you're trying to say. In the revision, you say it more precisely. Cut anything that could have been written by any applicant — the more specific and personal, the better. If a sentence doesn't add something only you could have written, cut it.",
          ],
          takeaways: [
            "Start with a list of meaningful experiences, not your most impressive ones",
            "Write three different opening sentences and pick the one with the most energy",
            "Write the whole draft badly before editing anything — you can't revise a blank page",
            "Revise by removing anything that any applicant could have written",
            "The best essays are so specific that the reader feels like they know you after one read",
          ],
        },
      },
      {
        id: "4-3", moduleId: "module-4", title: "Supplementals — efficiency at scale", duration: "12 min", format: "Camera + Screen", videoUrl: null,
        notes: {
          intro: [
            "Supplemental essays are shorter (50–400 words typically) and school-specific. They ask things like: Why this school? What will you contribute to our community? Describe a challenge you've overcome. Some schools have 1–2 supplements; others have 5–7.",
            "The efficiency principle: most supplemental prompts cluster into 4–5 categories. The 'Why this school?' essay can be adapted with 15 minutes of research per school. The 'Describe a challenge' essay can be a refined version of your personal statement material. Build master responses for each category, then customize.",
            "The 'Why this school?' essay is the most important supplemental you'll write. It needs to be specific — not 'your beautiful campus and strong academics' (that's every school). Specific means: a professor's research you looked up, a specific program or course, a tradition or community element you found compelling. Admissions officers know if you've done your homework.",
            "Don't treat supplements as an afterthought. A strong supplement can elevate a borderline application. A weak one — especially a generic 'Why us?' — signals that you're not genuinely interested. Demonstrated interest is real and schools track it.",
          ],
          takeaways: [
            "Build master essays for each supplement category (Why Us, challenge, community contribution, etc.) then customize",
            "The 'Why this school?' essay must be specific — generic praise is transparent and hurts",
            "Research one professor's work, one course, one specific program per school before writing their supplement",
            "Demonstrated interest is tracked — a tailored supplement signals genuine interest",
            "Budget 15–30 minutes per school for supplement customization when using master drafts",
          ],
        },
      },
      {
        id: "4-4", moduleId: "module-4", title: "Getting feedback and revising", duration: "8 min", format: "Camera", videoUrl: null,
        notes: {
          intro: [
            "Getting feedback on your essays is valuable — but the wrong feedback can make your essay worse. People who haven't read thousands of college essays often give advice that pushes students toward safer, blander writing. Know whose feedback to weight.",
            "The best feedback comes from: people who've read your work before and know your voice, people who've worked in admissions or read applications professionally, and people who are simply good readers (they notice when something feels false or when something resonates).",
            "What to ask for: 'Tell me what you think I'm saying about myself in this essay' and 'Tell me what you found most interesting.' If their answer doesn't match your intention, you have revision work to do. Don't ask 'Is this good?' — that's not useful feedback.",
            "Revise toward clarity and specificity, not toward impressiveness. If a revision makes the essay sound smarter but less like you, undo it. The essay is supposed to sound like an 18-year-old who thinks carefully — not like a college admissions essay.",
          ],
          takeaways: [
            "Get feedback from good readers, not necessarily the most experienced adults in your life",
            "Ask 'what do you think I'm saying about myself?' — the answer reveals what the essay is actually communicating",
            "Revise toward clarity and authenticity, not toward impressiveness",
            "If a revision makes the essay less like you, undo it",
            "Stop revising when further changes would make the essay worse, not when it feels perfect",
          ],
        },
      },
    ],
  },
  {
    id: "module-5", num: "05", title: "Financial Aid & Scholarships",
    lessons: [
      {
        id: "5-1", moduleId: "module-5", title: "FAFSA + CSS Profile explained", duration: "15 min", format: "Screen share", videoUrl: null,
        notes: {
          intro: [
            "The FAFSA (Free Application for Federal Student Aid) opens October 1 each year and should be submitted as early as possible — many schools use it to determine institutional grants on a first-come basis. Waiting until spring to file costs money.",
            "The FAFSA calculates your Student Aid Index (SAI, formerly Expected Family Contribution). This number determines your eligibility for federal grants, loans, and work-study. It also triggers institutional need-based aid at many schools. The lower your SAI, the more need-based aid you qualify for.",
            "The CSS Profile is a separate, more detailed financial form required by about 400 mostly private colleges. It digs deeper than the FAFSA — asking about home equity, non-custodial parent income, and business assets. Schools that require it often give more institutional grant aid as a result. The application fee is $25 for the first school and $16 for each additional (fee waivers available).",
            "Dependency status, divorced parent situations, and unusual financial circumstances all have specific rules in FAFSA and CSS. If your situation is non-standard, look up the specific rule rather than guessing — getting it wrong costs money or flags your application for review.",
          ],
          takeaways: [
            "File the FAFSA on October 1 — not January. Early submission matters at many schools.",
            "The Student Aid Index determines need-based eligibility — lower is better for grants",
            "CSS Profile schools often give more institutional grant money — the extra form is worth it",
            "Divorced families, self-employed parents, and unusual circumstances have specific filing rules — look them up",
            "Request fee waivers for CSS Profile if your household qualifies — they're automatic",
          ],
        },
      },
      {
        id: "5-2", moduleId: "module-5", title: "My exact scholarship hunting process", duration: "16 min", format: "Screen share", videoUrl: null,
        notes: {
          intro: [
            "This lesson is a screen share of my actual scholarship research process — the sites I used, how I filtered, what I tracked, and how I prioritized which ones to apply for.",
            "The sites I used most: Scholarship America, Fastweb, Bold.org, Going Merry, and Scholarships.com. Each has a different database and different filters. Don't rely on one. The overlap between them is smaller than you'd expect.",
            "Filtering for fit: I filtered by eligibility criteria I actually met — state, intended major, test score range, extracurricular activities. Generic scholarships open to everyone get thousands of applications. Niche scholarships for students matching specific criteria get dozens. Apply where you're competitive.",
            "Volume is part of the strategy for external scholarships. A $1,000 scholarship that takes 90 minutes of work is $667/hour. A $500 scholarship that takes 20 minutes of work (because it reuses your personal statement) is $1,500/hour. Prioritize by dollars-per-hour, not dollar amount.",
            "The scholarships that added the largest numbers to my total came from institutional merit awards — not external scholarships. External scholarships are real money but they're supplemental. Build your school list around schools with strong institutional merit aid first.",
          ],
          takeaways: [
            "Use multiple scholarship databases — don't rely on any single platform",
            "Filter by specific eligibility criteria that match you — niche scholarships are less competitive",
            "Calculate dollars-per-hour when deciding which external scholarships to prioritize",
            "Essays that reuse your personal statement material dramatically lower per-scholarship work time",
            "Institutional merit aid will make up the majority of your scholarship total — build your school list accordingly",
          ],
        },
      },
      {
        id: "5-3", moduleId: "module-5", title: "Negotiating your award package", duration: "10 min", format: "Camera", videoUrl: null,
        notes: {
          intro: [
            "Most families don't know that financial aid packages are negotiable. They treat the first offer as final. It almost never has to be. Schools want you — especially if you've been admitted — and the financial aid office has discretionary authority to adjust packages in response to competing offers or special circumstances.",
            "The strongest leverage you have is a competing offer from a comparable school. 'University A offered me $X, which is $Y more per year than your offer. Is there anything you can do to match or get closer to that?' is a straightforward, professional request that schools are used to hearing. Have the competing offer in writing before you call.",
            "Professional judgment appeals are for circumstances that changed after your FAFSA was filed — job loss, medical expenses, divorce, or other significant changes. These require documentation but can result in substantial increases to your aid package.",
            "When you call the financial aid office, be specific about what you're asking for, be polite, and get the name of the person you spoke with. Follow up in writing (email) to document the conversation. Don't be apologetic — you're not asking for a favor, you're having a business conversation.",
          ],
          takeaways: [
            "Financial aid packages are negotiable — always ask before accepting the first offer",
            "A competing offer from a comparable school is the strongest leverage you have",
            "Professional judgment appeals work for significant changed circumstances after filing",
            "Call, be specific, use the person's name, and follow up in writing",
            "The worst they can say is no — and even then, you've demonstrated you take this seriously",
          ],
        },
      },
    ],
  },
  {
    id: "module-6", num: "06", title: "The Final Stretch",
    lessons: [
      {
        id: "6-1", moduleId: "module-6", title: "EA/ED strategy — when to commit early", duration: "11 min", format: "Camera", videoUrl: null,
        notes: {
          intro: [
            "Early Action (EA) and Early Decision (ED) both have earlier deadlines (typically November 1 or November 15) but work very differently. EA is non-binding — you apply early, hear back earlier, and make your decision by May 1 like everyone else. ED is binding — if accepted, you commit to attending and withdraw all other applications.",
            "EA is almost always the right call if a school offers it. Acceptance rates are higher in the EA round at most schools. You reduce application stress by knowing outcomes earlier. And financial aid is unaffected. Apply EA to as many schools as you can — it costs nothing extra.",
            "ED is a more complex decision. It makes sense when: a school is your clear first choice, you've done the math on financial aid and it's workable, and your application is at its strongest in November. ED artificially raises your odds at schools where you're on the edge — some research suggests 10–20% bump at selective schools. But committing before you see other offers means you can't compare aid packages.",
            "ED II (January deadline, binding) is worth considering for schools that dropped to your second or third choice after first-choice results. If you didn't get into your ED I school and a school you loved is still open for ED II, it's a real option.",
          ],
          takeaways: [
            "Apply Early Action everywhere it's offered — acceptance rates are higher and there's no downside",
            "ED is only the right call when a school is your clear first choice and you've confirmed the financial aid picture",
            "ED can provide a 10–20% acceptance rate boost at selective schools — real but not magic",
            "ED II is a legitimate second-round option if your situation changes after November decisions",
            "Never apply ED to a school you haven't fully researched the financial aid situation at",
          ],
        },
      },
      {
        id: "6-2", moduleId: "module-6", title: "Comparing offers and making the decision", duration: "9 min", format: "Camera", videoUrl: null,
        notes: {
          intro: [
            "By April, you may have multiple acceptances with different financial aid packages. This is the best possible problem to have — but it's still a real decision. Price is one factor. It's not the only one.",
            "Build a true cost comparison, not a sticker price comparison. The number that matters is net cost (total cost of attendance minus all grants and scholarships you don't have to repay). A $70,000/year school with a $45,000 scholarship costs less than a $40,000/year school with a $10,000 scholarship.",
            "Beyond price: consider the specific program quality in your intended major (not overall rankings — specific department), the alumni network in your intended career path, the city or region and whether you'd thrive there, and the culture you experienced on campus visits. Prestige is real but often overstated. The specific fit for what you're trying to do matters more.",
            "If two schools are close in cost and quality, the tiebreaker is usually this: where do you imagine yourself feeling more at home? Gut-level reactions on campus visits are data. The environment you spend four years in shapes you. Don't ignore it in favor of a spreadsheet.",
          ],
          takeaways: [
            "Compare net cost (after grants), not sticker price",
            "Department/program quality in your specific major matters more than overall school rankings",
            "City and region are part of the decision — you're living there for four years",
            "Gut reactions during campus visits are legitimate data",
            "If you're genuinely torn between two schools after all analysis, visit both again before the May 1 deadline",
          ],
        },
      },
    ],
  },
];

const ALL_LESSONS = MODULES.flatMap(m => m.lessons);

const LAMPSTAND = { cellStyle: "outlined" as const, pvSize: 70, pvClearR: 58, ringStart: 70, ringEnd: 116, numRings: 7, ringFadeToCenter: true };

// ─────────────────────────────────────────────────────────────────────────────

export default function LessonsPage() {
  const [gate, setGate]             = useState<GateState>("loading");
  const [codeInput, setCodeInput]   = useState("");
  const [codeError, setCodeError]   = useState(false);
  const [activeId, setActiveId]     = useState<string>("1-1");
  const [progress, setProgress]     = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("pv_course_access");
    setGate(stored === VALID_CODE ? "unlocked" : "locked");
    setProgress(getProgress());
    const last = localStorage.getItem("pv_college_current");
    if (last && ALL_LESSONS.find(l => l.id === last)) setActiveId(last);
  }, []);

  function handleCode(e: React.FormEvent) {
    e.preventDefault();
    const val = codeInput.trim().toUpperCase();
    if (val === VALID_CODE) {
      localStorage.setItem("pv_course_access", val);
      setGate("unlocked");
    } else {
      setCodeError(true);
    }
  }

  function selectLesson(id: string) {
    setActiveId(id);
    saveCurrent(id);
    setSidebarOpen(false);
  }

  function handleComplete() {
    markDone(activeId);
    setProgress(getProgress());
  }

  const lesson     = ALL_LESSONS.find(l => l.id === activeId) ?? ALL_LESSONS[0];
  const lessonIdx  = ALL_LESSONS.indexOf(lesson);
  const mod        = MODULES.find(m => m.id === lesson.moduleId)!;
  const prevLesson = ALL_LESSONS[lessonIdx - 1] ?? null;
  const nextLesson = ALL_LESSONS[lessonIdx + 1] ?? null;
  const pct        = Math.round((progress.length / ALL_LESSONS.length) * 100);
  const done       = progress.includes(activeId);

  // ── Loading ───────────────────────────────────────────────────────────────
  if (gate === "loading") return <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)" }} />;

  // ── Gate ──────────────────────────────────────────────────────────────────
  if (gate === "locked") {
    return (
      <div style={{ minHeight: "100vh", background: "var(--color-warm-bg)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
        <div style={{ maxWidth: "400px", width: "100%", textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "28px" }}>
            <PanopticonMark size={52} color="#d4af37" bg="var(--color-warm-bg)" cfg={LAMPSTAND} />
          </div>
          <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "24px", fontWeight: 700, color: "var(--color-warm-text)", marginBottom: "10px" }}>
            Access the Course
          </h1>
          <p style={{ fontSize: "14px", color: "var(--color-warm-text-muted)", marginBottom: "32px", lineHeight: 1.65, fontFamily: "var(--font-dm-sans), sans-serif" }}>
            Enter the access code from your purchase confirmation email.
          </p>
          <form onSubmit={handleCode} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <input
              type="text"
              placeholder="ACCESS CODE"
              value={codeInput}
              onChange={e => { setCodeInput(e.target.value); setCodeError(false); }}
              style={{
                padding: "13px 16px", fontSize: "14px", letterSpacing: "0.12em", textAlign: "center", textTransform: "uppercase",
                background: "var(--color-warm-card)", border: `1px solid ${codeError ? "#e05c5c" : "var(--color-warm-border)"}`,
                borderRadius: 6, color: "var(--color-warm-text)", outline: "none",
                fontFamily: "var(--font-inter), sans-serif",
              }}
            />
            {codeError && (
              <p style={{ fontSize: "12px", color: "#e05c5c", margin: 0, fontFamily: "var(--font-inter), sans-serif" }}>
                That code isn't right — check your confirmation email.
              </p>
            )}
            <button type="submit" style={{
              padding: "13px", fontSize: "14px", fontWeight: 700,
              background: "var(--color-warm-accent)", color: "var(--color-warm-bg)",
              border: "none", borderRadius: 6, cursor: "pointer",
              fontFamily: "var(--font-inter), sans-serif", letterSpacing: "0.06em",
            }}>
              Enter →
            </button>
          </form>
          <p style={{ fontSize: "12px", color: "var(--color-warm-text-light)", marginTop: "20px", fontFamily: "var(--font-inter), sans-serif" }}>
            No code? <a href="mailto:elijah@purcell-ventures.com" style={{ color: "var(--color-warm-accent)" }}>elijah@purcell-ventures.com</a>
          </p>
        </div>
      </div>
    );
  }

  // ── Course player ─────────────────────────────────────────────────────────
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "var(--color-warm-bg)", overflow: "hidden" }}>
      <style>{`
        .lesson-sidebar { display: flex; }
        .lesson-hamburger { display: none; }
        @media (max-width: 767px) {
          .lesson-sidebar { display: ${sidebarOpen ? "flex" : "none"}; position: fixed; inset: 0; z-index: 200; width: 100%; }
          .lesson-hamburger { display: flex; }
        }
      `}</style>

      {/* Top bar */}
      <div style={{ height: "50px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", borderBottom: "1px solid var(--color-warm-border)", flexShrink: 0, background: "var(--color-warm-bg)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button className="lesson-hamburger" onClick={() => setSidebarOpen(o => !o)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-warm-text)", padding: "4px", alignItems: "center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
          <Link href="/courses" style={{ fontSize: "12px", color: "var(--color-warm-text-muted)", textDecoration: "none", fontFamily: "var(--font-inter), sans-serif" }}>
            ← Courses
          </Link>
          <span style={{ fontSize: "12px", color: "var(--color-warm-text-light)", fontFamily: "var(--font-inter), sans-serif" }}>College Application Playbook</span>
        </div>
        <div style={{ fontSize: "12px", color: "var(--color-warm-accent)", fontFamily: "var(--font-inter), sans-serif", fontWeight: 600 }}>
          {pct}% complete
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

        {/* Sidebar */}
        <aside className="lesson-sidebar" style={{ width: 260, flexDirection: "column", borderRight: "1px solid var(--color-warm-border)", overflowY: "auto", flexShrink: 0, background: "var(--color-warm-bg)" }}>
          {/* Mobile close */}
          <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--color-warm-border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", color: "var(--color-warm-text-muted)", fontFamily: "var(--font-inter), sans-serif" }}>COURSE MENU</span>
            <button className="lesson-hamburger" onClick={() => setSidebarOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-warm-text-muted)", alignItems: "center" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          {/* Progress bar */}
          <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--color-warm-border)" }}>
            <div style={{ height: 3, background: "var(--color-warm-border)", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${pct}%`, background: "var(--color-warm-accent)", transition: "width 0.3s" }} />
            </div>
          </div>

          {/* Module list */}
          {MODULES.map(m => (
            <div key={m.id}>
              <div style={{ padding: "12px 16px 6px", fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", color: "var(--color-warm-text-light)", textTransform: "uppercase", fontFamily: "var(--font-inter), sans-serif" }}>
                MODULE {m.num} · {m.title}
              </div>
              {m.lessons.map(l => {
                const isActive = l.id === activeId;
                const isDone   = progress.includes(l.id);
                return (
                  <button key={l.id} onClick={() => selectLesson(l.id)} style={{
                    width: "100%", display: "flex", alignItems: "center", gap: "10px",
                    padding: "9px 16px", background: isActive ? "var(--color-warm-card)" : "none",
                    borderLeft: `2px solid ${isActive ? "var(--color-warm-accent)" : "transparent"}`,
                    border: "none", borderRight: "none", borderTop: "none", borderBottom: "none",
                    cursor: "pointer", textAlign: "left",
                  }}>
                    <div style={{
                      width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
                      background: isDone ? "var(--color-warm-accent)" : isActive ? "transparent" : "var(--color-warm-border)",
                      border: isActive && !isDone ? `1.5px solid var(--color-warm-accent)` : "none",
                    }} />
                    <span style={{ fontSize: "12px", color: isActive ? "var(--color-warm-text)" : "var(--color-warm-text-muted)", lineHeight: 1.4, flex: 1, fontFamily: "var(--font-dm-sans), sans-serif" }}>
                      {l.title}
                    </span>
                    <span style={{ fontSize: "10px", color: "var(--color-warm-text-light)", flexShrink: 0, fontFamily: "var(--font-inter), sans-serif" }}>
                      {l.duration}
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
        </aside>

        {/* Main content */}
        <main style={{ flex: 1, overflowY: "auto", padding: "40px" }}>
          <div style={{ maxWidth: "760px" }}>

            {/* Breadcrumb */}
            <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "24px", fontSize: "11px", color: "var(--color-warm-text-muted)", fontFamily: "var(--font-inter), sans-serif" }}>
              <span>MODULE {mod.num}</span>
              <span>·</span>
              <span style={{ color: "var(--color-warm-text)" }}>{lesson.title}</span>
            </div>

            {/* Lesson header */}
            <div style={{ marginBottom: "28px" }}>
              <div style={{ display: "flex", gap: "8px", marginBottom: "12px", flexWrap: "wrap" }}>
                <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", padding: "3px 10px", background: "rgba(212,175,55,0.12)", border: "1px solid rgba(212,175,55,0.3)", borderRadius: 20, color: "var(--color-warm-accent)", fontFamily: "var(--font-inter), sans-serif" }}>
                  {mod.title}
                </span>
                <span style={{ fontSize: "10px", padding: "3px 10px", border: "1px solid var(--color-warm-border)", borderRadius: 20, color: "var(--color-warm-text-muted)", fontFamily: "var(--font-inter), sans-serif" }}>
                  {lesson.format}
                </span>
                <span style={{ fontSize: "10px", padding: "3px 10px", border: "1px solid var(--color-warm-border)", borderRadius: 20, color: "var(--color-warm-text-muted)", fontFamily: "var(--font-inter), sans-serif" }}>
                  {lesson.duration}
                </span>
              </div>
              <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 700, color: "var(--color-warm-text)", lineHeight: 1.2 }}>
                {lesson.title}
              </h1>
            </div>

            {/* Video */}
            <div style={{ marginBottom: "40px" }}>
              <VideoEmbed url={lesson.videoUrl} title={lesson.title} />
            </div>

            {/* Written notes */}
            <div style={{ borderTop: "1px solid var(--color-warm-border)", paddingTop: "36px" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "20px", fontFamily: "var(--font-inter), sans-serif" }}>
                Lesson Notes
              </div>
              <div style={{ marginBottom: "32px" }}>
                {lesson.notes.intro.map((p, i) => (
                  <p key={i} style={{ fontSize: "15px", color: "var(--color-warm-text-muted)", lineHeight: 1.85, marginBottom: "16px", fontFamily: "var(--font-dm-sans), sans-serif" }}>
                    {p}
                  </p>
                ))}
              </div>

              <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-warm-accent)", marginBottom: "16px", fontFamily: "var(--font-inter), sans-serif" }}>
                Key Takeaways
              </div>
              <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none" }}>
                {lesson.notes.takeaways.map((t, i) => (
                  <li key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start", marginBottom: "12px" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--color-warm-accent)", flexShrink: 0, marginTop: 8 }} />
                    <span style={{ fontSize: "14px", color: "var(--color-warm-text)", lineHeight: 1.65, fontFamily: "var(--font-dm-sans), sans-serif" }}>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom nav */}
            <div style={{ marginTop: "48px", paddingTop: "24px", borderTop: "1px solid var(--color-warm-border)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              <button
                onClick={() => prevLesson && selectLesson(prevLesson.id)}
                disabled={!prevLesson}
                style={{ padding: "9px 18px", fontSize: "13px", fontWeight: 600, background: "none", border: "1px solid var(--color-warm-border)", borderRadius: 5, color: prevLesson ? "var(--color-warm-text-muted)" : "var(--color-warm-text-light)", cursor: prevLesson ? "pointer" : "not-allowed", fontFamily: "var(--font-inter), sans-serif" }}
              >
                ← Previous
              </button>

              <button
                onClick={handleComplete}
                disabled={done}
                style={{
                  padding: "9px 22px", fontSize: "13px", fontWeight: 700,
                  background: done ? "none" : "var(--color-warm-accent)",
                  color: done ? "var(--color-warm-accent)" : "var(--color-warm-bg)",
                  border: `1px solid ${done ? "var(--color-warm-accent)" : "var(--color-warm-accent)"}`,
                  borderRadius: 5, cursor: done ? "default" : "pointer",
                  fontFamily: "var(--font-inter), sans-serif", letterSpacing: "0.04em",
                }}
              >
                {done ? "✓ Completed" : "Mark Complete"}
              </button>

              <button
                onClick={() => nextLesson && selectLesson(nextLesson.id)}
                disabled={!nextLesson}
                style={{ padding: "9px 18px", fontSize: "13px", fontWeight: 600, background: "none", border: "1px solid var(--color-warm-border)", borderRadius: 5, color: nextLesson ? "var(--color-warm-text-muted)" : "var(--color-warm-text-light)", cursor: nextLesson ? "pointer" : "not-allowed", fontFamily: "var(--font-inter), sans-serif" }}
              >
                Next Lesson →
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
