## Frontend Architecture Audit (React + React Query)

Audit date: 24 Mar 2026  
Scope: frontend architecture, API/data handling, React Query usage

---

## 0) Latest progress since previous audit

### Completed in this cycle

- Route dead-links were removed from active navigation/gating paths.
  - Navbar defaults now route to implemented surfaces.
  - Auth gate protected-prefix behavior was narrowed to implemented protected routes.
- Logout side effects were centralized (navbar now triggers `logout()` only).
  - Reduced risk of duplicate toasts/conflicting redirects.
- Create-class payload contract drift was addressed.
  - `description` handling now aligned through form/hook/API path.
- Hard reload redirect usage was replaced with router navigation in transport redirect helper.

### Still open

- `joinClass` contract mismatch and unsafe casting remains a major type risk (`JoinRequest` vs `ClassCard` assumptions).
- Boundary validation is still permissive in mapper fallback paths.
- Teacher dashboard still carries local/duplicated class view-model typing.
- Interceptor-level navigation strategy is still fragile in App Router architecture (non-component redirect orchestration).

---

## 1) Project structure and interaction map

### Root and runtime shell

- App entry/layout:
  - `client/app/layout.tsx`
- Provider composition:
  - `client/providers/root-provider.tsx`
  - `client/providers/query-provider.tsx`
  - `client/providers/toaster-provider.tsx`
- Global auth bootstrap and route guard:
  - `client/features/auth/components/AuthInitializer.tsx`
  - `client/features/auth/components/AuthGate.tsx`

### Routing model (Next.js App Router)

- Public group:
  - `client/app/(public)/layout.tsx`
  - `client/app/(public)/page.tsx`
  - auth routes under `(public)` and modal intercept routes under `@modal`
- Protected group:
  - `client/app/(protected)/layout.tsx`
  - implemented route tree currently centered on `/home`:
    - `client/app/(protected)/home/page.tsx`
    - `client/app/(protected)/home/teacher/page.tsx`
    - `client/app/(protected)/home/student/page.tsx`

### Feature/module layering

- `features/auth`: API + hooks + Zustand store + auth UI
- `features/home`: class API/hooks/mapper and dashboard data flow
- `features/batches`: UI/types scaffold with partial integration
- Shared platform layer:
  - transport/interceptors: `client/shared/api/axiosClient.ts`
  - query singleton: `client/shared/api/queryClient.ts`
  - query keys/constants: `client/config/constants.ts`
  - nav contract: `client/shared/hooks/useNavItems.ts`

### Interaction map (runtime)

1. Root layout mounts providers and auth lifecycle components.
2. `AuthInitializer` runs `useCurrentUser()` (`GET /auth/me`).
3. Query result is synchronized into Zustand auth store (`user`, `isAuthenticated`, `authChecked`).
4. `AuthGate` blocks rendering until `authChecked`, then route-gates.
5. Protected screens consume feature hooks (React Query), then render dashboard components.

---

## 2) API integrations inventory

### React Query managed (active)

#### Auth

- `POST /auth/login` → `useLogin()` / `loginUser()`
- `POST /auth/register` → `useRegister()` / `registerUser()`
- `GET /auth/me` → `useCurrentUser()` / `getCurrentUser()`
- `POST /auth/logout` → `useLogout()` / `logoutUser()`
- `POST /auth/forget-password` → `useForgetPassword()` / `forgotPassword()`
- `POST /auth/verify-otp` → `useVerifyOTP()` / `verifyOTP()`
- `POST /auth/reset-password` → `useResetPassword()` / `resetPassword()`

#### Home/Class

- `GET /class/my` → `useGetEnrolledClasses()` / `getEnrolledClasses()`
- `POST /class` → `useCreateClass()` / `createClassApi()`
- `POST /class/join` → `useJoinClass()` / `joinClass()`

### Axios-only (defined but not fully wired into React Query UI flows)

- `GET /class/:id` → `getClassDetails()`
- `GET /class/requests` → `getJoinRequests()`
- `GET /class/requests/count` → `getJoinRequestsCount()`
- `PATCH /class/requests/:requestId/approve` → `approveJoinRequest()`
- `PATCH /class/requests/:requestId/reject` → `rejectJoinRequest()`

Source: `client/features/home/api/home.api.ts`

### Transport/interceptor-managed API behavior

- Refresh flow: `POST /auth/refresh-token` retry path
- Global 401 recovery and redirect handling implemented in Axios interceptor

Source: `client/shared/api/axiosClient.ts`

### Not observed in active frontend source

- No direct `fetch()` usage in primary TS/TSX app paths (Axios is primary transport).

---

## 3) Data flow: API → cache/store → UI

### Transport boundary

- Single Axios instance (`apiClient`) with:
  - base URL + credentials
  - response envelope flattening (`data.data ?? data`)
  - `meta` augmentation for message/success/timestamp

