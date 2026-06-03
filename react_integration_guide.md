# React + TypeScript + Tailwind CSS + shadcn/ui Setup Guide

This guide explains how to set up a modern React project using Vite, Tailwind CSS, TypeScript, and the shadcn/ui CLI. It also documents why folders like `components/ui` are critical.

---

## 1. Project Initialization (Vite + TypeScript)

To create a new React app with TypeScript using Vite, run:
```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
```

---

## 2. Setting Up Tailwind CSS

To install Tailwind CSS and its peer dependencies, run:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Configure Tailwind CSS Paths
Update your `tailwind.config.js` to include the paths to your files:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Add the Tailwind directives to your main CSS file (usually `src/index.css` or `src/styles/globals.css`):
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 3. Initializing shadcn/ui CLI

The shadcn/ui library is a collection of re-usable components that you can copy and paste directly into your project.

### Step 3.1: Configure Path Aliases
Make sure your TypeScript configuration supports path aliases. Update `tsconfig.json` and `tsconfig.app.json` (Vite's default sub-config) to support the `@/*` alias pointing to `./src/*`:

**`tsconfig.json` / `tsconfig.app.json`:**
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

Install Node types to resolve pathing inside Vite configuration:
```bash
npm install -D @types/node
```

**`vite.config.ts`:**
```typescript
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

### Step 3.2: Run the shadcn-ui Init Command
Initialize shadcn using the CLI:
```bash
npx shadcn@latest init
```

During initialization, the CLI will ask:
1. **Style**: Select `Default` or `New York`.
2. **Base color**: Select a base color palette (e.g., `Slate`, `Zinc`, etc.).
3. **CSS variables**: Yes (recommended for easy styling transitions).
4. **Tailwind CSS config path**: `tailwind.config.js`.
5. **Global CSS file**: `src/index.css` (or the location of your main CSS file).
6. **Import alias for components**: `@/components`.
7. **Import alias for utils**: `@/lib/utils`.
8. **React Server Components**: No (since we are using Vite).

---

## 4. Default Path for Components and Styles

- **Default path for components**: `@/components`
- **Default path for built-in UI primitives**: `@/components/ui`
- **Default path for utility helpers**: `@/lib/utils.ts`

### Why is `/components/ui` important?

1. **Separation of Concerns**:
   - `/components/ui/` contains reusable, generic low-level UI elements (like buttons, dialogs, badges, inputs). These are imported multiple times throughout the application.
   - Other folders under `/components/` (like `/components/layout/` or `/components/features/`) contain page-specific, higher-level components which integrate multiple UI elements together.
2. **Automated CLI Scaffolding**:
   - The `shadcn` CLI is hard-coded to download, update, and manage components directly under the `components/ui/` directory based on your configuration. Deviating from this standard requires overriding configurations and can break standard package upgrades.
3. **Path Alias Standard**:
   - Importing via `@/components/ui/button` is clean, independent of the relative file nesting level, and prevents complex relative imports like `../../../../components/button`.

---

## 5. Integrating the Aether Flow Hero Component

The `AetherFlowHero` component features an interactive canvas-based particle network combined with motion overlays.

### Install NPM Dependencies

To install the required libraries, run:
```bash
npm install lucide-react framer-motion
```

### Component Files Copied
- **[aether-flow-hero.tsx](file:///d:/BInaryAxon/Binaryaxon/components/ui/aether-flow-hero.tsx)**: Main interactive canvas particle component.
- **[demo.tsx](file:///d:/BInaryAxon/Binaryaxon/components/ui/demo.tsx)**: Demo entry point page container displaying the component.
