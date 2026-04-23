# HimVidhya Resume Roadmap

Date: 2026-04-21
Scope: Frontend-first restart plan with backend alignment checkpoints

## 1) Current Snapshot

You are returning after a two-week pause. The project is now in a stable baseline state for development:

- Typecheck passes in client.
- Lint passes in client with max warnings set to zero.
- Core compile blockers around navbar typing, shared auth type imports, class id usage, and public layout slot mismatch are resolved.

This means you can now focus on product and architecture completion work rather than repair work.

## 2) What Was Repaired In This Restart Session

### Resolved blocker category: Type contracts and compile stability

- Navbar type contract alignment:
  - client/components/navbar/navbar.types.ts
  - client/components/navbar/Navbar.tsx
  - client/components/navbar/index.ts
- Broken auth role type import fixed:
  - client/shared/utils.ts
- Class and batch typing consistency fixes:
  - client/components/ui/BatchCard.tsx
  - client/features/batches/components/dashboard/ClassList.tsx
  - client/features/batches/components/dashboard/ClassGrid.tsx
  - client/features/batches/components/classroom/ChannelMainFeed.tsx
  - client/features/home/pages/TeacherDashboardPage.tsx
- Public layout slot mismatch fixed:
  - client/app/(public)/layout.tsx

### Resolved blocker category: Lint hygiene

- Unused values/imports and warning-level issues removed in:
  - client/features/auth/hooks/useForgetPassword.ts
  - client/features/auth/hooks/useResetPassword.ts
  - client/features/auth/hooks/useVerifyOTP.ts
  - client/features/batches/components/classroom/UpcomingDeadlines.tsx
  - client/features/batches/components/dashboard/BatchFilterMenu.tsx
  - client/features/home/hooks/useCreateClass.ts
  - client/shared/api/axiosClient.ts
  - client/shared/api/error.ts

## 3) Highest-Value Open Work (Priority Order)

## P0: Complete Student Dashboard Surface

Why now:

- It is currently a placeholder and blocks end-to-end student experience validation.

Files:

- client/features/home/pages/StudentDashboardPage.tsx
- client/features/home/hooks (add or reuse hooks as needed)
- client/features/batches/components/dashboard (reuse cards/grid/list where possible)

Deliverables:

- Real widgets for upcoming classes, pending deadlines, and attendance summary.
- Loading, empty, and error states for each widget.
- No hardcoded Hello/placeholder text.

Acceptance criteria:

- Student can land on /home/student and see data-driven content.
- No TypeScript or lint regressions.

## P0: Harden Session Expiry Boundary Behavior

Why now:

- Auth session management is critical and small edge cases can create hard-to-reproduce navigation bugs.

Files:

- client/features/auth/components/AuthSessionBoundary.tsx
- client/shared/api/axiosClient.ts
- client/shared/api/authSessionEvents.ts

Known risk to verify:

- Event handling guard may process only first expiry in the same mount lifecycle.

Deliverables:

- Confirm repeated expiry events are handled safely.
- Ensure no duplicate redirects/toasts and no stale auth state.
- Add lightweight tests or scenario checklist for expiry and refresh-fail paths.

Acceptance criteria:

- Repeated 401 flows do not leave app stuck in stale auth state.
- Protected route access consistently redirects to auth modal flow.

## P1: Promote Join Requests To First-Class Product Flow

Why now:

- API surface exists but teacher-side management UI and cache strategy are not fully integrated.

Files:

- client/features/home/api/home.api.ts
- client/features/home/hooks (new hooks for requests, counts, approve, reject)
- client/config/constants.ts (query keys if needed)
- teacher dashboard surface files under client/features/home/pages and batches dashboard components

Deliverables:

- Query hooks for:
  - Get join requests
  - Get join requests count
  - Approve request
  - Reject request
- Clear invalidation strategy after approve/reject.
- Teacher UI to review and action pending join requests.

Acceptance criteria:

- Teacher sees pending requests and can approve/reject without page refresh.
- Cache updates are deterministic and consistent.

## P1: Remove Remaining Dashboard Hardcoded Display Values

Why now:

- Hardcoded fields create misleading UX and analytics confusion.

Primary file:

- client/features/home/pages/TeacherDashboardPage.tsx

Deliverables:

- Replace synthetic values with mapped API-backed values where available.
- If API does not provide values, display explicit unknown/empty state labels.

Acceptance criteria:

- No fabricated activity metrics shown as real data.

## P2: Data Mapping and Boundary Validation Hardening

Why now:

- Current mapper strategy is much better, but still worth tightening around malformed payload behavior.

Files:

- client/features/home/api/home.mapper.ts
- client/features/home/api/home.api.ts

Deliverables:

- Keep parse failures explicit and observable.
- Decide and enforce one policy per endpoint: throw-fast or safe-default.
- Add unit tests for mapper parse failure cases.

Acceptance criteria:

- Boundary behavior is predictable and tested.

## 4) Suggested Execution Sequence (Next 5 Work Blocks)

1. Build Student Dashboard MVP (data + loading/empty/error states).
2. Add join-request hooks and connect into teacher view.
3. Implement join-request action UI with proper query invalidation.
4. Harden auth session expiry event behavior and test scenarios.
5. Finish mapper tests and remove any remaining dashboard fallback assumptions.

## 5) Daily Start Checklist

Run from client:

- npm run typecheck
- npm run lint -- --max-warnings=0

Then verify manually:

- Public to protected navigation flow.
- Login/logout and session-expiry behavior.
- Teacher and student route rendering.
- Join request creation and teacher review path.

## 6) Definition Of Done For This Resume Cycle

This cycle is complete when:

- Student dashboard is no longer placeholder.
- Join request management is integrated into teacher workflow.
- Auth expiry flow is robust across repeated events.
- No hardcoded activity placeholders remain in primary dashboards.
- Typecheck and lint stay clean.

## 7) Notes For Future You

- Keep transport layer free of direct UI navigation logic; perform route changes at boundary components.
- Prefer shared canonical feature types over page-local duplicates.
- Keep query keys centralized and invalidation intentional.
- Avoid introducing temporary display placeholders unless they are clearly marked as pending data and hidden in production.
