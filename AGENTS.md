# Public profile project

This repository manages antonioskilton.com and the review process for Antonio's
LinkedIn profile. Read README.md, docs/STATUS.md, docs/DEPLOYMENT.md, and
docs/PUBLIC-PROFILE.md before changing it.

- This GitHub repository is public. Only reviewed public material belongs in Git.
- Read `git status` first and preserve unrelated changes. Use a branch for changes.
- Keep private career facts, LinkedIn exports, draft wording, before/after captures,
  approvals, credentials, and account bindings in `.profile-private/` or a separate
  private record. Never put them under `public/` or `src/pages/`.
- Do not fetch or scrape authenticated LinkedIn pages automatically. Use a current,
  owner-provided snapshot or an authorized read through a supported interface.
- A request to review or prepare does not authorize a Git push, PR, Vercel preview,
  production deployment, indexing change, LinkedIn edit, post, or scheduled job.
  Obtain the appropriate approval for each public release and exact profile copy.
- Vercel is Git-connected: pushing may create a deployment. Inspect current project
  behavior and approval scope before pushing any branch.
- Preserve the approved biography, project URLs, noindex controls, Clawdo legal
  pages, and Agent Report retirement unless the requested change covers them.
- Run `./scripts/npm-local.sh run verify` before reporting implementation complete.
  Report passed, failed, and not-run checks separately. Never equate a local build
  with a deployment or a LinkedIn review with a published update.
- No secrets are required to build this static site. Do not add API keys or copy
  machine credentials into the repo. Do not create tokens to make deploys easier.
