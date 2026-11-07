# Manage the public profile

## One project, two boundaries

- `src/pages/index.astro` and `public/`: published website and public assets.
- `profiles/public-profile.json`: inventory of already-public biography and URLs;
  tests catch drift from the page. It is not a new approval to rewrite either surface.
- `docs/`: public-safe build, release and editorial process.
- `.profile-private/`: ignored local LinkedIn snapshot, proposed copy, evidence,
  review decisions and capture notes. Never upload it or put it in site assets.

GitHub is public. Ignored local files are not a backup and can still be force-added
by an operator. Inspect `git diff --cached` before every push. Keep a separate private
backup through an owner-approved backup process if retaining drafts matters. Vercel
upload exclusions and built-output checks are additional safeguards, not encryption.

## LinkedIn capabilities and first review

The connected LinkedIn interface verified
https://www.linkedin.com/in/antonioskilton. Its available operation is people search;
it did not return the actual headline, About, experience, or Featured sections, and
it provides no edit operation. Do not represent a search result as a profile audit.

First capture current headline, About, and public Featured URLs using the owner's
provided text/export or an authorized signed-in read. Record the date and exact
profile identity. Do not collect connections, messages, passwords, cookies, or
private contacts. Use `profiles/linkedin-snapshot.example.json` as the structure and
save the completed baseline at `.profile-private/linkedin-current.json`. Do not
commit the capture. A missing baseline remains an explicit blocker, not a clean bill
of health or permission to automate scraping.

## Review and update workflow

1. Compare website, LinkedIn and project descriptions. Confirm current title,
   responsibility, public-safe accomplishments, dates, and what the profile should
   attract. Do not infer a promotion, employer disclosure, metric, or job search.
2. Draft only supported copy in `.profile-private/linkedin-proposed.json`, using
   the same `url`, `headline`, `about`, and `featured` fields as the baseline.
3. Run `./scripts/npm-local.sh run profile:review`. This offline comparison prints
   exact before/proposed copy. It makes no network requests or profile edits. It
   exits 2 if a baseline/proposal is missing or invalid. Keep the output private.
4. Review the precise copy, scope, public audience and any associated notification
   behavior with Antonio. Record his decision and the exact approved version
   privately. A field comparison is not an approval record.
5. Use a supported authorized editor, or have Antonio paste approved text into
   LinkedIn. No current edit integration is available. Capture the visible saved
   result and date; recheck website consistency and replace the private baseline.
6. Keep review cadence manual unless Antonio requests a scheduled check. Future
   monitoring should report changes or stale facts and draft suggestions, never
   post, update experience, message contacts, or change a profile without approval.

A local starter proposal based only on the existing site biography is available in
`.profile-private/`. It is unapproved. Experience claims and metrics deliberately
remain absent until evidence and current priorities are reviewed.

## Sensible content priorities

- Agree the positioning: technical program management, machine learning delivery,
  and hands-on agentic work already appear in the public biography.
- Align headline and About with the approved positioning, in Antonio's language.
- Consider Long Form and Outer Harness for Featured only after checking their
  current presentation and what audience should see them.
- Reconcile role/experience dates and concrete achievements from verified facts.
- Review the website's search-indexing choice, canonical URL, and social preview.

No LinkedIn scraping, publishing integration, OAuth grant, scheduled profile job,
new external sharing, or profile change is part of this local setup.
