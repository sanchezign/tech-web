# apps/web — Next.js Frontend

## Current Phase: COMPLETE — ready for deploy (Phase 3)

## Stack

| Concern       | Tool                              |
|---------------|-----------------------------------|
| Framework     | Next.js 15 (App Router)           |
| Language      | TypeScript (strict)               |
| Styling       | Tailwind CSS v4 + shadcn/ui       |
| UI components | shadcn/ui (button, etc.)          |
| State         | Zustand                           |
| Server state  | TanStack Query v5                 |
| Validation    | Zod + @t3-oss/env-nextjs          |
| HTTP client   | axios                             |
| Deploy        | Vercel                            |

## Directory Layout

```
src/
  app/
    articles/
      page.tsx             # Server component — article list (ISR, revalidate 60s)
      [slug]/page.tsx      # Server component — article detail + generateMetadata
    layout.tsx             # Root layout — wraps <Providers>
    globals.css            # Tailwind + shadcn/ui CSS variables
  components/
    providers.tsx          # QueryClientProvider + ReactQueryDevtools
    ui/
      button.tsx           # shadcn/ui Button component
  features/
    articles/
      types.ts             # Article type (matches backend schema)
      hooks/
        useArticles.ts     # TanStack Query hook — GET /articles
        useArticle.ts      # TanStack Query hook — GET /articles/:slug
  lib/
    api-client.ts          # axios instance with baseURL from env
    query-client.ts        # QueryClient factory (staleTime: 60s)
    utils.ts               # cn() helper (clsx + tailwind-merge)
  env.ts                   # t3-env validated env vars (Zod schema)
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values.
Never commit `.env.local` to version control.

| Variable              | Required | Description                    |
|-----------------------|----------|--------------------------------|
| NEXT_PUBLIC_API_URL   | yes      | Backend API base URL           |

## shadcn/ui

Config lives in `components.json`. To add a new component:
```bash
pnpm dlx shadcn@latest add <component-name>
```

## TanStack Query

- `getQueryClient()` — singleton on the client, new instance on the server.
- Client hooks live in `src/features/<feature>/hooks/`.
- Server components use `fetch()` directly (no useQuery).

## Commands (run from apps/web or use root pnpm scripts)

```bash
pnpm dev        # Start dev server with Turbopack
pnpm build      # Production build
pnpm lint       # ESLint
pnpm typecheck  # tsc --noEmit
```

## Deployment (Phase 3 — complete)

- CI/CD: `.github/workflows/ci.yml` — lint + typecheck + build on every PR and push to main
- Vercel config: `apps/web/vercel.json` — framework, build, output settings
- Env vars for production must be set in the Vercel dashboard

## Next Steps (Phase 4+)

- Error boundary and loading skeletons
- Auth flow (JWT + Google OAuth)
