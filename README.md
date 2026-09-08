# HimVidhya Client

Frontend for the HimVidhya platform, built with Next.js App Router, TypeScript, React Query, Zustand, and Tailwind CSS.

## What This App Includes

- Public auth flows (login, register, forgot/reset password)
- Protected dashboard shell
- Class/batch enrollment and management flows (in-progress)
- Shared API layer with cookie-based auth and refresh handling
- Feature-first folder organization for scalable frontend work

## Tech Stack

- Next.js 16 (App Router)
- React 19 + TypeScript 5
- @tanstack/react-query v5
- Zustand
- Axios
- Tailwind CSS 4
- shadcn/ui + Radix primitives

## Prerequisites

- Node.js `>=24 <25`
- npm `>=11 <12`

If you use nvm:

```bash
nvm use 24
```

## Getting Started

1. Install dependencies:

```bash
npm ci
```

2. Create your local environment file:

```bash
cp .env.local.example .env.local
```

If `.env.local.example` is not present, create `.env.local` manually.

3. Set at least this variable:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
```

4. Start the development server:

```bash
npm run dev
```

App default: `http://localhost:3000`

For the complete local stack, start the backend from the sibling `server/`
repository with `npm run dev` before using authenticated features.

## Available Scripts

- `npm run dev` - Start Next.js dev server (webpack mode)
- `npm run build` - Create production build
- `npm run start` - Run production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checks
- `npm run test` - Run Vitest suite
- `npm run audit:deps` - Run npm audit with high severity threshold
- `npm run outdated:deps` - Show outdated dependencies
- `npm run health:deps` - Run dependency health checks
- `npm run health:all` - Run lint + typecheck + build + dependency checks

## Project Structure

```text
client/
  app/                # Next.js routes (public and protected segments)
  components/         # Reusable UI and layout components
  features/           # Domain modules (auth, home, batches, etc.)
  providers/          # App-level providers (React Query, toaster, root)
  shared/             # Shared api client, hooks, types, utils
  config/             # Constants and app-wide config
  public/             # Static assets and fonts
  tests/              # Vitest unit/component tests
```

## Architecture Notes

- API requests go through `shared/api/axiosClient.ts`.
- Auth state is coordinated between React Query and Zustand.
- App routing is split into:
  - `app/(public)` for unauthenticated pages
  - `app/(protected)` for authenticated pages
- Shared providers are mounted from `providers/root-provider.tsx`.

## Backend Expectations

This client expects the HimVidhya server to be running and reachable at `NEXT_PUBLIC_API_BASE_URL`.

Typical local backend URL:

```text
http://localhost:5000/api/v1
```

## Recommended Local Health Check

Run before opening a PR:

```bash
npm run lint
npm run typecheck
npm run build
```

Or all-in-one:

```bash
npm run health:all
```

## Notes

- Dev script uses webpack (`next dev --webpack`) by design.
- The codebase is actively evolving; some protected routes are still under active implementation.
