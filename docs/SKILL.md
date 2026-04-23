# HimVidhya Engineering Skill (Claude)

Use this skill when generating, reviewing, or refactoring code in this monorepo.

## 1) Purpose

This skill enforces consistent architecture across a MERN monorepo:

- Frontend: Next.js App Router + TypeScript + React Query + Zustand + Tailwind
- Backend: Express + Mongoose + JWT cookie auth + Zod validation

Primary goals:

1. Prevent client/server contract drift
2. Keep server state and UI state responsibilities clear
3. Standardize auth, routing, and API integration patterns
4. Improve maintainability in a partially scaffolded codebase

---

## 2) Repository Layout and Ownership

```text
/
├─ client/                 # Next.js frontend
│  ├─ app/                 # App Router route groups
│  ├─ features/            # Domain modules (auth, home, batches, ...)
│  ├─ shared/              # transport, reusable hooks/utilities
│  ├─ providers/           # global providers (React Query, toasts)
│  └─ config/              # query keys, constants
├─ server/                 # Express backend
│  ├─ routes/
│  ├─ controllers/
│  ├─ services/
│  ├─ models/
│  ├─ middleware/
│  └─ schemas/
└─ docs/audits             # Architecture and project audits
```

### Placement rules

- New API calls: `client/features/<domain>/api`
- New query/mutation hooks: `client/features/<domain>/hooks`
- DTO/schema mapping: API boundary layer (not inside pages/components)
- Global transport/interceptors: `client/shared/api`
- Query key definitions: `client/config/constants.ts`

---

## 3) Architecture Rules (Non-Negotiable)

## A. Server state vs UI state

- React Query owns server state and caching.
- Zustand owns UI/session flags only (e.g., `authChecked`, local UX state).
- Do not duplicate the same remote entity in both stores unless there is a clear bridge pattern.

## B. One QueryClient instance

- Use a single shared `QueryClient` singleton.
- Provider, interceptors, and logout handlers must reference the same instance.

## C. API boundary normalization

- Parse/validate backend payloads at API layer.
- Normalize fields there (e.g., `_id -> id`).
- Never perform ad-hoc shape fixes in pages/components.

## D. Routing contract discipline

- Nav links must map to existing route files.
- Protected route prefixes used by auth guard must match actual App Router paths.

## E. Avoid unsafe type escapes

- Avoid `as unknown as` in runtime data paths.
- Prefer explicit DTO parsing and fallbacks with clear error behavior.

---

## 4) Frontend Implementation Patterns

## 4.1 React Query + Zustand auth bootstrap

Pattern:

1. `AuthInitializer` runs once and triggers `useCurrentUser()`.
2. Query result maps to auth store (`setUser`, `setAuthChecked`).
3. `AuthGate` performs redirects after `authChecked`.

Rules:

- Keep auth redirects centralized in `AuthGate`.
- Pages should not re-implement auth redirects.

## 4.2 Query key strategy

- All keys live in `client/config/constants.ts`.
- Use key factories for parameterized queries (`classById(id)`).
- Mutations must invalidate only related keys.

## 4.3 API hook template

Use this shape consistently:

- `api/*.api.ts`: raw request + DTO mapping
- `hooks/useX.ts`: `useQuery`/`useMutation`
- `types/*.types.ts`: domain models (post-normalization)

## 4.4 Navigation

- Prefer Next router navigation in components.
- If redirecting from non-component code (e.g., interceptor), use one approved app-level strategy and keep behavior consistent.

---

## 5) Auth + JWT Refresh Pattern

Required behavior:

1. On 401 (non-login), attempt refresh once.
2. Use single-flight queue while refresh is in progress.
3. Replay queued requests after successful refresh.
4. On refresh failure:
   - clear query cache
   - clear auth store/session state
   - redirect to login

Safety requirements:

- Guard against infinite loops via `_retry` marker.
- Explicitly skip refresh for login endpoint failures.

---

## 6) Client-Server Contract Safety

## 6.1 Endpoint governance

- Keep endpoint constants or a contract table.
- Any endpoint rename requires simultaneous client+server change.

## 6.2 Response envelope

- Enforce one response envelope convention.
- Interceptor transforms must be documented and deterministic.

## 6.3 DTO validation

- Use schema validation (`zod`) at boundaries.
- On parse failure:
  - return safe default only when truly non-critical, or
  - surface typed error and fail fast.

---

## 7) Known Pain Points to Detect Early

The skill should actively check for:

1. Endpoint mismatch (`/refresh-token` vs `/refresh` style drift)
2. Payload shape mismatch (`data.class` assumptions vs actual response)
3. Route drift (nav points to missing pages)
4. Mixed redirect styles causing hard reload UX inconsistencies
5. Unsafe casts hiding API drift
6. Placeholder pages/components left in active flows
7. Docs drift (README/audits not matching implementation)

---

## 8) Code Review Checklist (Use Every PR)

- [ ] Query keys are centralized and reused
- [ ] No duplicate server state in Zustand
- [ ] API response is validated/normalized in API layer
- [ ] No `as unknown as` in data flow paths
- [ ] Route links match real App Router pages
- [ ] Auth redirects are not duplicated across pages/hooks
- [ ] Refresh flow handles queue + failure teardown correctly
- [ ] No hardcoded environment values beyond explicit local fallback
- [ ] New feature files follow feature-folder placement rules

---

## 9) Scope Boundaries for This Skill

Default scope (v1):

- Development architecture patterns
- API integration consistency
- Auth/session flow quality
- Type-safety and DTO boundaries

Optional appendices (v1.1+):

- Testing strategy (unit + integration + API contract tests)
- Deployment checklist (env matrix, base URL, cookie/CORS checks)

---

## 10) Suggested Prompting Contract for Claude

When using this skill, Claude should:

1. First map the touched feature boundary (`api`, `hooks`, `store`, `page`)
2. Identify contract dependencies (endpoint, DTO, query keys, routes)
3. Propose smallest safe change
4. Include migration notes if changing contracts
5. Call out follow-up cleanup if placeholders/legacy code remain

Output style:

- concise
- decision-first
- include risk level (critical/high/medium/low)
- include exact files to modify
