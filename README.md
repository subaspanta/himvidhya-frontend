## Frontend Architecture Audit (React + React Query)

## 1) Project structure and interaction map

- **Framework/entry**
  - Next.js App Router with global shell in [client/app/layout.tsx](client/app/layout.tsx).
  - Global providers mounted via [client/providers/root-provider.tsx](client/providers/root-provider.tsx) and [client/providers/query-provider.tsx](client/providers/query-provider.tsx).
- **Routing split**
  - Public routes in [client/app/(public)](<client/app/(public)>).
  - Protected routes in [client/app/(protected)](<client/app/(protected)>).
  - Modal route segments in [client/app/(public)/@modal](<client/app/(public)/@modal>).
- **Feature layering**
  - API functions by domain: [client/features/auth/api/auth.api.ts](client/features/auth/api/auth.api.ts), [client/features/home/api/home.api.ts](client/features/home/api/home.api.ts).
  - React Query hooks around API functions in [client/features/auth/hooks](client/features/auth/hooks), [client/features/home/hooks](client/features/home/hooks).
  - UI state via Zustand in [client/features/auth/store/auth.store.ts](client/features/auth/store/auth.store.ts).
- **Shared platform layer**
  - Axios transport + token refresh logic in [client/shared/api/axiosClient.ts](client/shared/api/axiosClient.ts).
  - Query key constants in [client/config/constants.ts](client/config/constants.ts).
  - Navigation helper in [client/shared/hooks/useNavItems.ts](client/shared/hooks/useNavItems.ts).

**Interaction model (current):**

1. App boots → `QueryProvider` + `AuthInitializer`.
2. `AuthInitializer` calls `useCurrentUser()` → `/auth/me`.
3. `useCurrentUser()` syncs server auth into Zustand (`user`, `isAuthenticated`, `authChecked`).
4. `AuthGate` allows/redirects UI based on Zustand auth state.
5. Feature pages/components consume React Query hooks + local UI state.

---

## 2) API integrations: React Query vs other methods

## React Query managed

- **Auth**
  - `POST /auth/login` via `useLogin()` + `loginUser()`
  - `POST /auth/register` via `useRegister()` + `registerUser()`
  - `GET /auth/me` via `useCurrentUser()` + `getCurrentUser()`
  - `POST /auth/logout` via `useLogout()` + `logoutUser()`
  - `POST /auth/forget-password` via `useForgetPassword()`
  - `POST /auth/verify-otp` via `useVerifyOTP()`
  - `POST /auth/reset-password` via `useResetPassword()`
- **Class/Home**
  - `GET /class/my` via `useGetEnrolledClasses()`
  - `POST /class` via `useCreateClass()`
  - `POST /class/join` via `useJoinClass()`

Sources: [client/features/auth/hooks](client/features/auth/hooks), [client/features/home/hooks](client/features/home/hooks), [client/features/auth/api/auth.api.ts](client/features/auth/api/auth.api.ts), [client/features/home/api/home.api.ts](client/features/home/api/home.api.ts).

## Non-React-Query / transport-level

- `POST /auth/refresh-token` inside Axios response interceptor in [client/shared/api/axiosClient.ts](client/shared/api/axiosClient.ts).
- Imperative browser redirects via `window.location.*` in:
  - [client/shared/api/axiosClient.ts](client/shared/api/axiosClient.ts)
  - [client/features/auth/components/AuthGate.tsx](client/features/auth/components/AuthGate.tsx)
  - [client/app/(protected)/home/page.tsx](<client/app/(protected)/home/page.tsx>)
  - [client/features/auth/hooks/useLogout.ts](client/features/auth/hooks/useLogout.ts)

## Not used

- No direct `fetch()` usage found in active frontend TS/TSX files.

---

## 3) Data flow (API → state/cache → UI)

- **Transport**
  - All API calls use `apiClient` from [client/shared/api/axiosClient.ts](client/shared/api/axiosClient.ts).
  - Response interceptor normalizes payload to `response.data = response.data.data ?? response.data`.
- **Cache**
  - React Query provider is created in [client/providers/query-provider.tsx](client/providers/query-provider.tsx) with defaults (`staleTime`, `retry`, `refetchOnWindowFocus`).
  - Domain hooks use query keys:
    - `["me"]` from [client/config/constants.ts](client/config/constants.ts)
    - `["enrolledClasses"]` inline in home hooks.
- **Global state**
  - Auth identity persisted in Zustand store [client/features/auth/store/auth.store.ts](client/features/auth/store/auth.store.ts).
  - `useCurrentUser()` bridges React Query result into Zustand.
- **UI composition**
  - `AuthGate` gates rendering/redirect.
  - `TeacherDashboard` renders class list from `useGetEnrolledClasses()` in [client/app/(protected)/home/teacher/page.tsx](<client/app/(protected)/home/teacher/page.tsx>).
- **Transformations**
  - User mapping in `mapUser()` in [client/features/auth/api/auth.api.ts](client/features/auth/api/auth.api.ts).
  - Class records reshaped/cast in teacher page (`as Batch`) using fallback defaults.

---

## 4) Inconsistencies and mixed paradigms

- **Critical cache inconsistency**
  - `QueryProvider` uses a local `new QueryClient(...)`, but interceptor/logout import a different singleton from [client/shared/api/queryClient.ts](client/shared/api/queryClient.ts).
  - Result: `invalidateQueries()`/`removeQueries()` may target the wrong client instance.
- **Route mismatch**
  - Navbar links point to `/home/batches`, `/home/schedule`, `/home/announcements` in [client/shared/hooks/useNavItems.ts](client/shared/hooks/useNavItems.ts), but actual protected routes are `/batches`, `/schedule`, `/announcements` in [client/app/(protected)](<client/app/(protected)>).
