# Setting up monitoring and alerting with Prometheus & Grafana

**Category:** Observability
**Last updated:** 2026-02-25
**Audience:** DevOps, SRE

---

## Overview

We use **Prometheus** for metrics collection and **Grafana** for dashboards and alerting. This guide covers initial setup, key dashboards, and alert rules.

## Architecture

```
App  ──▶  /metrics endpoint
              │
        Prometheus (scrape every 15s)
              │
          Grafana  ──▶  Slack / Email alerts
```

## Installation (Docker Compose)

Add to `docker-compose.monitoring.yml`:

```yaml
services:
  prometheus:
    image: prom/prometheus:v2.51.0
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    ports:
      - "9090:9090"

  grafana:
    image: grafana/grafana:10.4.0
    ports:
      - "3001:3000"
    environment:
      GF_SECURITY_ADMIN_PASSWORD: changeme
```

## Prometheus configuration

`prometheus.yml`:

```yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'webapp'
    static_configs:
      - targets: ['web:8080']
```

## Key metrics to monitor

| Metric | Type | Alert threshold |
|--------|------|-----------------|
| `http_request_duration_seconds` | Histogram | p99 > 2s |
| `http_requests_total` | Counter | 5xx rate > 1% |
| `node_memory_MemAvailable_bytes` | Gauge | < 256 MB |
| `pg_stat_activity_count` | Gauge | > 90% of max_connections |

## Creating a Grafana dashboard

1. Open Grafana at `http://localhost:3001`.
2. Add Prometheus as a data source (`http://prometheus:9090`).
3. Import dashboard ID **1860** (Node Exporter Full) from grafana.com.
4. Create custom panels with PromQL queries.

## Alert rules

Configure in Grafana under **Alerting > Alert rules**:

- **High error rate:** `rate(http_requests_total{status=~"5.."}[5m]) / rate(http_requests_total[5m]) > 0.01`
- **Slow responses:** `histogram_quantile(0.99, rate(http_request_duration_seconds_bucket[5m])) > 2`

## Related manuals

- [04 — Docker Compose setup](04-docker-compose-setup.md)
- [06 — Backup & restore](06-backup-restore.md)
