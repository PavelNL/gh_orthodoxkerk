# HOWTO configure Nginx as a reverse proxy

**Category:** Web Server / Networking
**Last updated:** 2026-02-25
**Audience:** DevOps, Developers

---

## Overview

Nginx can sit in front of your application server to handle TLS termination, load balancing, caching, and static-file serving. This manual covers a basic reverse-proxy setup.

## Installation

```bash
# Debian / Ubuntu
sudo apt update && sudo apt install nginx

# macOS
brew install nginx
```

## Basic reverse-proxy configuration

Create `/etc/nginx/sites-available/myapp`:

```nginx
server {
    listen 80;
    server_name dev.example.local;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## Adding HTTPS

```nginx
server {
    listen 443 ssl http2;
    server_name dev.example.local;

    ssl_certificate     /etc/ssl/certs/server.crt;
    ssl_certificate_key /etc/ssl/private/server.key;

    location / {
        proxy_pass http://127.0.0.1:3000;
        # ... same headers as above
    }
}

server {
    listen 80;
    server_name dev.example.local;
    return 301 https://$host$request_uri;
}
```

## WebSocket support

Add inside the `location` block:

```nginx
proxy_http_version 1.1;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection "upgrade";
```

## Debugging tips

- `sudo nginx -t` — validate configuration syntax.
- `tail -f /var/log/nginx/error.log` — watch for runtime errors.
- `curl -I http://dev.example.local` — check response headers.

## Related manuals

- [01 — DNS via hosts file](01-dns-hosts-file.md)
- [02 — Self-signed SSL](02-ssl-local-dev.md)
- [10 — Firewall rules](10-firewall-rules.md)
