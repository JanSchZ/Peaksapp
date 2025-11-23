# Peaks - High Performance OS

## 🚀 Getting Started (Fresh Start)

This project has been rebuilt with a **Pragmatic Senior Stack**:
- **Monorepo**: Turborepo
- **Core**: Drizzle ORM (Schema), Zod, Shared Types
- **Web**: Next.js 14 (Coach Command Center)
- **Mobile**: Expo 52 (Universal App)
- **UI**: Shared Shadcn/UI components

### 1. Setup Environment
Copy `ENV_EXAMPLE.md` to `.env.local` in `apps/web` and `.env` in `apps/mobile`.
```bash
cp ENV_EXAMPLE.md apps/web/.env.local
cp ENV_EXAMPLE.md apps/mobile/.env
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
This will start both Web (localhost:3000) and Mobile (Expo).

### 4. Database Setup
The database schema is defined in `packages/core/src/db/schema.ts`.

1. **Generate Migrations**:
```bash
npm run db:generate
```

2. **Run Migrations**:
```bash
npm run db:migrate
```
Or for quick prototyping without migrations files:
```bash
npm run db:push
```

3. **Secure Database**:
Run the SQL in `packages/core/src/db/rls_policies.sql` in your Supabase SQL Editor.

## 🏗️ Architecture Highlights
1. **TypeScript Everywhere**: Full type safety from database to UI
2. **Pragmatic Offline**: TanStack Query for robust caching and offline tolerance
3. **Monorepo Benefits**: Shared code, consistent tooling, optimized builds
4. **Server Components**: Next.js App Router with Server Actions
5. **Edge-Ready**: Supabase Edge Functions for backend logic
