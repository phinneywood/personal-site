import { readFile, readdir } from 'node:fs/promises';
import assert from 'node:assert/strict';
const root = new URL('../dist/', import.meta.url);
const page = await readFile(new URL('index.html', root), 'utf8');
assert.ok(page.includes('Antonio Skilton'));
async function visit(directory, prefix = '') {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const relative = `${prefix}${entry.name}`;
    assert.doesNotMatch(relative, /(^|\/)(\.profile-private|\.tools|profiles|docs)(\/|$)|linkedin-(current|proposed)\.json/);
    if (entry.isDirectory()) await visit(new URL(`${entry.name}/`, directory), `${relative}/`);
  }
}
await visit(root);
console.log('Built site verified: homepage exists and profile workspace files are absent.');
