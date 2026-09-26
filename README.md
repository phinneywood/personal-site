# Antonio Skilton — personal website

A one-page Astro portfolio: a short biography, Long Form, and GitHub / LinkedIn links. Independent of the Long Form application.

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

Approved site source is ready for an initial Vercel build. Content tests have passed locally. A production Astro build remains unverified; earlier dependency installation failed with registry DNS `EAI_AGAIN`, and an earlier Vercel deployment tool call failed. No hosted preview or domain change is claimed by this README.
