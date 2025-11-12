# Blueprint técnico y stack (Producción 2025)

Este documento resume el enfoque técnico recomendado para construir la plataforma de planificación y registro de entrenamientos para entrenadores y atletas. Optimiza el time‑to‑market sin cerrar puertas a la escala y al control a futuro.

## Resumen ejecutivo

- Monorepo TypeScript (Turborepo): `apps/web` (Next.js), `apps/mobile` (Expo), `packages/core` (Drizzle/Zod), `packages/ui`.
- Datos/Backend: Supabase (Postgres + Auth + Realtime + Storage + Edge Functions). Migraciones con Drizzle controladas en el repo.
- Web (entrenadores): Next.js 14/15 (App Router, Server Components), Tailwind + shadcn/ui, TanStack Query, Zod.
- Mobile (atletas y coach on‑the‑go): React Native + Expo (Expo Router, OTA updates, Push), SQLite/WatermelonDB para offline.
- Media: Cloudflare Stream o Mux para video; Cloudflare R2 como storage principal para imágenes/archivos (Supabase Storage opcional para assets ligeros) con URLs firmadas.
- Realtime y notificaciones: Supabase Realtime (presencia y cambios); escalar con Ably/Pusher si es necesario.
- Observabilidad y analítica: Sentry (web/mobile/backend), PostHog (producto), OpenTelemetry → Axiom/Datadog (logs/tracing).
- Importador con IA: onboarding de planes legacy (Excel/CSV/PDF legibles) con Gemini 2.5 (Flash/Pro) y revisión antes de publicar.
- Dashboards del entrenador: cumplimiento, cargas (interna/externa), PRs y riesgos (ACWR/monotonía/strain/HRV/sueño).
- Integraciones salud/wearables: Apple Health, Health Connect (Android), Garmin, Polar, Oura, WHOOP, Samsung, Huawei.
- Pagos: Stripe Billing (+ Connect si hay marketplace de entrenadores) en v2.

---

## Propuesta de valor y objetivos

- Ser la interfaz principal del entrenador para planificar, asignar, comunicar y medir en un solo lugar.
- Reemplazar Excel/Sheets/PDF/chats con flujos nativos rápidos, auditables y multi‑tenant.
- Onboarding sin fricción de planes existentes mediante importador con IA (Gemini 2.5) y vista de revisión.
- App móvil con registro rápido y offline real; sincronización robusta y feedback en contexto (texto/video).
- Dashboards accionables que combinan ejecución, PRs y señales de wearables para decidir ajustes hoy.

## Arquitectura base

- Monorepo con Turborepo para compartir tipos, lógica de dominio y UI.
- Acceso a datos directo desde clientes con RLS estrictas para CRUD estándar; operaciones masivas/sensibles en Edge Functions.
- Un solo lenguaje (TypeScript) para reducir fricción y acelerar el desarrollo.

```txt
.
├─ apps/
│  ├─ web/            # Next.js (panel entrenadores, admin)
│  └─ mobile/         # Expo (app atletas y coach on-the-go)
├─ packages/
│  ├─ core/           # Drizzle schema, Zod, lógica de dominio, SDKs cliente
│  ├─ ui/             # Componentes compartidos (Tamagui/shadcn adaptado)
│  └─ config/         # tsconfig/eslint/tailwind configs
├─ infra/             # IaC/plantillas (opcional), scripts CI/CD
└─ docs/              # Documentación adicional
```

---

## Onboarding e importador con IA (Gemini 2.5)

- Fuentes soportadas: Excel, CSV, Google Sheets exportado y PDFs legibles.
- Detección: ejercicios, series, repeticiones, %1RM, RPE/RIR, tempo, bloques/fases, fechas o secuencias relativas.
- Normalización: mapeo a librería (sinónimos/abreviaturas), creación asistida de ejercicios faltantes con metadatos (grupo muscular, equipamiento, tags).
- Modos de Gemini: 2.5 Flash para pre‑parseo/previsualizaciones y 2.5 Pro para validación final en casos ambiguos.
- Revisión antes de publicar: estado “borrador” con comparativa original → estandarizado; edición en bloque; aceptación total o por partes.
- Versionado y auditoría: importaciones trazables; equivalencias persistidas para acelerar futuros imports.

## Frontend web (entrenadores)

- Next.js 14/15 (App Router + Server Components + Server Actions) para rendimiento y DX.
- Tailwind + shadcn/ui + Radix para componentes accesibles y consistentes.
- TanStack Query para data‑fetching y caching; Zustand para estado global ligero.
- Gráficos: Recharts o Tremor para volúmenes, intensidad, PRs y correlaciones.
- Autenticación: Supabase Auth (OAuth Google/Apple + email). Sesiones seguras vía cookies.
- Subidas directas a Cloudflare Stream/S3 con firmas temporales. Previsualizaciones y controles por rol.

