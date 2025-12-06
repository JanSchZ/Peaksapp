# Blueprint técnico y stack (Producción 2025)

Este documento resume el enfoque técnico recomendado para construir la plataforma de planificación y registro de entrenamientos para entrenadores y atletas. Optimiza el time‑to‑market sin cerrar puertas a la escala y al control a futuro.

## Resumen ejecutivo

- **Monorepo TypeScript (Turborepo)**: `apps/web` (Next.js 16), `apps/mobile` (Expo 52), `packages/core` (Drizzle/Zod), `packages/ui` (Shadcn/UI), `packages/config`.
- **Datos/Backend**: Supabase (Postgres + Auth + Realtime + Storage + Edge Functions). Migraciones con Drizzle controladas en el repo.
- **Web (entrenadores)**: Next.js 16 (App Router), React 19, **Zustand** (Estado Global), **TanStack Query** (Data Fetching), **Recharts** (Gráficos), **@dnd-kit** (Drag & Drop).
- **Mobile (atletas y entrenadores)**: React Native 0.76 + Expo 52. **TanStack Query + AsyncStorage** (Offline-Tolerant). **Victory Native** (Gráficos). **FlashList** (Listas rápidas).
- **Design System**: Dark mode premium, Inter font, componentes Shadcn/UI (Button, Input, Card), Glassmorphism, CSS variables con HSL, Tailwind CSS v4.
- **Auth**: Supabase Auth con SSR (@supabase/ssr para web, AsyncStorage para mobile), OAuth Google/Apple + Email.
- **Media**: Cloudflare Stream o Mux para video (futuro); Cloudflare R2 como storage principal para imágenes/archivos (Supabase Storage temporal) con URLs firmadas.
- **Realtime y notificaciones**: Supabase Realtime (presencia y cambios); escalar con Ably/Pusher si es necesario.
- **Observabilidad y analítica**: Sentry (web/mobile/backend), PostHog (producto), OpenTelemetry → Axiom/Datadog (logs/tracing).
- **Importador con IA**: onboarding de planes legacy (Excel/CSV/PDF legibles) con Gemini 2.5 (Flash/Pro) y revisión antes de publicar.
- **Inteligencia Predictiva (Gemini 3.0 Pro)**: "Copiloto que Susurra". Alertas de sobreentrenamiento y sugerencias contextuales, no generación ciega.
- **Métricas de Carga Avanzadas**: Motor de cálculo para ACWR (Acute:Chronic Workload Ratio), Monotonía, Strain, TRIMP y variabilidad.
- **Dashboards del entrenador**: "God View" para gestionar diversidad (Pro a Amateur) y conectar Micro con Macro.
- **Integraciones salud/wearables**: Apple Health, Health Connect (Android), Garmin, Polar, Oura, WHOOP, Samsung, Huawei (futuro).
- **Pagos**: Stripe Billing (+ Connect si hay marketplace de entrenadores) en v2 (futuro).

---

## Propuesta de valor (Ver PRODUCT_VISION.md)

Plataforma integral para entrenadores profesionales:
- **Planificación multinivel**: Macrociclo → Mesociclo → Microciclo → Sesión
- **Dos modalidades**: Preparación física (series/reps/carga) + Entrenamiento deportivo (drills/tiempo/técnica)
- **Gestión de grupos**: Asignación masiva con personalización individual
- **Librería dual**: Ejercicios predefinidos + personalizados con video
- **Timeline navegable**: Historial completo del atleta (pasado/presente/futuro)
- **Dashboard coach**: Cumplimiento, alertas, drill-down por atleta
- **IA asistente**: Detección de patrones y sugerencias (no generación automática)

## Arquitectura base

- Monorepo con Turborepo para compartir tipos, lógica de dominio y UI.
- Acceso a datos directo desde clientes con RLS estrictas para CRUD estándar; operaciones masivas/sensibles en Edge Functions.
- Un solo lenguaje (TypeScript) para reducir fricción y acelerar el desarrollo.

