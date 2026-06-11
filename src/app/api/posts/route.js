import { NextResponse } from 'next/server';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const GITHUB_OWNER = 'ezzoubeirj';
const GITHUB_REPO = 'exchangeLab-website';
const GITHUB_BRANCH = 'main';

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, password } = body;

    // Password check
    if (!ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'ADMIN_PASSWORD env var not set on server.' },
        { status: 500 }
      );
    }
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Auth-only ping
    if (action === 'auth') {
      return NextResponse.json({ ok: true });
    }

    // Publish post
    if (action === 'publish') {
      if (!GITHUB_TOKEN) {
        return NextResponse.json(
          { error: 'GITHUB_TOKEN env var not set on server.' },
          { status: 500 }
        );
      }

      const { slug, title, excerpt, content, coverImage, date, tags, author } = body;

      if (!slug || !title || !content) {
        return NextResponse.json(
          { error: 'Missing required fields: slug, title, content' },
          { status: 400 }
        );
      }

      const post = {
        slug,
        title,
        excerpt: excerpt || '',
        content,
        coverImage: coverImage || '',
        date: date || new Date().toISOString().split('T')[0],
        tags: Array.isArray(tags) ? tags : [],
        author: author || 'Exchange Lab',
      };

      const fileContent = JSON.stringify(post, null, 2);
      const base64Content = Buffer.from(fileContent, 'utf-8').toString('base64');
      const filePath = `content/posts/${slug}.json`;

      // Check if file already exists (get SHA for update)
      let sha;
      const checkRes = await fetch(
        `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}?ref=${GITHUB_BRANCH}`,
        {
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            Accept: 'application/vnd.github.v3+json',
          },
        }
      );
      if (checkRes.ok) {
        const existing = await checkRes.json();
        sha = existing.sha;
      }

      // Create or update file via GitHub API
      const putRes = await fetch(
        `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            Accept: 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: `blog: ${sha ? 'update' : 'add'} post "${title}"`,
            content: base64Content,
            branch: GITHUB_BRANCH,
            ...(sha ? { sha } : {}),
          }),
        }
      );

      if (!putRes.ok) {
        const err = await putRes.json().catch(() => ({}));
        return NextResponse.json(
          { error: err.message || `GitHub API error: ${putRes.status}` },
          { status: 500 }
        );
      }

      return NextResponse.json({ ok: true, slug });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
