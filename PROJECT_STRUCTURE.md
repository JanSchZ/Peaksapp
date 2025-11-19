# Peaksapp Project Structure

```
Peaksapp/
├── apps/                      # Applications
│   ├── web/                   # Next.js web app (Coach Dashboard)
│   │   ├── app/               # Next.js App Router pages
│   │   ├── utils/             # Utilities (Supabase clients, etc.)
│   │   ├── package.json
│   │   ├── next.config.mjs
│   │   └── tsconfig.json
│   │
│   └── mobile/                # Expo mobile app (Athlete Experience)
│       ├── app/               # Expo Router screens
│       ├── lib/               # Libraries (Supabase client, etc.)
│       ├── package.json
│       ├── app.config.ts
│       └── tsconfig.json
│
├── packages/                  # Shared packages
│   ├── core/                  # Business logic, Drizzle schemas, Zod
│   │   ├── src/
│   │   │   ├── db/           # Database schemas
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── ui/                    # Shared UI components
│   │   ├── src/
│   │   │   ├── components/   # Shadcn/UI components
│   │   │   ├── lib/          # Utilities
│   │   │   └── globals.css   # Global styles
│   │   └── package.json
│   │
│   └── config/                # Shared configurations
│       ├── tsconfig.json      # Base TypeScript config
│       ├── tailwind.config.ts # Base Tailwind config
│       ├── eslint.config.mjs  # Base ESLint config
│       └── package.json
│
├── scripts/                   # Helper scripts
│   ├── setup.command          # Setup for macOS/Linux
│   ├── setup.ps1              # Setup for Windows
│   ├── start.command          # Start dev servers (macOS)
│   ├── start.ps1              # Start dev servers (Windows)
│   ├── build-apk.command      # Android build (macOS)
│   └── build-apk.ps1          # Android build (Windows)
│
├── docs/                      # Additional documentation
│
├── .github/                   # GitHub configuration (CI/CD workflows)
│
├── node_modules/              # Dependencies (gitignored)
│
├── package.json               # Root workspace config
├── package-lock.json          # Lockfile
├── turbo.json                 # Turborepo configuration
├── tsconfig.json              # Root TypeScript config
├── tsconfig.base.json         # Base TypeScript config
├── drizzle.config.ts          # Drizzle ORM config
├── eslint.config.mjs          # Root ESLint config
│
├── install.sh                 # Quick install script
│
├── README.md                  # Main documentation
├── TROUBLESHOOTING.md         # Troubleshooting guide
├── ENV_EXAMPLE.md             # Environment variables template
├── arquitectura.md            # Architecture document (Spanish)
│
└── .gitignore                 # Git ignore rules
```

## Key Directories

### `/apps`
Contains the frontend applications (web and mobile).

### `/packages`
Contains shared code that can be used by both web and mobile apps:
- **`core`**: Business logic, database schemas (Drizzle), validation (Zod)
- **`ui`**: Shared UI components (Shadcn/UI, Tailwind)
- **`config`**: Shared configuration files

### `/scripts`
Helper scripts for setup, development, and builds.

### `/docs`
Additional project documentation.

## Important Files

- **`package.json`**: Root workspace configuration (npm workspaces)
- **`turbo.json`**: Turborepo configuration for caching and builds
- **`drizzle.config.ts`**: Database ORM configuration
- **`install.sh`**: Automated installation script
- **`README.md`**: Main project documentation
- **`TROUBLESHOOTING.md`**: Common issues and solutions

## Ignored Files/Directories

See `.gitignore` for the complete list. Key ignored items:
- `node_modules/`
- `.next/`, `build/`, `dist/`
- `.env*` files (except `ENV_EXAMPLE.md`)
- Build logs and temporary files
