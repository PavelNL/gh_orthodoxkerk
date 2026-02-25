# HOWTO manage firewall rules and port forwarding

**Category:** Security / Networking
**Last updated:** 2026-02-25
**Audience:** DevOps, SRE

---

## Overview

Proper firewall configuration is essential for limiting the attack surface of production and development servers. This manual covers `ufw` (Ubuntu) and `iptables` basics, plus port-forwarding for NAT environments.

## UFW (Uncomplicated Firewall)

### Basic commands

```bash
# Enable firewall
sudo ufw enable

# Check status
sudo ufw status verbose

# Allow SSH
sudo ufw allow 22/tcp

# Allow HTTP and HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Allow from a specific IP
sudo ufw allow from 10.0.0.5 to any port 5432

# Deny all other incoming
sudo ufw default deny incoming
sudo ufw default allow outgoing
```

### Removing a rule

```bash
sudo ufw status numbered
sudo ufw delete <number>
```

## iptables (advanced)

```bash
# Allow established connections
sudo iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT

# Allow SSH
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT

# Drop everything else
sudo iptables -A INPUT -j DROP

# Save rules (Debian/Ubuntu)
sudo iptables-save > /etc/iptables/rules.v4
```

## Port forwarding

Forward external port 8080 to internal service on port 3000:

```bash
sudo iptables -t nat -A PREROUTING -p tcp --dport 8080 -j REDIRECT --to-port 3000
```

For forwarding to another host (requires IP forwarding enabled):

```bash
echo 1 | sudo tee /proc/sys/net/ipv4/ip_forward
sudo iptables -t nat -A PREROUTING -p tcp --dport 8080 -j DNAT --to-destination 192.168.1.100:3000
sudo iptables -t nat -A POSTROUTING -j MASQUERADE
```

## Best practices

- **Principle of least privilege:** only open ports that are actively needed.
- **Rate-limit SSH:** `sudo ufw limit 22/tcp` to prevent brute-force attempts.
- **Log denied traffic:** `sudo ufw logging on` for audit and debugging.
- **Document all rules** in this manual and in infrastructure-as-code.

## Related manuals

- [05 — Nginx reverse proxy](05-nginx-reverse-proxy.md)
- [07 — SSH key management](07-ssh-key-management.md)
