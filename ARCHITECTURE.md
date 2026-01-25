# Application Architecture Documentation

## Overview
This application uses a **hybrid state management approach** combining React Query for server state, Zustand for global client state, and React Context for component-scoped state.

---

## 1. Global State Management

### Three-Tier State Architecture

#### **Tier 1: React Query (Server State)**
- **Primary tool** for all API data fetching and caching
- Configured in `pages/_app.tsx` with `QueryClientProvider`
- Provides automatic caching, refetching, and synchronization
- Query keys are used for cache invalidation and updates

**Example:**
```typescript
// BusinessForm.tsx
const { data, isLoading } = useGetAllBusinessCategory({
  key: ['category'],
})
```

#### **Tier 2: Zustand (Global Client State)**
- Used for **web essentials** (user data, categories, settings, notifications)
- Located in `src/services/context/public/useWebEssentialsStore.ts`
- Provides lightweight global state without Context Provider boilerplate
- Persisted across component re-renders

**Example:**
```typescript
// Zustand store for web essentials
export const useWebEssentialsStore = create<WebEssentialsState>(set => ({
  webEssentials: { categories: [], user: {}, ... },
  setWebEssentials: value => set({ webEssentials: value }),
  // ...
}))
```

#### **Tier 3: React Context API (Component-Scoped State)**
- Used for **feature-specific** state (BusinessProfile, UserProfile, Reviews)
- Located in `src/services/context/public/`
- Provides localized state management for specific feature areas
- Examples: `BusinessProfile.context.ts`, `review.context.ts`

---

## 2. API Call Architecture

### Custom Hook Factory Pattern

The application uses a **factory pattern** to generate API hooks dynamically:

#### **Core Components:**

1. **`HookCreator` Class** (`src/services/apis/apiHookCreators.ts`)
   - Factory class that creates reusable API hooks
   - Supports GET, POST, PUT, PATCH, DELETE methods
   - Handles authentication tokens automatically
   - Supports both JSON and FormData payloads

2. **Hook Creators** (`src/services/apis/apiHooks.ts`)
   ```typescript
   export const { createGetApiHookCreator: createGetApiHook } = 
     new HookCreator("GET", tokenSourceFn)
   
   export const { createUpdateApiHookCreator: createPostApiHook } = 
     new HookCreator("POST", tokenSourceFn)
   ```

3. **Resource-Specific Hooks** (e.g., `business.api.ts`)
   ```typescript
   export const useCreateBusiness = createPostApiHook<FormData, {}, GetBusinessById>(
     '/business/create', 
     { isFormDataMethod: true }
   )
   
   export const useUpdateBusiness = createPutApiHook<FormData, { id: string }, GetBusinessById>(
     updateBusinessEndpoint, 
     { isFormDataMethod: true }
   )
   ```

### API Call Flow

```
Component
  ↓
Custom Hook (useCreateBusiness, useUpdateBusiness, etc.)
  ↓
HookCreator.mutatorFunction / fetcherFunction
  ↓
Axios Instance (with auth token)
  ↓
Backend API
```

### Authentication
- **Token Management**: `AppUserSession.getToken()` retrieves token from cookies
- **Automatic Injection**: All API calls automatically include `Authorization: Bearer ${token}` header
- **Token Source**: Cookies managed via `src/services/sessions/UserSession.ts`

---

## 3. How Updates Work (Only Changed Fields)

### The Diff Algorithm

When updating business data, only **changed fields** are sent to the backend. This is handled in `organizeBusinessData()` function:

**Location:** `src/components/hq/module/Business/BusinessForm.util.ts`

**Process:**

1. **Compare Current vs Initial Values**
   ```typescript
   export function organizeBusinessData(values: BusinessFormType, initialValues?: BusinessFormType) {
     const formObject = new FormData()
     const isUpdate = !!initialValues
     let record: any = {}
     
     // Loop through all form values
     for (let key in values) {
       // Skip if value hasn't changed (deep comparison)
       if (isUpdate && JSON.stringify(values[key]) === JSON.stringify(initialValues[key])) {
         continue  // Skip unchanged fields
       }
       record[key] = values[key]  // Only include changed fields
     }
   }
   ```

