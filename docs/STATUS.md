# Estado V1 - Nov 2025

## Lo que ya está listo

- ✅ Monorepo Turborepo con Next.js (web), Expo Router (mobile) y packages `core`/`ui`/`config`.
- ✅ Esquema Drizzle inicial + `drizzle.config.ts` apuntando a Supabase/Postgres.
- ✅ UI base marketing (`/`) + consola `/app` con cards (compliance/carga/PRs/alertas) usando `getDashboardSnapshot`.
- ✅ Importador IA (`/importador`) con formulario CSV y API `/api/imports` que devuelve preview normalizada.
- ✅ App móvil Expo con Router, tipografías Inter, pantallas Home + Plan y configuración de Metro para compartir paquetes.
- ✅ Tooling: ESLint (web y mobile), Tailwind 3, shared config, GitHub Actions CI (install → lint → build web), Turbo tasks.
- ✅ Supabase helpers (server/browser) + validación de env con Zod.
- ✅ Cloudflare R2 documento en ARCHITECTURE.md + `.env.example` con llaves esperadas.

## Próximos pasos sugeridos

1. **Supabase wiring**
   - Provisionar proyecto y rellenar `.env` / secretos de Vercel + Expo.
   - Generar migraciones Drizzle + seed minimal (`organizations`, `users`, `workouts`).
   - Crear `dashboard_snapshot` (SQL view o RPC) que alimente el panel.
2. **Auth & sesiones**
   - Supabase Auth (email + OAuth) en web/mobile.
   - Server Actions protegidas, middleware y session provider en Expo.
3. **Importador IA completo**
   - Subida a R2 temporal + parseo XLSX/PDF usando Gemini 2.5.
   - Persistir `import_batches`, revisiones y publicación → `workout_templates`.
4. **Dashboards configurables**
   - Overlays multi-eje, correlaciones y filtros (grupo/deporte) con datos fake.
   - Conectar a métricas reales (views/materialized) + alertas basadas en reglas.
5. **Integraciones salud**
   - Diseñar tablas `external_sources`, `external_activities`, `health_signals` (parcial en schema).
   - Implementar primer conector (Apple Health / Health Connect) + webhook ingestion.

## Scripts útiles

```bash
npm run dev                  # Turbo dev (web + mobile)
npm run dev -- --filter=@peaks/web
npm run dev -- --filter=@peaks/mobile
npm run lint                 # Turbo lint
npm run build -- --filter=@peaks/web
npx drizzle-kit generate     # SQL desde schema
```
