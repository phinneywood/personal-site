import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

export const PROFILE_URL = 'https://www.linkedin.com/in/antonioskilton';
export function validateSnapshot(value, { current = false } = {}) {
  if (!value || value.url !== PROFILE_URL) throw new Error('Snapshot must identify the verified LinkedIn profile.');
  if (current && (!/^\d{4}-\d{2}-\d{2}$/.test(value.capturedAt ?? '') || Number.isNaN(Date.parse(value.capturedAt)) || new Date(value.capturedAt).toISOString().slice(0, 10) !== value.capturedAt)) {
    throw new Error('Current snapshot needs an actual capturedAt date (YYYY-MM-DD).');
  }
  for (const key of ['headline', 'about']) {
    if (typeof value[key] !== 'string' || !value[key].trim()) throw new Error(`Snapshot needs nonempty ${key}.`);
    if (/^Replace with /.test(value[key])) throw new Error('Replace example fields with observed content.');
  }
  if (!Array.isArray(value.featured) || value.featured.some(url => {
    try { const u = new URL(url); return u.protocol !== 'https:' || !!u.username || !!u.password; } catch { return true; }
  })) throw new Error('featured must be an array of public HTTPS URLs without credentials.');
  return value;
}
export function compareSnapshots(current, proposed) {
  validateSnapshot(current, { current: true });
  validateSnapshot(proposed);
  const fields = ['headline', 'about', 'featured'];
  return {
    profile: PROFILE_URL,
    baselineCapturedAt: current.capturedAt,
    status: 'review-only',
    changes: fields.filter(key => JSON.stringify(current[key]) !== JSON.stringify(proposed[key]))
      .map(field => ({ field, before: current[field], proposed: proposed[field] })),
    publication: 'Not authorized by this report. Review exact copy before any LinkedIn change.'
  };
}
async function main() {
  const root = new URL('../.profile-private/', import.meta.url);
  try {
    const current = JSON.parse(await readFile(new URL('linkedin-current.json', root), 'utf8'));
    const proposed = JSON.parse(await readFile(new URL('linkedin-proposed.json', root), 'utf8'));
    console.log(JSON.stringify(compareSnapshots(current, proposed), null, 2));
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error('Review blocked: capture current LinkedIn text in .profile-private/linkedin-current.json and prepare linkedin-proposed.json. See docs/PUBLIC-PROFILE.md. No LinkedIn access or update was attempted.');
    } else console.error(`Review blocked: ${error.message}`);
    process.exitCode = 2;
  }
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) await main();
