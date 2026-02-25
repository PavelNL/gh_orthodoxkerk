# HOWTO set up self-signed SSL certificates for local development

**Category:** Security / TLS
**Last updated:** 2026-02-25
**Audience:** Developers

---

## Overview

Running HTTPS locally lets you catch mixed-content issues early and test secure-cookie behaviour. This guide walks through generating a self-signed certificate with `mkcert` or `openssl`.

## Option A — mkcert (recommended)

```bash
# Install (macOS)
brew install mkcert nss

# Create a local CA
mkcert -install

# Generate cert for your dev domain
mkcert dev.example.local localhost 127.0.0.1
```

This produces `dev.example.local+2.pem` and `dev.example.local+2-key.pem`.

## Option B — openssl

```bash
openssl req -x509 -nodes -days 365 \
  -newkey rsa:2048 \
  -keyout server.key \
  -out server.crt \
  -subj "/CN=dev.example.local"
```

## Using the certificate

### Node.js

```js
const https = require('https');
const fs = require('fs');

https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt')
}, app).listen(443);
```

### Nginx

```nginx
server {
    listen 443 ssl;
    server_name dev.example.local;
    ssl_certificate     /path/to/server.crt;
    ssl_certificate_key /path/to/server.key;
}
```

## Trust the certificate

- **macOS:** Double-click the `.crt`, add to Keychain, set "Always Trust".
- **Windows:** Import into "Trusted Root Certification Authorities" via `certmgr.msc`.
- **Linux:** Copy to `/usr/local/share/ca-certificates/` and run `sudo update-ca-certificates`.

## Related manuals

- [01 — DNS via hosts file](01-dns-hosts-file.md)
- [05 — Nginx reverse proxy](05-nginx-reverse-proxy.md)
