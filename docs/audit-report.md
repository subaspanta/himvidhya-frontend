# Overview

Project: HimVidhya
Date: 2026-04-22
Goal of this audit: regain context after a 1-month break, identify unfinished work and risks, and define an execution system to recover momentum.

Method used:

- Inspected code structure and key entry points in both repositories.
- Inspected recent commit history and branch status in client and server git repos.
- Searched for TODO/FIXME/placeholder markers and empty scaffold files.
- Cross-checked frontend-backend API contracts and architecture layering.

Evidence quality policy used in this report:

- [Confirmed]: direct evidence from code, git output, or file content.
- [Inferred]: likely conclusion based on patterns, but not explicitly proven by runtime tests.

# Current State

## 1) Repository and branch state

- [Confirmed] Workspace contains two separate git repositories:
  - Frontend repo at [client](../client)
  - Backend repo at [server](../server)
- [Confirmed] Frontend branch status: feature/class, ahead of origin by 1 commit.
- [Confirmed] Backend branch status: feat/class, synchronized with origin.
- [Confirmed] Both working trees are clean (no unstaged/staged changes).

Recent frontend commits indicate focus on:

- Auth session boundary and logout/session handling.
- Join class/join request mapping and type safety.
- Navbar type/prop alignment and dependency updates.

Recent backend commits indicate focus on:

- Join request flow and approval/rejection endpoints.
- RBAC and auth middleware hardening.
- Class model evolution and dependency updates.

## 2) Architecture map (frontend)

Entry points and shell:

- Root layout in [client/app/layout.tsx](../client/app/layout.tsx)
- Root provider in [client/providers/root-provider.tsx](../client/providers/root-provider.tsx)
- Query provider in [client/providers/query-provider.tsx](../client/providers/query-provider.tsx)

Auth lifecycle and routing:

- Auth bootstrap in [client/features/auth/components/AuthInitializer.tsx](../client/features/auth/components/AuthInitializer.tsx)
- Route guard in [client/features/auth/components/AuthGate.tsx](../client/features/auth/components/AuthGate.tsx)
- Session-expiry boundary in [client/features/auth/components/AuthSessionBoundary.tsx](../client/features/auth/components/AuthSessionBoundary.tsx)

Data layer:

- Axios transport and refresh behavior in [client/shared/api/axiosClient.ts](../client/shared/api/axiosClient.ts)
- Shared query client in [client/shared/api/queryClient.ts](../client/shared/api/queryClient.ts)
- Home API and DTO mapping in [client/features/home/api/home.api.ts](../client/features/home/api/home.api.ts) and [client/features/home/api/home.mapper.ts](../client/features/home/api/home.mapper.ts)

Architecture pattern:

- [Confirmed] Next.js App Router + feature modules + React Query + Zustand + Axios.
- [Confirmed] QueryClient is now unified between provider and shared client usage.

## 3) Architecture map (backend)

Entry points and middleware:

- Express bootstrap in [server/server.js](../server/server.js)
- DB connection in [server/config/database.js](../server/config/database.js)
- JWT utilities in [server/config/jwt.js](../server/config/jwt.js)
- Response envelope helper in [server/utils/responseParser.js](../server/utils/responseParser.js)

Routing and service layers:

- Auth routes in [server/routes/auth.route.js](../server/routes/auth.route.js)
- Class routes in [server/routes/class.route.js](../server/routes/class.route.js)
- Auth and class controllers/services in:
  - [server/controllers/auth.controller.js](../server/controllers/auth.controller.js)
  - [server/controllers/class.controller.js](../server/controllers/class.controller.js)
  - [server/services/auth.service.js](../server/services/auth.service.js)
  - [server/services/class.service.js](../server/services/class.service.js)

Architecture pattern:

- [Confirmed] Layered Node architecture (routes -> controllers -> services -> models).
- [Confirmed] Cookie-based JWT auth (access + refresh), RBAC checks, and versioned API path /api/v1.

## 4) Dependency and tooling snapshot

Frontend:

