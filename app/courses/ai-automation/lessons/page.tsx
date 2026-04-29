"use client";
import { useState, useEffect } from "react";

const ACCESS_CODE = process.env.NEXT_PUBLIC_AUTOMATION_ACCESS_CODE ?? "AUTOMATE2026";
const STORAGE_KEY  = "pv_automation_access";
const PROGRESS_KEY = "pv_automation_progress";
const CURRENT_KEY  = "pv_automation_current";

type GateState = "loading" | "locked" | "unlocked";

// ── Curriculum ────────────────────────────────────────────────────────────────
const MODULES = [
  {
    num: "01", title: "The Automation Mindset",
    lessons: [
      {
        id: "1-1", title: "The 'more than once' rule — how I decide what to automate",
        duration: "12 min", format: "Camera",
        notes: `Every tool I have built started with a moment of annoyance. Not a strategic insight — annoyance. I was reading my email for the fourth time that day and nothing had changed since the third time. I was copying job postings from Craigslist into a spreadsheet and realizing I had done the exact same thing two weeks earlier. I was filling out scholarship applications and thinking: I already answered this question seventeen times. The moment I started paying attention to that annoyance was the moment automation became possible for me.

The filter I use is what I call the "more than once" rule. If I do something more than once and it follows a pattern — meaning the steps are roughly the same each time, even if the specific data is different — it's a candidate for automation. That's it. The rule is not sophisticated. What makes it powerful is consistency: I apply it every single time I catch myself repeating work. I don't evaluate whether I'm capable of automating it yet. I just flag it and move on. The capability question comes later.

The distinction between "more than once" and "follows a pattern" is important. Manually ordering the exact same lunch every day is repetitive, but it doesn't follow a pattern that code can execute better than you. Reading your inbox and deciding which emails need a reply does follow a pattern — you're doing a classification task, and classification is something Claude is exceptionally good at. The question to ask is: if I wrote down the rules I use to make this decision, would they be specific enough for a computer to follow? If yes, you're looking at an automation candidate.

Walk through three real examples: the email bot, which replaced my habit of scanning my inbox every hour; AutoBlade, which replaced my weekly Craigslist search for service jobs; and the Scholarship Sniper, which replaced what would have been two weeks of manually reading college emails. In each case, the pattern was there long before I automated it — I just wasn't looking for it. The "more than once" rule trains you to start looking.

The practical exercise for this lesson is to open your last week of work and count repetitions. Not tasks — repetitions. How many times did you do essentially the same thing? How much of your inbox management is classification? How many of your recurring tasks have an identifiable trigger (new email, new day, someone fills out a form)? That count is your automation backlog. Most people, when they first do this honestly, find they have ten to fifteen hours of automatable work per week. That's not a small number.`,
        takeaways: [
          "The 'more than once' rule: if it happens more than once and follows a pattern, it's a candidate",
          "Pattern = the steps are roughly the same even when the specific data is different",
          "Classification tasks (sorting, labeling, prioritizing) are strong automation candidates",
          "Annoyance is a reliable signal — your frustration is pointing at something worth automating",
          "Most people have 10–15 hours/week of automatable work once they start counting",
        ],
      },
      {
        id: "1-2", title: "The stack audit — mapping your daily repetitive tasks",
        duration: "13 min", format: "Camera + Screen",
        notes: `The stack audit is a structured exercise for finding the pattern work you've been ignoring. It's not a brainstorm — brainstorming is too open-ended and you'll end up listing things that feel automatable but aren't. The audit is more like an inventory: you go through every place where your work happens and count repetitions.

Open four things: your email inbox, your calendar for the last two weeks, your browser history, and if you use one, a task manager like Notion or Todoist. These four surfaces contain almost everything you do. Go through each one and ask: what do I do here repeatedly? In your inbox, look for response patterns — emails that get the same type of reply. Look for things you check regularly without acting on. In your calendar, look for recurring meetings that produce recurring outputs. In your browser history, look for sites you visit on a schedule or for a specific purpose.

For each repetitive task you find, score it on three axes: frequency (how many times per week), time cost (how many minutes each time), and annoyance (1–5, how much it bothers you). Multiply the three together. That gives you a priority score. The tasks at the top of the ranked list are where you start — not the most technically interesting ones, and not the ones that seem most impressive to automate. The highest-score tasks are the ones where you'll feel the automation immediately.

When I did this exercise, the top three items were: reading and triaging my inbox (7 times per week × 20 min × annoyance 5 = 700), searching Craigslist for service job leads (3 times per week × 25 min × annoyance 4 = 300), and processing scholarship emails (happened once but took 8 hours — the Scholarship Sniper cut that to 20 minutes). Your list will be different, but I'll almost guarantee that something involving email is near the top. Email is the most repetitive, most time-consuming, and most pattern-driven workflow most people have.

The output of this exercise is a ranked list. Keep it somewhere permanent. Add to it every time you notice a new repetition. The list is never "done" — as you automate items off the top, new ones surface. After six months of doing this, you'll have a fundamentally different relationship with your time: instead of managing your work, you'll be managing a system that manages your work.`,
        takeaways: [
          "Audit four surfaces: inbox, calendar, browser history, task manager",
          "Scoring formula: frequency × time cost × annoyance = priority score",
          "Start with the highest-score task, not the most impressive one",
          "Email is almost always near the top of everyone's list",
          "The list is permanent and growing — keep adding to it as you notice new patterns",
        ],
      },
      {
        id: "1-3", title: "Picking your first build — scope, effort, and impact",
        duration: "10 min", format: "Camera",
        notes: `The most common mistake people make with their first automation is picking something too ambitious. They see the email bot or the YouTube pipeline and they want to build something at that scale immediately. Those tools took real time to develop. The email bot went through four rewrites before it was reliable enough to trust daily. The YouTube pipeline has a dozen edge cases that took weeks of real-world failures to discover and handle. Your first automation should not have edge cases at all — it should be so simple that there is only one path.

Good first builds share three characteristics: a clear trigger, a single transformation, and a useful output. The trigger is what starts the automation (a new file in a folder, a time of day, a webhook). The transformation is what the automation does (calls an API, moves data, generates text). The output is what you get (a file, an email draft, a row in a spreadsheet). If you can describe your first build in one sentence using those three elements, it's scoped correctly. "When a new email arrives from a specific sender, extract the relevant information and add it to a spreadsheet" is a good first build. "Build an AI that manages my entire business communication" is not.

The other failure mode is too much setup before the first run. If you're spending more than two hours getting your environment ready, stop and simplify. Your goal for the first session is to have something running — even if it's wrong, even if it only works on one input. A script that runs and produces bad output is infinitely more valuable than a plan that produces perfect output in theory. The feedback loop of running code is the only thing that actually teaches you to build.

For most people coming from the stack audit, the right first build is a simple email parser. Pick one type of email you get regularly — receipts, newsletter summaries, job alerts, whatever — and write a script that reads it and extracts the key information. Don't send anything, don't automate anything, don't store anything yet. Just read, extract, print. Get that working in an afternoon, then add one piece at a time. This is the pattern that every tool in this course was built with: start with the smallest possible thing that proves the core concept, then extend.

Time to finish is the most important metric for your first build. Pick something you can finish in one sitting or one weekend. Not because fast is always better, but because finishing is what builds the skill. Every builder I know who has a library of running tools got there by finishing lots of small things, not by planning one large thing for months. The YouTube pipeline is big, but it was built in modules that each ran independently before they were connected.`,
        takeaways: [
          "First automation formula: one trigger + one transformation + one useful output",
          "If you can't describe it in one sentence, it's too ambitious",
          "Get something running before optimizing — running and wrong beats planned and perfect",
          "Simple email parser is the ideal first build for most people",
          "Time to finish is the most important metric for your first project",
        ],
      },
    ],
  },
  {
    num: "02", title: "Your AI Foundation",
    lessons: [
      {
        id: "2-1", title: "Setting up your environment — Python, APIs, keys, .env files",
        duration: "13 min", format: "Screen share",
        notes: `Every tool in this course runs on the same foundation: Python, a virtual environment, a .env file, and at least one API key. This lesson gets that foundation in place and establishes habits that will save you from the two most common beginner mistakes: accidentally committing API keys to git, and fighting dependency conflicts between projects.

Install Python 3.11 or later. On Windows, use the official installer from python.org — not the Microsoft Store version, which has path issues. During installation, check "Add Python to PATH." Verify the install with python --version in your terminal. If you get a version number, you're good. If you get an error, the PATH wasn't set correctly — fix that before moving on.

Virtual environments are non-negotiable. Every project you build gets its own virtual environment. The reason: Python packages conflict. If one project needs requests version 2.28 and another needs 2.31, without a virtual environment they'll fight and one of them will break. With a virtual environment, each project has its own isolated set of packages. Create one with python -m venv venv inside your project folder, and activate it with venv\\Scripts\\activate on Windows. You'll see (venv) in your terminal prompt. This means you're working inside the virtual environment and any pip install commands will install to this project only.

The .env file is where API keys live. Never put an API key directly in your code — it will end up in git, in a screenshot, in a Slack message, somewhere it shouldn't be. Create a file named .env in your project root, add it to your .gitignore immediately, and put your keys in there: ANTHROPIC_API_KEY=sk-ant-your-key-here. In your Python code, use python-dotenv to load it: from dotenv import load_dotenv; load_dotenv(), then os.getenv("ANTHROPIC_API_KEY"). Every tool in this course uses this exact pattern.

Walk through the Claude API and OpenAI API dashboards side by side. How to create an API key, how to set a spending limit (always set a spending limit on a new key), how to check your usage. The Claude API pricing as of early 2026: claude-sonnet-4-6 at $3 per million input tokens and $15 per million output tokens. For most automation tasks — email triage, lead scoring, commentary generation — a month of usage costs between $5 and $20. The tools in this course will not run up your API bill unless you're processing thousands of items per day.

Your project structure should look like this every time: a root directory with venv/, .env, .gitignore, requirements.txt, and your Python files. Run pip freeze > requirements.txt periodically so you have a record of exactly what versions you're running. When something breaks three months from now, that file is how you figure out what changed.`,
        takeaways: [
          "Use python.org installer, not Microsoft Store — check 'Add to PATH'",
          "Every project gets its own virtual environment — no exceptions",
          "API keys live in .env, loaded with python-dotenv, never hardcoded",
          "Add .env to .gitignore before you write your first key",
          "Set a spending limit on every new API key before using it",
        ],
      },
      {
        id: "2-2", title: "Your first AI call — prompting basics and output handling",
        duration: "12 min", format: "Screen share",
        notes: `The gap between "I called the API" and "I built something useful" is almost entirely about prompting. Most people write their first prompt like they're talking to a search engine: vague, short, and without structure. Then they get vague output and assume the model isn't capable. The model is almost always capable — the prompt is the problem.

Build a 20-line Python script that calls Claude with a useful prompt and does something with the response. The structure is always the same: import anthropic, initialize the client with your API key, create a message with a system prompt and a user message, print the response. The system prompt is the most important part — it sets the context for everything the model does in this conversation. A good system prompt tells Claude what role it's playing, what format to use for responses, and what constraints to work within.

The most important concept in this lesson is JSON output. When you're building automation tools, you almost never want Claude to return free-form prose. You want structured data you can parse and act on. To force JSON output: tell Claude in the system prompt "Respond only in valid JSON with this exact structure: {}", use a specific schema, and add "Do not include any text outside the JSON object." Then in your Python code, parse the response with json.loads(). This turns Claude's output into a Python dictionary you can work with programmatically.

The difference between a vague prompt and a specific one is enormous. "Categorize this email" might return "This email appears to be a newsletter." That's not useful. "Analyze this email and return JSON with these fields: category (one of: urgent, reply_needed, receipt, newsletter, junk), priority (1-5), summary (one sentence), and requires_action (boolean)" returns something you can store in a database, display in a UI, or use to trigger other actions. The specificity of the prompt determines the usefulness of the output.

Cover temperature and max_tokens briefly. Temperature controls randomness — for structured output like JSON, use temperature=0 or 0.1 to get consistent, predictable responses. For creative tasks like writing commentary, use 0.7–0.9. Max tokens limits response length — for a short classification task, 500 tokens is plenty; for a full essay draft, 2000+. Setting max_tokens too low will truncate the response mid-sentence, which breaks JSON parsing. When in doubt, set it higher than you think you need and optimize later.

Error handling: API calls fail. Rate limits get hit, the network drops, the response comes back malformed. Wrap every API call in a try/except block and decide what to do when it fails — log it, retry it, skip it. The email bot retries twice with a 5-second sleep between attempts before giving up on a batch. The YouTube pipeline logs failures and continues with the next item. Neither behavior is "correct" — it depends on whether the failure is tolerable. What's never correct is letting an unhandled exception crash your entire script.`,
        takeaways: [
          "System prompt is the most important part of any AI call — don't skip it",
          "Force JSON output by specifying exact schema in the system prompt",
          "Use temperature=0 for structured/classification tasks, 0.7+ for creative tasks",
          "Always set max_tokens higher than you think you need",
          "Wrap every API call in try/except — API calls fail, and that's normal",
        ],
      },
      {
        id: "2-3", title: "Building reusable AI functions — don't copy-paste, build a module",
        duration: "12 min", format: "Screen share",
        notes: `The first time you write an API call it looks fine. The second time, you copy-paste it. The third time, you have the same bug in three places. By the fifth project, you're manually updating API call logic in a dozen files whenever something changes. The fix is to build an AI wrapper module once and import it everywhere. This lesson is about that module — and about the habit of building for reuse from the start.

The ai_engine.py pattern: create a single file that contains all your AI call logic. At minimum it has an init function that sets up the client, a function for simple single-message calls, a function for batch processing, and a config system for prompts. Every tool in this course imports from an ai_engine.py or equivalent. When Anthropic changes something about how their API works — and they do, fairly often — you update one file and all your tools get the fix.

Here's what the function signatures look like in practice. A simple call: def call_claude(system_prompt: str, user_message: str, max_tokens: int = 1024, temperature: float = 0) -> str. Returns the response text. A batch call: def analyze_batch(items: list[dict], prompt_template: str, max_tokens: int = 4096) -> list[dict]. Takes a list of items, a template prompt, and returns a list of processed results. This is the exact pattern used in the email bot's analyze_batch() function, which processes 10 emails at a time and returns a JSON array with one result per email.

Config-driven prompts are the other important pattern. Instead of hardcoding prompts as strings inside your functions, store them in a separate config structure — a dictionary, a YAML file, or a dataclass. This lets you tune prompts without touching the function logic, and it makes it easier to see all your prompts in one place. The email bot has a PROMPTS dictionary at the top of ai_engine.py with keys like "email_triage", "draft_reply", "coupon_extract". To change how the triage works, you edit the prompt, not the function.

Show a complete ai_engine.py that's general enough to use across different projects but specific enough to be useful: client initialization, a simple call function, a batch function, a JSON-forcing wrapper that retries on parse failure, and a prompts config section. This module is one of the templates in the resource pack — you'll start every new project by copying it in and customizing the prompts section.

The deeper principle here is: every time you build something for the second time, stop and build it as a module. Every time you write a function that does something general (makes an API call, reads from a database, formats data), ask whether this belongs in a shared utility file. This habit is what separates a collection of scripts from a codebase. By module 7, your projects will have clean separations between data access, AI logic, and orchestration — not because the course forces it, but because building the module habit early makes it the natural way to work.`,
        takeaways: [
          "Build ai_engine.py once and import it into every project — never copy-paste API calls",
          "analyze_batch() pattern: list of items in, list of results out, one AI call per batch",
          "Store prompts in a config structure, not hardcoded in function bodies",
          "Build a JSON-forcing wrapper that retries on parse failure",
          "The module habit is the difference between a collection of scripts and a codebase",
        ],
      },
    ],
  },
  {
    num: "03", title: "Email Automation",
    lessons: [
      {
        id: "3-1", title: "How I built my email bot — architecture walkthrough",
        duration: "13 min", format: "Camera + Screen",
        notes: `The email bot is the tool I use every day. It runs when I open my terminal in the morning, reads everything that came in overnight, categorizes each message, extracts any deals or coupons from promotional emails, and gives me a rich terminal interface for drafting replies. On a heavy email day, it handles 40 messages in about 90 seconds. Without it, that would take me 20 to 30 minutes of context-switching.

The architecture is five files: cli.py (the entry point, handles the terminal UI), gmail_client.py (handles all Gmail interaction: reading, replying, searching), ai_engine.py (the AI layer — all Claude calls go through here), db.py (SQLite for persistence: processed emails, sent drafts, extracted deals), and coupon_engine.py (domain-specific logic for extracting and deduplicating discount codes). Each file has one clear responsibility. Adding a new feature means editing at most two files.

The data flow is: cli.py calls gmail_client.py to fetch unread emails → passes them to ai_engine.analyze_batch() → stores results via db.py → renders them in the terminal UI. When you reply to an email, cli.py passes the reply text to gmail_client.reply(), which sets the correct headers and sends. When a promotional email contains a coupon, the coupon_engine extracts it, normalizes it (so "20% off" and "20 percent off" match as the same deal), and stores it with deduplication logic so you don't see the same deal twice.

The terminal UI uses the rich library — colored panels, tables, and progress bars in the terminal. This is not strictly necessary for the bot to function, but it makes it actually pleasant to use. The category colors map to urgency: red for urgent, yellow for reply_needed, blue for receipt, gray for newsletter/junk. You can see at a glance what needs attention before reading a single email. The numbered shortcuts let you type a number to act on an email without moving your hands to a mouse.

The most important architectural decision was batching. Instead of calling Claude once per email, the bot sends up to 10 emails per API call. Claude's context window is large enough to analyze 10 emails simultaneously and return a JSON array with one result per email. This cuts API costs by roughly 80% compared to individual calls and makes the whole process faster. The analyze_batch() function in ai_engine.py constructs a single prompt that includes all 10 emails and instructs Claude to return an array with id, category, priority, summary, and draft fields for each one.`,
        takeaways: [
          "Five-file architecture: cli, gmail_client, ai_engine, db, coupon_engine — one responsibility each",
          "Data flow: fetch → analyze_batch → store → render — linear and predictable",
          "Batch 10 emails per API call to cut costs ~80% vs individual calls",
          "rich library for terminal UI — colored output and numbered shortcuts",
          "Coupon normalization: standardize before deduplication to catch 'same deal, different words'",
        ],
      },
      {
        id: "3-2", title: "Connecting to Gmail — OAuth setup, IMAP, reading emails with Python",
        duration: "14 min", format: "Screen share",
        notes: `Connecting to Gmail is the part everyone dreads and then realizes isn't that bad. There are two approaches: Gmail API with OAuth2, and IMAP with an app password. The email bot uses IMAP because it's simpler for a personal tool where you're the only user. OAuth2 is the right choice if you're building something multi-user. For your own tools, IMAP with an app password is faster to set up and easier to maintain.

To get an app password: go to your Google Account settings, search for "App passwords" (it's under Security → 2-Step Verification → App passwords at the bottom), create one for "Mail" on "Windows Computer" (or whatever device), and save the 16-character password. This password goes in your config.yaml or .env file. You never use your main Gmail password in code — if the script ever gets compromised, you revoke just this app password and your account is fine.

The IMAP connection in gmail_client.py: import imaplib, connect to imap.gmail.com on port 993 with SSL, log in with your email and app password, select the INBOX folder. The fetch_unread() function searches for UNSEEN messages since a given date — the "since" parameter defaults to today, but the function has a fallback that searches the last 24 hours if no messages are found today. This handles edge cases like running the bot at 11:58 PM and having most of the day's messages be technically from "yesterday."

Email parsing is where it gets messy. Raw emails are MIME-encoded, meaning the body might be plain text, HTML, or a multipart message with both. The _extract_body() function in gmail_client.py handles this: it walks the MIME parts, prefers plain text over HTML when both are available, and caps the extracted body at 6,000 characters. The cap is important — some emails have 50,000 characters of HTML for a one-sentence message. Passing that to Claude wastes tokens and adds noise. 6,000 characters is enough to get the full content of any real email.

The reply() function sets the In-Reply-To and References headers correctly so the reply threads properly in Gmail. This is the detail that most tutorials miss — if you just send an email with the same subject line but without these headers, it shows up as a new thread instead of a reply. One line each: msg["In-Reply-To"] = original_message_id and msg["References"] = original_message_id. Get them from the original email's Message-ID header.

Threading, encoding, and unicode are the hidden complexity in email. Python's email library handles most of it, but you'll hit cases where subject lines are encoded in base64 or quoted-printable, or where the body is in a non-UTF8 encoding. The gmail_client.py handles these with decode_header() and a try/except around the decode step with a fallback to latin-1. These are not interesting problems — they're just things you have to handle.`,
        takeaways: [
          "Use IMAP + app password for personal tools; OAuth2 for multi-user apps",
          "App passwords are in Google Account → Security → 2-Step Verification → App passwords",
          "fetch_unread() with today_fallback handles the midnight edge case cleanly",
          "_extract_body() caps at 6,000 chars — enough for any real email, avoids token waste",
          "Set In-Reply-To and References headers or your reply won't thread correctly",
        ],
      },
      {
        id: "3-3", title: "AI-powered triage — categorize and prioritize with Claude",
        duration: "12 min", format: "Screen share",
        notes: `The triage layer is the core value of the email bot. Everything else — the UI, the database, the coupon extraction — is scaffolding around this single function: take a batch of raw emails, pass them through Claude, get back structured data about each one. Building this well means understanding how to write prompts that produce consistent, parseable output at scale.

The analyze_batch() function in ai_engine.py constructs a prompt that includes all emails in the batch, each labeled with an index. The system prompt tells Claude to act as an email classifier and return a JSON array where each element has id (matching the email's index), category, priority, summary, and draft. The category options are defined in the prompt: urgent (needs response today), reply_needed (needs response but not today), receipt (order confirmation, shipping notification), newsletter (marketing content), junk (spam or completely irrelevant). These categories match my actual use case — your first customization will probably be adjusting them to match yours.

The priority score from 1 to 5 is separate from category because they don't always correlate. A newsletter can technically have priority 5 if it's announcing something time-sensitive. An email that's reply_needed might only be priority 2 if the deadline is two weeks away. Storing both lets you sort by priority × category instead of just one or the other.

The summary field is one sentence — Claude enforces this because the prompt says "one sentence." This forces it to extract the single most important piece of information from the email. For a newsletter, it's the main topic. For a reply_needed email, it's the specific question being asked. Having a one-sentence summary for every email means you can review 40 messages in 30 seconds by reading 40 sentences, instead of opening each one.

The draft field is a suggested reply. The prompt instructs Claude to generate a reply only if the email is in the urgent or reply_needed categories, and to return null for all others. The draft is not sent automatically — it goes to a review queue where you can accept it as-is, edit it, or write your own. This is the correct default for email automation: AI drafts, human approves. Full auto-send is possible, and the code supports it, but the risk of sending something wrong outweighs the time saved by not reviewing.

SQLite storage: after analyze_batch() returns, each result gets written to the processed_emails table with the email ID, category, priority, summary, draft text, timestamp, and a sent boolean. This lets you query your email history — "show me all urgent emails from last month," "what's my average response rate on reply_needed emails" — and makes the bot stateful across sessions so it doesn't re-process emails it's already seen.`,
        takeaways: [
          "One batch call for 10 emails: include index labels so Claude can return per-email results",
          "Category + priority are separate fields — they don't always correlate",
          "Force one-sentence summaries in the prompt — it forces better extraction",
          "Draft field returns null for non-actionable categories — don't draft what doesn't need a reply",
          "SQLite makes the bot stateful: track what's been processed, enable historical queries",
        ],
      },
      {
        id: "3-4", title: "Auto-drafting responses — generating replies you actually send",
        duration: "11 min", format: "Camera + Screen",
        notes: `Generating a draft is easy. Generating a draft that sounds like you, matches your tone, and doesn't need to be rewritten is the hard part. The difference is entirely in how you write the drafting prompt. This lesson is about the craft of prompting for output that you'll actually use, not output that you have to fix before using.

The drafting prompt has three sections: identity (who you are and how you communicate), context (the email being replied to, plus any relevant background), and constraints (length, format, what to include or exclude). The identity section is where most people underinvest. "Write a professional reply" produces generic corporate language. "Write a reply in the voice of an 18-year-old founder — direct, friendly, no fluff, no corporate phrases, maximum three sentences unless the question requires more" produces something that actually sounds like me.

Context matters because Claude has no memory of your history with this person. If you've been trading emails with someone for a month, the draft shouldn't read like a cold introduction. The fix is to include a brief context note in the prompt: "This is an ongoing project conversation. The prior context is: [brief summary]." For most emails, no additional context is needed — the email itself has enough. For anything more nuanced, spending ten seconds adding context to the prompt saves you several minutes of rewriting the draft.

The coupon extraction feature in the email bot is a domain-specific extension of the drafting pattern. Instead of drafting a reply, the coupon_engine.py asks Claude to extract structured coupon data from promotional emails: store name, discount type, discount value, code, expiration date. The system prompt includes examples of the output format to make the extraction more reliable. The results go through a normalization function that converts "20% off" and "20 percent off" and "twenty percent discount" to the same canonical form before storing, so get_best_deals_by_store() can deduplicate correctly.

The review interface in cli.py deserves mention here. When you're shown a draft, your options are: accept it (sends immediately), edit it (opens the draft in an edit mode where you type and end with a period on its own line), skip it (moves to the next email), or write your own. The numbered shortcuts mean the entire inbox review flow — read, triage, draft, send — can be done without a mouse. This is a design choice that makes the tool faster to use in practice, not just more functional in theory.`,
        takeaways: [
          "Identity + context + constraints in every drafting prompt",
          "Be specific about voice: 'direct, friendly, no fluff, max three sentences' beats 'professional'",
          "Add brief context notes for ongoing conversations — Claude has no memory by default",
          "Coupon extraction uses the same pattern: structured prompt → JSON output → normalize → store",
          "Design for speed of review, not just automation — keyboard shortcuts beat mouse",
        ],
      },
    ],
  },
  {
    num: "04", title: "Content Automation Pipelines",
    lessons: [
      {
        id: "4-1", title: "My YouTube pipeline — how it runs without me",
        duration: "14 min", format: "Camera + Screen",
        notes: `The YouTube pipeline is the most complex tool in this course and the one that makes the strongest case for what automation can do. It runs three times per day, every day, without any manual input. Each run produces a complete YouTube video: downloaded from a source, processed into clips, given AI commentary and a title, assembled with captions and a thumbnail, and uploaded to a channel. The channel earns AdSense revenue. I haven't manually edited a video for this channel since the pipeline launched.

The architecture is a five-step orchestrator: download → commentary → captions → assemble → upload. Each step is a separate function. The orchestrator in main.py runs them in sequence, checks the result of each step before proceeding, and handles failures by logging them and skipping to the next item in the queue rather than crashing. The pipeline is designed to be interruptible and resumable: if it crashes halfway through step 3, the next run picks up where it left off because it checks the clips/ready/ and clips/pending/ directories to determine what work has already been done.

Config is in a YAML file: source channels to pull from, number of clips per run, target channel credentials, commentary style and voice settings, thumbnail template parameters. Each channel I run has its own config file. Adding a new channel is a matter of copying the config template, filling in the credentials and style settings, and pointing the pipeline at the new config. The code itself doesn't change.

Scheduling on Windows uses Task Scheduler. The pipeline runs at 7 AM, 1 PM, and 7 PM via three scheduled tasks pointing at the same entry script. Each run is independent — it doesn't know or care what the other runs did. If the 7 AM run fails completely, the 1 PM run still runs. This is a design choice: stateless runs are more reliable than stateful ones because there's less to go wrong.

The revenue reality: a content automation channel like this earns based on view count and RPM, which varies by niche. The pipeline itself doesn't guarantee views — it handles production volume. The skill is in picking a niche with decent RPM and setting up the commentary style to be genuinely watchable. The automation handles the ceiling of what's manually possible (you can only produce so many videos per day yourself); your judgment determines the floor of quality. Both matter.`,
        takeaways: [
          "Five-step orchestrator: download → commentary → captions → assemble → upload",
          "Interruptible design: check output directories at startup to resume from where you stopped",
          "YAML config per channel: content, style, credentials — code never changes between channels",
          "Stateless runs: each scheduled run is independent, failures don't cascade",
          "Automation handles production ceiling; your judgment handles quality floor — both matter",
        ],
      },
      {
        id: "4-2", title: "Downloading, transcribing, and clipping — yt-dlp + Whisper",
        duration: "13 min", format: "Screen share",
        notes: `yt-dlp is the backbone of the download step. It handles YouTube, Vimeo, Twitter, and dozens of other platforms, manages rate limiting, handles age-gated content with proper cookies, and supports downloading specific quality levels. For the pipeline, we want 1080p video with the best available audio, and we want them downloaded into the clips/pending/ directory with predictable filenames.

Install yt-dlp with pip. The key parameters for pipeline use: --format "bestvideo[height<=1080]+bestaudio/best[height<=1080]" for quality, --output for the destination filename pattern, --no-playlist to prevent accidentally downloading entire playlists when you just want one video, and --cookies-from-browser chrome if you need to access content that requires being logged in. The cookies option reads your browser's saved cookies, which handles age gates and region restrictions without needing to manage session files manually.

Whisper is OpenAI's speech recognition model. The local version (via the whisper Python package) is free, runs on CPU, and is accurate enough for most content. For faster transcription, use whisper-large on a GPU if you have one. For the pipeline, whisper-base is usually sufficient — the transcription is used to generate commentary prompts and chapter markers, not for captioning (that step comes later with a different approach). Run: import whisper; model = whisper.load_model("base"); result = model.transcribe("audio.mp3"). The result includes segments with timestamps, which is what you need for clip selection.

Clip selection logic: take the transcript segments, group them into candidate clips of target length (30–90 seconds works well for YouTube), and score each candidate based on energy signals in the transcript — question marks, exclamation points, quotations, named entities, and high word density per second indicate more interesting content. The scoring is heuristic and imperfect, but "imperfect automated selection" is still faster than manual selection at scale.

The clips/ready/ and clips/pending/ directories are the handoff between the download step and the commentary step. A clip in clips/pending/ has been selected and extracted but not yet processed. A clip in clips/ready/ has commentary and is waiting for assembly. This directory-based state management is crude but robust: you can inspect it with a file browser, manually move files between states, and the pipeline handles whatever state it finds on startup.`,
        takeaways: [
          "yt-dlp: --format for quality, --no-playlist to avoid accidental full downloads, --cookies-from-browser for gated content",
          "Whisper-base is sufficient for commentary generation; save whisper-large for caption accuracy",
          "Transcript segments with timestamps are the raw material for clip selection",
          "Score clips by engagement signals: question marks, exclamations, dense word rate",
          "Directory-based state (pending/ready) is crude but inspectable and robust",
        ],
      },
      {
        id: "4-3", title: "AI commentary and titling — adding your voice at scale",
        duration: "13 min", format: "Screen share",
        notes: `This is the step that determines whether a content automation channel is watchable or garbage. The commentary prompt defines the entire persona of the channel — and because you're generating hundreds of pieces of content with it, every weakness in the prompt gets amplified. Getting this prompt right is worth spending an hour on before you run the pipeline for the first time.

A well-written commentary prompt has four components: persona (who is delivering the commentary and what is their perspective), style (how they speak — formal/casual, short/verbose, opinionated/neutral), topic instructions (what to focus on, what to avoid, how to handle specific types of content), and format instructions (length, structure, whether to include a hook, how to end). For a commentary channel, the persona might be "a sharp, opinionated observer who cuts through hype and gives the real take in plain language." For a recap channel, it might be "a knowledgeable friend who's already seen everything and is catching you up efficiently."

The title generation prompt is separate from the commentary prompt because they optimize for different things. Commentary is optimized for engagement and retention. Titles are optimized for click-through rate, which means different vocabulary, different length, and sometimes a different tone. Write title generation as its own function that takes the transcript and the generated commentary as inputs, and produces five candidate titles with a recommended one. Let the pipeline pick the recommended one automatically, but keep the alternatives for A/B testing if you want to run it.

Maintaining a consistent tone across 100 AI-generated scripts is harder than it sounds. The naive approach — same system prompt every time — drifts over time as different source content pulls the commentary in different directions. The fix is a tone calibration document: 3–5 examples of commentary in the exact voice you want, stored in your config, injected into every prompt as examples. Claude's few-shot learning is reliable enough that three good examples will hold the tone through most content types.

The description and tags generation follows the same pattern as titles. One prompt, three outputs. Keep them all in the same API call by asking Claude to return a JSON object with commentary, title, description, and tags fields. One call per video, not four. The cost difference is minimal, but the organizational simplicity is worth it: everything about a video comes from one place and one function call.`,
        takeaways: [
          "Commentary prompt = persona + style + topic instructions + format instructions",
          "Title and commentary prompts are separate — they optimize for different things",
          "Tone calibration document: 3–5 examples in your target voice, injected as few-shot examples",
          "One API call per video: return commentary, title, description, and tags as one JSON object",
          "Spend an hour getting the commentary prompt right before running at scale — every flaw multiplies",
        ],
      },
      {
        id: "4-4", title: "Video assembly, thumbnails, and uploading — MoviePy + YouTube API",
        duration: "13 min", format: "Screen share",
        notes: `MoviePy is the Python library that assembles the final video. It handles concatenation, audio mixing, subtitle overlays, and basic compositing. It's not as fast as FFmpeg directly, but it's significantly easier to script and debug. For the pipeline, MoviePy handles the actual video construction; FFmpeg is available as a fallback for operations MoviePy doesn't support well.

The assembly step takes the selected clips, the generated commentary as a voiceover script (if using text-to-speech), and the SRT captions file. The SRT file is generated from Whisper's timestamped output using a simple formatter that converts Whisper's segment format to the SRT timestamp format. MoviePy's SubtitlesClip takes the SRT file and overlays it on the video. Styling the subtitles — font, size, position, color, outline — is done through MoviePy's TextClip parameters.

Thumbnail generation uses Pillow. The pipeline has a thumbnail template: a background image (usually a frame from the video selected by the highest motion moment), a text overlay with the title, and a logo or branding element. Pillow draws text with ImageDraw.text(), handles font loading via ImageFont.truetype(), and composites layers with Image.paste() using an alpha mask for the logo. The template parameters come from the channel config: brand color, font file path, text position, and logo path. One template covers all videos on a channel; changing the look of a channel is a matter of updating the template config.

The YouTube Data API upload is straightforward once you have OAuth2 credentials set up. The googleapiclient library handles the API calls. The key steps: load your credentials from a token JSON file (the same OAuth2 flow as Gmail but with different scopes), create the video metadata dictionary (title, description, tags, category, made-for-kids flag, privacy status), and call youtube.videos().insert() with the metadata and the video file as a resumable upload. Set privacy to "public" only after you've verified that the content and metadata are correct — it's much easier to fix a private video before anyone has seen it.

Putting the full pipeline together: the main.py orchestrator calls each step in sequence, passing the output of one step as the input to the next. Each step returns either the path to its output file or raises an exception. The orchestrator catches exceptions, logs them with enough context to diagnose the issue (which file, which step, what the exception was), and continues with the next item in the queue. A single video failing doesn't stop the rest of the run — that's the reliability property that makes running three times per day sustainable.`,
        takeaways: [
          "MoviePy for assembly: concatenation, audio mixing, SubtitlesClip for SRT overlays",
          "SRT from Whisper: format segment timestamps into the SRT timestamp spec",
          "Pillow thumbnails: frame selection + text overlay + logo composite from a template config",
          "YouTube API: OAuth2 scopes, resumable upload, always start private and verify before publishing",
          "Orchestrator catches per-video exceptions and continues — one failure never stops the whole run",
        ],
      },
    ],
  },
  {
    num: "05", title: "Scraping & Lead Generation",
    lessons: [
      {
        id: "5-1", title: "Web scraping fundamentals — Craigslist, Nextdoor, and public data",
        duration: "13 min", format: "Screen share",
        notes: `AutoBlade is the scraper I use for Purcell Works. It monitors four Atlanta zip codes (30101, 30144, 30152, 30106) for service job postings on Craigslist that match a set of seven keywords: gutter, gutters, gutter cleaning, pressure washing, lawn care, landscaping, yard work. Each time it runs, it finds new postings, filters out spam, deduplicates against what it's already seen, and exports the remaining leads to a Google Sheet.

Craigslist is anti-scraping but predictable. The search results page for a given zip code and category loads as HTML. Each result is a div with the class cl-search-result. The title, price, and posting link are all inside that div. Selenium with WebDriverWait is the most reliable approach: load the page, wait for the cl-search-result elements to appear (5-second timeout), then extract. Requests + BeautifulSoup works sometimes, but Craigslist aggressively blocks requests without proper browser headers and cookies. Selenium handles this by running an actual browser.

The spam filter is a list of 35 phrases that appear in low-quality or off-topic postings. Things like "no experience needed," "work from home," "hiring immediately," "MLM," "commission only." Any posting that contains one of these phrases in the title or description gets filtered out before it reaches the export. This filter reduces the volume of leads by about 60% while retaining almost all the genuine ones. Your spam filter will be different — build it by looking at the noise in your actual results and adding phrases you see repeatedly.

SHA256 job IDs: each posting gets a unique ID generated from a hash of the posting URL and the posting date. This lets the scraper check whether a posting has already been seen without storing the full URL or querying Craigslist again. The deduplication check is a simple set lookup against a SQLite table of seen IDs. A new run only exports postings whose SHA256 ID is not in the seen set, then adds all new IDs to the seen set.

gspread for Google Sheets export: authenticate with a service account (a separate Google Cloud credential that can write to specific sheets without your personal Google account), get the target spreadsheet by ID, append rows to the first sheet. The row format is: date found, title, price, location, link, category, keyword matched. The sheet becomes a CRM for leads — you work it manually, add notes columns, color-code statuses. The automation handles finding and deduplicating; you handle deciding which leads to pursue.`,
        takeaways: [
          "Selenium + WebDriverWait for Craigslist — requests gets blocked without proper browser context",
          "Wait for div.cl-search-result elements with a 5-second timeout",
          "Spam filter: 35 phrases reduces noise by 60% without losing real leads",
          "SHA256 job IDs: hash(url + date) for deduplication without storing full URLs",
          "gspread + service account for Sheets export — the sheet becomes your working CRM",
        ],
      },
      {
        id: "5-2", title: "The Places API approach — finding businesses that need help",
        duration: "13 min", format: "Screen share",
        notes: `The Google Places lead gen system works differently from AutoBlade. Instead of scanning job posting boards, it identifies businesses that exist and are missing something — specifically, businesses with incomplete online presence. A restaurant with no website, a salon with no hours listed on Google, a contractor with under 10 reviews. These are people who clearly need what Purcell Ventures offers, and they're easy to find systematically.

The Places API textsearch endpoint takes a query and a location (lat/lng + radius), and returns a list of businesses with their Places data: name, address, phone number, website, opening hours, reviews, rating, user_ratings_total. Run a search for "restaurant near [zip code]" and you get back 20 businesses per page, up to 60 per query. Run queries for different business types — restaurants, salons, contractors, retail — and you build a large pool of local businesses.

The scoring algorithm runs on each result. A business scores higher the more things it's missing: no website (+3 points), no phone listed (+2), zero reviews (+3), fewer than 10 reviews (+2), no hours listed (+2), low average rating below 3.5 (+1). The total score is the "opportunity score" — higher means more room for improvement. Sort the results by score, and the top 20 businesses are your most qualified leads: they provably need help, and you can show them exactly what they're missing.

Export the scored list to Google Sheets via gspread. Include the score, each component of the score, the business contact info, and a notes column. When you call a prospect, you already know their specific gap — "I noticed your business doesn't have a website listed on Google, and you have zero reviews" is a much stronger opening than a generic pitch. The automation makes that research free and instant instead of something you spend an hour doing before each call.

The Places API costs $17 per 1,000 requests with a $200 monthly free credit. Running the scraper once a week costs about $3. The cost scales linearly with how many queries you run. For a local service business targeting one metro area, the free tier is more than sufficient — you'll exhaust your leads before you exhaust your credits.`,
        takeaways: [
          "Places textsearch: query + lat/lng + radius → business list with presence data",
          "Opportunity scoring: no website (+3), no phone (+2), zero reviews (+3), no hours (+2)",
          "Sort by opportunity score — top 20 are your best leads",
          "Specific gaps in the export make every sales call more targeted",
          "Places API: $200/month free credit — local targeting is essentially free",
        ],
      },
      {
        id: "5-3", title: "Making scrapers smart — AI filtering and scoring",
        duration: "12 min", format: "Camera + Screen",
        notes: `Raw scraped data is noisy. Even with a well-tuned spam filter, Craigslist results include irrelevant postings that match your keywords but aren't real leads. Even with the Places scoring algorithm, some high-scoring businesses are already well-served. The AI layer is the cleanup pass that catches what rules-based filtering misses.

The pattern is the same as email triage: pass a batch of raw results to Claude, ask it to score or filter or extract structured data, get back a cleaned list. For Craigslist leads, the prompt asks Claude to rate each posting's genuine likelihood of being a real job (not spam, not already filled, not a recurring ad from a large company). For Places leads, it asks Claude to identify businesses that seem to have an existing digital agency or obvious disinterest in getting online, so you're not cold-calling a franchise or a business that has clearly chosen not to have a website.

Prompt engineering for filtering is different from prompt engineering for generation. You're asking for judgment, not creation. The best structure: give Claude the criteria for a good lead versus a bad lead (explicit, with examples), pass the batch as a numbered list, and ask it to return a JSON array with each item's original index and a quality score from 1 to 5 with a one-sentence reason. The reason field is important — it tells you why Claude rated something low, which lets you validate the filter and tune the criteria over time.

Rate limiting and anti-bot detection are the practical concerns that most tutorials ignore. Craigslist will temporarily block your IP if you make requests too fast. The fix: add random sleep intervals between page loads (2–5 seconds, random), rotate your User-Agent string between requests, and if you're running searches across multiple zip codes, add a longer pause (10–15 seconds) between city-level searches. These aren't ways to be sneaky — they're ways to be a respectful automated visitor that doesn't hammer the server.

Export formats matter for how usable the output is. SQLite is the right storage for deduplication and history. CSV is the right export for one-time analysis or sharing with someone else. Google Sheets is right for a living document you'll work from every week. The Google Places script exports to Sheets because it's meant to be a working prospect list. The Craigslist scraper uses SQLite because the deduplication logic requires querying history. Neither is universally better — pick the format based on what you do with the data after.`,
        takeaways: [
          "AI filtering pass: batch results, ask for quality scores + reasons, not just pass/fail",
          "One-sentence reason per filtered item lets you validate and tune the filter over time",
          "Rate limiting: 2–5 second random sleep between requests, 10–15 second pause between cities",
          "Rotate User-Agent strings to reduce blocking without hiding your intent",
          "Storage format follows use case: SQLite for dedup/history, Sheets for living working lists",
        ],
      },
    ],
  },
  {
    num: "06", title: "Personal AI Assistants",
    lessons: [
      {
        id: "6-1", title: "How I built ElijahBot — a personal AI with memory, voice, and screen vision",
        duration: "14 min", format: "Camera + Screen",
        notes: `ElijahBot is the most personal tool in this course — it's built specifically to match how I think and how I work. It's an Electron app that sits on my desktop as an overlay: always visible, always listening, always ready to help without context-switching. I can ask it about what's on my screen, give it a slash command to do something specific, or just have a conversation while I'm working. It replaced five browser tabs, a voice memo app, and two productivity apps.

The architecture: Electron handles the desktop overlay, HTML/CSS/JS handles the UI, Web Speech API handles voice input (browser-native, no external service), ElevenLabs handles voice output (text-to-speech with a natural-sounding voice), Claude API handles all reasoning and responses, and a local JSON file handles conversation history and memory. The screen capture feature uses Electron's desktopCapturer API, which takes a screenshot and converts it to base64 for passing to Claude's vision capabilities.

The slash commands system is what makes it feel like a purpose-built tool rather than a generic chatbot. /summarize takes the clipboard contents and returns a concise summary. /email drafts an email based on a prompt. /todo extracts action items from a paste of text. /research does a quick background synthesis on a topic. Each slash command is a different system prompt and sometimes a different Claude model — quick summarization uses haiku, deeper research uses sonnet. The architecture makes it easy to add new commands by adding a new entry to the commands config.

The particle effects HUD is not functional — it's purely aesthetic. ElijahBot has an animated particle overlay that reacts to voice input and AI processing states. Particles move faster when voice is detected, cluster when Claude is thinking, and disperse on response. This sounds frivolous, but it actually makes the tool feel more alive and easier to use. The UI isn't just a text box. When you're working with a tool for hours every day, whether it feels pleasant matters.

The deeper point about personal AI tools: the best ones are deeply specific to the person who built them. A general-purpose AI assistant is less useful than one calibrated to your exact voice, your exact workflow, your exact slash commands. The investment in building something this personal pays back every day you use it. ElijahBot took about two weeks to build and has saved me more than that in time already. The willingness to build the personalized version instead of settling for the generic one is what separates people who get leverage from AI from people who just use it occasionally.`,
        takeaways: [
          "Electron overlay: always visible, no context-switch, Electron desktopCapturer for screen vision",
          "Web Speech API for voice input (browser-native, free), ElevenLabs for voice output",
          "Slash commands: different system prompt per command, different model for speed vs quality tradeoffs",
          "Particle HUD is aesthetic, not functional — but daily tools need to feel good to use",
          "Deep personalization is the multiplier — a generic assistant is less valuable than a calibrated one",
        ],
      },
      {
        id: "6-2", title: "Persistent memory and context — making your AI remember you",
        duration: "13 min", format: "Screen share",
        notes: `The core limitation of all current AI APIs is statelessness. Every conversation starts fresh. Claude doesn't remember that you prefer direct answers, or that you're building a tool in Python, or that you asked about the same topic yesterday. For a one-off task, this is fine. For a daily AI tool you work with for hours, it's a constant friction — you're re-explaining yourself every session.

Three approaches to persistent memory, ordered by complexity. The simplest: a structured context file that gets prepended to every prompt. This is a plain text or JSON file that contains persistent facts about you — your preferences, your active projects, your communication style, your frequently-used tools. Before every Claude call, you prepend this context to the system prompt. Simple, reliable, fully under your control. ElijahBot uses this approach. The context file is about 800 tokens and updates when you explicitly tell the bot to remember something.

The second approach: conversation history injection. Keep a local log of your past N conversations (N = 20 is usually enough without blowing up the context window), and inject the most relevant ones at the start of each new session. "Relevant" can be as simple as time-based (most recent conversations first) or more sophisticated (vector similarity to the current topic). This gives the bot access to what you were discussing recently without requiring you to manually update a context file.

The third approach: vector storage with semantic search. Embed your past conversations and store them in a local vector database (Chroma is the simplest option). When a new conversation starts, retrieve the most semantically similar past conversations and inject them as context. This is the most powerful approach and the most complex. For most personal tools, approach one or two is sufficient. Build approach three if you're building a tool that needs to recall specific things from a large history.

Token budget management: context is not free. The more history you inject, the more tokens you burn on every call. Claude sonnet-4-6 has a 200,000 token context window, which is enormous — but at scale, injecting too much history adds real cost. The discipline is to inject only what's relevant: your persistent preferences always, recent conversation always, specific past conversations only if they're directly relevant to the current question.

The memory write pattern: when you want to save something explicitly, tell the bot "remember this." A simple function parses the command, extracts the fact to remember, and appends it to the context file. The fact gets a timestamp and a category tag (preference, project, fact) so you can review and clean up the context file periodically. This is more manageable than letting the memory grow unboundedly.`,
        takeaways: [
          "Three memory approaches: context file (simplest), conversation history injection, vector retrieval (most powerful)",
          "Structured context file: persistent preferences + active projects, prepended to every prompt",
          "Inject only relevant history — context tokens cost money at scale",
          "'Remember this' command: parse, extract, timestamp, categorize, append to context file",
          "For most personal tools, approaches 1 or 2 are sufficient — build approach 3 only if needed",
        ],
      },
      {
        id: "6-3", title: "Voice input and output — ElevenLabs, Web Speech, and hands-free AI",
        duration: "11 min", format: "Screen share",
        notes: `Voice makes a tool fundamentally different from a text interface. When you can speak to your AI assistant and hear it respond, you can use it without breaking your visual focus. You can use it while your hands are doing something else. The latency of the interaction drops because speaking and listening are faster than typing and reading for many tasks. Voice is not just a feature addition — it changes the usage pattern of the tool entirely.

Web Speech API handles voice input. It's built into Chrome (and Electron, which runs Chromium). No external service, no API key, no cost. The pattern is simple: create a SpeechRecognition instance, set continuous to false (you want individual utterances, not a continuous stream), set interimResults to true if you want real-time display of what it's hearing, and listen for the result event. The result event fires when speech is detected and a transcription is ready. The final transcription is in event.results[0][0].transcript. This is the text that gets passed to Claude.

ElevenLabs handles voice output. The free tier gives you 10,000 characters per month — enough for light daily use but not for a pipeline that reads everything aloud. Voice selection matters for usability: pick a voice that feels natural for the type of interaction. ElevenLabs has voices optimized for conversational use (lower latency, slightly less natural) and voices optimized for quality (higher latency, more expressive). For an AI assistant that responds in real-time, latency is more important than expressiveness — pick the fastest voice that sounds acceptable.

The voice loop: speak → Web Speech API transcribes → pass to Claude → Claude returns text → ElevenLabs converts text to audio → play audio. The latency in this loop is mostly Claude's inference time (1–3 seconds) plus ElevenLabs' synthesis time (0.5–1 second). Web Speech transcription is near-instant. For most queries, you're waiting about 2–4 seconds from end of speech to start of response — acceptable for conversational use, but not fast enough for rapid back-and-forth.

When voice makes sense: when your hands are occupied, when the query is naturally expressed in speech (questions, commands, dictation), when the response is short enough to absorb by listening. When text makes sense: when you need to reference the response later, when the response has structure that benefits from visual formatting (code, lists, tables), when you need to copy-paste something from the response. Voice is a complement to text interfaces, not a replacement. ElijahBot supports both simultaneously — you can speak a command and read the response, or type a command and hear the response.`,
        takeaways: [
          "Web Speech API: built into Chromium/Electron, no API key, no cost, listen for the result event",
          "ElevenLabs: pick fastest acceptable voice for AI assistant use — latency beats expressiveness",
          "Voice loop latency: ~2–4 seconds total (Claude 1–3s + ElevenLabs 0.5–1s)",
          "Voice is for hands-occupied use and short queries; text is better for structured/referenceable output",
          "Support both simultaneously — modality selection should be user's choice, not tool's constraint",
        ],
      },
    ],
  },
  {
    num: "07", title: "Scheduling, Monitoring & Reliability",
    lessons: [
      {
        id: "7-1", title: "Running on schedule — Task Scheduler, cron, and the Python schedule library",
        duration: "13 min", format: "Screen share",
        notes: `An automation that only runs when you remember to run it is not really an automation — it's a fancy script. The whole point is that it runs without you. This lesson covers three approaches to scheduling, all of which I use for different tools, and the criteria for choosing between them.

Windows Task Scheduler is the right choice for tools that should run on a fixed schedule on your Windows machine. The YouTube pipeline runs three times per day via Task Scheduler tasks. Setup: open Task Scheduler, create a new Basic Task, set the trigger (daily at 7 AM, or on startup, or on a specific event), set the action (start a program — the Python executable from your virtual environment, with the script path as the argument, and the project directory as the start-in directory). The start-in directory is the detail most tutorials miss — without it, your script can't find its config files and .env because they're referenced by relative path.

The Python schedule library is better for scripts that run continuously rather than on a fixed trigger. If you have a script that should check for new emails every 10 minutes, running it via Task Scheduler means starting a new Python process every 10 minutes (startup overhead, multiple processes if one run takes longer than 10 minutes). Using schedule inside a continuously-running script means one process, no startup overhead, and clean handling of overlapping runs. The pattern is a while True loop with schedule.run_pending() and time.sleep(1). Add schedules with schedule.every(10).minutes.do(your_function).

cron (on WSL or a Linux server) is the right choice when you need more scheduling flexibility than Task Scheduler provides, or when you're deploying a tool to a server rather than running it on your desktop. Cron syntax is more flexible and more readable once you know it: * * * * * (minute hour day month weekday). The WSL approach lets you run cron on Windows without a server — useful for development. For production tools that need high reliability, a $5/month VPS (DigitalOcean, Hetzner, Linode) running cron is more reliable than relying on your desktop to always be on.

The practical question when choosing: is this tool desktop-dependent (needs your GPU, your local files, your browser session) or is it purely API-based? Desktop-dependent tools go on Task Scheduler or schedule. API-based tools can go anywhere — and putting them on a cheap server means they run even when your computer is off. The YouTube pipeline is desktop-dependent because it needs local storage for video files. The email bot could run on a server, but I keep it on my desktop because I want to review drafts in my terminal.`,
        takeaways: [
          "Task Scheduler: fixed schedule, Windows-native, always set start-in directory or relative paths break",
          "Python schedule library: better for continuous polling — one process, no startup overhead",
          "cron: most flexible syntax, best for server deployment or high-reliability requirements",
          "Rule: desktop-dependent tools stay on your machine; API-only tools can run on a $5/month VPS",
          "A script that only runs when you remember to run it is not automation",
        ],
      },
      {
        id: "7-2", title: "Error handling and monitoring — so things don't silently fail",
        duration: "12 min", format: "Screen share",
        notes: `The most dangerous failure mode in automation is not a crash — it's a silent failure. Your script runs, produces no errors, but also produces no useful output because something upstream changed. The Craigslist layout changed and the scraper is extracting empty strings. The YouTube API returned a quota error that got swallowed in a broad except clause. The email bot has been marking everything as junk for three days because a prompt update broke the JSON parsing. You don't find out until you notice the downstream effects.

Defensive parsing is the first line of defense. When you parse JSON from an API response, don't just json.loads() and trust the result. Check that the expected keys exist, that lists have the expected length, that values are in the expected range. When Claude returns a JSON array with one result per email, check that the array length matches the number of emails you sent. When a field that should be an integer comes back as a string, catch it and normalize it rather than letting it propagate.

Logging is the second line. Every tool should write to a log file: what it did, when, what it found, what it skipped, and any errors it encountered. Python's logging module handles this with almost no setup. Add this to every project's main.py: import logging; logging.basicConfig(filename='logs/pipeline.log', level=logging.INFO, format='%(asctime)s %(levelname)s %(message)s'). Then log with logging.info("Processed 12 emails, 3 flagged urgent") and logging.error("Batch failed: {e}"). The log file is what you read when something goes wrong — or when you want to know what the tool has been doing.

Telegram bot alerts are the third line and the one most people skip. A Telegram bot can send you a message when something breaks. The setup takes 10 minutes: create a bot via BotFather in Telegram, get the bot token, get your chat ID, and write a send_alert() function that posts to the Telegram Bot API. Call this function in your except clauses: send_alert(f"Email bot failed: {e}"). I've had the YouTube pipeline alert me at 7 AM that it failed to authenticate to the YouTube API because the OAuth token expired. Without the alert, I would have gone three days without uploads before noticing.

Retry logic for transient failures: API calls fail for reasons that have nothing to do with your code — rate limits, network hiccups, brief service outages. These should be retried, not treated as permanent failures. The pattern is exponential backoff: try once, wait 1 second, try again, wait 2 seconds, try again, wait 4 seconds, give up. Python's tenacity library handles this with a decorator: @retry(wait=wait_exponential(multiplier=1, min=1, max=10), stop=stop_after_attempt(3)). For API calls that have retry-after headers (many rate-limit responses include how long to wait), read that header and sleep exactly that long before retrying.`,
        takeaways: [
          "Silent failures are more dangerous than crashes — check output integrity, not just absence of exceptions",
          "Defensive parsing: verify array lengths, key existence, and value types before trusting API responses",
          "logging module: every tool gets a log file — it's the debugging record and the audit trail",
          "Telegram bot alerts: 10-minute setup, sends you a message when something breaks",
          "Exponential backoff with tenacity for transient API failures — rate limits and network drops are retryable",
        ],
      },
      {
        id: "7-3", title: "Config-driven systems — tools you can reuse and share",
        duration: "12 min", format: "Screen share",
        notes: `The difference between a script you ran once and a tool you run every day is config-driven design. When the logic and the configuration are mixed together in the same file, every change requires editing code. When they're separated, changing the behavior of a tool is a matter of editing a text file — no Python required. This makes tools more maintainable, more shareable, and easier to adapt to slightly different use cases.

YAML is the right format for config files. It's more readable than JSON (comments are supported, you don't need quotes around most strings), more structured than INI, and has solid Python support via the PyYAML library. A YAML config file for the YouTube pipeline looks like this: source_channels (list of YouTube channel IDs to pull from), clips_per_run (integer), commentary_style (string describing the voice and tone), voice_id (ElevenLabs voice ID), upload_target (YouTube channel credentials path). These parameters completely define the behavior of the pipeline without touching the Python code.

The config-loading pattern in Python: at the top of every entry script, load the config file (yaml.safe_load(open("config.yaml"))) and pass the config object to every function that needs it. Never import config values directly into utility functions — pass them as parameters. This makes functions testable in isolation and keeps the dependency direction clean: utility functions don't know about config, only the entry script does.

A CLI that reads config enables multiple use cases from the same codebase. The AutoBlade scraper takes a --config flag that points to a city-specific config file. Running python autoblade.py --config atlanta.yaml runs the Atlanta search with Atlanta zip codes and keywords. Running python autoblade.py --config savannah.yaml runs the same scraper with Savannah parameters. No code changes. Adding a new city is adding a new YAML file.

The project starter template in the resource pack applies this pattern: a root directory with main.py (entry point, loads config, orchestrates), config.yaml (all parameters), utils/ (shared utility functions), ai_engine.py (the AI wrapper from Module 2), logs/ (log output), .env (API keys), .gitignore, and requirements.txt. Fork this template for every new project. After a few months of building, you'll have a set of utility functions and patterns that work across all your tools — but only if you keep the architecture consistent.`,
        takeaways: [
          "Config-driven design: separate what a tool does (code) from how it's configured (YAML)",
          "YAML over JSON for config files: comments are supported, more readable",
          "Pass config as a parameter, don't import it directly into utility functions",
          "--config flag pattern enables multi-environment or multi-instance use of the same codebase",
          "Project starter template: main.py + config.yaml + utils/ + ai_engine.py + logs/ + .env",
        ],
      },
    ],
  },
  {
    num: "08", title: "Stack, Scale & What's Next",
    lessons: [
      {
        id: "8-1", title: "Your complete AI stack — assembling the pieces",
        duration: "13 min", format: "Camera + Screen",
        notes: `After seven modules, you have a set of tools and a set of patterns. This lesson is about how they fit together into a coherent personal AI stack — not a collection of scripts but a system that covers your most important automated workflows. The stack I run covers five domains: communication (email bot), content (YouTube pipeline), lead generation (AutoBlade + Places), intelligence (ElijahBot), and scholarship tracking (Scholarship Sniper). Each tool is independent, but they share infrastructure: the same ai_engine.py pattern, the same config structure, the same logging approach.

The "human hours saved" calculation: take each tool and estimate the hours per week it saves. Email bot: 8 hours per week (previously reviewing and drafting manually). YouTube pipeline: 5 hours per week (previously editing manually). AutoBlade: 3 hours per week (previously searching manually). Places lead gen: 2 hours per week (previously researching manually). Total: 18 hours per week. At a conservative $50/hour opportunity cost, that's $900/week of value. The stack took about three weeks to build. It paid for itself in time in under a month.

How to prioritize what to build next: go back to the stack audit from Module 1, look at the items that scored highest but weren't yet automated, and apply the same criteria from Module 1-3: single trigger, single transformation, useful output. The tools that fit that template most cleanly are the right next builds. Anything that still seems fuzzy or multi-step can be broken down further before building.

Architecture diagram for the full stack: each tool runs independently with its own schedule and its own config, but they share three things. First, the ai_engine.py module — maintained once, imported everywhere. Second, a shared logs/ directory on the machine, so you can tail all tool logs in one place. Third, Google Sheets as the common output format for anything lead-related — the email bot, the AutoBlade scraper, the Places lead gen all write to different sheets in the same Google Sheets file. This makes reviewing leads a single-tab operation.

The meta-skill this course builds is not Python and not the Claude API — it's the ability to look at any repetitive workflow and see the automation inside it. That skill compounds. Every tool you build makes the next one faster to build because you have more patterns, more code, and more intuition about where the complexity is. Six months from now, you'll be building things in an afternoon that would have taken you weeks when you started. The stack is never done. That's the point.`,
        takeaways: [
          "Coherent stack = tools that share infrastructure: same ai_engine, config structure, logging approach",
          "Calculate human hours saved × opportunity cost to measure the stack's real value",
          "Shared Google Sheets output: email bot + scrapers + lead gen all write to one file for unified review",
          "Architecture diagram shows three shared elements: ai_engine, logs/, Sheets — not the tools themselves",
          "The meta-skill is seeing the automation inside any repetitive workflow — it compounds with every build",
        ],
      },
      {
        id: "8-2", title: "Turning tools into products — from personal use to sellable thing",
        duration: "12 min", format: "Camera",
        notes: `Personal tools become products through one of three paths: you sell access to the tool (SaaS), you sell the knowledge of how to build it (course — which is what this is), or you sell the outcome the tool produces as a service (your time + the tool's leverage). The third path is the most underrated. Purcell Ventures' digital services division started as tools I built for myself — the website builder, the CRM template, the lead gen system. Clients pay for the outcome. The tool is my leverage for delivering that outcome faster and more reliably.

A personal tool becomes productizable when it has three properties: it solves a problem that more than one person has, its configuration is separable from its logic (so you can customize it per client without rewriting the code), and its inputs and outputs are clear enough to explain to someone who didn't build it. The YouTube pipeline fails the first test partially — most people don't need a three-times-daily automated upload pipeline. The Places lead gen tool passes all three. The email bot passes the first two but fails the third for non-technical clients (explaining OAuth2 and app passwords is a friction point).

The config-driven skeleton pattern is the key to serving multiple clients from one codebase. The AutoBlade scraper with a --config flag is a prototype of this: one scraper, many configurations. A proper multi-client version would add: client authentication so each client only sees their data, per-client config storage (database rather than flat files), and a simple admin interface for managing clients. You're building the platform once and running it for many people. That's the SaaS model — and it comes naturally out of the config-driven design you learned in Module 7.

The transition from personal tool to product requires documentation that you didn't need for yourself. When you built it, the config schema lived in your head. For a product, it lives in a README and an onboarding flow. The "minimum viable documentation" for a product built from a personal tool: what problem it solves (one paragraph), how to configure it (the config schema with explanations), what the expected inputs and outputs are, and what to do when something goes wrong (common errors and fixes). That's it. Ship it with that documentation and improve it based on what clients actually ask about.

The decision of which tools to productize should be economic, not technical. The question is not "is this technical enough to sell?" (almost everything in this course is) — it's "is there a market that will pay for this outcome and do I want to serve that market?" The Places lead gen tool serves local service businesses. The email bot serves anyone who processes high email volume. The YouTube pipeline serves content creators. Pick the market you want to work with, build for their specific use case, and sell the outcome.`,
        takeaways: [
          "Three paths to product: sell access (SaaS), sell knowledge (course), sell outcome (service + leverage)",
          "Productizable = solves shared problem + separable config + explainable inputs/outputs",
          "Config-driven skeleton: one codebase, per-client config, add auth + storage for multi-client",
          "Minimum viable docs: one-paragraph problem statement + config schema + error guide",
          "Productization decision is economic, not technical: pick the market you want to serve",
        ],
      },
    ],
  },
];

