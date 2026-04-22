# Project Overview Audit — HimVidhya (MERN)

_Updated: 2026-03-26_

## 1) Project Overview

### Stack and architecture snapshot

- Frontend: Next.js App Router + TypeScript + React Query + Zustand + Tailwind.
- Backend: Express + Mongoose + JWT cookie auth + Zod validation.
- Monorepo structure is split between client and server.

### Actual implemented scope vs intended scope

- Intended (from docs): real-time chat + RBAC-heavy system.
- Actual codebase currently centers on:
  - Auth flows
  - Class/batch creation + enrollment
  - Teacher dashboard skeleton
- Many modules are scaffolded but not implemented.

### Feature status matrix (high-level)

- Auth: Partially implemented (backend stronger than frontend integration)
- Class/Batch core APIs: Partially implemented
- User management: Partially implemented
- Attendance: Not started
- Announcements: Not started
- Deadlines: Not started
- Real-time chat/socket: Not started (dependency/docs only)
- Protected app pages (materials/schedule/announcements/student/batch detail): Mostly not started
- RBAC (full-stack): Partially implemented

### Approximate progress

**~50% complete**

---

## 2) Completed Features

### Backend foundations

- Express app bootstrapped with security middlewares and API versioning.
- Database connection and startup env checks are present.
- Centralized response helpers and error classes are implemented.

### Authentication backend (mostly complete)

- Implemented endpoints:
  - register, login, logout, refresh, forgot password, OTP verify, reset password, current user
- Password rules centralized and wired to validation.
- User model has password hashing hook and compare method.

### Class/Batch backend core

- Implemented class creation, join by code, list “my classes”, class detail.

### Frontend auth UX scaffolding

- Auth forms/modals/hooks implemented.
- Global layout wires auth initializer + auth gate.
- `AuthGate` redirect behavior now runs from effects only; render-phase router mutation was removed.
- Infinite redirect/render loop for protected navigation is fixed.

### Frontend architecture hardening (recent)

- Active navigation/gating paths were aligned to implemented routes (dead-link surface reduced).
- Logout side effects were centralized through auth mutation flow.
- Create-class payload handling was aligned across form/hook/API path.

### UI foundation

- Landing page, navbar, and reusable UI components are in place.

---

## 3) Incomplete Features

### Auth integration gaps (critical)

- Frontend refresh endpoint calls `/auth/refresh-token`, backend exposes `/auth/refresh`.
- Frontend `getProfile()` calls `/auth/profile`, backend uses `/auth/me`.

### Class API contract mismatch (critical)

- Backend returns payload in `data`, frontend expects `response.data.class` for create/join.

### Route/path mismatches in frontend navigation

- Previously observed dead-links in active navigation/gating were reduced.
- Remaining route drift risk still exists in partially implemented surfaces and legacy links.

### Protected app flow incomplete

- Guarding is now enforced through `AuthGate` redirect logic.
- Previous render-time redirect regression (Router update while rendering + loop) is fixed.
- Continue validating edge cases around transport-level auth failure redirects.

### User module partially working

- `authenticate` sets `req.auth`, but user routes/controllers use `req.userId` in places.
- `/users/profile` route is shadowed by `/:id` ordering.

### RBAC partially implemented

- Role/permission maps exist, but enforcement is inconsistent and frontend RBAC module is incomplete.

---

## 4) Missing/Planned Features

### Backend modules scaffolded but empty

- Attendance routes/controller/models
- Announcement routes/controller/model
- Deadline routes/controller/model

### Frontend pages not implemented

- Empty placeholders exist for:
  - batches list, batch detail, student dashboard, materials, schedule, announcements

### Planned by naming/docs but absent

- Real-time socket/chat layer not implemented despite dependency/docs references.

---

## 5) Code Issues & Risks

### Critical bugs / inconsistencies

1. Refresh endpoint mismatch (`/auth/refresh-token` vs `/auth/refresh`).
2. Profile endpoint mismatch (`/auth/profile` vs `/auth/me`).
3. Join-class contract/type mismatch remains unresolved in frontend typing paths.
4. Transport-layer redirect orchestration is still fragile in App Router architecture.
5. `req.auth` vs `req.userId` request-contract inconsistency.

### Backend reliability risks

- `createClassService()` references `AuthenticationError` without import.
- Unique join-code generator has loop-attempt logic flaw.
- `.env.example` is outdated vs required startup vars.

### Dead code / stale artifacts

- Empty/unused modules and legacy leftovers (including committed `.next` output).
- Unwired middlewares and helper files with broken/unused exports.

### Existing lint/compile issues detected

- Unused vars in:
  - auth hooks (`useResetPassword`, `useVerifyOTP`)
  - `RightAside` component

---

## 6) Next Steps (prioritized)

1. Fix API contract blockers (refresh/profile/class response shapes).
2. Resolve join-class canonical response typing end-to-end (remove unsafe casts).
3. Stabilize transport-level redirect orchestration for App Router.
4. Standardize user identity contract in backend (`req.auth.userId` vs `req.userId`).
5. Implement one full vertical slice end-to-end (recommended: announcements).
6. Remove stale/legacy code and cleanup committed build artifacts.
7. Implement remaining scaffolded modules (attendance, deadlines, student/batch pages, RBAC pass).
