import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import test from 'node:test';
import { PROFILE_URL, validateSnapshot, compareSnapshots } from '../scripts/profile-review.mjs';
const profile = JSON.parse(await readFile(new URL('../profiles/public-profile.json', import.meta.url), 'utf8'));
const page = await readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
const baseline = {url:PROFILE_URL,capturedAt:'2026-11-07',headline:'Current headline',about:'Current about',featured:[]};
test('public inventory stays aligned with approved page content and destinations', () => {
  assert.ok(page.includes(profile.biography));
  for (const url of [profile.linkedin, profile.github, ...profile.projects.map(p=>p.url)]) assert.ok(page.includes(`href="${url}"`));
  assert.equal(profile.provenance.status, 'existing-public-copy');
});
test('private profile material and local tools are excluded from Git and Vercel uploads', async () => {
  for (const filename of ['.gitignore', '.vercelignore']) {
    const text = await readFile(new URL(`../${filename}`, import.meta.url), 'utf8');
    assert.ok(text.split('\n').includes('.profile-private/'));
    assert.ok(text.split('\n').includes('.tools/'));
  }
});
test('LinkedIn comparison identifies changed copy without publishing', () => {
  const result = compareSnapshots(baseline, {...baseline,headline:'Proposed headline'});
  assert.deepEqual(result.changes.map(change=>change.field), ['headline']);
  assert.equal(result.status, 'review-only');
  assert.equal(compareSnapshots(baseline,baseline).changes.length, 0);
});
test('wrong identity, unknown baseline, and unsafe featured URLs fail closed', () => {
  assert.throws(()=>validateSnapshot({...baseline,url:'https://www.linkedin.com/in/someone-else'}));
  assert.throws(()=>validateSnapshot({...baseline,capturedAt:'YYYY-MM-DD'},{current:true}));
  assert.throws(()=>validateSnapshot({...baseline,capturedAt:'2026-02-31'},{current:true}));
  assert.throws(()=>validateSnapshot({...baseline,headline:'Replace with exact currently visible headline'}));
  assert.throws(()=>validateSnapshot({...baseline,about:''}));
  assert.throws(()=>validateSnapshot({...baseline,featured:['javascript:alert(1)']}));
  assert.throws(()=>validateSnapshot({...baseline,featured:['https://user:password@example.com']}));
});
