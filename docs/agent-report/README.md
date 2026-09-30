# Agent Report

Public AI/agentic coding news page at **https://antonioskilton.com/agent-report**, using the existing Astro/Vercel website. Approved September 30, 2026: public sharing, $10/month AI allowance, reuse hosting, automatic AI headlines after factual checks with source-headline fallback. The earlier private prototype stays unchanged.

## User experience

Plain underlined headlines, a compact lead and three desktop columns; one column on narrow phones. One non-wrapping line under each headline contains ranking points and Details. Summaries, source evidence and score components remain collapsed. Topic filter, refresh button, RSS and correction/feedback link. The portfolio biography/root page is unchanged.

## Data flow

1. `.github/workflows/agent-report-refresh.yml` runs at minute 17 every four hours (UTC), on manual dispatch and relevant main-branch code pushes. GitHub may delay schedules. Concurrent refreshes are serialized; no automatic paid-call retries.
2. `scripts/agent-report/refresh.py` collects Techmeme main clusters, the first 100 HN top-story IDs, AINews RSS and Latent Space RSS. Each observation stores source, rank and collection time. Specialist articles older than seven days are excluded; freshness/outages are disclosed. No unavailable source endorsement is invented.
3. Canonical URLs remove tracking, fragments and temporary access tokens. Identical URLs are collapsed, and each source contributes once per development. The top 36 candidates by deterministic preliminary prominence receive bounded article extraction with Trafilatura in separate, credential-free worker processes. A native parser abort or 30-second worker timeout makes that article unavailable without killing collection. Article URLs and redirects reject private/local network destinations. Bodies travel through memory/stdin only, never committed or published.
4. GPT-6 Luna groups by event, classifies topic relevance and drafts <=12-word headlines and <=35-word factual descriptions. Missing/multiply assigned cards are isolated before auditing; unknown assignments are removed. A separate Luna request audits event identity, relevance, every material claim, attribution and explicit rollout/uncertainty qualifiers. Only unique audit indices grant approval; missing/duplicate checks use individual source headlines. A <=20-word supporting quote must literally match an extracted article. A failed event-identity check splits the group so unrelated events cannot combine points. A failed headline check uses the original publisher headline (or observed source headline). Structural repair does not bypass factual checks. This is automated checking, not independent verification.
5. Only the isolated `agent-report-data` branch is updated. `latest.json`, `feed.xml` and `state.json` are atomically committed with an expected parent and no force push. State loads use immutable commit URLs to avoid stale caches rolling back spending or history.
6. The page embeds a real bootstrap edition, then fetches `/agent-report/current.json`. Vercel externally rewrites JSON/RSS requests to public data-branch files. **No static file is built at the JSON path**: an existing file would take precedence over the external rewrite and freeze the feed. Data-branch deployments are disabled, so refreshes do not rebuild the website. No extra hosting project, database or Vercel AI key is required. No JavaScript shows the dated bootstrap; the RSS endpoint remains current.

## Priority points, version 1

These are inspectable priority points, not measured real-world impact. The model cannot assign them.

| Component | Formula / cap |
|---|---|
| Techmeme main headline | `(70 + 15 × max(0, 1 − (page position − 1)/30)) × 1.5` |
| Specialist editorial publication | 45; capped across specialist sources; editorial component is max of this and Techmeme |
| HN developer attention | `100 × max(0, (101 − top-list rank)/100)`; votes/comments shown as evidence |
| Distinct source agreement | 15 for each additional source, capped at 30 |
| Repeat prominence | 3 per additional observed four-hour window, capped at 12 |

Repeated calls in the same four-hour window cannot add persistence. Absent sources add no current points. Tracking variants, copied feed entries and repeated mentions cannot multiply a source's contribution. A prominent off-topic story is excluded. Editorial scope includes coding-capable models/tools and broader AI agents; generic AI financing, politics, hardware and image generation are excluded unless directly relevant to agent development/use.

The prototype had a 30-place HN formula and no measured persistence. Version 1 explicitly expands collection to the top 100 and begins recording actual repeat observations. Editorial/publication signals have different meanings; independent-source counts reflect collection sources, not a claim of independent primary reporting.

## Spending and failure behavior