- [Confirmed] Next 16, React 19, TypeScript 5, React Query 5, Zustand, Axios, Zod.
- [Confirmed] Scripts include lint, typecheck, dependency audit/outdated checks.

Backend:

- [Confirmed] Express 4, Mongoose 7, jsonwebtoken, bcryptjs, helmet, cors, zod.
- [Confirmed] No real test suite is configured (test script is placeholder in package.json).

# Issues

## A) Confirmed incomplete features and scaffolds

1. Student dashboard remains placeholder.

- Evidence: [client/features/home/pages/StudentDashboardPage.tsx](../client/features/home/pages/StudentDashboardPage.tsx)
- Current state: TODO comment and static Hello output.
- Impact: student role workflow is not product-complete.

2. Attendance backend is scaffolded but not implemented.

- Evidence: [server/routes/attendance.route.js](../server/routes/attendance.route.js)
- Related empty files:
  - [server/controllers/attendance.controller.js](../server/controllers/attendance.controller.js)
  - [server/models/AttendanceSession.model.js](../server/models/AttendanceSession.model.js)
  - [server/models/AttendanceRecord.model.js](../server/models/AttendanceRecord.model.js)
- Impact: attendance domain appears planned but currently non-functional.

3. Announcement/deadline backend modules are present but empty.

- Empty controllers/models/routes:
  - [server/controllers/announcement.controller.js](../server/controllers/announcement.controller.js)
  - [server/controllers/deadline.controller.js](../server/controllers/deadline.controller.js)
  - [server/models/Announcement.model.js](../server/models/Announcement.model.js)
  - [server/models/Deadline.model.js](../server/models/Deadline.model.js)
  - [server/routes/announcement.route.js](../server/routes/announcement.route.js)
  - [server/routes/deadline.route.js](../server/routes/deadline.route.js)
- Impact: domain structure exists but implementation is deferred.

4. Frontend TODO debt still present in navigation/classroom surfaces.

- [client/components/navbar/navbar.utils.ts](../client/components/navbar/navbar.utils.ts) has TODO for settings and notifications behavior.
- [client/features/batches/components/classroom/ClassHeader.tsx](../client/features/batches/components/classroom/ClassHeader.tsx) has TODO for copy-code feedback toast.

## B) Confirmed inconsistencies and code quality risks

1. Backend user search throws generic Error.

- Evidence: [server/services/user.service.js](../server/services/user.service.js)
- Risk: bypasses unified error type flow and can reduce consistency in error handling.

2. Attendance rate field appears inconsistent between model comment and usage.

- Evidence:
  - Class model comment indicates attendanceRate was removed in [server/models/Class.model.js](../server/models/Class.model.js)
  - Class controller still reads cls.attendanceRate in [server/controllers/class.controller.js](../server/controllers/class.controller.js)
- Risk: data contract confusion and misleading assumptions in frontend metrics.

3. Server startup file has repeated process exception handlers.

- Evidence: [server/server.js](../server/server.js) contains multiple process.on registrations at top and again before server start.
- Risk: duplicated lifecycle handling and maintenance noise.

4. Mixed response shape in user profile route.

- Evidence: [server/routes/user.route.js](../server/routes/user.route.js) has inline /profile route returning raw res.json(user) while most controllers use successResponse envelope.
- Risk: response contract inconsistency for client consumers.

## C) Confirmed documentation drift

1. Server README is still chat-app oriented while project is class/join-request focused.

- Evidence: [server/README.md](../server/README.md)

2. Frontend README still contains stale architecture narrative from earlier audit context.

- Evidence: [client/README.md](../client/README.md)

## D) Inferred risks to validate next

1. [Inferred] AuthSessionBoundary handles only first emitted session-expiry event per mount due handledRef and emitted flags.

- Evidence points:
  - [client/features/auth/components/AuthSessionBoundary.tsx](../client/features/auth/components/AuthSessionBoundary.tsx)
  - [client/shared/api/authSessionEvents.ts](../client/shared/api/authSessionEvents.ts)
- Why inferred: needs runtime scenario validation under repeated 401 chains.

2. [Inferred] Join-request backend is ahead of frontend teacher management UX.

