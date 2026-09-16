---
name: xlab-publisher
description: >-
  Publish a finished blog article to the Exchange Lab website (xchangelab.info)
  in one shot: review, convert to the repo's post JSON, copy the cover image,
  commit and push to main, watch the Vercel deploy to READY, and verify the page
  is live. Trigger when the user says "publish the blog article", "publish this
  to xchangelab", "push the XLAB post", "publier l'article", or pastes a
  ChatGPT-produced XLAB article with a metadata block.
allowed-tools: Bash(git:*), Bash(gh:*), Bash(jq:*), Bash(node:*), Bash(cp:*), Bash(ls:*), Bash(curl:*), Read, Write, mcp__vercel__list_projects, mcp__vercel__list_deployments, mcp__vercel__get_deployment, mcp__vercel__get_deployment_build_logs
---

# XLAB Publisher

Takes a finished (ChatGPT-produced) blog article and publishes it end-to-end to
the Exchange Lab website. Run this skill from inside a local clone of the
`ezzoubeirj/exchangeLab-website` repo.

## Repo facts
- GitHub repo: `ezzoubeirj/exchangeLab-website` — branch `main`
- Framework: Next.js on Vercel, auto-deploys on push to `main`
- Locales: French (default) + Arabic. Blog lives at `/fr/blog`
- Posts: `content/posts/<slug>.json`
- Cover images (destination in repo): `public/blog-<name>.png`
- Cover image **source folder**: `~/Claude/Projects/SEO`
- Live URL pattern: `https://www.xchangelab.info/fr/blog/<slug>`
- Audience: French-speaking Moroccan parents. **The article stays in French.**

## Non-negotiable house rules (hard stops)
Check these before publishing. If violated, STOP and flag to the user — do not
publish.

1. **No free-trial language, ever.** Never use or imply a trial: no
   "séance d'essai", "première séance", "essai gratuit", "testez avant", or any
   try-before-you-enroll phrasing. CTAs invite **enrolling** or **contacting**
   only.
2. **Product attribution.**
   - Quran classes → **Al Hanaa Coran**, https://alhanaacoran.com/cours-enfants
   - English / Spanish for kids → **Exchange Lab**

## Workflow — follow in order, autonomously

Only two things stop the run: a missing cover image (step 5) or a house-rule
violation (step 3). Everything else: proceed.

### 1. Input
The user pastes an article whose metadata block contains, in this order:
`Description`, `Title`, `Slug`, `Date`, `Category`, `Image`, `Author`,
`Primary` (keyword), `Secondary` (keywords) — followed by the article body.
The cover image file named in the `Image` field lives in `~/Claude/Projects/SEO`.

Parse the metadata into fields. Keep the body separate for HTML conversion.

### 2. Review (formatting / technical only — do NOT rewrite the article)
Flag, don't silently change:
- All metadata fields present and correctly labeled.
- `Slug` is kebab-case and URL-safe (`[a-z0-9-]+`).
- `Title` ~50–60 chars; `Description` ~150–160 chars.
- Internal-link paths point to valid site paths (e.g. `/fr/...`).
- The `Image` filename actually exists in `~/Claude/Projects/SEO`
  (`ls ~/Claude/Projects/SEO/`).

Report any flags, then continue.

### 3. House-rule check
Scan title, body, and CTAs against the two house rules above. If violated, STOP
and tell the user exactly what and where. Otherwise continue.

### 4. Convert to post JSON
First read an existing post to match the exact shape:
```
ls content/posts/*.json
```
Read one and mirror its field names, order, and types. Write
`content/posts/<slug>.json` with fields: `slug`, `title`, `excerpt`,
`coverImage`, `date`, `tags`, `author`, `content` (HTML).

Field mapping:
- `Description` → `excerpt`
- `Image` → `coverImage` as `/blog-<name>.png`
- `Primary` + `Secondary` → source for `tags`
- `Category` → `tags`
- `date` → **the real publish day** (today), in the same format existing posts use
- article body → `content`, converted from Markdown to clean HTML

Validate it parses:
```
jq empty content/posts/<slug>.json
```

### 5. Cover image
Copy the file named in `Image` from the source folder into the repo:
```
cp ~/Claude/Projects/SEO/<Image> public/blog-<name>.png
```
The destination filename must match `coverImage` exactly. If the file is not
found in `~/Claude/Projects/SEO`, **STOP and ask the user for it.**

### 6. Commit & push
```
git add content/posts/<slug>.json public/blog-<name>.png
git commit -m "blog: publish <slug>"
git push origin main
```
Capture the pushed commit SHA (`git rev-parse HEAD`).

### 7. Deploy — Vercel MCP is the source of truth
- `list_projects` → find the exchangeLab project.
- `list_deployments` → find the deployment whose `meta.githubCommitSha` matches
  the pushed SHA (or the newest `main` production deployment).
- Poll `get_deployment` until `readyState` is `READY`.
- If it becomes `ERROR`/`CANCELED`: call `get_deployment_build_logs`, summarize
  the failure in plain language, and **stop before claiming success.**

### 8. Verify live
Once READY:
```
curl -sSI https://www.xchangelab.info/fr/blog/<slug>
```
Confirm HTTP 200, then fetch the page and confirm the title, body, internal
links, and cover image all load.

### 9. Confirm
Give the user the live URL. Keep it concise and non-technical. Example:
> Published — it's live at https://www.xchangelab.info/fr/blog/<slug>

## Notes
- Talk to the user in English; the article content stays in French.
- Do not substantially rewrite the supplied article unless the user explicitly
  asks — flag issues instead.
