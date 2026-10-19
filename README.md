# MaxTopNet — Dynamic ISP Website + Admin Panel

A full-stack, fully dynamic ISP website. Every section is managed from an admin
panel (no code changes needed). Monorepo: Next.js frontend + Express/MongoDB
backend, deployable to Coolify with a single `docker-compose.yml`.

## Structure

```
max-top-net/
├── max-top-backend/     # Express + MongoDB API (port 5000)
│   ├── models/          # Mongoose schemas
│   ├── routes/          # auth, upload, messages
│   ├── middleware/      # JWT auth, multer upload
│   ├── utils/           # generic CRUD factory
│   ├── scripts/         # export-data / maintenance scripts
│   ├── seed-data/       # content snapshot auto-imported on first prod boot
│   ├── uploads/         # uploaded images
│   ├── bootstrap.js     # ensures admin + imports seed-data if DB empty
│   └── Dockerfile
├── max-top-frontend/    # Next.js 16 + React 19 (port 3000)
│   ├── src/app/(site)/  # public website (home + menu pages)
│   ├── src/app/admin/   # admin panel
│   └── Dockerfile
└── docker-compose.yml   # mongo + backend + frontend (Coolify)
```

## Local development

Requires a local MongoDB at `mongodb://127.0.0.1:27017`.

```bash
# backend
cd max-top-backend
npm install
cp .env.example .env     # first time
npm run seed             # first time: default data + admin
npm run dev              # http://localhost:5000

# frontend (new terminal)
cd max-top-frontend
npm install
npm run dev              # http://localhost:3000
```

- Website: http://localhost:3000
- Admin: http://localhost:3000/admin

## Architecture (production)

- Only the **frontend** is exposed on the public domain.
- The frontend proxies `/api/*` and `/uploads/*` to the internal **backend**
  via Next.js rewrites (`next.config.ts`), so there is no CORS and no separate
  API subdomain.
- **MongoDB** runs internally (not publicly exposed).
- On first boot the backend imports `seed-data/` (a snapshot of the local
  content) and ensures an admin user exists.

## Deploy to Coolify

1. Push this repo to GitHub.
2. In Coolify, create a project (e.g. **Max-top-net**) → add a **Docker Compose**
   resource pointing to this repo (`docker-compose.yml` at the root).
3. Set these environment variables in Coolify:

   | Variable | Example |
   |---|---|
   | `JWT_SECRET` | a long random string |
   | `ADMIN_EMAIL` | `admin@maxtopnet.com` |
   | `ADMIN_PASSWORD` | a strong password |
   | `CLIENT_URL` | `https://maxtopnet.com` |
   | `SERVICE_FQDN_FRONTEND_3000` | `https://maxtopnet.com` |

4. Deploy. Coolify builds all three services and issues SSL via Let's Encrypt.

### DNS (Cloudflare)

Point the domain to the server (`169.58.147.232`). Use **DNS only** (grey cloud)
so Coolify/Traefik can issue Let's Encrypt certificates:

| Type | Name | Content |
|---|---|---|
| A | `@` | `169.58.147.232` |
| A | `www` | `169.58.147.232` |

Both `maxtopnet.com` and `www.maxtopnet.com` resolve to the frontend; HTTP
redirects to HTTPS automatically.