```txt
.
├─ apps/
│  ├─ web/            # Next.js (panel principal entrenadores, admin)
│  └─ mobile/         # Expo (Single App: Atleta + Coach Mode)
├─ packages/
│  ├─ core/           # Drizzle schema, Zod, lógica de dominio, SDKs cliente
│  ├─ ui/             # Componentes compartidos (Tamagui/shadcn adaptado)
│  └─ config/         # tsconfig/eslint/tailwind configs
├─ infra/             # IaC/plantillas (opcional), scripts CI/CD
└─ docs/              # Documentación adicional
```

---

## Lenguaje de Diseño y UX (Premium)

- **Estética**: "State of the Art". Interfaz oscura por defecto (OLED friendly), alto contraste, acentos vibrantes (no genéricos).
- **Interacción**: Feedback háptico en móvil, transiciones fluidas (layout animations) en web y móvil. Nada debe sentirse "estático".
- **Componentes**: Shadcn/ui altamente personalizado. Bordes sutiles, glassmorphism en capas superiores, tipografía moderna (Inter/Outfit/Satoshi).
- **Accesibilidad**: Cumplimiento WCAG 2.1 AA mínimo. Focus rings visibles, soporte de lector de pantalla.

---

## Onboarding e importador con IA (Gemini 2.5)

- Fuentes soportadas: Excel, CSV, Google Sheets exportado y PDFs legibles.
- Detección: ejercicios, series, repeticiones, %1RM, RPE/RIR, tempo, bloques/fases, fechas o secuencias relativas.
- Normalización: mapeo a librería (sinónimos/abreviaturas), creación asistida de ejercicios faltantes con metadatos (grupo muscular, equipamiento, tags).
- Modos de Gemini: 2.5 Flash para pre‑parseo/previsualizaciones y 2.5 Pro para validación final en casos ambiguos.
- Revisión antes de publicar: estado “borrador” con comparativa original → estandarizado; edición en bloque; aceptación total o por partes.
- Versionado y auditoría: importaciones trazables; equivalencias persistidas para acelerar futuros imports.

## Inteligencia Artificial Avanzada (Gemini 3.0 Pro)

### Journaling y Resúmenes Semanales
- **Input**: Notas de texto libre del atleta post-entreno, comentarios en ejercicios, feedback de video.
- **Procesamiento (Gemini 3.0 Pro)**:
  - Análisis de sentimiento y palabras clave (dolor, estrés, sueño, motivación).
  - Correlación con métricas duras (RPE, Carga).
- **Output**:
  - **Resumen Semanal Ejecutivo**: "Juan completó el 90% del volumen, pero reporta molestia en rodilla en 3 sesiones consecutivas y su RPE promedio subió un 15%. Riesgo de sobreentrenamiento detectado."
  - **Sugerencias de Ajuste**: "Considerar descarga de volumen en patrón de sentadilla para la próxima semana."

### Predicción y Patrones
- Detección de estancamiento basada en historial de cargas vs. rendimiento.
- Alertas de "Burnout" psicológico basadas en el tono del Journal.

## Frontend web (entrenadores)

### Stack implementado

- **Framework**: Next.js 14.2.33 (App Router + Server Components + Server Actions) para rendimiento y DX.
- **React**: 18.3.1 (compatibilidad estable con ecosistema actual).
- **Styling**: Tailwind CSS 3.4.15 + PostCSS + Autoprefixer.
- **UI Components**: Shadcn/UI personalizado + Radix UI (primitivos accesibles) - Button, Input, Card implementados.
- **Tipografía**: Inter (Google Fonts) para profesionalismo y legibilidad.
- **State Management**: **Zustand** para estado complejo de UI (Planificador) y **TanStack Query** para estado de servidor (Caché, Revalidación).
- **Gráficos**: **Recharts** para visualización de datos (ACWR, Volumen) con personalización CSS.
- **Interacción**: **@dnd-kit** para drag-and-drop accesible en el planificador.
- **Autenticación**: Supabase Auth con @supabase/ssr (SSR-safe). Server Actions para login/signup. OAuth Google/Apple + email.
- **Path Aliases**: `@/*` configurado en tsconfig para imports limpios.
- **ESLint**: eslint-config-next para best practices de Next.js.
- **Subidas**: Cloudflare Stream/R2 con firmas temporales (futuro). Previsualizaciones y controles por rol.

