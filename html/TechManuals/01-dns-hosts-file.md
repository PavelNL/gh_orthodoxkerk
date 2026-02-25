# HOWTO configure DNS to Dev-Test servers using HOSTS file

**Category:** Networking / DNS
**Last updated:** 2026-02-25
**Audience:** Developers, QA Engineers

---

## Overview

When developing or testing against internal servers that do not have public DNS records, you can override name resolution locally by editing the system **hosts** file. This avoids the need to set up a local DNS server and gives you instant, per-machine control over which IP address a hostname resolves to.

## Prerequisites

- Administrator / root access on your workstation
- The IP address of the target Dev or Test server
- The hostname you want to map (e.g. `dev.example.local`)

## Locating the hosts file

| OS | Path |
|----|------|
| **Windows** | `C:\Windows\System32\drivers\etc\hosts` |
| **macOS / Linux** | `/etc/hosts` |

## Step-by-step instructions

### 1. Open the hosts file with elevated privileges

**Windows (PowerShell as Administrator):**

```powershell
notepad C:\Windows\System32\drivers\etc\hosts
```

**macOS / Linux:**

```bash
sudo nano /etc/hosts
```

### 2. Add the mapping

Append a line in the format `<IP>  <hostname>`:

```
136.244.100.211   orthodoxkerk.dev
```

- Use **spaces or tabs** between the IP and hostname.
- You may add multiple hostnames on the same line.
- Lines starting with `#` are comments.

### 3. Save and close the file

### 4. Flush the DNS cache

**Windows:**

```powershell
ipconfig /flushdns
```

**macOS (Ventura+):**

```bash
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
```

**Linux (systemd-resolved):**

```bash
sudo systemd-resolve --flush-caches
```

### 5. Verify the resolution

```bash
ping dev.example.local
# or
nslookup dev.example.local
```

> **Note:** `nslookup` may bypass the hosts file on some systems. Use `ping` or `getent hosts` on Linux for a reliable check.

## Common pitfalls

- **Trailing whitespace** — some editors add invisible characters; use a plain-text editor.
- **VPN / corporate DNS** — a VPN client may override local resolution. Disconnect or configure split-tunneling.
- **Browser DNS cache** — Chrome, Firefox and Edge maintain their own DNS cache. Restart the browser or clear its socket pools (`chrome://net-internals/#dns`).
- **Permissions** — forgetting `sudo` or not running as Administrator will result in a read-only save error.

## Reverting changes

Simply delete or comment out the lines you added and flush the cache again.

## External references

- [How to edit the hosts file](https://informatecdigital.com/en/how-to-edit-the-hosts-file/) — detailed walkthrough with screenshots
