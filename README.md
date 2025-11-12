# Peaks Platform Monorepo

Monorepo for the Peaks training platform: Next.js web console for coaches, Expo mobile app for athletes, and shared TypeScript packages for domain logic + UI.

## Apps & Packages

| Path | Description |
| --- | --- |
| `apps/web` | Next.js App Router (coaches/admin) with Tailwind, Supabase SSR helpers, dashboard snapshot service and importador IA. |
| `apps/mobile` | Expo Router app (athletes + coach on-the-go) with offline-friendly shell. |
| `packages/core` | Drizzle schema, domain types and validation primitives. |
| `packages/ui` | Shared design system primitives (web-ready, RN support planned). |
| `packages/config` | Shared TS, ESLint and Tailwind configs. |

## Getting started

```bash
npm install
npm run dev               # turbo spawns web + mobile
```

### Quick scripts (macOS & Windows)

| Script | Descripción |
| --- | --- |
| `scripts/setup.command` / `scripts/setup.ps1` | Instala dependencias, valida Node/NPM y ejecuta `expo-doctor` (sin validación estricta) para detectar conflictos. Usa `.command` (doble click) en macOS o `pwsh -File scripts/setup.ps1` en Windows. |
| `scripts/start.command` / `scripts/start.ps1` | Lanza web + Expo (con QR) + backend en terminales separadas. macOS abre pestañas en Terminal vía AppleScript; Windows abre nuevas ventanas de PowerShell. Si no existe `apps/backend`, muestra un aviso. |
| `scripts/build-apk.command` / `scripts/build-apk.ps1` | Ejecuta `eas build --platform android --profile apk --local` dentro de `apps/mobile` (necesita Android SDK + JDK). En Windows usa PowerShell (`pwsh -File scripts/build-apk.ps1`). |

> Nota: si PowerShell bloquea la ejecución, podrás habilitarla temporalmente con `Set-ExecutionPolicy -Scope Process Bypass`. En macOS, marca los `.command` como ejecutables (`chmod +x scripts/*.command`) y haz doble clic.

Individual app development:

```bash
npm run dev -- --filter=@peaks/web
npm run dev -- --filter=@peaks/mobile
```

## Environment

Copy `.env.example` → `.env` and `.env.local` where needed. Core vars:

- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `DATABASE_URL` for Drizzle migrations (Supabase/Postgres)
- Cloudflare R2 + Gemini/GCP keys for media + importador IA

## Features en progreso

- Consola `/app` con cards de cumplimiento, cargas, PRs y alertas usando `getDashboardSnapshot` (fallback data + hook a `rpc("dashboard_snapshot")`).
- Importador IA (`/importador`) con formulario `CSV`/drag, API `/api/imports` que normaliza filas vía `@peaks/core` y preview listo para persistir como borrador.
- Expo mobile shell con Router (`/`, `/plan`), tipografías Inter y estilos para sets offline.

## Tooling

- Turbo tasks for `dev`, `lint`, `build`, `test`
- Shared lint config via `@peaks/config`
- Drizzle schema in `packages/core` + `drizzle.config.ts`
- GitHub Actions workflow `.github/workflows/ci.yml`
- API routes en Next (`/api/health`, `/api/imports`) para healthchecks e import preview.

## Useful scripts

```bash
npm run lint             # turbo lint
npm run build -- --filter=@peaks/web   # Next.js production build
npx drizzle-kit generate # generate SQL from Drizzle schema
```

See `arquitectura.md` for the macro blueprint, roadmap, data model and integrations plan.
