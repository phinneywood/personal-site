# Antonio Skilton — personal website

Source for [antonioskilton.com](https://antonioskilton.com): a concise introduction to Antonio Skilton, with Long Form, Outer Harness, and links to LinkedIn and GitHub.

A one-page Astro site with warm off-white surfaces, dark green typography, restrained rust accents, and an editorial layout. Independent of the Long Form application.

## Development

Use Node.js 22.12 or newer.

```sh
npm install
npm run dev
```

## Verification

```sh
npm test
npm run build
npm run preview
```

`npm test` generates `preview/index.html` and runs the content and safety tests. The production build writes `dist/`. Commit `package-lock.json` after the first successful install, then use `npm ci`. The standalone preview is for design review; it is not a substitute for the Astro production build.

## Deployment

Import this repository into a **separate** Vercel project. Use the Astro preset, build command `npm run build`, and output directory `dist`. Do not attach the main domain until the hosted preview has been verified.

Private GitHub organization repositories require Vercel Pro for Git-connected deployment. Public repositories can use Hobby. Repository visibility does not by itself control website visibility.

Before the approved public launch, remove preview `noindex, nofollow` from the page and the `X-Robots-Tag` response header, update the matching test, add the canonical URL, and connect `antonioskilton.com` with a `www` redirect. Preserve existing app and email DNS records.

## Scope

No backend, account system, CMS, form, analytics, or third-party asset requests. Do not commit credentials, environment files, workplace code, or private notes.

The approved biography is one paragraph. Long Form remains linked to `https://reader.antonioskilton.com` until its new subdomain is verified. Profile links use Antonio's personal GitHub and LinkedIn profiles.

## Status

The site is publicly reachable at https://antonioskilton.com. Live HTML was verified during the profile presentation review. It still includes the preview `noindex, nofollow` directive; search-indexing cleanup remains a separate launch follow-up. This documentation update does not change site code, deployment configuration, or DNS.

## Agent Report

Agent Report was a public AI/agentic coding news experiment, retired September 30, 2026. Its public page, feeds and automatic refreshes have been removed. The portfolio biography is unchanged. [Historical documentation and retirement record](docs/agent-report/retirement.md) remain available; source and data history are retained.