- **State duplication**
  - Auth routing logic duplicated in `AuthGate` and home page ([client/features/auth/components/AuthGate.tsx](client/features/auth/components/AuthGate.tsx), [client/app/(protected)/home/page.tsx](<client/app/(protected)/home/page.tsx>)).
- **Type drift**
  - `ClassCard` uses `_id` in [client/features/batches/types.ts](client/features/batches/types.ts), while teacher page expects `id` and casts to `Batch` in [client/app/(protected)/home/teacher/page.tsx](<client/app/(protected)/home/teacher/page.tsx>).
- **Unfinished/placeholder areas**
  - Empty pages: [client/app/(protected)/batches/page.tsx](<client/app/(protected)/batches/page.tsx>), [client/app/(protected)/announcements/page.tsx](<client/app/(protected)/announcements/page.tsx>), [client/app/(protected)/materials/page.tsx](<client/app/(protected)/materials/page.tsx>), [client/app/(protected)/schedule/page.tsx](<client/app/(protected)/schedule/page.tsx>).
  - Commented-out class detail implementation in [client/app/(protected)/batches/[id]/page.tsx](<client/app/(protected)/batches/[id]/page.tsx>).
  - Empty module files: [client/features/batches/api/classApi.ts](client/features/batches/api/classApi.ts), [client/features/home/index.ts](client/features/home/index.ts), [client/features/rbac/permissions.ts](client/features/rbac/permissions.ts), [client/features/home/data/mockData.ts](client/features/home/data/mockData.ts).
- **Navigation/RBAC drift**
  - Old commented nav config in [client/features/nav/nav.config.ts](client/features/nav/nav.config.ts), active nav elsewhere.
- **Mixed navigation methods**
  - `router.push/replace` mixed with `window.location.*` across auth and API layers.

---

## 5) Critical code areas (high impact)

- Auth bootstrap + guard:
  - [client/features/auth/components/AuthInitializer.tsx](client/features/auth/components/AuthInitializer.tsx)
  - [client/features/auth/components/AuthGate.tsx](client/features/auth/components/AuthGate.tsx)
  - [client/features/auth/hooks/useCurrentUser.ts](client/features/auth/hooks/useCurrentUser.ts)
- Token refresh and interceptor logic:
  - [client/shared/api/axiosClient.ts](client/shared/api/axiosClient.ts)
- Query configuration and key strategy:
  - [client/providers/query-provider.tsx](client/providers/query-provider.tsx)
  - [client/config/constants.ts](client/config/constants.ts)
- Core class list UX/business surface:
  - [client/app/(protected)/home/teacher/page.tsx](<client/app/(protected)/home/teacher/page.tsx>)
  - [client/features/home/hooks/useGetEnrolledClasses.ts](client/features/home/hooks/useGetEnrolledClasses.ts)

---

## 6) Mock data, hardcoded values, temporary workarounds

- Hardcoded API fallback URL:
  - [client/shared/api/axiosClient.ts](client/shared/api/axiosClient.ts) (`http://localhost:5000/api/v1`)
- Hardcoded teacher stats and text:
  - [client/app/(protected)/home/teacher/page.tsx](<client/app/(protected)/home/teacher/page.tsx>)
  - [client/components/layout/DashboardHeader.tsx](client/components/layout/DashboardHeader.tsx) (`"You have 3 classes..."`)
- Temporary placeholder messaging:
  - [client/components/navbar/navbar.utils.ts](client/components/navbar/navbar.utils.ts) (`"Settings coming soon!"`)
- Placeholder/empty pages and commented legacy code (listed above) indicate scaffold stage.
- Stale README/app description still references chat architecture:
  - [client/README.md](client/README.md)
  - [client/app/layout.tsx](client/app/layout.tsx) metadata description.

---

## 7) Actionable recommendations (priority order)

1. **Unify QueryClient instance (highest priority).**  
   Use one shared `QueryClient` for provider + interceptor + logout logic.
2. **Normalize route contracts.**  
   Fix nav hrefs in [client/shared/hooks/useNavItems.ts](client/shared/hooks/useNavItems.ts) to match App Router routes.
3. **Create strict API DTO mappers per feature.**  
   Remove ad-hoc casts (`as Batch`), normalize `_id` → `id` at API boundary.
4. **Consolidate auth redirection in one place.**  
   Keep guard logic in `AuthGate`; remove duplicate imperative redirects in pages/hooks.
5. **Standardize query keys.**  
   Move all keys (`enrolledClasses`, etc.) into [client/config/constants.ts](client/config/constants.ts) or feature key factories.
6. **Reduce mixed paradigms.**  
   Replace `window.location.*` with router navigation where possible to avoid hard reloads.
7. **Finish or remove placeholders.**  
   Implement or hide empty protected routes and dead files to reduce false architecture surface.
8. **Introduce schema validation at boundaries.**  
   Apply `zod` parsing in API layer before store/UI consumption.
9. **Add frontend architecture docs.**  
   Replace stale chat-focused README with current module/data-flow docs.

## 8) Fedora fresh setup and package health checks

Use Node 24 from nvm to keep local and CI behavior consistent:

```bash
cd ..
nvm use
cd client
```

Clean reinstall:

```bash
rm -rf node_modules .next
npm ci
```

Dependency and app health checks:

```bash
npm run health:deps
npm run lint
npm run typecheck
npm run build
```

Run the app:

```bash
npm run dev
```

Note: this repo currently runs Next.js in webpack mode (`next dev --webpack`) to avoid a Turbopack permission panic seen on Fedora.

---

### Bottom line

The codebase has a solid modular direction (feature APIs + React Query + Zustand), but currently carries **high-risk integration drift** around `QueryClient` instance usage, route contracts, and type normalization. These should be addressed before scaling features.
