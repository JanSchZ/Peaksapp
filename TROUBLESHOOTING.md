# Troubleshooting Guide

## Common Issues and Solutions

### Mobile App: "Cannot find module 'ajv/dist/compile/codegen'"

**Síntoma**: Al ejecutar `npx expo start` o el script de inicio, obtienes un error relacionado con módulos de `ajv` o `ajv-keywords`.

**Causa**: Conflicto de versiones de `ajv`. `ajv-keywords` requiere `ajv ^8.x` pero se instaló `ajv 6.x` por dependencias transitivas.

**Solución**:

```bash
# 1. Instalar la versión correcta de ajv en la raíz del workspace
npm install ajv@^8.17.1 --save-dev --legacy-peer-deps

# 2. Verificar que Expo funciona
cd apps/mobile
npx expo start --help

# 3. Si persiste, limpiar completamente y reinstalar:
cd /Users/janschurch/Desktop/Code/Peaksapp  # Volver a la raíz
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npm install ajv@^8.17.1 --save-dev --legacy-peer-deps
```

**Nota**: El `package.json` raíz ya incluye `"ajv": "^8.17.1"` en `devDependencies` para prevenir este problema.

### Web App: Build failures or TypeScript errors

**Síntoma**: Errores de TypeScript o módulos no encontrados al hacer `npm run build`.

**Solución**:

```bash
# Limpiar y rebuildar
npm run build

# Si persiste, limpiar node_modules
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npm run build
```

### Workspace dependency issues

**Síntoma**: Módulos internos (`@peaks/ui`, `@peaks/core`) no se encuentran.

**Verificar**: Ensure `package.json` dependencies usan `*` en lugar de `workspace:*`:

```json
{
  "dependencies": {
    "@peaks/core": "*",  // ✅ Correcto
    "@peaks/ui": "*"     // ✅ Correcto
  }
}
```

### Supabase Auth no funciona

**Síntoma**: Errores de autenticación o módulo `@supabase/ssr` no encontrado.

**Verificar**:

1. Variables de entorno configuradas (ver `ENV_EXAMPLE.md`)
2. Dependencias instaladas:

```bash
# Web
cd apps/web
npm list @supabase/ssr @supabase/supabase-js

# Mobile
cd apps/mobile
npm list @supabase/supabase-js @react-native-async-storage/async-storage
```

### Scripts de inicio no funcionan en macOS

**Síntoma**: El script `scripts/start.command` no abre las terminales.

**Solución**:

```bash
# Dar permisos de ejecución
chmod +x scripts/start.command

# Ejecutar manualmente cada servicio en terminales separadas
# Terminal 1:
cd apps/web && npm run dev

# Terminal 2:
cd apps/mobile && npx expo start

# Terminal 3 (futuro backend):
# cd apps/backend && npm run dev
```

### Expo: "No compatible apps connected"

**Síntoma**: Expo CLI no encuentra tu dispositivo o emulador.

**Solución**:

```bash
# Para iOS Simulator (requiere Xcode)
npx expo start --ios

# Para Android Emulator (requiere Android Studio)
npx expo start --android

# Para web browser
npx expo start --web

# Para Expo Go en dispositivo físico
npx expo start --go
# Escanea el QR code con Expo Go app
```

### Expo: "Project is incompatible with this version of Expo Go"

**Síntoma**: 
```
• The installed version of Expo Go is for SDK 54.
• The project you opened uses SDK 52.
```

**Causa**: Tu dispositivo tiene Expo Go para SDK 54, pero el proyecto usa SDK 52.

**Soluciones**:

**Opción A: Actualizar el proyecto a SDK 54 (Recomendado para nuevos proyectos)**

```bash
cd apps/mobile

# Actualizar dependencias de Expo
npm install expo@~54.0.0 --legacy-peer-deps
npm install expo-router@~5.0.0 --legacy-peer-deps

# Actualizar React Native
npm install react-native@0.76.9 --legacy-peer-deps
npm install react-native-screens@~4.4.0 --legacy-peer-deps

# Actualizar app.config.ts
# Cambiar sdkVersion a "54.0.0"
```

**Opción B: Instalar Expo Go compatible con SDK 52**

1. Desinstala Expo Go actual de tu dispositivo
2. Descarga Expo Go para SDK 52:
   - **Android**: https://expo.dev/go?sdkVersion=52&platform=android&device=true
   - **iOS**: https://expo.dev/go?sdkVersion=52&platform=ios&device=true

**Opción C: Usar Web o Emulador (Sin Expo Go)**

```bash
# Usar web browser (más fácil para desarrollo)
npx expo start --web

# O usar emulador nativo
npx expo start --ios      # iOS Simulator
npx expo start --android  # Android Emulator
```

### Expo: Asset warnings (splash.png, icon.png)

**Síntoma**: 
```
Unable to resolve asset "./assets/splash.png" from "splash.image"
```

**Solución**: Crear los assets faltantes

```bash
cd apps/mobile

# Crear directorio de assets
mkdir -p assets

# Opción 1: Usar placeholders temporales (desarrollo)
# Crear imágenes de 1024x1024 con ImageMagick o similar
# O usar https://placeholder.com/

# Opción 2: Comentar temporalmente en app.config.ts
# Editar app.config.ts y comentar las líneas de splash e icon
```

### TypeScript: Path aliases no funcionan

**Síntoma**: Imports con `@/*` no se resuelven.

**Verificar** `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Tailwind: Estilos no se aplican

**Síntoma**: Los estilos de Tailwind no aparecen en la web app.

**Verificar**:

1. `tailwind.config.ts` tiene las rutas correctas de `content`:

```typescript
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}"
  ],
  // ...
}
```

2. `globals.css` está importado en `app/layout.tsx`:

```typescript
import "@peaks/ui/globals.css";
```

### ESLint: Errores de configuración

**Síntoma**: ESLint no encuentra la configuración o reporta errores de módulos.

**Solución**:

```bash
# Reinstalar dependencias de ESLint
npm install --save-dev eslint-config-next --legacy-peer-deps

# Verificar que eslint.config.mjs existe
ls apps/web/eslint.config.mjs
```

## Obtener Ayuda

Si ninguna de estas soluciones funciona:

1. **Revisar logs completos**: Copia el error completo
2. **Verificar versiones**:
   ```bash
   node --version  # Debe ser 18.x o superior
   npm --version   # Debe ser 9.x o superior
   ```
3. **Issues conocidos**: Revisar GitHub issues de Expo, Next.js, Supabase
4. **Consultar documentación**: README.md principal del proyecto

## Comandos Útiles de Diagnóstico

```bash
# Ver árbol de dependencias
npm list --depth=0

# Ver paquetes desactualizados
npm outdated

# Limpiar caché de npm
npm cache clean --force

# Verificar integridad de node_modules
npm install --legacy-peer-deps --verbose

# Ver configuración de npm
npm config list

# Turbo: Ver qué se está cacheando
npm run build -- --summarize
```