2. **Special Handling for Files**
   - `coverPhoto`: Handled separately if it's a file array
   - `coOrdinates`: JSON stringified before sending

3. **FormData Construction**
   - Only changed fields are appended to FormData
   - Special fields (coverPhoto, coOrdinates) are handled separately

**Example Flow:**
```typescript
// In BusinessForm.tsx onSubmit
const formData = query['edit']
  ? organizeBusinessData(values, initialValues)  // Only diff for updates
  : organizeBusinessData(values)                 // Full payload for create

await update(formData, { onSuccess: ... })
```

---

## 4. Architecture Patterns

### **Layered Architecture**

```
┌─────────────────────────────────────┐
│   Presentation Layer (Components)   │
│   - BusinessForm.tsx               │
│   - Uses hooks and context         │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│   Hook Layer (API Hooks)            │
│   - useCreateBusiness               │
│   - useUpdateBusiness               │
│   - Generated by HookCreator        │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│   Service Layer                     │
│   - HookCreator (Factory)           │
│   - Axios Instances                 │
│   - Session Management              │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│   State Management                  │
│   - React Query (Server State)      │
│   - Zustand (Global Client State)   │
│   - Context API (Feature State)    │
└─────────────────────────────────────┘
```

### **Key Design Patterns**

1. **Factory Pattern**: `HookCreator` generates API hooks
2. **Repository Pattern**: API hooks abstract data access
3. **Provider Pattern**: Context providers for feature state
4. **Custom Hooks**: Reusable logic encapsulation

### **Data Flow**

**Read Operations:**
```
Component → useGetX Hook → React Query → Axios → Backend
                ↓
         Cache in React Query
                ↓
         Component re-renders with data
```

**Write Operations:**
```
Component → useUpdateX Hook → React Query Mutation → Axios → Backend
                ↓
         onSuccess callback
                ↓
         Invalidate cache / Refetch
                ↓
         Component updates
```

---

## 5. Configuration

### **Axios Instances**
- **Default**: `axiosInstance` - Main API calls
- **Kafka**: `kafkaAxiosInstance` - Event streaming
- Both configured in `src/services/apis/axiosConfig.ts`

### **React Query Configuration**
- Default options: No auto-refetch on mount/focus/reconnect
- Manual cache invalidation via `queryClient.invalidateQueries()`
- DevTools enabled in development

### **Session Management**
- Token stored in HTTP-only cookies
- Validated on app initialization (`_app.tsx`)
- Auto-refresh token logic implemented
- Session class: `AppUserSession`

---

## 6. File Organization

```
src/
├── services/
│   ├── apis/              # API hooks and configurations
│   │   ├── apiHookCreators.ts  # Factory class
│   │   ├── apiHooks.ts         # Hook creators
│   │   ├── business.api.ts     # Resource-specific hooks
│   │   └── axiosConfig.ts      # Axios setup
│   ├── context/           # React Context providers
│   │   └── public/        # Public-facing contexts
│   ├── sessions/          # Session management
│   └── storage/           # Cookie/LocalStorage utilities
├── state/                 # Global state (Zustand stores)
├── hooks/                 # Custom React hooks
└── components/            # React components
```

---

## Summary

**State Management:**
- ✅ React Query for server state (API data)
- ✅ Zustand for global client state (web essentials)
- ✅ Context API for feature-specific state

**API Architecture:**
- ✅ Factory pattern for hook generation
- ✅ Automatic authentication token injection
- ✅ Support for JSON and FormData payloads
- ✅ Type-safe with TypeScript generics

**Update Strategy:**
- ✅ Only changed fields sent to backend (diff algorithm)
- ✅ Deep comparison using JSON.stringify
- ✅ Special handling for files and complex objects

This architecture provides **scalability**, **type safety**, and **efficient data management** while keeping the codebase maintainable.
