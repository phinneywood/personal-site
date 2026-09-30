# Prior project record

Archived September 30, 2026 before Antonio authorized the end-to-end build. This preserves prototype requirements, caveats and source pointers; current state is in the canonical Trello card and current README.

**Outcome**
Project name selected: Agent Report. Antonio explicitly requested no prototype rename. Production build has not yet been authorized; clarifying the remaining product decisions and prerequisites.
The Coding Wire is deployed as an owner-private ChatGPT Site at https://coding-wire-prototype.atonic564.chatgpt.site. It explores whether externally observed prominence yields a useful AI/agentic coding front page. Private publication was explicitly requested; full-system implementation remains future work.

**Confirmed requirement**
Production Agent Report should be public so Antonio can share it with friends for feedback. Existing prototype remains unchanged. AI processing budget approved: $10/month. Reuse existing website hosting if feasible; no additional hosting expense authorized. Automatic publication policy remains undecided.
Antonio approved the story selection. Front page must follow Drudge's scanning density: plain, customized headlines that emphasize the important development; summaries and evidence should not occupy the default view.
Impact must be grounded primarily in prominence assigned by existing websites and editorial publications. Model-only judgments of importance are insufficient.

**Prototype**
Each headline shows its current ranking points on the same compact, non-wrapping line as Details. Points update when ranking controls change. Private revision published September 30, 2026.
Six real developments from a September 30, 2026 snapshot, with Techmeme feature observations, Hacker News ranks and primary-source checks. Source-weight and scope controls, evidence explanations, pins/hides, and clearly labeled duplicate-coverage, unpromoted-launch and source-outage simulations. One snapshot only: persistence is explicitly unmeasured. Specialist editorial sources, automatic ingestion and automated model grouping remain future work.

**Verification**
Authorized model comparison COMPLETED September 30, 2026: GPT-6 Luna and GPT-6 Sol, three paired trials each on six captured briefs plus labeled duplicate and distinct-event fixtures (14 cards; 8 groups). Both had zero false merges/splits, zero headlines over 12 words and zero material unsupported headline claims found in assistant label-blind review. Luna scores: fidelity 4.79/5, important detail 4.67, scanability 4.63; Sol: 4.96, 4.63, 4.54. Luna met all preregistered initial thresholds. Provisional recommendation: Luna with editorial review, then unseen full-article holdout. Sol consistently preserved staged-rollout wording for connected-app agents; Luna omitted it in all three versions, without claiming universal availability. Small curated sample does not establish production reliability or sourcing/impact completeness.
Six successful API calls total; estimated token charges $0.0220444 (about 2.2 cents), based on actual usage and frozen standard rates, not a billing statement. Luna $0.0012664; Sol $0.020778. Original first Luna response was reused after correcting runner commentary/final-answer parsing; only five remaining calls were made on resume. Prompts and thresholds unchanged. Completed output, locked ratings and audit trail retained in the experiment branch; final paid workflow disabled and follow-up run confirmed success/skipped paid step. Key is a GitHub Actions repository secret; no production site or prototype edits.
Published compact revision: underlined headlines, shorter lead, three desktop columns and tight mobile list; summaries, evidence, and per-story controls collapsed under Details. Six static stories and client rendering checked. Private deployment succeeded.
Private Site deployment succeeded. Six stories and 17 source links are rendered directly in the HTML so headlines remain visible without JavaScript. Ranking controls appear below the stories.
Executed ranking and interaction smoke checks for baseline, duplicate signals, unpromoted announcement, source outage, broader scope, pin/hide and zero weights. Browser rendering could not be checked: Chromium was unavailable and its download failed.

**Next**
Model comparison is complete; initial Luna choice supported provisionally. Validate a separate holdout of unseen full articles across several days, realistic related events and rollout qualifiers; retain editorial review. Resolve production scope, approval policy and refresh cadence, then reuse existing hosting where feasible. Impact ranking remains based on observed website/editorial prominence and deterministic scoring; it was not validated by this model comparison. $10/month AI planning budget remains approved.

**Sources**
- Comparison report: https://chatgpt.com/api/library/files/libfile_56588b35674c81918e8e1292f1b9ba11/download
- Completed model comparison: https://github.com/phinneywood/personal-site/actions/runs/36757017618
- Disabled-paid-run verification: https://github.com/phinneywood/personal-site/actions/runs/36758088969
- Hosted experiment dry run: https://github.com/phinneywood/personal-site/actions/runs/36745593017
- Experiment source: https://github.com/phinneywood/personal-site/tree/agent-report-model-experiment/experiments/agent-report
- Experiment kit: https://chatgpt.com/api/library/files/libfile_4393c4fe57888191925c28be3c58ae96/download
- Private Site: https://coding-wire-prototype.atonic564.chatgpt.site
- Prototype: https://chatgpt.com/api/library/files/libfile_94d4aac1722c8191b591c15747f96043/download
- ChatGPT: AI coding news roundup, September 30, 2026, and subsequent design/impact/prototype discussion; direct chat URL unavailable.
- Editorial process: https://www.techmeme.com/about
- Specialist source to evaluate: https://news.smol.ai/
- Hacker News API: https://github.com/HackerNews/API
