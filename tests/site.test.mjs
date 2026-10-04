import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import test from 'node:test';

const page = await readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
const preview = await readFile(new URL('../preview/index.html', import.meta.url), 'utf8');
const config = JSON.parse(await readFile(new URL('../vercel.json', import.meta.url), 'utf8'));
const text = page.replace(/<style[\s\S]*?<\/style>/, '').replace(/<!--[^]*?-->/g, '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');

test('the preview is the exact source page, with only the Astro style directive removed', () => {
  assert.equal(preview, page.replace('<style is:global>', '<style>'));
});
test('both approved biography sentences appear in one paragraph', () => {
  const about = page.match(/<div class="about-copy">([\s\S]*?)<\/div>/)[1];
  assert.deepEqual([...about.matchAll(/<p>(.*?)<\/p>/g)].map(m => m[1]), [
    'I’m a technical program manager with a data science background. I lead machine learning deployments and build agentic solutions to help teams ship models at a Fortune 100 company.'
  ]);
});
test('only the approved external destinations appear, with LinkedIn first among profile links', () => {
  assert.deepEqual([...page.matchAll(/href="(https:[^"]+)"/g)].map(m => m[1]), [
    'https://www.linkedin.com/in/antonioskilton', 'https://github.com/antonioskilton', 'https://reader.antonioskilton.com', 'https://github.com/phinneywood/outer-harness'
  ]);
  const profileLinks = page.match(/<nav class="profile-links"[\s\S]*?<\/nav>/)[0];
  assert.ok(profileLinks.indexOf('LinkedIn') < profileLinks.indexOf('GitHub'));
});
test('a single main landmark and heading, plus keyboard skip navigation', () => {
  assert.equal((page.match(/<main\b/g) || []).length, 1);
  assert.equal((page.match(/<h1\b/g) || []).length, 1);
  assert.ok(page.includes('href="#main"'));
  assert.ok(page.includes('id="main"'));
});
test('no client JavaScript, form, personal email or externally loaded assets', () => {
  assert.doesNotMatch(page, /<script\b|<form\b|mailto:|<iframe\b|<img\b/i);
  assert.doesNotMatch(page, /@import|@font-face|url\(\s*['"]?https?:/i);
});
test('preview indexing remains disabled in markup and hosting headers', () => {
  assert.match(page, /name="robots" content="noindex, nofollow"/);
  assert.ok(config.headers[0].headers.some(h => h.key === 'X-Robots-Tag' && h.value.includes('noindex')));
});
test('reduced-motion and forced-color preferences are supported', () => {
  assert.ok(page.includes('(prefers-reduced-motion: reduce)'));
  assert.ok(page.includes('(forced-colors: active)'));
});

test('both projects have one description and a clear action, with Long Form first', () => {
  assert.equal((page.match(/<p class="project-description">/g) || []).length, 2);
  assert.ok(text.includes('Your personal publication, run by an AI editor.'));
  assert.ok(text.includes('Open Long Form'));
  assert.ok(text.includes('Experimental assistant workflows'));
  assert.ok(text.includes('Explore on GitHub'));
  assert.ok(page.indexOf('id="long-form-title"') < page.indexOf('id="outer-harness-title"'));
  assert.doesNotMatch(text, /A personal project|A little room to read|I built it to spend/);
});
