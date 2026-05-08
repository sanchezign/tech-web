# tech-web

A full-stack web application built with Next.js 15 (frontend) and NestJS (backend), organized as a pnpm monorepo.

---

## Prerequisites

| Tool | Version |
|------|---------|
| Node.js | 20 LTS |
| pnpm | 9.x |
| MongoDB | Atlas account (or local instance) |

Install pnpm if you do not have it:

```bash
npm install -g pnpm@9
```

---

## Local Setup

```bash
# 1. Clone the repository
git clone <your-repo-url> tech-web
cd tech-web

# 2. Install all workspace dependencies
pnpm install

# 3. Configure the frontend
cp apps/web/.env.example apps/web/.env.local
# Edit apps/web/.env.local and set NEXT_PUBLIC_API_URL

# 4. Configure the backend
cp apps/api/.env.example apps/api/.env
# Edit apps/api/.env and set MONGODB_URI (and any other vars)

# 5. Start both apps in parallel
pnpm dev
```

The frontend will be available at `http://localhost:3000` and the backend at `http://localhost:3001`.

---

## Running Apps Individually

```bash
# Frontend only
pnpm --filter @tech-web/web dev

# Backend only
pnpm --filter @tech-web/api dev
```

---

## Workspace Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start both apps in parallel (Turbopack + NestJS watch) |
| `pnpm build` | Build web then api |
| `pnpm lint` | ESLint across all workspaces |
| `pnpm typecheck` | TypeScript typecheck across all workspaces |

---

## Environment Variables

### apps/web — Next.js frontend

Copy `apps/web/.env.example` to `apps/web/.env.local`.

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_API_URL` | yes | Backend API base URL (e.g. `http://localhost:3001/api/v1`) |

### apps/api — NestJS backend

Copy `apps/api/.env.example` to `apps/api/.env`.

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NODE_ENV` | no | `development` | `development` \| `production` \| `test` |
| `PORT` | no | `3001` | HTTP port the server listens on |
| `MONGODB_URI` | yes | — | MongoDB connection string |
| `CORS_ORIGIN` | no | `http://localhost:3000` | Allowed CORS origin |
| `LOG_LEVEL` | no | `info` | Pino log level (`fatal` \| `error` \| `warn` \| `info` \| `debug` \| `trace`) |

---

## Deployment

### Frontend — Vercel

1. Import the repository in the [Vercel dashboard](https://vercel.com/new).
2. Set the **Root Directory** to `apps/web`.
3. Vercel will detect Next.js automatically. The `apps/web/vercel.json` config provides the build settings.
4. Add environment variables in **Project → Settings → Environment Variables**:
   - `NEXT_PUBLIC_API_URL` — your deployed Render backend URL (e.g. `https://tech-web-api.onrender.com/api/v1`)

### Backend — Render

1. In the [Render dashboard](https://render.com), create a new **Blueprint** and connect your repository.
2. Render will detect `render.yaml` at the repo root and provision the `tech-web-api` service.
3. After the first deploy, set the secret environment variables in **Environment → Secret Variables**:
   - `MONGODB_URI` — your MongoDB Atlas connection string
   - `CORS_ORIGIN` — your deployed Vercel frontend URL (e.g. `https://tech-web.vercel.app`)

---

## CI/CD

GitHub Actions runs on every pull request and push to `main`:

- Lint (ESLint across all workspaces)
- Typecheck (TypeScript across all workspaces)
- Build (Next.js + NestJS)

Workflow file: `.github/workflows/ci.yml`
