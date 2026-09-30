# Execution record

The protocol in README.md was registered before model execution.

September 30, 2026: GitHub run 36756391188 made one successful Luna request, then the runner stopped while parsing. The Responses output included separate commentary and final_answer messages; concatenating both was a runner error, not a malformed final answer. Raw response resp_033cb6765e91595d016abd500c9db887d1a21313bf5c8b434b is preserved in saved-responses/gpt-6-luna-1.json.

The corrected parser follows the official SDK rule: parse final_answer or an unphased legacy message; ignore commentary. Local checks verified original response parsing and complete card coverage, legacy output, commentary exclusion and stopping for a missing final answer. Source: https://github.com/openai/openai-python/blob/main/helpers.md#parsing-responses-api-output

Resume reuses that exact saved response and makes five remaining calls. No prompt, model, evidence, schema, expected grouping, shuffle or review threshold changed. Original first-call latency is unavailable in runner metrics and is reported as null; usage and cost include its original raw response. Outputs have not been inspected for headline quality before resumption. No automatic retries.