- Model: `gpt-6-luna`, reasoning effort none, no provider tools/search, two requests per successful AI refresh, maximum 12,000 output tokens/request and 120-second request timeout. The initial 6,000-token ceiling truncated one full live batch. Frozen standard rates: $0.10/M input and $0.50/M output; no cache discounts assumed. Recheck rates/model before changing them.
- Persist a conservative byte-based input plus maximum-output cost reservation **before each request**. Refuse a request above $0.06 or a monthly ledger above **$9.50**; the remaining $0.50 allows room within the approved $10 for the earlier experiment/other small checks. This governs this pipeline, not unrelated account usage.
- Completed calls settle to actual returned token counts. Timeouts, process termination and charge-ambiguous failures retain the full reservation. No retries. A failed persistence write stops before additional paid work. Month boundaries use UTC.
- Missing key, monthly cap or failed AI checks use source headlines. The page still refreshes without AI. Total source failure or zero eligible stories preserves the last good edition with its original date and a degraded status. An edition over 12 hours old shows a visible warning.
- Key: GitHub repository Actions secret `AGENT_REPORT_OPENAI_API_KEY`; it is never passed to the browser, Vercel, generated data or artifacts. Workflow token writes only the hard-coded data branch through this script.

## Operation

Actions → **Agent Report refresh** → Run workflow on main to refresh manually. Inspect the `agent-report-refresh` artifact's `run-report.json` for collection counts, extraction counts, checks, actual token estimates and budget ledger. GitHub retains artifacts 14 days; current data/state remain in Git. Source health also appears under Details on the page. Workflow failures use normal GitHub Actions status; no extra email automation was added.

To pause publication, disable the refresh workflow in GitHub. To correct or hide a story immediately, edit `agent-report/latest.json` on the data branch (and matching RSS if needed), then fix the source/prompt policy before resuming. The next successful automated refresh replaces manual data edits. No fake admin login or hidden browser edit endpoint is exposed.

Development: `npm ci`, `pip install -r scripts/agent-report/requirements.txt`, `python -m unittest discover -s scripts/agent-report -p 'test_*.py'`, `npm test`, `npm run build`. `python scripts/agent-report/refresh.py --no-ai` generates local output; `--publish` additionally requires `GITHUB_TOKEN` and the initialized data branch. Local networks that proxy DNS may fail the explicit destination check; CI must retain that check.

Browser verification runs in Actions with Chromium at 1280×900 and 390×844. Local static testing temporarily serves a bootstrap JSON fixture after the production build; that fixture is never deployed. Main-branch verification resolves the immutable published data commit and checks that public JSON and RSS dates are at least as recent, along with filters, points/details, single-line metadata, offline retention and no-JavaScript fallback. Artifacts retain screenshots and `verification.json` for 14 days.

## Evidence and established alternatives

Adapted established RSS ingestion, article extraction, scheduled GitHub Actions and static-site data patterns. A hosted database/worker would add credentials and operations unnecessary for this small public feed. Rebuilding Astro after every data update couples refresh to deployments; an isolated data branch plus native external rewrite avoids that. A bought news feed could improve coverage later but is outside the current budget.

- [HN official API](https://github.com/HackerNews/API)
- [Techmeme editorial process](https://www.techmeme.com/about)
- [AINews](https://news.smol.ai/) and [Latent Space RSS](https://www.latent.space/feed)
- [Trafilatura extraction](https://trafilatura.readthedocs.io/en/latest/quickstart.html)
- [Astro static data](https://docs.astro.build/en/guides/data-fetching/)
- [Vercel external rewrites](https://vercel.com/docs/routing/rewrites) and [per-branch deployment controls](https://vercel.com/docs/project-configuration/git-configuration)
- [GitHub workflow schedules](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows)
- [Initial Luna/Sol comparison](https://github.com/phinneywood/personal-site/tree/agent-report-model-experiment/experiments/agent-report/results-summary.md)
- [Canonical Trello project](https://trello.com/c/2OhOvOHM)

## Validation limits

Initial model experiment: three trials each on six prepared briefs plus labeled fixtures; zero grouping/length failures, Luna passed initial quality thresholds, estimated total 2.2 cents. This does not establish production reliability. The live pipeline, public JSON/RSS freshness and desktop/phone site flow have passed launch checks; see [executed evidence and failures handled](validation.md). Repeated coverage/impact recall across several days remains an observation task after launch. Source selection can miss consequential stories. Automated factual checks can share model errors. Source-text availability and editorial ordering can change.

Current known source limitation: AINews's latest visible issue was September 9 when collected September 30. It contributes no fresh stories until the feed catches up. Latent Space provides a separate specialist signal. The generator reports actual freshness rather than treating old articles as today's news.
