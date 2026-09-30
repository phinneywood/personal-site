# Agent Report model comparison

Status: Prepared; execution blocked by missing API credential. September 30, 2026.
No model outputs, measured quality, actual cost, or winner exist yet.

## Decision and hypothesis
Start with GPT-6 Luna if it can group developments accurately and write concise, supported headlines nearly as well as GPT-6 Sol. This test can reject a poor choice; a small curated sample cannot establish production reliability.

## Inputs and provenance
Six source briefs extracted from the existing September 30 prototype, including each primary URL and prior verification caveat. These are assistant-prepared briefs, not full article extracts. Existing prototype headline wording is withheld from both models.
Six clearly labeled synthetic duplicate fixtures test repeat coverage. Two synthetic later-event fixtures test inappropriate merging of separate developments involving the same model or tool. No fixture is represented as a newly observed article. Expected grouping is frozen in gold.json and withheld from models. Sol launch and Copilot rollout are deliberately one development for this editorial policy.

## Test
Same instruction, JSON schema, reasoning effort (none), output allowance, and source material for both models. Three trials per model with the same shuffled card order within each paired trial. No model browsing or search tools; both receive identical evidence. Outputs, usage, timing and actual returned model metadata are retained. Results are shuffled into anonymous sets; the mapping is kept separately until scores are locked. The reviewer may still infer style; this is label blinding, not a guarantee against recognition.

## Measures and thresholds — set before execution
- Grouping: every card once, zero false merges and zero false splits in every trial. Pair precision/recall are diagnostic; perfect coverage alone does not imply good grouping.
- Fidelity: zero materially unsupported claims across headline outputs; vendor claims must remain attributed, staged availability cannot become universal availability, unfinished evaluation cannot become proof of degradation. Review against cards and captured briefs.
- Length: every headline at most 12 words. This is a text constraint, not a guarantee of one line on every phone.
- Human review: score factual fidelity, emphasis on the important change and scanability separately from 1 to 5. Luna should average at least 4 for each dimension and be within 0.5 points of Sol on the two editorial dimensions. Factual errors are an independent failure regardless of averages.
- Cost: report actual usage and estimate tokens at retrieved Standard rates, conservatively without cache discounts. Preliminary six-call upper estimate: $0.179. The runner refuses a projected estimate above $1; this is a local experiment allowance within the approved $10 monthly AI budget, not a provider-wide hard limit.

## Actions triggered by results
If Luna passes, use it provisionally and validate next on unseen full article extracts over several days before automatic publication. If fidelity or grouping fails, inspect failure cases and compare a stronger-model fallback for those specific tasks. If both fail, revise prompt or event-grouping policy, version the test, and run a fresh holdout rather than declaring the stronger model a winner. Headline taste remains Antonio's editorial decision. Prominence scores remain deterministic and external-source based.

## Cost, owner, duration and stopping
Owner: assistant runs and records experiment; Antonio can judge blind headline preferences. Six calls plus review, normally one session once access is configured. Stop on missing credentials, unsupported model, API error, incomplete output, malformed/missing cards, or failed budget preflight; do not automatically retry charge-ambiguous failures. Zero paid calls have been made so far.

## Run
Python 3 standard library only. Configure OPENAI_API_KEY securely in the execution environment; do not paste it into chat or commit it.

    python run.py --dry-run
    python run.py

The runner's prices were checked on September 30, 2026; recheck before running later. It never writes the credential. Dry-run verification passed. The live runner correctly stopped before any request because the credential is absent. API integration remains unverified.

Inspect results/blind-review.md before results/unblinding-key.json. Automated grouping metrics do not substitute for source-backed fidelity review. Preserve the raw response files and metrics. Do not present a winner before the review is complete.

## Sources
- https://developers.openai.com/api/docs/models/gpt-6-luna
- https://developers.openai.com/api/docs/models/gpt-6-sol
- https://developers.openai.com/api/docs/guides/structured-outputs
- Primary article URLs: captured-briefs.json
- Project: https://trello.com/c/2OhOvOHM
