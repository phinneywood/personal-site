import assert from 'node:assert/strict';
import test from 'node:test';
import { renderStories, safeUrl, validEdition } from '../src/lib/agent-report.mjs';
const story = {id:'a', headline:'Pi adds MCP <script>alert(1)</script>', url:'javascript:alert(1)', points:105, breakdown:{editorial:105,community:0,agreement:0,persistence:0}, observations:[], coverage:[], category:'Tools', publisher:'example.com', fact:'', headline_status:'source', check_note:'Source headline', seen_windows:1};
test('untrusted headlines and links cannot execute markup or JavaScript', () => {
  const markup = renderStories([story]);
  assert.ok(markup.includes('&lt;script&gt;'));
  assert.ok(markup.includes('href="#"'));
  assert.ok(!markup.includes('<script>'));
  assert.equal(safeUrl('https://user:pass@example.com'), '#');
});
test('points stay on the single Details summary line and evidence remains collapsed', () => {
  const markup = renderStories([story]);
  assert.match(markup, /<summary><strong>105 points<\/strong> · Details<\/summary>/);
  assert.ok(!markup.includes(' open'));
});
test('empty scope selection renders useful content', () => assert.ok(renderStories([]).includes('No stories match')));
test('invalid editions are rejected before replacing the saved page', () => {
  assert.equal(validEdition({version:1,generated_at:'bad',stories:[]}), false);
});
