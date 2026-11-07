# Antonio Skilton — personal website

Source for [antonioskilton.com](https://antonioskilton.com): a concise introduction to Antonio Skilton, with Long Form, Outer Harness, and links to LinkedIn and GitHub.

A one-page Astro site with warm off-white surfaces, dark green typography, restrained rust accents, and an editorial layout. Independent of the Long Form application.

## Public-profile workspace

This project also holds the review-first LinkedIn workflow. Read
[Public profile](docs/PUBLIC-PROFILE.md), [Current status](docs/STATUS.md), and
[Build/deploy runbook](docs/DEPLOYMENT.md). Unpublished LinkedIn copy and snapshots
stay in ignored `.profile-private/`, never in this public repository or website.

## Development

Use Node 24, matching CI and Vercel. The Apple Silicon Mac setup installs the pinned
runtime inside this checkout without changing system settings:

```sh
./scripts/setup-mac.sh
./scripts/npm-local.sh run dev -- --host 127.0.0.1
```

With your own Node 24 installation, use `npm ci` and `npm run dev` instead.

## Verification

```sh
./scripts/npm-local.sh run verify
./scripts/npm-local.sh run preview -- --host 127.0.0.1
```

Verification runs content/unit tests, builds Astro into `dist/`, and checks that the
private workspace is absent from the output. `npm test` also creates a standalone
`preview/index.html` for review; it is not the production build.

## Deployment

The existing Vercel project `personal-site` already serves antonioskilton.com from
this repository. Do not import a duplicate project. The build is `npm run build`
and output is `dist/`. See the [release and rollback procedure](docs/DEPLOYMENT.md).
Pushing to GitHub can trigger a hosted preview or production deployment, so review
and approve the destination before pushing. A local build is not a deployment.

The live page still intentionally has `noindex, nofollow` in HTML and response
headers. Search indexing and social-preview improvements remain a separate,
approved release. Preserve existing application and email DNS records.

## Scope

No backend, account system, CMS, form, analytics, or third-party asset requests. Do not commit credentials, environment files, workplace code, or private notes.

The approved biography is one paragraph. Long Form remains linked to `https://reader.antonioskilton.com` until its new subdomain is verified. Profile links use Antonio's personal GitHub and LinkedIn profiles.

## Status

The site is publicly reachable at https://antonioskilton.com. Live HTML was verified during the profile presentation review. It still includes the preview `noindex, nofollow` directive; search-indexing cleanup remains a separate launch follow-up. This documentation update does not change site code, deployment configuration, or DNS.

## Agent Report

Agent Report was a public AI/agentic coding news experiment, retired September 30, 2026. Its public page, feeds and automatic refreshes have been removed. The portfolio biography is unchanged. [Historical documentation and retirement record](docs/agent-report/retirement.md) remain available; source and data history are retained.