- Evidence:
  - Backend has approve/reject/count/list endpoints and services.
  - Frontend has API functions in [client/features/home/api/home.api.ts](../client/features/home/api/home.api.ts) but no visible dedicated teacher requests UI module yet.
- Why inferred: code presence suggests partial integration, but no end-to-end UI review executed in this audit.

# Next Steps

## Where you left off summary

You paused in the middle of a class-management maturity phase, not in an infrastructure rescue phase.

- [Confirmed] Core auth/session and class/join APIs are implemented and recently refined.
- [Confirmed] Frontend and backend are clean in git status.
- [Confirmed] Frontend compile/lint baseline was recently stabilized.
- [Confirmed] Remaining work is mostly product completion (student dashboard, teacher request management UI, attendance domain implementation, and consistency cleanup).

## Execution priorities (actionable)

Priority 0: restore end-to-end user value

1. Implement Student Dashboard MVP in [client/features/home/pages/StudentDashboardPage.tsx](../client/features/home/pages/StudentDashboardPage.tsx) with loading/empty/error states.
   Priority 0 Execution Plan (Approved)
   Plan: Student + Teacher Dashboard Consistency MVP
   Implement Priority 0 as one frontend vertical slice by reusing existing home-feature and React Query patterns: replace the student placeholder page with real query-backed states, and convert the teacher join-request widget to live API-backed review actions. This restores end-to-end user value without changing backend contracts.

Steps

Keep current route architecture unchanged and implement only within existing home/dashboard surfaces.
Add join-request query/mutation hooks in home hooks:
useGetJoinRequests
useGetJoinRequestsCount
useApproveJoinRequest
useRejectJoinRequest
Implement Student Dashboard MVP in StudentDashboardPage.tsx:
Reuse dashboard structure pattern from TeacherDashboardPage.tsx
Use enrolled classes query
Handle loading, error with retry, empty, and data states
Replace static teacher join-request UI in RightAside.tsx with live list/count/actions using existing APIs from home.api.ts.
Keep UX patterns consistent with existing feature style: spacing, section headers, badge styling, and toast behavior.
Validate with typecheck, lint, and manual teacher/student flow checks.
Relevant files

StudentDashboardPage.tsx — implement student dashboard states and class rendering
TeacherDashboardPage.tsx — reference composition/state pattern
RightAside.tsx — implement join-request review UI
home.api.ts — reuse join-request APIs
useGetEnrolledClasses.ts — query hook pattern reference
useCreateClass.ts — mutation invalidation pattern reference
constants.ts — query keys
Verification

Run in client: npm run typecheck
Run in client: npm run lint -- --max-warnings=0
Manual teacher check:
Join requests list and count load
Approve/reject updates list and badge
Manual student check:
Loading state appears first
Empty state appears when no classes
Error state supports retry
Data state renders class cards
Scope decisions

Included:
Student dashboard MVP with loading/empty/error/data handling
Teacher join-request review using existing APIs
Excluded:
Backend API/schema changes
Attendance/announcement/deadline implementation
Route architecture changes 2. Build teacher join-request review UI using existing API methods from [client/features/home/api/home.api.ts](../client/features/home/api/home.api.ts).

Priority 1: close architecture consistency gaps

1. Standardize backend response envelopes for all user routes, including profile route.
2. Replace generic throw new Error in user service with domain error classes.
3. Resolve attendanceRate contract ambiguity between class model/controller/frontend mapping.

Priority 2: implement deferred domains or formally defer them

1. Attendance domain: either implement route/controller/model flows or remove inactive surfaces.
2. Announcement/deadline modules: same rule, implement or de-scope.

Priority 3: documentation and onboarding hygiene

1. Rewrite [client/README.md](../client/README.md) and [server/README.md](../server/README.md) to match actual architecture.
2. Keep this audit report and roadmap synchronized at end of each day.

## Progress tracking system

Use this weekly board in docs and update status daily.

Status legend:

- Not Started
- In Progress
- Blocked
- Done

### Work board

