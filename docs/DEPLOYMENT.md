# Build and deployment

## Existing service, checked 2026-11-07

- Source: https://github.com/phinneywood/personal-site, production branch `main`.
- Vercel project: `personal-site`, team `phinneywood`, Astro framework, Node 24.x.
- Build: `npm run build`; artifact: `dist/`; lockfile: `package-lock.json`.
- Public domain: https://antonioskilton.com.
- https://www.antonioskilton.com is a verified 308 redirect to the apex domain.
- Last observed READY production deployment is commit
  `d5e58fc57c61968abfd1b84ad8a299f37b6449f8`:
  https://vercel.com/phinneywood/personal-site/CrWa92qqNhxxqJvCg1WHzSiNJRG9.
- Custom domains are publicly accessible. Vercel's non-custom deployment URLs have
  account protection configured. Do not change protection to make review easier.
- The static build needs no environment variables or tokens. Account access to
  manage Vercel and GitHub is separate from the source checkout.

## Reproduce on the Mac mini

From the project directory, run:

```sh
./scripts/setup-mac.sh
./scripts/npm-local.sh run verify
./scripts/npm-local.sh run dev -- --host 127.0.0.1
```

Setup installs official Node 24.22.2 into ignored `.tools/`, verifies its pinned
SHA-256, and runs `npm ci`. It does not change the system Node or shell profile.
The checksum comes from Node's official v24.22.2 release manifest. When upgrading,
review the release and update `.node-version`, `.nvmrc`, and the script's checksum
together. Other computers can use their own Node 24 installation with `npm ci`.

The `verify` command runs unit/content checks, builds Astro, and checks that private
profile workspace files are absent from the build. Test the production output with:

```sh
./scripts/npm-local.sh run preview -- --host 127.0.0.1
```

## Approved release procedure

1. Review the exact diff, including public copy and which destination is approved.
   Do not include `.profile-private/` or `.tools/`; inspect staged files. Confirm
   the intended commit author identity before publishing a local checkpoint.
2. Run `./scripts/npm-local.sh run verify`. Review desktop and mobile layouts when
   rendered content changes. Record the commit being proposed.
3. Before pushing, confirm the current Vercel Git integration and whether the push
   creates a preview or production deployment. A push is not a purely local step.
4. After approval, push the reviewed branch and use a draft pull request when a PR
   is requested. Inspect GitHub checks for that exact SHA and the hosted preview.
5. Merge to `main` only with production-release approval. The existing Git-connected
   Vercel service can deploy that commit automatically; do not create a second
   project or change DNS to deploy this site.
6. Check Vercel READY state, expected commit, custom-domain HTML, CSS, images,
   redirect, profile links, `/clawdo/` pages, and retired `/agent-report/` routes.
   Record the deployment and rollback candidate. Do not claim success from CI alone.

Current GitHub workflows: `site-checks.yml` verifies source/build, while the existing
`portfolio-https-watch.yml` samples public HTTPS and redirects. It already has a
schedule; this setup does not add one. GitHub cron is best effort and observed runs
have gaps, so a configured twice-hourly schedule is not a 30-minute guarantee.

## Rollback and indexing

Before release, record the previous known-good Vercel production deployment. For a
bad release, propose restoring that deployment, verify it is still available, obtain
rollback approval, then recheck the public domain and source reconciliation. Do not
silently force-push or rewrite Git history.

The live page and Vercel headers intentionally contain `noindex, nofollow`. Search
indexing is a separate release decision. When approved, remove both directives,
update tests, add a canonical URL and suitable social-preview metadata, and verify
live headers after deploy. `noindex` is not access control: the site is public now.