### Dashboards del entrenador (The Coach's Cockpit)

- **Team Pulse (Pulso del Equipo)**: Vista principal. No solo cumplimiento, sino *sentimiento*. ¿Quién está fatigado (RPE alto)? ¿Quién reporto dolor? ¿Quién está "on fire" (PRs)? Priorización automática de atención.
- **Timeline View (Vista de Línea de Tiempo)**:
    - Drill-down por atleta que muestra la historia real.
    - Cruce de variables: Sesiones completadas vs. Planificadas + Nivel de Energía (subjetivo) + Carga (objetiva).
- **Riesgos y Oportunidades**: Alertas de "Burnout" silencioso (Monotonía alta + Sentimiento bajo) o ventanas de oportunidad para intensificar.

### Herramientas de Creación (Coach Tools)
El entrenador tiene control granular absoluto sobre su librería y programación.

- **Exercise Builder & Library**:
  - Creación manual de ejercicios con flexibilidad total.
  - **Media Management**: Subida directa de videos "caseros" (desde móvil) para correcciones técnicas específicas (Feedback audiovisual).
  - "Combos Secretos": Guardar superseries o WODs propios como bloques reutilizables.
- **Workout Designer**:
  - Interfaz "Drag & Drop" para construir sesiones.
  - Creación de bloques, superseries, circuitos y AMRAPs.
  - Definición precisa de variables: RPE, %1RM, Tempo, Descanso, Notas técnicas.
- **Librería de Contenido**:
  - Gestión de plantillas de sesiones y microciclos.
  - Clonación y modificación rápida de planes existentes.

## Motor de Periodización (Long-Term Athlete Development)

El corazón del sistema no es la sesión, es la **Temporada**.

### Jerarquía de Planificación
1.  **Temporada (Season)**: Objetivo anual (ej: "Juegos Olímpicos 2026").
2.  **Macrociclo**: Grandes fases (Preparación General, Específica, Competitiva, Transición).
3.  **Mesociclo (Bloque)**: 4-6 semanas con un objetivo fisiológico concreto (Hipertrofia, Fuerza Máxima, Potencia, Taper).
4.  **Microciclo (Semana)**: La unidad organizativa básica.
5.  **Sesión**: El entrenamiento diario.

### Herramientas Visuales (Visual Planning)
- **Timeline View (Gantt)**:
  - Visualización anual/semestral.
  - **Color-Coding**: Bloques coloreados por cualidad física (Fuerza=Azul, Metabólico=Rojo, Técnica=Verde).
  - **Drag & Drop**: Mover bloques completos de semanas. Si mueves un Mesociclo, los siguientes se ajustan automáticamente.
- **Load Management Dashboard**:
  - Gráfico de volumen/intensidad planificado vs. realizado a nivel de Macrociclo.

### Inteligencia Proactiva (The "Assistant Head Coach")
La IA no solo mira el pasado, **audita el futuro**.

- **Plan Auditing (Auditoría de Planificación)**:
  - Al crear un plan, Gemini 3.0 analiza la estructura:
    - *"Alerta: Has programado un bloque de Potencia (Alta Intensidad) inmediatamente después de vacaciones (Desentrenamiento). Riesgo de lesión."*
    - *"Sugerencia: El volumen del Mesociclo 3 aumenta un 40% vs el Mesociclo 2. Viola la regla del 10%. Sugiero insertar semana de descarga."*
- **Tapering Automático**:
  - *"Se acerca la competición principal. ¿Quieres que genere una propuesta de Tapering (reducción exponencial de volumen) para las próximas 2 semanas?"*