| Workstream                 | Scope                                           | Owner | Status      | Evidence File                                           | Target Date | Notes                                   |
| -------------------------- | ----------------------------------------------- | ----- | ----------- | ------------------------------------------------------- | ----------- | --------------------------------------- |
| Student Dashboard MVP      | Replace placeholder UI with real role dashboard | You   | Not Started | client/features/home/pages/StudentDashboardPage.tsx     | 2026-04-25  | Must include loading/empty/error states |
| Teacher Join Request UI    | List/approve/reject pending requests            | You   | Not Started | client/features/home + batches components               | 2026-04-26  | Backend endpoints already available     |
| Auth Session Revalidation  | Verify repeated expiry behavior                 | You   | Not Started | client/features/auth/components/AuthSessionBoundary.tsx | 2026-04-26  | Confirm with multi-request scenario     |
| Attendance Domain Decision | Implement or de-scope empty modules             | You   | Not Started | server/routes/attendance.route.js                       | 2026-04-28  | Avoid half-active routes                |
| Response Contract Cleanup  | Standardize user/profile and service errors     | You   | Not Started | server/routes/user.route.js                             | 2026-04-27  | Remove mixed envelope responses         |
| Docs Refresh               | Update architecture README docs                 | You   | Not Started | client/README.md, server/README.md                      | 2026-04-29  | Keep onboarding accurate                |

### Daily recovery log template

Add this section each day to this report:

- Date:
- Focused workstreams:
- What changed (files):
- Validation run (lint/typecheck/build/manual checks):
- Blockers:
- Next first task tomorrow:

### Validation checklist before closing a session

Frontend:

- npm run typecheck
- npm run lint -- --max-warnings=0

Backend:

- npm run health:deps
- Manual smoke on auth/class routes and health endpoints

# Copilot Usage

Use Copilot as a structured execution partner, not only a code generator.

## 1) Re-orientation prompts (start of each day)

Prompt pattern:

- Analyze changed files since last session and summarize architectural impact.
- List top 5 risks by severity with direct file evidence.
- Propose a 90-minute execution slice with acceptance criteria.

## 2) Audit prompts

Prompt pattern:

- Review selected module for production risks: contracts, error handling, edge cases, security, and maintainability.
- Separate findings into confirmed bugs, inconsistencies, and inferred risks.

## 3) Refactor prompts

Prompt pattern:

- Refactor for single responsibility without changing behavior.
- Preserve API contract and existing exports.
- Add focused tests or validation notes if tests are missing.

## 4) Continuation prompts

Prompt pattern:

- Continue from this checklist item only.
- Do not introduce new features.
- End by updating the progress board row and validation checklist.

## 5) Copilot guardrails for this project

- Ask for evidence-first findings, not assumptions.
- Require file-level citations in every review.
- Keep backend response contracts consistent.
- Keep frontend type boundaries strict at API mapper layer.
- Prefer small verifiable slices over large refactors.

# Audit Report

## Confirmed architecture maturity snapshot

Frontend maturity:

- Core shell and auth orchestration: High
- Data layer consistency: Medium-High
- Role dashboard completeness: Medium (student view pending)
- Feature completeness beyond core classes: Low-Medium

Backend maturity:

- Auth and class/join-request flows: Medium-High
- Attendance/announcement/deadline domains: Low (scaffold stage)
- Error/response consistency: Medium

## Confirmed "resume now" first 3 tasks

1. Implement Student Dashboard MVP with query-backed widgets and state handling.
2. Add teacher join-request management UI tied to existing approve/reject/count APIs.
3. Clean backend consistency debt (profile response envelope + generic errors + attendanceRate contract clarity).

## Assumptions explicitly avoided in this audit

- No assumption about runtime behavior without executing E2E scenarios.
- No assumption that empty files are accidental; treated as intentional scaffolds unless proven otherwise.
- No assumption that branch naming parity implies feature parity between client and server.

## Final context reset statement

You are not blocked by foundational instability. You are at a feature-completion and contract-consistency stage. The fastest momentum recovery is to execute vertical slices (student dashboard, teacher join-request UI, backend consistency cleanup) while updating this board daily and using Copilot for evidence-first reviews per slice.
