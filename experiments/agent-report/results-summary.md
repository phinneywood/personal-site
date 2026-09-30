# Agent Report model comparison — September 30, 2026

GPT-6 Luna met the preregistered initial thresholds. Use it provisionally for grouping and drafting headlines, with editorial review. GPT-6 Sol did not show enough overall headline advantage on this sample to justify its higher cost; it did preserve rollout caveats more consistently.

| Measure | GPT-6 Luna | GPT-6 Sol |
|---|---:|---:|
| Completed trials | 3 | 3 |
| False merges / false splits | 0 / 0 | 0 / 0 |
| Headlines above 12 words | 0 | 0 |
| Material unsupported claims found by reviewer | 0 | 0 |
| Factual fidelity, /5 | 4.79 | 4.96 |
| Important detail, /5 | 4.67 | 4.63 |
| Scanability, /5 | 4.63 | 4.54 |
| Estimated token charges for three calls | $0.0012664 | $0.0207780 |

Combined estimated token charges: **$0.0220444**, approximately **2.2 cents**. Luna was about **16.4 times cheaper** for these outputs. These estimates use actual response token counts and the standard prices frozen before execution, without cache discounts; they are not a provider billing statement. No provider tools or searches were used in these calls.

## What was tested

Both models received the same 14 cards: six assistant-prepared source briefs from the prototype, six explicitly synthetic duplicates, and two explicitly hypothetical later events. Expected grouping was eight developments. Each model ran three times, with paired shuffled card orders, identical prompts, strict JSON schemas, reasoning effort none and a 4,000-token output allowance. Existing prototype headlines and expected grouping were withheld.

The six outputs contained 48 headlines, representing repeated versions of the same eight developments. They are not 48 independent news stories. Grouping was perfect in every trial. All headlines fit the 12-word limit; that does not establish one-line fit on every device.

The assistant scored anonymous sets before opening the model mapping. Scores were locked in results/locked-blind-ratings.json; SHA-256 650acdf47cdacb209494ca6c31de007673ad4237ae61e59548d639da074d0a5d. This is a single assistant reviewer with model labels withheld, not an independent human editorial panel. Antonio retains final judgment on headline taste.

The preregistered rule required Luna to average at least 4 on all three dimensions, stay within 0.5 of Sol on important detail and scanability, and have no grouping, material unsupported-claim or length failures. Luna met those rules. Excluding the two hypothetical-event headlines, Luna averaged 4.72 fidelity, 4.56 important detail and 4.50 scanability; Sol averaged 4.94, 4.61 and 4.50. The conclusion remains the same.

## Where review still helps

Luna omitted staged-rollout wording from all three connected-app agent headlines. Those headlines described an announcement and did not assert universal availability, so this was scored as a missing qualifier rather than a material unsupported claim. Before publication, add the rollout limit. Sol retained it in every trial.

Luna also produced one awkward headline: “OpenAI documents gradually rolling out cross-device Codex cloud tasks.” One Luna launch headline better captured the attributed lower-cost coding claim; most launch headlines from both models omitted that value proposition. Grouping accuracy alone cannot ensure a compelling front page.

No headline claimed an unfinished Opus benchmark proved regression. Both models kept synthetic later-event headlines explicitly hypothetical and separated those events from the original launch/support developments.

## Execution and audit trail

The first GitHub run made one successful Luna request, then the runner failed because it concatenated a commentary message and final answer. The corrected parser selects the final answer, following official SDK parsing semantics. The exact original raw response was reused; only five remaining requests were made. Prompts, evidence, models, schema, expected grouping and scoring thresholds were unchanged. The first call's runner latency is unavailable; it is null in metrics. Its full usage is included in cost estimates.

- Completed comparison: https://github.com/phinneywood/personal-site/actions/runs/36757017618
- Initial response and parser failure: https://github.com/phinneywood/personal-site/actions/runs/36756391188
- Experiment source: https://github.com/phinneywood/personal-site/tree/agent-report-model-experiment/experiments/agent-report
- Responses parsing semantics: https://github.com/openai/openai-python/blob/main/helpers.md#parsing-responses-api-output
- Model rate references: https://developers.openai.com/api/docs/models/gpt-6-luna and https://developers.openai.com/api/docs/models/gpt-6-sol

The API key stayed in a GitHub Actions secret. The experiment changes are on a separate branch. Production website and prototype were not changed. Paid execution is disabled in the final workflow to prevent routine branch updates from repeating the experiment.

## Next validation

Run a separate holdout on unseen full article extracts gathered across several days, with realistic duplicate coverage and related but distinct events. Include rollout qualifiers, conflicting reporting and article text that attempts to instruct the model. Check headline preference with Antonio and require review before publication during this phase.

This experiment did not test sourcing completeness, article extraction, impact ranking, refresh cadence, long-term costs or unattended publication. Impact selection must continue to use observed prominence from editorial websites, community ranks and independent agreement, with code computing the score. The model result does not establish that the most impactful stories will be found.

The $10/month AI allowance remains the planning budget. These short-brief costs do not predict a full production feed's monthly cost. Production build scope, refresh cadence and automatic publication policy remain to be settled.
