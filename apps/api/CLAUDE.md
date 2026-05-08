# apps/api — NestJS Backend

## Current Phase: COMPLETE — ready for deploy (Phase 3)

## Stack

| Concern        | Tool                                    |
|----------------|-----------------------------------------|
| Framework      | NestJS 10                               |
| Language       | TypeScript (strict)                     |
| Config         | @nestjs/config + Joi validation         |
| Validation     | class-validator + class-transformer     |
| Database       | MongoDB + Mongoose (@nestjs/mongoose)   |
| Logging        | Pino via nestjs-pino (request-id aware) |
| Auth           | JWT + OAuth2 (Phase 3+)                 |
| Deploy         | Render                                  |

## API Versioning

All routes are prefixed with `/api/v1/`. Configured globally in `src/main.ts`.

## Directory Layout

```
src/
  main.ts                          # Bootstrap — Pino logger, filters, pipes, CORS
  app.module.ts                    # Root module — ConfigModule + all feature modules
  config/
    env.validation.ts              # Joi schema — validates startup env vars
  logger/
    logger.module.ts               # nestjs-pino LoggerModule (pretty in dev, JSON in prod)
  database/
    database.module.ts             # MongooseModule.forRootAsync via ConfigService
  common/
    filters/
      http-exception.filter.ts     # Global catch-all — consistent error shape
  articles/
    schemas/article.schema.ts      # Mongoose schema (title, slug, summary, content, tags, publishedAt)
    dto/create-article.dto.ts      # class-validator DTO
    dto/update-article.dto.ts      # PartialType of create
    articles.service.ts            # findAll(), findBySlug(), create()
    articles.controller.ts         # GET /api/v1/articles, GET /api/v1/articles/:slug
    articles.module.ts             # Feature module
```

## Environment Variables

Copy `.env.example` to `.env` and fill in the values.
Never commit `.env` to version control.

| Variable      | Required | Default       | Description                        |
|---------------|----------|---------------|------------------------------------|
| NODE_ENV      | no       | development   | development \| production \| test  |
| PORT          | no       | 3001          | HTTP port                          |
| MONGODB_URI   | yes      | —             | MongoDB connection string          |
| CORS_ORIGIN   | no       | localhost:3000| Allowed CORS origin                |
| LOG_LEVEL     | no       | info          | Pino log level                     |

## Global Behaviors (configured in main.ts)

- **Logger**: Pino with request-id. Pretty-print in dev, JSON in production.
- **Exception filter**: All unhandled errors return `{ statusCode, message, error, path, timestamp }`.
- **Validation pipe**: `whitelist: true`, `forbidNonWhitelisted: true`, `transform: true`.

## Commands (run from apps/api or use root pnpm scripts)

```bash
pnpm dev        # Start with file watching (nest start --watch)
pnpm build      # Compile to dist/
pnpm start      # Run compiled output
pnpm lint       # ESLint
pnpm typecheck  # tsc --noEmit
```

## Deployment (Phase 3 — complete)

- CI/CD: `.github/workflows/ci.yml` — lint + typecheck + build on every PR and push to main
- Render config: `render.yaml` at monorepo root — Blueprint-based deploy, `apps/api` root dir
- Secret env vars (`MONGODB_URI`, `CORS_ORIGIN`) must be set in the Render dashboard after first deploy

## Next Steps (Phase 4+)

- Auth module (JWT access + refresh tokens)
- Google / GitHub OAuth2 strategy
