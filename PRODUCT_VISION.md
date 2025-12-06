# Peaksapp: Product Vision

## Qué es Peaksapp
Una plataforma integral para entrenadores profesionales que permite **crear, asignar, ejecutar y analizar** entrenamientos para atletas de cualquier nivel. Unifica la gestión de preparación física (gimnasio, kinesiología) y entrenamiento deportivo específico en un solo sistema.

---

## El Problema Real del Entrenador

Un entrenador típico maneja:
- **Diversidad de atletas**: Desde sub-14 hasta profesionales. Algunos van a competir en 3 meses, otros entrenan por salud.
- **Múltiples grupos**: Equipos, individuales, rehabilitación. Cada uno con distinto foco y frecuencia.
- **Dos tipos de trabajo**: Gimnasio (series/reps/peso) y campo (técnica, táctica, resistencia).

Hoy usan Excel para planificar, WhatsApp para comunicar, apps genéricas para trackear. El resultado: información fragmentada, pérdida de contexto, incapacidad de escalar.

---

## La Solución

### 1. Planificación Multinivel
El entrenador diseña desde arriba hacia abajo:

| Nivel | Ejemplo | Función |
|-------|---------|---------|
| Macrociclo | "Temporada 2025" | Visión anual, picos de forma |
| Mesociclo | "Bloque de Fuerza" | 4-6 semanas con objetivo específico |
| Microciclo | "Semana 12" | Distribución semanal |
| Sesión | "Lunes - Tren Superior" | El entrenamiento del día |

**Conexión Micro-Macro**: Si el entrenador mueve un bloque en la vista anual, las sesiones diarias se reordenan automáticamente.

### 2. Dos Modalidades de Sesión

**Preparación Física / Kinesiología**
- Ejercicios con series, repeticiones, carga, tempo, descanso
- Progresión automática basada en historial
- RPE/RIR para cuantificar esfuerzo subjetivo

**Entrenamiento Deportivo**
- Bloques por tiempo, drills, circuitos
- Videos de técnica y correcciones
- Carga cuantificable (integrada con gimnasio)

### 3. Gestión de Grupos y Atletas
- Crear grupos (ej: "Elite", "Sub-17", "Rehab")
- Asignar planes a grupos completos o individualizar
- Personalización por atleta: si el plan dice "80% 1RM", cada atleta ve su carga específica

### 4. Librería de Ejercicios
- **Base predefinida**: Ejercicios comunes con video de referencia
- **Personalizados**: El entrenador sube sus propios videos, crea sus "combos" (superseries, WODs)
- **Búsqueda y filtros**: Por músculo, patrón, equipamiento

### 5. Vista del Atleta (Móvil)
- Abre la app → ve qué toca hoy
- Ejecuta → registra sets completados, peso usado, RPE
- Timer de descanso integrado
- Deja notas/feedback después de cada sesión
- Puede navegar hacia atrás: ver su historial, PRs, evolución

### 6. El Calendario como Centro
La experiencia gira alrededor de una **línea de tiempo navegable**:
- **Pasado**: Qué se entrenó, cómo se sintió, qué se logró. Historia del atleta.
- **Presente**: Foco en la sesión del día.
- **Futuro**: Ver qué viene. Transparencia del plan.

El entrenador usa esto para **contexto antes de decisiones**: Antes de planificar la próxima semana, revisa el feedback de la anterior.

### 7. Dashboard del Entrenador
- Vista rápida: ¿Quién entrenó? ¿Quién faltó? ¿Quién reportó molestias?
- Cumplimiento por grupo/atleta
- Alertas: atleta estancado, posible sobrecarga, metas no cumplidas
- Drill-down a cualquier atleta para ver detalle

### 8. IA como Asistente
No genera rutinas automáticas. Analiza y sugiere:
- "Este atleta lleva 4 semanas sin progreso en press banca"
- "Carga acumulada alta + feedback negativo = riesgo"
- "3 atletas del grupo reportaron fatiga el miércoles"

---

## Usuarios

| Rol | Plataforma Principal | Acciones Clave |
|-----|---------------------|----------------|
| Entrenador | Web | Crear ejercicios, diseñar planes, asignar, analizar |
| Atleta | Móvil | Ver sesión, ejecutar, registrar, dar feedback |

---

## Alcance MVP
- Librería de ejercicios (predefinidos + custom)
- Planificador: macro → meso → micro → sesión
- Asignación a grupos/individuos
- App móvil atleta: ver, ejecutar, registrar
- Historial navegable
- Dashboard básico de cumplimiento
- Auth email/Google
- Offline-tolerant en móvil

## Post-MVP
- Modo entrenador en móvil (gestión in-situ)
- Integraciones wearables (Garmin, Apple Health)
- IA avanzada con alertas predictivas
- Video hosting propio
- Pagos/suscripciones