const TOTAL_LESSONS = MODULES.flatMap(m => m.lessons);

export default function AutomationLessonsPage() {
  const [gate, setGate] = useState<GateState>("loading");
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [currentId, setCurrentId] = useState<string>("1-1");
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "true") {
      setGate("unlocked");
      const prog = localStorage.getItem(PROGRESS_KEY);
      if (prog) setCompleted(new Set(JSON.parse(prog)));
      const cur = localStorage.getItem(CURRENT_KEY);
      if (cur) setCurrentId(cur);
    } else {
      setGate("locked");
    }
  }, []);

  function unlock() {
    if (input.trim().toUpperCase() === ACCESS_CODE.toUpperCase()) {
      localStorage.setItem(STORAGE_KEY, "true");
      setGate("unlocked");
      setError(false);
    } else {
      setError(true);
    }
  }

  function selectLesson(id: string) {
    setCurrentId(id);
    localStorage.setItem(CURRENT_KEY, id);
  }

  function toggleComplete(id: string) {
    setCompleted(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      localStorage.setItem(PROGRESS_KEY, JSON.stringify([...next]));
      return next;
    });
  }

  function goNext() {
    const idx = TOTAL_LESSONS.findIndex(l => l.id === currentId);
    if (idx < TOTAL_LESSONS.length - 1) selectLesson(TOTAL_LESSONS[idx + 1].id);
  }

  function goPrev() {
    const idx = TOTAL_LESSONS.findIndex(l => l.id === currentId);
    if (idx > 0) selectLesson(TOTAL_LESSONS[idx - 1].id);
  }

  if (gate === "loading") {
    return <div style={{ minHeight: "100vh", background: "#0c0a08", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 32, height: 32, border: "2px solid #d4af37", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>;
  }

  if (gate === "locked") {
    return (
      <div style={{ minHeight: "100vh", background: "#0c0a08", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
        <div style={{ maxWidth: "380px", width: "100%", textAlign: "center" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#d4af37", marginBottom: "16px", fontFamily: "var(--font-inter), sans-serif" }}>
            Zero to Automated
          </p>
          <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "28px", fontWeight: 700, color: "#f5f0e0", marginBottom: "24px" }}>
            Enter your access code
          </h1>
          <div style={{ display: "flex", gap: "8px" }}>
            <input
              type="text"
              placeholder="Access code"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && unlock()}
              style={{
                flex: 1, padding: "11px 14px", background: "#1a1710", border: `1px solid ${error ? "#c0392b" : "#3a3530"}`,
                borderRadius: 4, fontSize: "14px", color: "#f5f0e0",
                fontFamily: "var(--font-dm-sans), sans-serif", outline: "none",
              }}
            />
            <button onClick={unlock} style={{
              padding: "11px 20px", background: "#d4af37", border: "none", borderRadius: 4,
              fontSize: "13px", fontWeight: 700, color: "#0c0a08", cursor: "pointer",
              fontFamily: "var(--font-inter), sans-serif", letterSpacing: "0.06em",
            }}>
              Enter
            </button>
          </div>
          {error && <p style={{ fontSize: "13px", color: "#c0392b", marginTop: "10px", fontFamily: "var(--font-dm-sans), sans-serif" }}>
            Invalid access code. Check your purchase confirmation.
          </p>}
          <p style={{ fontSize: "12px", color: "#524d45", marginTop: "16px", fontFamily: "var(--font-dm-sans), sans-serif" }}>
            Don&apos;t have the course? <a href="/courses/ai-automation" style={{ color: "#d4af37", textDecoration: "none" }}>View course details →</a>
          </p>
        </div>
      </div>
    );
  }

  const currentLesson = TOTAL_LESSONS.find(l => l.id === currentId) ?? TOTAL_LESSONS[0];
  const currentIndex = TOTAL_LESSONS.findIndex(l => l.id === currentId);
  const progressPct = Math.round((completed.size / TOTAL_LESSONS.length) * 100);

  return (
    <div style={{ minHeight: "100vh", background: "#0c0a08", display: "flex", flexDirection: "column" }}>
      {/* Top bar */}
      <div style={{ height: "52px", background: "#0c0a08", borderBottom: "1px solid #2e2820", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", flexShrink: 0 }}>
        <a href="/courses/ai-automation" style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "13px", fontWeight: 700, color: "#d4af37", textDecoration: "none", letterSpacing: "0.08em" }}>
          Zero to Automated
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ fontSize: "12px", color: "#524d45", fontFamily: "var(--font-inter), sans-serif" }}>
            {completed.size}/{TOTAL_LESSONS.length} complete
          </div>
          <div style={{ width: "80px", height: "4px", background: "#2e2820", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ width: `${progressPct}%`, height: "100%", background: "#d4af37", borderRadius: 2, transition: "width 0.3s" }} />
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Sidebar */}
        <div style={{ width: "280px", flexShrink: 0, borderRight: "1px solid #2e2820", overflowY: "auto", background: "#0e0c09" }}>
          {MODULES.map(mod => (
            <div key={mod.num}>
              <div style={{ padding: "14px 16px 8px", borderBottom: "1px solid #1a1710" }}>
                <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#d4af37", fontFamily: "var(--font-inter), sans-serif" }}>
                  {mod.num} — {mod.title}
                </span>
              </div>
              {mod.lessons.map(lesson => {
                const isActive = lesson.id === currentId;
                const isDone = completed.has(lesson.id);
                return (
                  <button key={lesson.id} onClick={() => selectLesson(lesson.id)} style={{
                    width: "100%", textAlign: "left", padding: "10px 16px",
                    background: isActive ? "#1a1710" : "transparent",
                    border: "none", cursor: "pointer",
                    borderLeft: isActive ? "2px solid #d4af37" : "2px solid transparent",
                    display: "flex", alignItems: "center", gap: "8px",
                  }}>
                    <span style={{
                      width: 14, height: 14, borderRadius: "50%",
                      border: `1.5px solid ${isDone ? "#d4af37" : "#3a3530"}`,
                      background: isDone ? "#d4af37" : "transparent",
                      flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      {isDone && <span style={{ fontSize: "8px", color: "#0c0a08", fontWeight: 900 }}>✓</span>}
                    </span>
                    <span style={{ fontSize: "12px", color: isActive ? "#f5f0e0" : "#7a756d", fontFamily: "var(--font-dm-sans), sans-serif", lineHeight: 1.4 }}>
                      {lesson.title}
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "48px 48px 80px" }}>
          <div style={{ maxWidth: "760px" }}>
            {/* Lesson header */}
            <div style={{ marginBottom: "32px" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#d4af37", marginBottom: "10px", fontFamily: "var(--font-inter), sans-serif" }}>
                Lesson {currentLesson.id} · {currentLesson.duration} · {currentLesson.format}
              </div>
              <h1 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 700, color: "#f5f0e0", lineHeight: 1.15, marginBottom: "0" }}>
                {currentLesson.title}
              </h1>
            </div>

            {/* Video placeholder */}
            <div style={{ background: "#131007", border: "1px solid #2e2820", borderRadius: 6, aspectRatio: "16/9", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "40px" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", border: "2px solid #3a3530", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                  <div style={{ width: 0, height: 0, borderTop: "8px solid transparent", borderBottom: "8px solid transparent", borderLeft: "14px solid #524d45", marginLeft: "3px" }} />
                </div>
                <p style={{ fontSize: "13px", color: "#524d45", fontFamily: "var(--font-dm-sans), sans-serif" }}>Video coming soon</p>
              </div>
            </div>

            {/* Lesson notes */}
            <div style={{ marginBottom: "40px" }}>
              <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "14px", fontWeight: 700, color: "#d4af37", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "20px" }}>
                Lesson Notes
              </h2>
              {currentLesson.notes.split("\n\n").map((para, i) => (
                <p key={i} style={{ fontSize: "15px", color: "#c8c2b6", lineHeight: 1.85, marginBottom: "20px", fontFamily: "var(--font-dm-sans), sans-serif" }}>
                  {para}
                </p>
              ))}
            </div>

            {/* Takeaways */}
            <div style={{ background: "#0e0c09", border: "1px solid #2e2820", borderRadius: 6, padding: "28px", marginBottom: "40px" }}>
              <h2 style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: "13px", fontWeight: 700, color: "#d4af37", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "16px" }}>
                Key Takeaways
              </h2>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {currentLesson.takeaways.map((t, i) => (
                  <li key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", padding: "8px 0", borderBottom: i < currentLesson.takeaways.length - 1 ? "1px solid #1a1710" : "none" }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#d4af37", flexShrink: 0, marginTop: "8px" }} />
                    <span style={{ fontSize: "13px", color: "#9a9490", fontFamily: "var(--font-dm-sans), sans-serif", lineHeight: 1.65 }}>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Navigation */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #2e2820", paddingTop: "28px" }}>
              <button onClick={goPrev} disabled={currentIndex === 0} style={{
                padding: "10px 20px", background: "transparent", border: "1px solid #3a3530",
                borderRadius: 4, fontSize: "13px", color: currentIndex === 0 ? "#3a3530" : "#9a9490",
                cursor: currentIndex === 0 ? "not-allowed" : "pointer",
                fontFamily: "var(--font-inter), sans-serif", fontWeight: 600,
              }}>
                ← Previous
              </button>

              <button onClick={() => toggleComplete(currentLesson.id)} style={{
                padding: "10px 24px",
                background: completed.has(currentLesson.id) ? "transparent" : "#d4af37",
                border: `1px solid ${completed.has(currentLesson.id) ? "#d4af37" : "#d4af37"}`,
                borderRadius: 4, fontSize: "13px", fontWeight: 700,
                color: completed.has(currentLesson.id) ? "#d4af37" : "#0c0a08",
                cursor: "pointer", fontFamily: "var(--font-inter), sans-serif", letterSpacing: "0.06em",
              }}>
                {completed.has(currentLesson.id) ? "Mark Incomplete" : "Mark Complete"}
              </button>

              <button onClick={goNext} disabled={currentIndex === TOTAL_LESSONS.length - 1} style={{
                padding: "10px 20px", background: "transparent", border: "1px solid #3a3530",
                borderRadius: 4, fontSize: "13px", color: currentIndex === TOTAL_LESSONS.length - 1 ? "#3a3530" : "#9a9490",
                cursor: currentIndex === TOTAL_LESSONS.length - 1 ? "not-allowed" : "pointer",
                fontFamily: "var(--font-inter), sans-serif", fontWeight: 600,
              }}>
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
