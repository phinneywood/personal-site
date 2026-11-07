# Repeatable LinkedIn capture in Chrome

Use **Google Chrome on the Mac mini** for this project's LinkedIn work. The browser
choice applies to initial capture and later reviews. The owner expects the Mac
to remain locked, so this interactive Mac capture path is not the default ongoing
solution; review [locked-Mac options](LOCKED-MAC-OPTIONS.md) before setup. Do not switch to Safari to get
around a missing connection, a lock screen, or a sign-in step.

## Setup boundary

Use the installed Chrome application and its ordinary owner-selected profile. Keep
browser session data in Chrome; this repository is not a browser-profile store.
No remote-debugging port, cloned user-data directory, exported cookies, OAuth token,
saved password, new extension, or background scraper is required by this workflow.
The local comparison is offline and does not sign in or change LinkedIn.

Being installed does not mean Chrome is controllable, signed in, or showing the
right LinkedIn identity. Check each separately. Do not label capture ready until the
profile is visibly readable through an available supported Chrome connection or
native Chrome interface.

## Capture checklist

1. Unlock the Mac mini if the interface reports it locked. Do not alter lock or
   security settings. Open Google Chrome through its supported interface.
2. Check the visible Chrome profile and LinkedIn account. Reuse an existing valid
   owner session. If login, account selection, new browser permission or other
   setup is needed, stop that step and obtain the required owner approval. Never
   collect passwords or copy authentication data into the project.
3. Open `https://www.linkedin.com/in/antonioskilton` in Chrome. Verify the URL and
   visible profile name, not merely the browser account or a search result. A wrong
   profile, challenge page or unreadable section is a blocker, not an empty field.
4. Read the full headline, expand About if necessary, and inspect the Featured
   section. Record exact text and public destination URLs. Read only these requested
   fields; do not collect connections, messages or private contact information.
5. Copy the example structure from `profiles/linkedin-snapshot.example.json` to
   `.profile-private/linkedin-current.json`. Replace placeholders with observed text,
   actual capture date and Featured URLs. Set `capture.profileIdentityVerified` to
   true only after the preceding identity check. Keep `capture.browser` as
   `Google Chrome` and `capture.method` as `visible-profile`.
6. If a section is missing or cannot be fully read, document that privately and
   leave capture blocked. Do not invent content, use search snippets as full text,
   or use an empty Featured list unless you verified the section has no items.
7. Prepare separate proposed copy in `.profile-private/linkedin-proposed.json` and
   run the offline review:

   ```sh
   ./scripts/npm-local.sh run profile:review
   ```

   The command verifies provenance and displays exact differences. Missing data,
   an unverified identity, or a non-Chrome baseline causes exit 2. Valid provenance
   is an operator assertion, not proof that a browser check occurred; retain a
   short private capture note so the observation can be reviewed.
8. Review the wording with Antonio before any LinkedIn edit. A later approved edit
   should use the same Chrome profile, recheck identity, apply only approved fields,
   and verify the visible saved result before replacing the baseline. Preserve the
   prior private baseline until successful verification.

## Repeatability and monitoring

Repeat these same steps when asked to review the profile. Do not silently run
unattended monitoring: a locked Mac, expired session or LinkedIn page change must
surface as a blocker. No scheduled capture or posting job is enabled here.

Private capture notes should record date, browser, observed profile URL, which
sections were fully inspected, and remaining limitations. Keep secrets and session
files out of those notes. Any screenshot should stay private and exclude unrelated
Chrome tabs, messages, account menus and contacts.

## Current verification

Chrome installation was confirmed. Creating a connected Chrome tab returned that
Chrome was unavailable in that session; the native Chrome inspection then reported
the Mac was locked. The Chrome capture therefore has **not** been completed or
validated end-to-end. The owner subsequently specified that the Mac will stay
locked. Do not keep asking for unlock or retry native input against this condition.
Choose an appropriate architecture from the locked-Mac options before continuing.
