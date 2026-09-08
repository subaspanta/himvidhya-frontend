# HimVidhya Web Client

The web application for HimVidhya, a classroom collaboration and learning-
material platform. Teachers manage classes and course content; students join
classes, follow discussions, and access shared materials.

This repository is an independent Next.js application. Its API is provided by
the sibling `server/` repository through the versioned `/api/v1` endpoints.

## Product Surface

- Public authentication flows for login, registration, and password recovery
- Role-aware protected dashboards for teachers and students
- Class membership and join-request workflows
- Posts, comments, and learning-material views
- Cookie-based sessions with automatic access-token refresh
- Responsive UI built around feature-first domain modules

## Technology

- Next.js 16 App Router
- React 19 and TypeScript 5
- TanStack React Query for server state
- Zustand for session state
- Axios for API transport
- Tailwind CSS 4, shadcn/ui, and Radix primitives

## Requirements

- Node.js `>=24 <25`
- npm `>=11 <12`
- A running HimVidhya API for authenticated workflows

With nvm, select the project version before installing dependencies:

```bash
nvm use 24
```

## Local Setup

1. Install dependencies:

   ```bash
   npm ci
   ```

2. Create `.env.local` in the project root:

   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
   ```

3. Start the backend from the sibling `server/` repository:

   ```bash
   cd ../server
   npm run dev
   ```

4. Start the frontend in a second terminal:

   ```bash
   cd ../client
   npm run dev
   ```

The application runs at `http://localhost:3000`.

## Scripts

| Command                 | Purpose                                              |
| ----------------------- | ---------------------------------------------------- |
| `npm run dev`           | Start Next.js in development mode with Webpack       |
| `npm run build`         | Create a production build                            |
| `npm run start`         | Serve the production build                           |
| `npm run test`          | Run the Vitest suite                                 |
| `npm run lint`          | Run ESLint                                           |
| `npm run typecheck`     | Run TypeScript checks                                |
| `npm run audit:deps`    | Audit dependencies for high-severity vulnerabilities |
| `npm run outdated:deps` | List outdated dependencies                           |
| `npm run health:deps`   | Run dependency audit and outdated checks             |
| `npm run health:all`    | Run lint, typecheck, build, and dependency checks    |

## Project Structure

```text
app/            Next.js routes and layouts
components/     Shared presentational components and UI primitives
config/         Application constants and configuration
features/       Domain modules: auth, classes, comments, landing, and posts
providers/      React Query, session, and application providers
shared/         API transport, shared hooks, loading, types, and utilities
public/         Static assets and fonts
tests/          Vitest unit and component tests
```

## Client Architecture

- API modules normalize server responses; hooks own queries, mutations, and
  invalidation.
- React Query owns server state. Zustand stores session flags and the current
  user context.
- Requests flow through `shared/api/axiosClient.ts`, including single-flight
  token refresh handling.
- Public and authenticated routes are separated under `app/(public)` and
  `app/(protected)`.
- Shared providers are mounted from `providers/root-provider.tsx`.

## Verification

Run the standard pre-review checks:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Or run the complete health check:

```bash
npm run health:all
```
