#!/usr/bin/env bash
# deploy.sh — One-command Vercel deploy for purcell-ventures-site
#
# Usage:
#   ./deploy.sh "your commit message"
#   ./deploy.sh                          # uses default commit message
#
# What it does:
#   1. Checks for uncommitted changes
#   2. Runs npm run build to catch compilation errors BEFORE pushing
#   3. Stages all changes
#   4. Commits with your message
#   5. Pushes to current branch (creates -u tracking if needed)
#   6. Vercel auto-deploys from push (no CLI needed if connected)
#
# Manual step still required: set REP_PASSWORDS env var on Vercel dashboard
# BEFORE first rep tries to log in. Format: "Elijah:adminpw,Luke:lukepw,..."

set -e  # exit on any error

# ── Colors for output ──────────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'  # No Color

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  PV Deploy — Workshop 2026-05-24 build${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo

# ── Step 1: Pre-flight checks ──────────────────────────────────────────────
if [ ! -f "package.json" ]; then
  echo -e "${RED}✗ Not in purcell-ventures-site directory. Run from project root.${NC}"
  exit 1
fi

# Show current state
BRANCH=$(git branch --show-current)
echo -e "${BLUE}Current branch:${NC} $BRANCH"
echo -e "${BLUE}Files changed:${NC}"
git status --short

# Confirm if no changes
if [ -z "$(git status --porcelain)" ]; then
  echo -e "${YELLOW}⚠ No changes to commit. Already clean.${NC}"
  exit 0
fi

# ── Step 2: Build check ────────────────────────────────────────────────────
echo
echo -e "${BLUE}━━━ Build check (npm run build) ━━━${NC}"
if ! npm run build > /tmp/pv-build.log 2>&1; then
  echo -e "${RED}✗ Build FAILED. Tail of log:${NC}"
  tail -30 /tmp/pv-build.log
  echo
  echo -e "${RED}Aborting deploy. Fix build errors first.${NC}"
  exit 1
fi
echo -e "${GREEN}✓ Build clean. All routes generated.${NC}"

# ── Step 3: Commit ─────────────────────────────────────────────────────────
COMMIT_MSG="${1:-Workshop 2026-05-24: full rep portal + CRM v2 + Steady + tools + blog + portfolio + how-we-work + pricing-comparison + AI coaches (deal/objection/pitch/conversation) + email templates + help docs}"

echo
echo -e "${BLUE}━━━ Staging + committing ━━━${NC}"
git add .
git commit -m "$COMMIT_MSG"
echo -e "${GREEN}✓ Committed.${NC}"

# ── Step 4: Push ───────────────────────────────────────────────────────────
echo
echo -e "${BLUE}━━━ Pushing to remote ━━━${NC}"
if ! git push 2>/dev/null; then
  echo -e "${YELLOW}⚠ Branch not tracking remote. Pushing with -u...${NC}"
  git push -u origin "$BRANCH"
fi
echo -e "${GREEN}✓ Pushed.${NC}"

# ── Step 5: Vercel handoff ─────────────────────────────────────────────────
echo
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✓ Deploy initiated.${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo
echo -e "Vercel should now be building from your push."
echo -e "Check: ${BLUE}https://vercel.com/elijahbears-projects/purcell-ventures-site${NC}"
echo
echo -e "${YELLOW}IMPORTANT — manual steps still needed:${NC}"
echo -e "  1. Set ${BLUE}REP_PASSWORDS${NC} env var on Vercel before reps try to log in"
echo -e "     Format: ${BLUE}Elijah:adminpw,Luke:lukepw,Jarod:jarodpw,David:davidpw${NC}"
echo -e "  2. Verify ${BLUE}ANTHROPIC_API_KEY${NC} is set (existing — should already be there)"
echo -e "  3. Promote preview to production in Vercel dashboard once you've smoke-tested"
echo
echo -e "Smoke test checklist:"
echo -e "  • Visit ${BLUE}/sales-rep${NC} — form link works"
echo -e "  • Visit ${BLUE}/steady${NC} — comparison + walkthrough render"
echo -e "  • Visit ${BLUE}/rep-portal/login${NC} — log in as admin"
echo -e "  • Visit ${BLUE}/rep-portal/crm${NC} — click 'Load sample data' if empty"
echo -e "  • Open a sample contact — try AI Prospect Research"
echo -e "  • Visit ${BLUE}/portfolio${NC} — projects load with filter"
echo -e "  • Visit ${BLUE}/blog${NC} — both posts load"
echo
