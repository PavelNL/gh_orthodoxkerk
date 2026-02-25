# Git branching model and release workflow

**Category:** Version Control
**Last updated:** 2026-02-25
**Audience:** All team members

---

## Overview

This document describes the branching strategy used across all project repositories. We follow a simplified Git-Flow model with three long-lived branches.

## Branch types

| Branch | Purpose | Merges into |
|--------|---------|-------------|
| `main` | Production-ready code | — |
| `develop` | Integration branch for the next release | `main` |
| `feature/*` | Individual feature work | `develop` |
| `hotfix/*` | Urgent production fixes | `main` + `develop` |

## Workflow

1. Create a feature branch from `develop`:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/my-feature
   ```
2. Commit frequently with descriptive messages.
3. Open a Pull Request into `develop`.
4. After code review and CI pass, merge (squash preferred).
5. When `develop` is release-ready, merge into `main` and tag.

## Commit message convention

```
<type>(<scope>): <subject>

<body>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`.

## Hotfix procedure

1. Branch from `main`: `git checkout -b hotfix/fix-description main`
2. Apply the fix, open PR to `main`.
3. After merge, cherry-pick or merge into `develop`.

## Related manuals

- [08 — CI/CD pipeline](08-ci-cd-pipeline.md)
