import fs from 'fs';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export function getAllPosts() {
  try {
    if (!fs.existsSync(postsDirectory)) return [];
    const files = fs.readdirSync(postsDirectory).filter(f => f.endsWith('.json'));
    const posts = files.map(file => {
      const raw = fs.readFileSync(path.join(postsDirectory, file), 'utf8');
      return JSON.parse(raw);
    });
    return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch {
    return [];
  }
}

export function getPostBySlug(slug) {
  try {
    const filePath = path.join(postsDirectory, `${slug}.json`);
    if (!fs.existsSync(filePath)) return null;
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return null;
  }
}

export function getAllSlugs() {
  try {
    if (!fs.existsSync(postsDirectory)) return [];
    return fs.readdirSync(postsDirectory)
      .filter(f => f.endsWith('.json'))
      .map(f => f.replace('.json', ''));
  } catch {
    return [];
  }
}