### Dashboards del entrenador

- Vista principal: cumplimiento por atleta/grupo, cargas interna (sRPE×duración/TRIMP) y externa, monotonía/strain, distribución por zonas, evolución de PRs y 1RM estimado.
- Alertas y riesgos: ACWR configurable por ventanas, caídas de HRV, deterioro de sueño/recuperación y saltos de carga no planificados.
- Drill‑down por atleta: línea de tiempo que cruza sesiones, métricas fisiológicas, PRs y feedback; comparativa plan vs. ejecución.
- Herramientas de planificación: mapas de calor de adherencia y estancamientos; filtros por bloque/ciclo, patrón de movimiento y grupo muscular.

### Configurabilidad de gráficos

- Personalización: mostrar/ocultar widgets, reordenar y redimensionar; vistas guardadas por coach/organización; compartir tableros como plantillas; permisos por rol para editar.
- Overlays y multi‑eje: superposición de métricas (p. ej., carga interna vs. HRV vs. sueño); ejes dobles; normalización (z‑score o respecto de línea base); smoothing configurable; bandas de zonas; anotaciones (cambios de plan, lesiones, viajes).
- Correlaciones: explorador con scatter/heatmap de correlación; selección de métricas y ventanas temporales; segmentación por grupo/deporte; líneas de tendencia/regresión; exportación CSV/PNG.
- Cross‑filter y zoom: brush temporal que sincroniza paneles, filtros por equipo/grupo/etiquetas/deporte, y persistencia de filtros en URL para compartir estado.

## App móvil (atletas y coach on‑the‑go)

- React Native + Expo (Expo Router, OTA updates, Push Notifications).
- Offline‑first: SQLite/WatermelonDB para cache y cola de operaciones; sincronización al recuperar conexión.
- Flujo rápido: ver plan del día, loguear sets (reps/peso/tiempo/RPE), comentarios, adjuntos (foto/video), PRs.
- Deep links y recordatorios configurables por atleta/grupo.

---

## Backend y datos

- Supabase (Postgres administrado) con:
  - Auth: OAuth + email, claims personalizados (`org_id`, `role`) en JWT.
  - Realtime: canales por organización/grupo para eventos de entrenamiento.
  - Storage: buckets por organización; políticas por rol; URLs firmadas.
  - Edge Functions: operaciones privilegiadas (asignaciones masivas, duplicación de planes, webhooks Stripe) con idempotencia.
- ORM y migraciones: Drizzle ORM con schema versionado en `packages/core`.
- Opcional series temporales: TimescaleDB para métricas/PRs y agregaciones.

### Modelo de datos (alto nivel)

- Tenancy/Roles: `organizations`, `memberships (user_id, org_id, role)`.
- Usuarios/Perfiles: `users`, `coach_profiles`, `athlete_profiles`.
- Agrupación: `groups`, `subgroups`, `group_members`.
- Librería ejercicios: `exercises` (tags, equipamiento), `exercise_media`, `exercise_variants`.
- Planificación: `cycles`/`blocks`, `workout_templates`, `workouts` (fecha/objetivo), `workout_items` (series, reps, %1RM, tempo, notas).
- Asignación: `assignments` (workout → athlete/group, fecha, estado), `calendar_entries` (vista por día/semana).
- Registro: `sessions` (estado, RPE/PRE, dolor), `set_logs` (reps, peso, tiempo, RIR), `comments`, `attachments`.
- Métricas y PRs: `metrics` (tipo/unidad/valor/ts), `prs`.
 - Auditoría: `audit_events` (quién, qué, cuándo, antes/después).
 - Integraciones y salud: `external_sources` (proveedor, scopes), `external_activities` (actividad con fuente e ids externos, deduplicación), `health_signals` (HR/HRV/sueño/pasos/calorías por ts), `data_provenance` (origen, unidad, conversiones).
 - Analítica y dashboards: `metric_catalog` (definiciones y fórmulas), `dashboard_layouts` (layout por user/org), `chart_configs` (selección de métricas, overlays, smoothing), `saved_views` (filtros y rangos guardados), `annotations` (eventos relevantes).
 - Integraciones (cuentas): `integration_accounts` (estado tokens, scopes consentidos, última sincronización, atleta enlazado).

### Multi‑tenant y seguridad (RLS)

