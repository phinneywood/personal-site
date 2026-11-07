# Status: 2026-11-07

## Observed before local changes

- Public remote: `phinneywood/personal-site`, head
  `d5e58fc57c61968abfd1b84ad8a299f37b6449f8`.
- A new checkout was created in the Mac mini's focused `Developer/projects` tree.
- Vercel production is READY at that same commit. Apex HTTPS serves the portfolio;
  `www` is configured to redirect to it. Both search-indexing safeguards remain.
- GitHub site-checks succeeded for that commit:
  https://github.com/phinneywood/personal-site/actions/runs/41242333884.
- An existing scheduled HTTPS watch succeeded on 2026-11-07:
  https://github.com/phinneywood/personal-site/actions/runs/42392273284.
- LinkedIn search resolved the correct URL but supplied no editable profile fields.

## Prepared locally

Branch: `chore/public-profile-workspace`. Added a pinned project-local Mac Node
bootstrap, deterministic verify command, profile inventory and drift/privacy tests,
offline LinkedIn comparison, deployment/rollback runbook, and private draft space.
The website copy, styles, routing, Vercel configuration, and existing watch schedule
are unchanged. No Git push, hosted preview, production deploy or LinkedIn edit was
performed.

## Next decisions

Capture current LinkedIn text and settle the intended public positioning. Review
exact proposed copy before edits. Decide separately whether the site should become
search-indexable. Publishing the local operational changes also needs approval,
because branch pushes can trigger Vercel deployments.

## Local verification

- Official pinned Node runtime and locked dependencies installed successfully.
- 16 tests and the Astro production build passed, including built-output privacy
  checks. No page source, styles or public asset changes were made.
- The inherited lockfile had high-severity advisories in Undici, Vite and Zod.
  Compatible transitive dependency updates cleared all reported npm advisories;
  `npm audit` returned zero vulnerabilities. This fix is local and not deployed.
- The offline LinkedIn review correctly exits 2 with an explicit missing-baseline
  message. There is no pretend current snapshot.
- Shell syntax checks and `git diff --check` passed.
- The local preview served the homepage, stylesheet, project image and Clawdo
  information pages with HTTP 200. Private profile paths and the retired Agent
  Report returned 404. The temporary preview process was stopped afterward.
- Live browser visual review could not run because no browser was available in
  this execution session. Source/content and HTTPS checks are not visual QA.

## Chrome workflow follow-up

The LinkedIn workflow now explicitly uses Google Chrome, including a repeatable
capture checklist and validated capture provenance. Chrome is installed on the
Mac mini. Browser connection was unavailable during the check, and the native
Chrome path then reported that the Mac was locked and could not be automatically
unlocked. The next required action is to unlock the Mac manually, then inspect the
existing Chrome session. No sign-in, credential export, browser-setting change,
LinkedIn edit or schedule was performed. Capture is still incomplete.
The updated 17-test suite, production build and output-privacy checks all pass.