### Configurabilidad de gráficos

- Personalización: mostrar/ocultar widgets, reordenar y redimensionar; vistas guardadas por coach/organización; compartir tableros como plantillas; permisos por rol para editar.
- Overlays y multi‑eje: superposición de métricas (p. ej., carga interna vs. HRV vs. sueño); ejes dobles; normalización (z‑score o respecto de línea base); smoothing configurable; bandas de zonas; anotaciones (cambios de plan, lesiones, viajes).
- Correlaciones: explorador con scatter/heatmap de correlación; selección de métricas y ventanas temporales; segmentación por grupo/deporte; líneas de tendencia/regresión; exportación CSV/PNG.
- Cross‑filter y zoom: brush temporal que sincroniza paneles, filtros por equipo/grupo/etiquetas/deporte, y persistencia de filtros en URL para compartir estado.

## App móvil (Single App: Atleta + Coach Mode)

### Estrategia Single App
Hemos decidido unificar la experiencia en una sola base de código (`apps/mobile`) para maximizar la velocidad de desarrollo y consistencia.
- **Role-Based UI**: La app detecta el rol (`coach` o `athlete`) al iniciar sesión.
  - **Modo Atleta (The Companion)**:
    - **Timeline Infinito**: Scroll al pasado (ver historia, fotos, PRs) y futuro (ver bloques próximos).
    - **Journaling Flow**: Al terminar sesión, UI dedicada para capturar RPE, sentimiento y multimedia (video técnica/nota voz).
  - **Modo Coach (The Mentor)**:
    - **Gestión On-the-Go**: Crear/editar ejercicios y sesiones desde el móvil.
    - **Captura de Media**: Grabar videos de corrección y subirlos directo al "feed" del ejercicio del atleta.
    - **Live Pulse**: Ver quién está entrenando y recibir notificaciones de feedback crítico.

### Stack implementado

- **Framework**: Expo 54.0.0 (SDK) con Expo Router 5.0.
- **React Native**: 0.76.1.
- **React**: 18.3.1 (mismo que web para consistencia).
- **Routing**: Expo Router para navegación type-safe y file-based.
- **Autenticación**: Supabase JS Client 2.48.0 + AsyncStorage 1.23.1 para persistencia de sesión.
- **Styling**: StyleSheet nativo con theme oscuro. Dark mode: `#0B0E14` background, `#1A1D24` cards.
- **Offline-Tolerant**: **TanStack Query** con persistencia. La app funciona sin red (lectura de caché) y encola mutaciones simples en AsyncStorage. No usamos WatermelonDB para reducir complejidad inicial.
- **Listas**: **FlashList** (Shopify) para rendimiento superior en listas largas (historial, ejercicios).
- **Gráficos Móvil**: **Victory Native** o **Gifted Charts**.
- **OTA Updates**: EAS Update para hot fixes sin app store.
- **Push Notifications**: Expo Notifications (futuro) para recordatorios y sync silenciosa.
- **TypeScript**: 5.3.3 con strict mode.
- **Build Script**: TSC para type checking (tsc build).
- **Flujo rápido**: ver plan del día, loguear sets (reps/peso/tiempo/RPE), comentarios, adjuntos (foto/video), PRs (futuro).
- **Deep links**: Expo Linking para deep links y recordatorios configurables por atleta/grupo (futuro).

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
- Políticas RLS por fila y por rol (lectura/escritura, owner vs. miembro).
- Edge tests para validar políticas (matrix de permisos por tabla/rol).

### Reglas de Oro de Datos (Data Integrity)
1.  **Soft Deletes**: NUNCA borrar filas físicamente. Todas las tablas clave (`exercises`, `workouts`, `users`) tienen columna `deleted_at`.
2.  **UTC Everywhere**: Todas las fechas se guardan en UTC (`timestamptz`). Solo se convierten a local en el momento de renderizar.
3.  **Inmutabilidad Histórica**: Separación estricta entre `planned_workouts` (plantillas mutables) y `performed_sessions` (logs inmutables). Al completar una sesión, se copian los datos, no se referencian.
4.  **IDs en Cliente**: Generar UUIDs en el frontend para permitir "Optimistic Updates" sin esperar a la DB.

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

