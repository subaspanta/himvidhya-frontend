# 🏗️ Architectural Refactoring Documentation

<p align="center">
<b>From Flat Structure to Domain-Centric, Feature-Driven Architecture</b><br>
<i>Real-Time MERN Chat App</i>
</p>

---

This document outlines the major architectural shift from a flat, technical-centric structure to a **Domain-Centric (Feature-Driven) architecture** for the Real-Time MERN Chat App.

---

## 1. Initial State (Before)

The project initially followed a standard Next.js 13+ structure where most logic was co-located within the `app/` directory or flat global folders.

```text
ChatApp/client/
├── app/
│   ├── components/       # Shared and feature-specific components mixed
│   │   ├── forms/        # LoginForm, RegisterForm
│   │   ├── modals/       # AuthModals
│   │   └── ui/           # Button, TextField, Modal
│   ├── hooks/            # useAuth (feature) mixed with useClickAway (generic)
│   ├── store/            # auth.store.ts, auth.schemas.ts
│   ├── data/             # mockData.ts
│   ├── lib/              # api.ts, apiClient.ts, axios.ts
│   ├── chat/             # Chat routes
│   ├── page.tsx          # Root landing page
│   └── layout.tsx        # Root layout with mixed provider logic
├── public/
└── tsconfig.json
```

**Challenges:**

- **Scalability:** `components/` and `hooks/` quickly become bloated.
- **Hidden Dependencies:** Hard to tell which component belongs to which feature.
- **Refactoring Risk:** Changing a shared hook might break unrelated features.

## 2. Refactored State (After)

The new architecture follows a **Domain-Centric** approach, isolating business logic into features while keeping infrastructure, routing, and shared UI separate.

```text
ChatApp/client/
├── app/                  # ROUTING & COMPOSITION ONLY
│   ├── (protected)/      # Authenticated routes (chat)
│   ├── (public)/         # Guest routes (landing, login, register)
│   ├── providers.tsx     # Consolidated global provider wiring
│   └── layout.tsx        # Clean entry point
├── features/             # DOMAIN DOMAINS (Feature-Driven)
│   ├── auth/             # Authentication
│   │   ├── api/          # auth.api.ts
│   │   ├── components/   # LoginForm, RegisterForm, AuthModals
│   │   ├── hooks/        # use-auth.ts
│   │   ├── store/        # auth.store.ts, auth.schemas.ts
│   │   └── types.ts      # Feature-specific types
│   └── chat/             # Messaging
│       ├── api/          # chat.api.ts, mockData.ts
│       ├── components/   # ChatArea, Sidebar, MessageList, etc.
│       ├── socket/       # Socket.io event handlers
│       └── hooks/        # Feature hooks
├── lib/                  # SHARED INFRASTRUCTURE (Pure Logic)
│   ├── api/              # Axios, apiClient
│   ├── hooks/            # Generic hooks (use-click-away, use-modal)
│   ├── permissions/      # RBAC logic
│   └── socket/           # Global socket client
├── components/           # SHARED UI (Dumb/Primitive Components)
│   ├── ui/               # Button, Modal, TextField, LogoutButton
│   └── layout/           # ChatLayout, FullScreenContainer
├── providers/            # GLOBAL PROVIDERS
│   ├── AuthProvider.tsx
│   └── Providers.tsx     # QueryClient, etc.
└── public/
```

## 3. Summary Table: Before vs After

| Aspect              | Before (Flat)                      | After (Domain-Centric)                                                    |
| ------------------- | ---------------------------------- | ------------------------------------------------------------------------- |
| Folder organization | Flat, mixed components/hooks/store | Feature-driven, domain-centric                                            |
| Feature isolation   | None                               | `features/auth`, `features/chat`                                          |
| Shared logic        | Mixed with components              | `lib/` for infra, `components/ui` for shared UI                           |
| Routing             | Mixed in `app/`                    | `(public)` and `(protected)` route groups                                 |
| State management    | Scattered                          | Feature-specific stores in `features/<feature>/store`                     |
| Socket logic        | Mixed or global                    | Global client in `lib/socket`, feature handlers in `features/chat/socket` |

---

## 4. What Was Done

### 1. Feature Isolation

- Created `features/auth` and `features/chat`.
- State (Zustand), API logic, and hooks now live in each feature folder.
- Results in **“screaming architecture”**: folder names communicate functionality immediately.

### 2. Infrastructure vs UI Separation

- Moved Axios, global socket, and RBAC logic to `lib/`.
- Separated shared UI (`components/ui`) from feature UI (`features/chat/components`).

### 3. Routing Cleanup

- Used Next.js route groups `(protected)` and `(public)` for authenticated vs guest routes.
- `app/` now strictly contains routing and high-level layout composition.

### 4. Quality & Consistency

- Standardized imports with absolute paths (`@/features/...`, `@/components/...`).
- Hydration logic in `AuthProvider` improved for backend data consistency.
- Unified UI theme and layout styling.

### 5. Zustand + React Query Placement

| State Type      | Tool        | Location                                            | Examples                               |
| --------------- | ----------- | --------------------------------------------------- | -------------------------------------- |
| Client/UI state | Zustand     | `features/<feature>/store`                          | Auth info, active conversation, modals |
| Server state    | React Query | `providers/Providers.tsx`, `features/<feature>/api` | Messages, conversations, user lists    |

**Guiding Principle:**

> If it comes from the backend → React Query.  
> If it lives in the browser → Zustand.

### 6. Socket Lifecycle Placement

- `lib/socket/` → singleton Socket.io client
- `features/chat/socket/` → feature-specific event handlers
- Hooks like `useChatSocket` manage connection, listeners, and integrate with Zustand
- **Rule:** Backend remains authoritative; frontend sockets respect auth state and RBAC.

### 7. Guidelines for Adding New Features

1. Create `features/<feature-name>`
2. Include `api/`, `components/`, `hooks/`, `store/`, `types.ts`
3. Shared UI → `components/ui`
4. Shared infrastructure → `lib/`
5. Route groups in `app/(protected)` or `(public)` as needed

### 8. Benefits of This Refactor

- **Scalability:** Features can be added independently.
- **Maintainability:** Clear separation reduces side effects.
- **Readability:** New developers immediately understand domain boundaries.
- **Testability:** Each feature can be tested in isolation.
- **Recruiter signal:** Shows senior-level architectural thinking and production readiness.

9. Optional Visual Diagram (Mermaid)
   graph TD
   A[app/] --> B((providers.tsx))
   A --> C[(public pages)]
   A --> D[(protected pages)]
   D --> E[features/auth]
   D --> F[features/chat]
   E --> G[store/hooks/components/api]
   F --> H[store/hooks/components/api/socket]
   B --> I[lib/api/socket/permissions]
   B --> J[components/ui]

✅ Conclusion

This architecture enables scalable, maintainable, and testable development, with clear boundaries for features, shared infrastructure, UI components, and routing.