- Columna `org_id` en todas las tablas de dominio.
- JWT con claims firmados: `org_id`, `role` (coach/athlete/assistant/admin).
- Políticas RLS por fila y por rol (lectura/escritura, owner vs. miembro).
- Edge tests para validar políticas (matrix de permisos por tabla/rol).

---

## Media y archivos

- Video: Cloudflare Stream o Mux para ingesta, transcodificación, thumbnails y delivery vía CDN. Player embebido con tokens.
- Imágenes/archivos: Cloudflare R2 como storage principal (buckets por organización, versionado y lifecycle); URLs firmadas vía Workers; Supabase Storage sólo para assets livianos/demos.
- Transferencia: subida directa desde web/mobile con firmas temporales → R2; metadata en Postgres (`attachments` + `data_provenance`).
- Límites iniciales (tamaño/duración) y lifecycle policies (tiering hacia Cold Storage, expiraciones por tipo) para controlar costos.

## Realtime y notificaciones

- Supabase Realtime para cambios de estado (p.ej. sesión completada, comentario nuevo).
- Ably/Pusher como alternativa si se requiere fan‑out elevado o QoS específico.
- Push en mobile con Expo Notifications (segmentación por grupo/subgrupo, silenciosas para sync).

---

## Observabilidad y analítica

- Errores: Sentry en web, mobile y Edge Functions.
- Producto: PostHog (eventos, funnels, cohorts, feature flags).
- Telemetría: OpenTelemetry (traces/logs/metrics) → Axiom/Datadog. Alertas a Slack/Discord.
- Reportería deportiva: vistas materializadas (volumen semanal, intensidad, cumplimiento) y jobs de refresco.

---

## Integraciones salud y wearables

- En dispositivo: Apple Health (iOS) y Health Connect (Android) para medidas diarias y entrenamientos con permisos granulares.
- Proveedores nube: Garmin Health (actividades, métricas de entrenamiento/recuperación), Polar AccessLink, Oura (sueño/HRV/readiness), WHOOP (esfuerzo/recuperación), Samsung Health (vía Health Connect y/o APIs aplicables), Huawei Health Kit (HMS).
- Ingesta: webhooks o sincronización incremental; backfill histórico al conectar; límites de rate y reintentos idempotentes.
- Normalización y deduplicación: esquema común por tipo/unidad/calidad; reglas de precedencia por proveedor; ventana temporal para evitar duplicados entre fuentes.
- Privacidad y consentimiento: conexión y revocación por atleta; scopes mínimos; sandbox de datos por organización.

### Centro de integraciones (UI y operativo)

- Conexión y gestión: panel por organización para enlazar cuentas, seleccionar scopes, activar backfill inicial y ver estado de sincronización.
- Estado y salud: último sync, próximos reintentos, alertas de reautenticación, métricas de latencia y tasa de eventos por proveedor.
- Mapeo y deduplicación: asociación atleta↔cuenta externa, reglas de precedencia entre fuentes, vista de eventos potencialmente duplicados y resolución.
- Controles finos: selección de tipos de datos por proveedor (entrenamientos, HR/HRV, sueño, pasos, calorías, rutas), ventanas de ingestión y límites.
- Auditoría y trazabilidad: registro de cambios de scopes, revocaciones y backfills; logs accesibles por admin de la organización.

---

## Cálculo de cargas, PRs y riesgos

- Carga interna: sRPE×duración, TRIMP (Banister/Lucía); ventanas semanales y por bloque.
- Carga externa: tonelaje/volumen por patrón de movimiento; ritmo/potencia/distancia para cíclicos; zonas de FC/potencia.
- Índices: monotonía y strain; ACWR con ventanas configurables; índice de disponibilidad con HRV/sueño/recuperación.
- PRs y fuerza: 1RM estimado (Epley/Brzycki) por ejercicio; PRs absolutos/relativos por ventana.
- Reglas y recomendaciones: umbrales por deporte/organización; sugerencias explicables con reglas + resúmenes asistidos por Gemini 2.5.

---

## Normalización, calidad y trazabilidad

- Unidades SI/imperial y conversiones explícitas registradas en `data_provenance`.
- Calidad: flags de calidad/lagunas; interpolación limitada; recalculo reproducible ante cambios de zonas o fórmulas.
- Trazabilidad: poder ver fuente, unidad, conversión y versión de cálculo por métrica.

---

## Privacidad, seguridad y cumplimiento

- Consentimiento explícito por integración y revocación en cualquier momento; mínimo privilegio.
- RLS “deny‑by‑default” con claims JWT (`org_id`, `role`); políticas separadas por operación.
- Auditoría: `audit_events` en importaciones, asignaciones, recalculos; versionado de planes e imports.
- Protección de media: URLs firmadas, expiración, buckets por organización, tokens por playback.
- Conformidad: almacenamiento regional según necesidad; pautas GDPR/CCPA; exportación de datos por organización.