## Cálculo de cargas, PRs y riesgos (Science Engine)

El valor diferencial de Peaksapp es el rigor científico. No solo mostramos datos, los interpretamos.

### Métricas de Carga (Load Metrics)
1.  **Carga Interna (Internal Load)**:
    - **sRPE (Session RPE)**: `RPE (1-10) * Duración (minutos)`. El estándar de oro para cuantificar carga subjetiva.
    - **TRIMP (Training Impulse)**: Basado en zonas de frecuencia cardíaca (si hay datos de wearables).
2.  **Carga Externa (External Load)**:
    - **Volumen (Tonelaje)**: `Series * Reps * Peso`. Segmentado por patrón de movimiento (Empuje, Tracción, Pierna).
    - **Distancia/Ritmo**: Para sesiones de cardio.
3.  **Métricas de Gestión de Riesgo**:
    - **ACWR (Acute:Chronic Workload Ratio)**: Relación entre la carga de la última semana (Acute) y el promedio de las últimas 4 semanas (Chronic).
        - *Zona Segura*: 0.8 - 1.3
        - *Zona de Peligro*: > 1.5 (Riesgo de lesión aumentado).
    - **Monotonía (Monotony)**: `Carga Promedio Diaria / Desviación Estándar`. Detecta falta de variabilidad (riesgo de estancamiento/lesión).
    - **Strain (Esfuerzo)**: `Carga Total Semanal * Monotonía`.
4.  **Disponibilidad (Readiness)**:
    - Integración de HRV (Variabilidad de Frecuencia Cardíaca) y Calidad de Sueño desde wearables.

### Inteligencia Predictiva
- Usar Gemini 3.0 Pro para cruzar **ACWR** alto + **Monotonía** alta + **Feedback** negativo en el Journal = **Alerta Roja** al entrenador.

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

## Calidad y CI/CD

### Build System (Implementado)

- **Turborepo**: Caching y parallel builds configurado en `turbo.json`.
- **Build Scripts**: Todos los packages tienen `npm run build` (tsc o next build).
- **Type Safety**: TypeScript 5.x strict mode en todos los packages.
- **Linting**: ESLint configurado (eslint-config-next para web, base config para packages).
- **Status**: ✅ Build completo del monorepo pasa exitosamente.

### CI/CD (Futuro)

- **CI**: GitHub Actions. Lint (ESLint), Typecheck (TSC), Unit Tests (Vitest) en cada PR.
- **CD**: Deploy automático a Vercel (Web) y EAS Update (Mobile - Preview) en merge a main.
- **E2E**: Playwright para flujos críticos de Web. Maestro para flujos críticos de Mobile.

## Evolución a escala

- Backend dedicado (Nest/Fastify) para endpoints críticos/webhooks sin cambiar la DB.
- Realtime heavy → migrar notificaciones a Ably/Pusher.
- Series temporales → TimescaleDB para consultas complejas de métricas.
- Infra → mantener web en Vercel; mover funciones pesadas a Fly.io/AWS si es necesario.

## Costos iniciales aproximados

- Vercel (web), Supabase Pro (DB/Auth/Storage), Cloudflare Stream, Sentry/PostHog: ~80–200 USD/mes en MVP; escala con uso.

## Infraestructura de Producción

### ¿Por qué Supabase para Producción?

Supabase es una plataforma "Backend-as-a-Service" construida sobre estándares abiertos (Postgres) que escala desde MVP hasta millones de usuarios.

- **Escalabilidad**: Postgres es el estándar de oro. Supabase permite escalar verticalmente (más RAM/CPU) y horizontalmente (Read Replicas) con un clic.
- **Seguridad**: Certificaciones SOC2, HIPAA (en planes Enterprise). Encriptación en reposo y en tránsito.
- **Backups**:
  - **Automáticos**: Diarios (retención según plan).
  - **PITR (Point-in-Time Recovery)**: Recuperación a cualquier segundo específico (recomendado para PROD).

