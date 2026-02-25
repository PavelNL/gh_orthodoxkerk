# CI/CD pipeline configuration and troubleshooting

**Category:** Automation / DevOps
**Last updated:** 2026-02-25
**Audience:** Developers, DevOps

---

## Overview

All repositories use GitHub Actions for continuous integration and deployment. This document describes the pipeline stages, configuration files, and common troubleshooting steps.

## Pipeline stages

```
push / PR ──▶ Lint ──▶ Test ──▶ Build ──▶ Deploy (main only)
```

| Stage | Tool | Timeout |
|-------|------|---------|
| Lint | ESLint + Prettier | 2 min |
| Test | Jest (unit) + Playwright (e2e) | 10 min |
| Build | Docker build | 5 min |
| Deploy | SSH + Docker Compose | 3 min |

## Key files

- `.github/workflows/ci.yml` — main workflow
- `.github/workflows/deploy.yml` — production deploy (triggered on tag)
- `Dockerfile` — application container
- `docker-compose.prod.yml` — production stack definition

## Environment secrets

Secrets are stored in GitHub repository settings under **Settings > Secrets and variables > Actions**:

- `SSH_PRIVATE_KEY` — deploy key for the production server
- `DOCKER_REGISTRY_TOKEN` — push access to the container registry
- `DATABASE_URL` — production database connection string

## Troubleshooting

### Tests fail only in CI

- Check Node.js version matches (see `.nvmrc`).
- Playwright needs browsers installed: `npx playwright install --with-deps`.
- Time-zone–dependent tests: CI runs in UTC.

### Deploy step hangs

- Verify `SSH_PRIVATE_KEY` has not expired.
- Check that the production server's firewall allows SSH from GitHub Actions IP ranges.

### Cache issues

```yaml
- uses: actions/cache@v4
  with:
    path: node_modules
    key: ${{ runner.os }}-node-${{ hashFiles('package-lock.json') }}
```

If dependencies seem stale, delete the cache in the GitHub Actions UI.

## Related manuals

- [03 — Git branching model](03-git-branching-model.md)
- [04 — Docker Compose](04-docker-compose-setup.md)
