# SSH key generation, rotation, and agent forwarding

**Category:** Security / Access
**Last updated:** 2026-02-25
**Audience:** All team members

---

## Overview

SSH keys are the primary authentication method for accessing project servers and Git repositories. This guide covers key generation, best practices for rotation, and how to use the SSH agent.

## Generating a new key pair

```bash
ssh-keygen -t ed25519 -C "yourname@company.com" -f ~/.ssh/id_ed25519_project
```

- **ed25519** is preferred over RSA for performance and security.
- Use a strong passphrase when prompted.

## Adding to the SSH agent

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519_project
```

On macOS, persist across reboots by adding to `~/.ssh/config`:

```
Host *
    AddKeysToAgent yes
    UseKeychain yes
    IdentityFile ~/.ssh/id_ed25519_project
```

## Deploying the public key

```bash
# To a server
ssh-copy-id -i ~/.ssh/id_ed25519_project.pub user@server.example.com

# To GitHub / GitLab
cat ~/.ssh/id_ed25519_project.pub | pbcopy   # then paste in web UI
```

## Key rotation

1. Generate a new key pair.
2. Add the new public key to all servers and services.
3. Verify access with the new key.
4. Remove the old public key from `~/.ssh/authorized_keys` on servers.
5. Delete the old private key locally.

**Rotation schedule:** every 12 months, or immediately if compromise is suspected.

## Agent forwarding

To access a second server from the first without copying keys:

```bash
ssh -A user@jump-host.example.com
# Now from jump-host:
ssh user@internal-server.example.com
```

> **Security note:** Only enable agent forwarding to trusted hosts.

## Related manuals

- [10 — Firewall rules](10-firewall-rules.md)
- [08 — CI/CD pipeline](08-ci-cd-pipeline.md)
