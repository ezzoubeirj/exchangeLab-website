# xlab-publisher

Claude Code skill that publishes a finished blog article to xchangelab.info in one shot: review → convert to `content/posts/<slug>.json` → copy cover image from `~/Claude/Projects/SEO` to `public/blog-<name>.png` → commit & push to `main` → watch the Vercel deploy → verify live.

## Install
Copy this folder into your local clone of `ezzoubeirj/exchangeLab-website`:

```
cp -R xlab-publisher /path/to/exchangeLab-website/.claude/skills/
```

## Usage
Run Claude Code from inside the repo, then paste the ChatGPT article:

```
publish this to xchangelab:
<paste the article with its Description/Title/Slug/Date/Category/Image/Author/Primary/Secondary metadata block + body>
```

## Requirements
- Local clone of `ezzoubeirj/exchangeLab-website` with `git` push access to `main`
- Vercel MCP connected in the Claude Code session (for deploy status)
- Cover image sitting in `~/Claude/Projects/SEO`, named as in the article's `Image` field
