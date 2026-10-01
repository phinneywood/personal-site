# Agent Report retirement

Antonio ended the experiment on September 30, 2026. The proposed personalized
version overlapped established reader products and did not establish enough
additional value to justify further development.

Retirement removes the Agent Report page and JSON/RSS hosting rewrites and removes
the scheduled/manual refresh workflow. No automated Agent Report model calls or
data publications remain configured on the default branch. The portfolio page is
unchanged. Ordinary portfolio build checks replace the news-page browser checks.

Source code, tests, launch documentation and the isolated data branch are retained
as historical evidence. They are not served by the public site. Do not resume
publication or personalization work without a new instruction from Antonio.

The GitHub Actions API secret is not read or copied during retirement. Its removal
from the provider project is separate credential housekeeping; retirement does not
claim provider-key revocation. No active default-branch workflow references it.

Verification: `npm test`, `npm run build`, absence of the news page/feeds in output,
and `node scripts/verify-agent-report-retired.mjs` against production after deployment.
