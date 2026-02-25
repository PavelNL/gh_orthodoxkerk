# Getting started with Docker Compose for the project stack

**Category:** Containerisation
**Last updated:** 2026-02-25
**Audience:** Developers

---

## Overview

The project ships a `docker-compose.yml` that spins up all required services (web server, database, cache) in isolated containers. This guide gets you from zero to a running local stack.

## Prerequisites

- Docker Engine 24+ and Docker Compose v2+
- At least 4 GB RAM allocated to Docker

## Quick start

```bash
# Clone the repo
git clone git@github.com:org/project.git
cd project

# Copy the example env file
cp .env.example .env

# Start all services
docker compose up -d

# Verify
docker compose ps
```

The application will be available at `http://localhost:8080`.

## Service overview

| Service | Image | Port |
|---------|-------|------|
| web | `node:20-alpine` | 8080 |
| db | `postgres:16` | 5432 |
| cache | `redis:7-alpine` | 6379 |

## Useful commands

```bash
# View logs
docker compose logs -f web

# Rebuild after Dockerfile changes
docker compose build --no-cache web

# Stop everything
docker compose down

# Stop and remove volumes (full reset)
docker compose down -v
```

## Troubleshooting

- **Port conflicts:** change the host port mapping in `docker-compose.yml`.
- **Slow on macOS:** enable VirtioFS in Docker Desktop settings.
- **Permission errors:** ensure your user is in the `docker` group on Linux.

## Related manuals

- [05 — Nginx reverse proxy](05-nginx-reverse-proxy.md)
- [09 — Monitoring with Prometheus & Grafana](09-monitoring-alerts.md)
