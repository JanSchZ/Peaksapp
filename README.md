# Peaksapp - MVP Build Complete! 🚀

## What We've Built

Congratulations! Your Peaksapp monorepo is now fully set up with a **state-of-the-art** technical foundation. Here's what we've accomplished:

### ✅ Monorepo Structure (Turborepo)
- **`apps/web`**: Next.js 14 web application (Coach Dashboard)
- **`apps/mobile`**: Expo 52 mobile application (Single App: Athlete Mode + Coach Mode)
- **`packages/ui`**: Shared UI component library with Shadcn/UI components
- **`packages/core`**: Shared business logic and database schemas (Drizzle ORM)
- **`packages/config`**: Shared configuration (TypeScript, ESLint, Tailwind)

### ✅ Premium Design System
- **Dark Mode First**: Premium dark color palette with HSL variables
- **Typography**: Inter font family for professional aesthetics
- **Components**: Button, Input, and Card components following Shadcn/UI patterns
- **Tailwind CSS**: Fully configured with custom theme and utilities

### ✅ Authentication (Supabase)
- **Web**: Login page with server actions and Supabase SSR
- **Mobile**: Login screen with AsyncStorage persistence
- **Ready for Deployment**: Just add your Supabase credentials

### ✅ Build System
- **Turborepo**: Optimized caching and parallel builds
- **TypeScript**: Full type safety across all packages
- **ESLint**: Consistent code quality
- **Build Status**: ✅ All packages build successfully

---

## 🚀 Next Steps

> **⚠️ IMPORTANTE**: Antes de ejecutar las aplicaciones, asegúrate de instalar las dependencias correctamente (ver paso 2 abajo). Hay un paso adicional requerido para resolver un conflicto de versiones de `ajv`.

### 1. Set Up Supabase

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Copy your project URL and anon key
3. Create environment files:

**For Web** (`apps/web/.env.local`):
```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

**For Mobile** (`apps/mobile/.env`):
```bash
EXPO_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 2. Run the Applications

**Option A: Use Setup Script (Recommended)**:
```bash
# macOS / Linux
./scripts/setup.command

# Windows (PowerShell)
.\scripts\setup.ps1
```

**Option B: Quick Install Script**:
```bash
# From the root directory
./install.sh
```

**Option C: Manual Install**:
```bash
# From the root directory
npm install --legacy-peer-deps

# Fix ajv version conflict (required for Expo)
npm install ajv@^8.17.1 --save-dev --legacy-peer-deps
```

**Then Run:**

**Web App** (Coach Dashboard):
```bash
npm run dev --workspace=@peaks/web
```
Then open [http://localhost:3000](http://localhost:3000)

**Mobile App** (Athlete Experience):
```bash
npm run start --workspace=@peaks/mobile
```
Then scan the QR code with Expo Go

### 3. Database Setup

Set up your database schema in Supabase:

```sql
-- Users table (Supabase Auth handles this)
-- Add custom fields as needed

-- Organizations table
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
```

### 4. Continue Development

Based on your `implementation_plan.md`, the next features to implement are:

**For Web (Coach Command Center):**
- [ ] Coach onboarding flow
- [ ] **Periodization Engine**: Macro/Meso/Microcycle planning with Gantt view
- [ ] **Exercise Builder**: Create exercises, upload videos, tag metadata
- [ ] **Workout Designer**: Drag & drop builder for complex sessions
- [ ] **Proactive AI**: Plan auditing and volume violation alerts
- [ ] Dashboard overview with Advanced Metrics (ACWR, Monotony)
- [ ] Calendar view for planning
- [ ] Athlete management (invite, assign workouts)
- [ ] **AI Import**: Import legacy Excel/PDF plans with Gemini 2.5

**For Mobile (Universal App):**
- [ ] **Coach Mode**: View groups, quick edit, athlete logs
- [ ] **Athlete Mode**: Interactive workout, timer, RPE logging
- [ ] **Journaling**: Post-workout notes with Gemini 3.0 Pro analysis
- [ ] Offline sync with WatermelonDB

---

## 📦 Package Scripts

- **`npm run dev`**: Start all apps in development mode
- **`npm run build`**: Build all packages and apps
- **`npm run lint`**: Lint all packages
- **`npm install --legacy-peer-deps`**: Install dependencies (use this flag for Expo compatibility)

---

## 🎨 Design Philosophy & Vision

**Peaksapp is the Operating System for High Performance.**

- **Long-Term Vision**: We manage **Seasons**, not just sessions. Full periodization support (Macro/Meso/Micro).
- **Proactive Intelligence**: The AI audits your plan *before* you assign it, warning of injury risks or poor tapering.
- **Coach as Architect**: Powerful tools to create exercises, upload media, and design workouts manually.
- **Coach as CEO**: The coach has a "Command Center" to manage 50+ athletes without burnout.
- **Science-Based**: We don't just log weights; we calculate **ACWR**, **Strain**, and **Readiness**.
- **AI-Powered**: Gemini 3.0 Pro analyzes athlete journals to detect burnout before it happens.
- **Premium Aesthetic**: Dark Mode First, Glassmorphism, and smooth animations.
- **Modern Components**: Shadcn/UI patterns with Radix UI primitives
- **Smooth Animations**: Ready for Framer Motion (web) and Reanimated (mobile)
- **Glassmorphism**: Backdrop blur effects on cards
- **Accessibility**: WCAG 2.1 AA compliant color contrasts

---

## 🏗️ Architecture Highlights

1. **TypeScript Everywhere**: Full type safety from database to UI
2. **Pragmatic Offline**: TanStack Query for robust caching and offline tolerance
3. **Monorepo Benefits**: Shared code, consistent tooling, optimized builds
4. **Server Components**: Next.js App Router with Server Actions
5. **Edge-Ready**: Supabase Edge Functions for backend logic

---

## 📝 Important Files

- **`arquitectura.md`**: Your refined architecture document
- **`implementation_plan.md`**: Detailed MVP implementation roadmap
- **`turbo.json`**: Turborepo configuration
- **`package.json`**: Root workspace configuration

---

## 🎯 Current Status

**Build Status**: ✅ **PASSING**
- Web App: ✅ Builds successfully
- Mobile App: ✅ Builds successfully  
- UI Package: ✅ Builds successfully
- Core Package: ✅ Builds successfully

**Features Completed**:
- ✅ Monorepo setup
- ✅ Design system implementation
- ✅ Core UI components (Button, Input, Card)
- ✅ Authentication pages (Web + Mobile)
- ✅ Supabase integration

---

## 💡 Pro Tips

1. **Always use `--legacy-peer-deps`** when installing packages due to Expo dependencies
2. **Test mobile on real devices** for the best experience (Expo Go or development builds)
3. **Use Turbo's caching** to speed up builds: `npm run build` caches successfully built packages
4. **Follow the implementation plan** in `implementation_plan.md` for a structured development process

---

## 🆘 Need Help?

### Common Issues

If you encounter issues during setup or development, check the **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** guide. It covers:

- ✅ Module resolution errors (`ajv`, `@peaks/ui` not found)
- ✅ Expo startup failures
- ✅ Supabase Auth configuration
- ✅ Build and TypeScript errors
- ✅ macOS script issues
- ✅ Tailwind and ESLint configuration

### Documentation

- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Expo Docs**: [docs.expo.dev](https://docs.expo.dev)
- **Turborepo Docs**: [turbo.build/repo/docs](https://turbo.build/repo/docs)

---

**You now have a rock-solid foundation for your Peaksapp MVP. Happy coding! 🎉**
