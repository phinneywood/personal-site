# LinkedIn workflow with an always-locked Mac

Research checkpoint: 2026-11-07. These are recommendations, not configured services.
Keep the Mac's security settings unchanged.

## What was verified

- Chrome is installed. The account remains logged in with a GUI session.
- Command-line project tooling works while the screen is locked.
- The existing AC power configuration has computer sleep disabled and a separate
  display-off timer. No power or security setting was changed.
- The currently available native-screen interface cannot operate the locked Mac.
  Its Chrome browser connection is unavailable in this session. That is not proof
  that all browser-level control must require an unlocked display.
- No headless Chrome session, additional browser connection, new login, credential
  store, profile export, remote-debugging listener, or persistent job was created.

A locked screen, a sleeping computer, a logged-out account and a restart are different
states. Results above apply to the observed logged-in, awake, locked machine. They
do not demonstrate unattended recovery after logout, reboot or an encrypted-volume
unlock. FileVault status was not successfully established by the read-only check.

## Recommended division of work

Keep the Mac mini as the source, build and private review host. It can prepare copy,
compare a supplied baseline, verify the site and hold release documentation while
remaining locked. These steps do not need an interactive LinkedIn session.

For the occasional current-profile capture and approved profile edit, use
owner-operated Google Chrome on an unlocked device the owner chooses. Return only
the requested profile text and public Featured links to the private workspace, with
capture provenance. Do not transfer the Chrome profile, cookies, account tokens or
messages. This device choice has not been made or configured yet.

The current capture schema already records Chrome and verified profile identity;
it is independent of machine hostname. Keep the website and LinkedIn copy managed
in this project without making the project an unattended LinkedIn account operator.

## Other options and their limits

### Headless Chrome on the Mac mini

Chrome officially supports running without visible windows, including macOS. This
is a plausible display-independent architecture for testing the user's own site.
It has not been tested on this machine. A benign local-page smoke test with an
isolated temporary profile would be the first verification, not a LinkedIn login.

A LinkedIn workflow would additionally need a separately authorized session,
credential/session handling, identity verification, and a plan for expirations,
MFA and challenge pages. Headless mode does not solve those issues. Do not reuse or
copy a normal authenticated Chrome profile to bypass login or screen access.

For command-line remote debugging, Chrome 136 and later require a non-default
user-data directory; Chrome recommends separating test profiles from real profiles.
A persistent debug connection or browser-session access is a separate security
change requiring explicit review, not a side effect of repository setup.

### Supported Chrome browser connection

A browser-level connection might avoid native screen input, but this session did not
have one available and locked-screen operation is untested. Evaluate only through a
supported setup flow and appropriate permission. Do not promise that an extension,
DevTools setting or grant will solve the lock constraint before testing it. Do not
install or grant persistent browser access merely to make a diagnostic work.

### Official LinkedIn API

The available connector performs people search, not full profile read/edit. Public
self-service LinkedIn API documentation covers limited identity/profile information
and social posting, not a general full-profile editor. OAuth setup would require
new authorization without necessarily providing the needed fields. Do not equate
posting permission with editing headline, About, experience or Featured.

## Why not default to a LinkedIn bot

LinkedIn's current help documentation prohibits third-party software and extensions
that scrape or automate activity on its website and describes account restrictions
for automated activity. A reliable technical browser connection does not remove
that platform risk. Prefer the official product and owner-operated capture/edit
boundary rather than unattended scraping or automated profile changes.

## Sources

- [Chrome Headless mode](https://developer.chrome.com/docs/automation-and-testing/headless)
- [Chrome remote debugging security changes](https://developer.chrome.com/blog/remote-debugging-port)
- [LinkedIn automated activity policy](https://www.linkedin.com/help/linkedin/answer/a1341543)
- [LinkedIn OpenID Connect capabilities](https://learn.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/sign-in-with-linkedin-v2)
- [LinkedIn API access and permissions](https://learn.microsoft.com/en-us/linkedin/shared/authentication/getting-access)
