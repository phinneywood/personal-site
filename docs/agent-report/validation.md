# Launch validation — September 30, 2026

Public page: https://antonioskilton.com/agent-report
Public RSS: https://antonioskilton.com/agent-report/feed.xml
Canonical project: https://trello.com/c/2OhOvOHM

Antonio authorized the public end-to-end build on existing hosting, a $10/month AI allowance, and automatic rewrites after factual checks with original-source fallback. The private prototype and portfolio biography were not changed.

## Executed evidence

| Check | Result | Evidence |
|---|---|---|
| Production build | Astro static build passes; no current.json file in deploy output | Agent Report checks workflow |
| Python behavior | 16 tests pass, including actual native-worker abort containment, incomplete model coverage, factual/qualifier fallback, ranking, persistence, pre-request budget cap and timeout reservation | scripts/agent-report/test_refresh.py |
| JavaScript behavior | 12 tests pass, including escaping, URL safety and rendering; existing portfolio checks retained | tests/agent-report.test.mjs and existing tests |
| First complete live collection | 31 candidates, 15 extracted articles, 16 stories, 6 checked headlines; estimated $0.0053501 | [First live run](https://github.com/phinneywood/personal-site/actions/runs/36776515253) |
| Latest complete live collection | 32 candidates, 16 extracted articles, 14 stories, 7 checked headlines; generated 21:45:14 UTC; estimated $0.0073424 for two completed calls | [Production refresh](https://github.com/phinneywood/personal-site/actions/runs/36781392784) |
| Rendered desktop and phone | Chromium 1280×900 and 390×844; columns, one-line metadata, details/points, scope, refresh, offline saved edition, no-JavaScript fallback and no page errors pass | [Public verification](https://github.com/phinneywood/personal-site/actions/runs/36781392756) |
| Public feed connection | Direct JSON and RSS both HTTP 200 and match published 21:45:14 UTC edition; JSON has 14 stories/7 checked headlines | Public endpoints above; browser workflow also checks against immutable data-branch commit |
| Deployment | Existing personal-site Vercel Git integration reports success | [Deployment](https://vercel.com/phinneywood/personal-site/9WDSAcpgvoUhQzpQ64CW3z44zQ8i) |
| Automated operation | Four-hour schedule on main, serialized writes to agent-report-data, source failures retain last good edition | .github/workflows/agent-report-refresh.yml |
| Spending ledger | $0.0473753 estimated total September usage across 14 calls, including 6 earlier comparison calls; $9.50 pipeline cutoff within $10 allowance | agent-report-data/agent-report/state.json |

The final bootstrap is copied from the published 21:45:14 edition. [Current verification runs](https://github.com/phinneywood/personal-site/actions/workflows/agent-report-checks.yml) retain screenshots and JSON evidence for 14 days. Git preserves current feed/state; this record preserves launch results after artifacts expire. Token-based cost estimates use frozen standard rates, not an invoice. Reviews were conducted in one assistant context; no independent reviewer is claimed.

## Failures found and handled

One production refresh aborted with native heap corruption during concurrent article handling, before paid calls. Captured-response replay did not consistently reproduce the upstream failure. Each native extraction now runs in its own credential-free process with a 30-second timeout and core dumps disabled. A regression deliberately aborts a worker and then successfully extracts the next article. Subsequent live refreshes complete. This demonstrates containment; it does not prove an upstream library root cause.

One incomplete grouping caused a whole-batch source fallback; another full grouping hit the initial 6,000-token output ceiling. Missing or multiply assigned cards now become individual groups, with every remaining headline still requiring the factual gate. Missing/duplicate audit indices grant no approval. The request allowance is now bounded at 12,000 output tokens/120 seconds; cost is reserved before every request and never retried. Explicit final-answer messages take precedence over progress/commentary. Only usage/phase metadata is retained, not draft commentary or source bodies.

Initial public JSON was frozen at the build snapshot because a built endpoint shadowed Vercel's external rewrite. That endpoint was removed. The build must not contain the JSON file; local browser testing supplies its fixture after the build only. Public verification now independently resolves the immutable published data commit and checks JSON/RSS freshness. A successful later data publication was observed publicly with matching dates without another website code change.

## Remaining observation

Techmeme, Hacker News and Latent Space collected successfully. AINews's newest issue remains September 9 and contributes zero fresh candidates; this is disclosed on the site. Seven of fourteen latest headlines use source fallback because not every rewrite passed publication checks.

Source recall and realized impact have not been established across several days. Points measure observed editorial/developer attention, source agreement and repeat prominence. Automated checks can share model errors and cannot independently verify publisher claims. Friend feedback and a several-day coverage review are the next product iteration, rather than unfinished launch infrastructure.
