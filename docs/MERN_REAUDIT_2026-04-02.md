## 1. Overview (High-Level System Understanding)

- Architecture is a split Next.js + Express/Mongo stack with clear modular boundaries:
  - Frontend: App Router layouts, auth boundary components, Zustand auth store, React Query for API state.
  - Backend: Route -> middleware -> controller -> service -> model layering with custom error classes and centralized error middleware.
- Auth/session lifecycle is materially improved on frontend:
  - Redirects are effect-driven in auth boundary components.
  - Axios transport emits session-expiry events instead of directly mutating router state.
- Class/join domain is partially mature:
  - Core join request contract is now typed and mapped.
  - Teacher request-management APIs exist, but end-to-end UI + hooks are still incomplete.
- Backend operational quality is mixed:
  - Good JWT + refresh-token hashing pattern.
  - Significant remaining security/reliability gaps around OTP storage, route-level async handling, and crash-handler wiring.

## 2. What Changed Since Last Audit

### Fixed since previous frontend audit

- Auth gate render-time navigation issue is fixed. Redirect logic now runs inside effect flow in [client/features/auth/components/AuthGate.tsx](client/features/auth/components/AuthGate.tsx#L28).
- Transport-level navigation side effects were removed; transport now emits session events only via [client/shared/api/axiosClient.ts](client/shared/api/axiosClient.ts#L80) and [client/shared/api/axiosClient.ts](client/shared/api/axiosClient.ts#L119).
- Join contract mismatch was resolved at API/hook boundary:
  - [client/features/home/api/home.api.ts](client/features/home/api/home.api.ts#L38) returns Promise<JoinRequest>.
  - [client/features/home/hooks/useJoinClass.ts](client/features/home/hooks/useJoinClass.ts) mutation is typed for JoinRequest.
- Mapper boundary hardening improved:
  - safeParse-based handling is present in [client/features/home/api/home.mapper.ts](client/features/home/api/home.mapper.ts#L34).
  - Invalid join-request payloads now throw instead of silently coercing in [client/features/home/api/home.mapper.ts](client/features/home/api/home.mapper.ts#L112).

### Persisting from previous frontend audit

- Teacher dashboard still duplicates local class view-model typing in [client/features/home/pages/TeacherDashboardPage.tsx](client/features/home/pages/TeacherDashboardPage.tsx#L13).
- Join-request API surface is still not promoted to first-class React Query hooks/UI flows:
  - API functions exist in [client/features/home/api/home.api.ts](client/features/home/api/home.api.ts#L44).
  - Hooks folder currently exposes only create/getMy/join paths ([client/features/home/hooks](client/features/home/hooks)).
- Join UI is still not reachable from active dashboard actions:
  - Join modal state exists in [client/components/layout/DashboardHeader.tsx](client/components/layout/DashboardHeader.tsx#L20), but no trigger sets open=true.

### Newly observed / regression findings

- Create-class description is still dropped before transport due to payload typing drift:
  - Form/header pass description ([client/features/batches/components/dashboard/CreateClassForm.tsx](client/features/batches/components/dashboard/CreateClassForm.tsx#L14), [client/components/layout/DashboardHeader.tsx](client/components/layout/DashboardHeader.tsx#L26)).
  - API payload type omits description in [client/features/home/api/home.api.ts](client/features/home/api/home.api.ts#L6).
- Backend security/reliability issues are now clearly visible in current code (detailed below), especially OTP handling and route async safety.

## 3. Current Issues (By Severity)

### Critical

- Plaintext OTP storage enables account-takeover blast radius if DB is leaked.
  - Evidence:
    - OTP written directly in [server/services/auth.service.js](server/services/auth.service.js#L60).
    - OTP queried directly in [server/services/auth.service.js](server/services/auth.service.js#L70).
    - OTP index exists in [server/models/User.model.js](server/models/User.model.js#L59).
  - Impact:
    - Any DB read compromise exposes valid reset tokens until expiry.
  - Priority:
    - Immediate.

### High

- Unprotected async route handler on user profile can bypass standardized error handling and cause unstable behavior on rejected DB operations.
  - Evidence:
    - Inline async handler at [server/routes/user.route.js](server/routes/user.route.js#L17).
  - Impact:
    - Non-uniform error envelope and potential unhandled rejection behavior depending on runtime.

- Duplicate and conflicting crash handlers create unpredictable process lifecycle behavior.
  - Evidence:
    - Multiple handlers declared in [server/server.js](server/server.js#L1), [server/server.js](server/server.js#L90), and [server/server.js](server/server.js#L97).
  - Impact:
    - Hard-to-debug crashes, duplicate logs, inconsistent shutdown semantics.

- Create class description not persisted from frontend despite backend support.
  - Evidence:
    - Description entered in UI at [client/features/batches/components/dashboard/CreateClassForm.tsx](client/features/batches/components/dashboard/CreateClassForm.tsx#L14).
    - Header submits description at [client/components/layout/DashboardHeader.tsx](client/components/layout/DashboardHeader.tsx#L26).
    - API payload omits description at [client/features/home/api/home.api.ts](client/features/home/api/home.api.ts#L6).
    - Backend expects description in [server/services/class.service.js](server/services/class.service.js#L21).
  - Impact:
    - Silent data loss and user-facing trust issue.

### Medium

- Class details endpoint lacks ObjectId guard before DB call.
  - Evidence:
    - Route directly forwards id in [server/routes/class.route.js](server/routes/class.route.js#L66).
    - Service calls findById in [server/services/class.service.js](server/services/class.service.js#L228).
  - Impact:
    - Invalid id can surface as cast-level server error instead of clean 400.

- Join code normalization is frontend-dependent; backend does not enforce canonical uppercase.
  - Evidence:
    - Backend compares raw code in [server/services/class.service.js](server/services/class.service.js#L35).
    - Validation only trims in [server/schemas/validationSchemas.js](server/schemas/validationSchemas.js#L69).
  - Impact:
    - API contract inconsistency for non-browser/third-party clients.

- Teacher dashboard type and sorting logic drift from normalized class model.
  - Evidence:
    - Local type in [client/features/home/pages/TeacherDashboardPage.tsx](client/features/home/pages/TeacherDashboardPage.tsx#L13).
    - Sort uses fields that are not part of normalized class card contract (attendance/createdAt assumptions) at [client/features/home/pages/TeacherDashboardPage.tsx](client/features/home/pages/TeacherDashboardPage.tsx#L59).
  - Impact:
    - Incorrect sorting semantics and future refactor fragility.

- Join-request management API exists but lacks first-class query hooks and screen integration.
  - Evidence:
    - API layer functions at [client/features/home/api/home.api.ts](client/features/home/api/home.api.ts#L44).
    - Hooks directory currently has only create/enrolled/join primitives ([client/features/home/hooks](client/features/home/hooks)).
  - Impact:
    - Incomplete teacher workflow and manual integration burden.

- Attendance feature path is mounted but effectively unimplemented.
  - Evidence:
    - Route mounted in [server/server.js](server/server.js#L82).
    - Route file is TODO-only in [server/routes/attendance.route.js](server/routes/attendance.route.js).
    - Controller file exists but empty: [server/controllers/attendance.controller.js](server/controllers/attendance.controller.js).
  - Impact:
    - Feature appears available at architecture level but has no operational behavior.

### Low

- Unused import in axios transport adds noise and potential confusion.
  - Evidence:
    - QUERY_KEYS imported but unused in [client/shared/api/axiosClient.ts](client/shared/api/axiosClient.ts#L3).

- Hardcoded placeholder metrics remain in teacher card rendering.
  - Evidence:
    - [client/features/home/pages/TeacherDashboardPage.tsx](client/features/home/pages/TeacherDashboardPage.tsx#L116).

- Logout navigates optimistically before mutation success.
  - Evidence:
    - onMutate redirect at [client/features/auth/hooks/useLogout.ts](client/features/auth/hooks/useLogout.ts#L15).
  - Impact:
    - Potential UX inconsistency if logout request fails.

## 4. Fixed Issues पुष्टि

- Join response type mismatch (JoinRequest vs ClassCard assumptions) was fixed in active join API/hook path.
- Mapper fallback permissiveness was reduced with explicit parse failure handling (drop/throw strategy).
- AuthGate render-phase redirect loop risk was fixed by effect-driven routing.
- Transport no longer performs direct App Router navigation side effects.
- Refresh-token cookie path alignment is correct in current implementation:
  - Route at [server/routes/auth.route.js](server/routes/auth.route.js#L30)
  - Cookie path setting in [server/controllers/auth.controller.js](server/controllers/auth.controller.js#L103)

## 5. Recommended Fixes (Actionable)

1. Secure OTP flow immediately (Critical).

- Store reset OTP as hashed value (e.g., SHA-256 + per-token salt or bcrypt).
- Compare hash during verify/reset instead of querying by plaintext OTP.
- Remove/replace plaintext OTP index in [server/models/User.model.js](server/models/User.model.js#L59).

2. Standardize async error handling across all routes (High).

- Replace inline async route handlers with asyncHandler wrapper in [server/routes/user.route.js](server/routes/user.route.js#L17).
- Keep one error flow (controller/service -> HandleErrorWithLogger) for consistency.

3. Consolidate process crash handling (High).

- Remove duplicate process.on bindings and keep a single, centralized set using error utils in [server/server.js](server/server.js).
- Ensure one clear shutdown policy for uncaughtException/unhandledRejection.

4. Fix create-class payload contract drift (High).

- Extend CreateClassPayload in [client/features/home/api/home.api.ts](client/features/home/api/home.api.ts#L6) to include optional description.
- Ensure mutation type in [client/features/home/hooks/useCreateClass.ts](client/features/home/hooks/useCreateClass.ts#L10) matches form contract.

5. Harden class id and join code input normalization (Medium).

- Validate ObjectId before service call for /class/:id.
- Normalize join code server-side (trim + uppercase) before lookup in [server/services/class.service.js](server/services/class.service.js#L35).

6. Complete join-request workflow as React Query first-class feature (Medium).

- Add hooks for list/count/approve/reject in client home hooks.
- Define invalidation graph for join request + enrolled class queries.
- Wire at least one teacher UI entrypoint.

7. Remove dashboard view-model duplication (Medium).

- Replace local EnrolledClass type in [client/features/home/pages/TeacherDashboardPage.tsx](client/features/home/pages/TeacherDashboardPage.tsx#L13) with shared ClassCard (or derived readonly selector type).

8. Clarify feature readiness for attendance/announcement (Medium/Low).

- Either implement routes/controllers or remove route mounting and document roadmap.

## 6. Risks & Next Steps

### Immediate risks

- Account recovery security risk due to plaintext OTP storage.
- Route/process error-handling inconsistency can produce hard-to-debug production failures.
- Silent frontend data-loss path on class description undermines product correctness.

### Suggested execution order

1. OTP hashing + migration strategy.
2. Async route and process handler standardization.
3. Create-class payload fix and regression test.
4. Input hardening for class id and join code canonicalization.
5. Join-request hooks + teacher UI integration.

### Verification checklist

- Security tests:
  - OTP cannot be recovered from DB in usable form.
  - Reset/verify still works with hashed token strategy.
- API tests:
  - Invalid class id returns deterministic 400, not generic 500.
  - Lowercase join code is accepted after normalization.
- Frontend tests:
  - Class description persists end-to-end.
  - Teacher dashboard uses shared normalized model.
  - Join-request list/count/action hooks invalidate expected query keys.