### Cache lifecycle (React Query)

- Shared singleton `QueryClient` in `shared/api/queryClient.ts`
- Mounted once in `providers/query-provider.tsx`
- Query keys centralized in `config/constants.ts`
- Invalidations/refetch behavior driven by feature hooks

### Global state (Zustand)

- Auth store is source of truth for render gating and user role UI branching
- `useCurrentUser()` acts as bridge:
  - success → `setUser(data)`
  - error → clear user
  - always sets `authChecked` once query is fetched

### Transformation layer

- Auth API uses `mapUser()` to normalize selected user fields
- Class mapper (`home.mapper.ts`) performs DTO normalization (`_id`/`id`, defaults/coercions)

### UI consumption

- Dashboard route branches teacher/student by store role
- Teacher dashboard filters/sorts enrolled classes in-memory before rendering cards

---

## 4) Inconsistencies, drift, and mixed paradigms

### Critical

- **Join flow type mismatch still unresolved**
  - API returns join-request semantics, while UI path still expects class-card semantics in places.
  - Unsafe cast patterns remain a reliability risk.

### High

- **Redirect architecture is still mixed at framework boundary**
  - Hard reload was removed, but redirect from transport layer still depends on router behavior in non-component context.
  - In App Router systems, central redirect orchestration should be explicit and framework-safe.
- **Boundary mapper fallback is permissive**
  - Parse failures falling back to raw payload + assertions can silently bypass type safety.

### Medium

- **Duplicated class view-model typing**
  - Teacher page inline interface overlaps with shared feature types.
  - Causes drift and weakens refactor safety.
- **Partially wired API surface**
  - Several class-request endpoints exist but are not represented as first-class React Query hooks/UI flows.

### Low / hygiene

- Empty/placeholder modules/folders still present:
  - `client/features/home/index.ts` (empty)
  - `client/features/rbac/`
  - `client/features/home/data/`
- Legacy/scaffold components exported but not integrated into live route tree.

---

## 5) Critical code areas (high impact / fragile)

- Auth lifecycle + gating:
  - `client/features/auth/components/AuthInitializer.tsx`
  - `client/features/auth/components/AuthGate.tsx`
  - `client/features/auth/hooks/useCurrentUser.ts`
- Transport + session recovery:
  - `client/shared/api/axiosClient.ts`
- Query strategy:
  - `client/shared/api/queryClient.ts`
  - `client/providers/query-provider.tsx`
  - `client/config/constants.ts`
- Core dashboard delivery path:
  - `client/app/(protected)/home/teacher/page.tsx`
  - `client/features/home/hooks/useGetEnrolledClasses.ts`
  - `client/features/home/api/home.mapper.ts`

---

## 6) Mock data, hardcoded values, temporary workarounds

- Hardcoded API fallback:
  - `NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1"`
  - Source: `client/shared/api/axiosClient.ts`
- Hardcoded teacher dashboard display defaults:
  - `lastActivity: "Just now"`
  - `unreadMessages: 0`
  - Source: `client/app/(protected)/home/teacher/page.tsx`
- Hardcoded dashboard narrative copy:
  - `"You have 3 classes scheduled for today."`
  - Source: `client/components/layout/DashboardHeader.tsx`
- Placeholder product behavior:
  - settings action is still stubbed
  - Source: `client/components/navbar/navbar.utils.ts`
- Metadata drift:
  - app metadata/description text does not fully reflect current product scope

---

## 7) Actionable recommendations (priority order)

1. **Fix join contract end-to-end (highest priority).**
   - Define one canonical join response type.
   - Remove `as unknown as` and align hook return type with backend semantics.
2. **Harden transformation boundaries.**
   - Replace permissive mapper fallback with `safeParse` + explicit fallback object or typed error surface.
3. **Stabilize redirect architecture for App Router.**
   - Keep transport concerns transport-only.
   - Move app navigation side effects to auth boundary/component layer where possible.
4. **Consolidate class types.**
   - Introduce shared normalized class view model; remove inline teacher-page interface duplication.
5. **Promote Axios-only class endpoints into React Query hooks.**
   - Add hooks + query keys + invalidation plan for join requests/count/details.
6. **Type tightening pass across auth/home modules.**
   - Strict role unions, payload DTOs, and API response meta typing.
7. **Cleanup architecture surface.**
   - Remove empty placeholders or mark clearly with implementation roadmap and ownership.
8. **Keep docs synchronized with implemented route tree and API contracts.**
   - Update overview/readme alongside code changes in each PR.

---

## 8) Bottom line

The frontend architecture is improving: query-client setup is unified, dead-link surface was reduced, logout side effects were simplified, and create-class payload alignment improved contract consistency.  
Current risk center has shifted to **type integrity in class join flow** and **boundary robustness (redirect + mapper strictness)**. Addressing those next will materially improve reliability and maintainability.