### Checklist de Configuración para Producción

1.  **Base de Datos**:
    - [ ] Activar **Point-in-Time Recovery (PITR)** (Add-on en Supabase).
    - [ ] Configurar **Branching** (opcional pero recomendado): `main` (prod) y `dev` (preview).
    - [ ] Índices adecuados en columnas de filtrado frecuente (`org_id`, `user_id`, fechas).

2.  **Seguridad (RLS)**:
    - [ ] **RLS habilitado** en TODAS las tablas públicas.
    - [ ] Políticas de "Deny by default" (nadie accede si no hay política explícita).
    - [ ] Auditoría de políticas con `pg_tap` o tests de integración.

3.  **Autenticación**:
    - [ ] Configurar **SMTP propio** (AWS SES, Resend, SendGrid) para emails transaccionales (no usar el default de Supabase en prod).
    - [ ] Habilitar **MFA (Multi-Factor Authentication)** para administradores/coaches.
    - [ ] Configurar dominios personalizados para Auth y API (ej: `auth.peaks.app`).

4.  **Performance**:
    - [ ] Habilitar **pg_stat_statements** para monitorear queries lentas.
    - [ ] Configurar **CDN** para Storage (integrado en Supabase/Cloudflare).

## Preguntas para alinear

- ¿Offline “estricto” día 1 o aceptamos “cache + reintento” en v1?
- ¿Videos propios desde el lanzamiento o partimos con enlaces y activamos Stream en v1.1?
- ¿Pagos en v1 o v2?
- ¿Idiomas/regiones objetivo y preferencia de hosting?
- ¿Volumen inicial esperado (coaches/atletas activos)?

## Estado actual de implementación (Actualizado 2025-01-19)

### ✅ Completado

1. ✅ **Monorepo inicializado**: Turborepo con Next.js 14 + Expo 52 y packages `core`, `ui` y `config`.
2. ✅ **Design System**: Dark mode premium, Inter font, CSS variables HSL, componentes Shadcn/UI (Button, Input, Card).
3. ✅ **Schema Drizzle base**: `users` y `organizations` definidos en `packages/core/src/db/schema.ts`.
4. ✅ **Supabase Auth integrado**: 
   - Web: Server Actions con @supabase/ssr, login page con glassmorphism.
   - Mobile: AsyncStorage persistence, login screen con dark theme.
5. ✅ **Build System**: Todos los packages buildan exitosamente. TypeScript strict mode.
6. ✅ **Routing**: Next.js App Router (web), Expo Router (mobile).

### 🔄 En progreso / Próximos pasos

1. **Configurar proyecto Supabase**:
   - Crear proyecto en supabase.com
   - Configurar variables de entorno (ver `ENV_EXAMPLE.md`)
   - Aplicar migraciones Drizzle
   - Configurar RLS policies

2. **Expandir schema Drizzle**:
   - Definir `memberships`, `groups`, `exercises`, `workouts`, `sessions`, `set_logs`, etc.
   - Crear scripts de migración
   - Configurar Drizzle Kit para push/pull

3. **Implementar POCs críticos**:
   - RLS multi-tenant con org_id
   - Offline mobile con WatermelonDB
   - Video upload a Cloudflare Stream/R2
   - Realtime para notificaciones
   - Edge Function idempotente

4. **Desarrollar features MVP** (según `implementation_plan.md`):
   - Coach: Exercise library, workout templates, assignments, dashboard
   - Athlete: Today's plan, workout logging, offline sync

5. **CI/CD**:
   - GitHub Actions para lint/typecheck/test
   - Deploy automático a Vercel (web) y EAS (mobile)

---

> Este blueprint está pensado para ejecutar un MVP sólido y escalable. Si cambian prioridades (p. ej., pagos o integraciones en v1), se ajustan fases sin modificar el core.