## Pagos y monetización

- Stripe Billing (planes por nº de atletas/grupos) y descuentos.
- Stripe Connect si se habilita marketplace para entrenadores.
- Webhooks seguros hacia Edge Functions; toggles de features por plan.

---

## Roadmap

### MVP (sin plazos)

- Web (coach): librería de ejercicios, plantillas/ciclos, asignar por atleta/grupo, calendario semanal drag‑and‑drop, dashboards base (cumplimiento, volumen/carga, PRs).
- Mobile (atleta): ver plan del día, loguear sets (reps/peso/tiempo/RPE), comentarios y adjuntos; offline‑first; push recordatorios.
- Núcleo: multi‑tenant con RLS, Auth (email/Google/Apple), grupos/subgrupos, PRs y métricas básicas, subida y reproducción de videos.
- Importador con IA (Gemini 2.5) para onboarding de planes legacy con revisión y versionado.
- Observabilidad mínima (Sentry, PostHog), backups automáticos, auditoría básica.

### Fase 2

- Grupos/subgrupos avanzados, analítica por bloque/ciclo, notas del coach, export CSV/Excel.
- Librería de ejercicios rica: buscador, tags, variantes, filtros.
- Dashboards configurables (mostrar/ocultar/ordenar), overlays multi‑eje, correlaciones carga‑rendimiento y vistas guardadas compartibles.

### Fase 3

- Integraciones avanzadas y ampliadas: priorización según demanda (Garmin/Polar/Oura/WHOOP/Samsung/Huawei) y features de valor agregado.
- App entrenador en tablet con edición offline.
- Recomendaciones/insights (ML) y periodización asistida.

---

## POCs de validación

1. RLS multi‑tenant: `workouts` con políticas por `org_id` y `role`; tests de acceso cruzado deben fallar.
2. Offline mobile: cola de operaciones en SQLite → sync a Supabase; resolución de conflicto LWW con validaciones de servidor.
3. Video: upload directo web/mobile a Cloudflare Stream con firmas; playback con permisos.
4. Realtime: evento “athlete completed session” al coach en web vía Realtime.
5. Edge Function idempotente: “duplicar plan a N atletas” con `request_id` y tracing.

---

## Riesgos y mitigaciones

- Complejidad RLS → tests automáticos de políticas + policy matrix documentada.
- Offline/sync → conflictos resueltos con LWW + validaciones; auditoría para rastrear cambios.
- Costos de video → límites de tamaño/duración, 720p/1080p al inicio, lifecycle policies.
- Realtime a escala → usar Ably/Pusher para fan‑out grande; mantener Realtime para eventos críticos.
- Reportería pesada → vistas/materialized views y jobs nocturnos; no bloquear lecturas online.

## Evolución a escala

- Backend dedicado (Nest/Fastify) para endpoints críticos/webhooks sin cambiar la DB.
- Realtime heavy → migrar notificaciones a Ably/Pusher.
- Series temporales → TimescaleDB para consultas complejas de métricas.
- Infra → mantener web en Vercel; mover funciones pesadas a Fly.io/AWS si es necesario.

## Costos iniciales aproximados

- Vercel (web), Supabase Pro (DB/Auth/Storage), Cloudflare Stream, Sentry/PostHog: ~80–200 USD/mes en MVP; escala con uso.

## Preguntas para alinear

- ¿Offline “estricto” día 1 o aceptamos “cache + reintento” en v1?
- ¿Videos propios desde el lanzamiento o partimos con enlaces y activamos Stream en v1.1?
- ¿Pagos en v1 o v2?
- ¿Idiomas/regiones objetivo y preferencia de hosting?
- ¿Volumen inicial esperado (coaches/atletas activos)?

## Próximos pasos propuestos

1. Inicializar monorepo (Turborepo) con Next.js + Expo y packages `core`, `ui` y `config`.
2. Definir schema Drizzle (organizations/memberships/workouts/logs) y scripts de migración.
3. Configurar Supabase (Auth, Storage, Realtime) y escribir políticas RLS base.
4. Implementar POCs listados (RLS, offline, video, realtime, edge idempotente).
5. Empezar construcción del MVP con tickets/épicas por módulo.

---

> Este blueprint está pensado para ejecutar un MVP sólido y escalable. Si cambian prioridades (p. ej., pagos o integraciones en v1), se ajustan fases sin modificar el core.


