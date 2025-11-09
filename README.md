# OSIRIS Deploy Console 🚀  
### "New Subdomain in 60 Seconds"

A Next.js + shadcn + Tailwind interface for deploying Dockerized apps to subdomains through Traefik and Cloudflare — in a single click.

---

## 🧠 Concept

The console bridges your **Coolify/Dokploy stack** and your **Traefik gateway**, reusing the universal `deploy-subdomain` script that automates:
1. DNS creation on Cloudflare  
2. Container launch on Docker  
3. Traefik route registration + Let's Encrypt certificate issuance  

You get:
- instant HTTPS subdomains,
- zero downtime for existing apps,
- a clean dashboard for managing everything visually.

---

## ⚙️ Quick Setup

### 1. Clone
```bash
git clone https://github.com/theosirislabs/osiris-deploy-console.git
cd osiris-deploy-console
