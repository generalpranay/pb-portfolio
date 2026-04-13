import { Router } from 'express';
import fetch from 'node-fetch';

const router = Router();

// 5-minute in-memory cache
let cache = { data: null, timestamp: 0 };
const CACHE_TTL = 5 * 60 * 1000;

router.get('/repos', async (req, res) => {
  const now = Date.now();

  // Serve from cache if fresh
  if (cache.data && now - cache.timestamp < CACHE_TTL) {
    return res.json(cache.data);
  }

  const username = process.env.GITHUB_USERNAME || 'generalpranay';
  const headers = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'pb-portfolio-server',
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=pushed&per_page=12&type=public`,
      { headers }
    );

    if (!response.ok) {
      throw new Error(`GitHub API returned ${response.status}`);
    }

    const raw = await response.json();

    const simplified = raw.map(r => ({
      id: r.id,
      name: r.name,
      description: r.description,
      language: r.language,
      stars: r.stargazers_count,
      forks: r.forks_count,
      pushed: r.pushed_at,
      url: r.html_url,
      topics: r.topics || [],
    }));

    cache = { data: simplified, timestamp: now };
    return res.json(simplified);
  } catch (err) {
    console.error('GitHub API error:', err.message);

    // Serve stale cache rather than failing hard
    if (cache.data) {
      return res.json(cache.data);
    }

    return res.status(502).json({ error: 'Failed to fetch GitHub repos. Try again shortly.' });
  }
});

export default router;
