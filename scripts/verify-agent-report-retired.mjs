// Allow the Git-connected deployment to finish, then check its public routes.
import assert from 'node:assert/strict';
const origin = 'https://antonioskilton.com';
const paths = ['/agent-report', '/agent-report/', '/agent-report/current.json', '/agent-report/feed.xml'];
let lastFailure;
for (let attempt = 1; attempt <= 24; attempt++) {
  try {
    const home = await fetch(origin, {signal: AbortSignal.timeout(10000)});
    assert.equal(home.status, 200, 'Portfolio remains available');
    const html = await home.text();
    assert.ok(html.includes('I’m a technical program manager with a data science background.'), 'Portfolio biography remains intact');
    for (const path of paths) {
      const response = await fetch(origin + path, {signal: AbortSignal.timeout(10000)});
      assert.equal(response.status, 404, `${path} is removed`);
      await response.arrayBuffer();
    }
    console.log('Verified: portfolio is available; Agent Report page and both feeds return 404.');
    process.exit(0);
  } catch (error) {
    lastFailure = error;
    console.log(`Public retirement not ready (attempt ${attempt}/24).`);
    if (attempt < 24) await new Promise(resolve => setTimeout(resolve, 8000));
  }
}
throw lastFailure;
