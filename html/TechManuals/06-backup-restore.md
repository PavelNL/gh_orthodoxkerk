# Backup and restore procedures for production data

**Category:** Operations / Data Safety
**Last updated:** 2026-02-25
**Audience:** DevOps, SRE

---

## Overview

This document covers the automated backup schedule, manual backup procedures, and step-by-step restore instructions for the production PostgreSQL database and uploaded media files.

## Backup schedule

| What | Frequency | Retention | Storage |
|------|-----------|-----------|---------|
| Database (pg_dump) | Every 6 hours | 30 days | S3 `backups/db/` |
| Media uploads | Daily at 02:00 UTC | 90 days | S3 `backups/media/` |
| Full VM snapshot | Weekly (Sunday) | 4 weeks | Cloud provider |

## Manual database backup

```bash
pg_dump -Fc -h localhost -U appuser appdb > backup_$(date +%Y%m%d_%H%M%S).dump
```

Upload to S3:

```bash
aws s3 cp backup_*.dump s3://project-backups/db/
```

## Restore procedure

### Database

```bash
# 1. Download the backup
aws s3 cp s3://project-backups/db/backup_20260225_120000.dump .

# 2. Stop the application
sudo systemctl stop myapp

# 3. Restore
pg_restore -c -h localhost -U appuser -d appdb backup_20260225_120000.dump

# 4. Restart
sudo systemctl start myapp
```

### Media files

```bash
aws s3 sync s3://project-backups/media/ /var/www/uploads/ --delete
```

## Verification

After every restore, run:

```bash
psql -h localhost -U appuser -d appdb -c "SELECT count(*) FROM users;"
```

Compare the count with the expected value from the backup log.

## Related manuals

- [04 — Docker Compose setup](04-docker-compose-setup.md)
- [09 — Monitoring & alerting](09-monitoring-alerts.md)
