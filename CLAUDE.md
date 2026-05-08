# tech-web — Monorepo Root

## Current Phase: COMPLETE — ready for deploy (Phase 3)

This is the monorepo root for the `tech-web` project.

## Structure

- `apps/web` — Next.js 15 frontend. See [apps/web/CLAUDE.md](apps/web/CLAUDE.md).
- `apps/api` — NestJS backend. See [apps/api/CLAUDE.md](apps/api/CLAUDE.md).

## Workspace Commands

| Command            | Description                          |
|--------------------|--------------------------------------|
| `pnpm dev`         | Start both apps in parallel          |
| `pnpm build`       | Build web then api                   |
| `pnpm lint`        | Lint all workspaces                  |
| `pnpm typecheck`   | Typecheck all workspaces             |

## Requirements

- Node 20 LTS
- pnpm 9.x

## Deployment

| Artifact | Path | Purpose |
|----------|------|---------|
| GitHub Actions CI | `.github/workflows/ci.yml` | Lint + typecheck + build on every PR and push to `main` |
| Vercel config | `apps/web/vercel.json` | Frontend deploy settings (framework, build, output) |
| Render Blueprint | `render.yaml` | Backend deploy settings (service, region, env vars) |

See `README.md` for full deploy instructions.

## Phase History

| Phase | Status   | Description                               |
|-------|----------|-------------------------------------------|
| 1     | DONE     | Monorepo scaffold — Next.js + NestJS      |
| 2     | DONE     | Config, logging, DB, Articles feature     |
| 3     | DONE     | CI/CD (GitHub Actions) + deploy config    |
