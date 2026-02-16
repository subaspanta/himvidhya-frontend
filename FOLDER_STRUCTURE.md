# Mitva Client - Folder Structure

## Root Directory

```
client/
├── .env.local
├── .git/
├── .gitignore
├── .next/
├── README.md
├── components.json
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── node_modules/
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── app/
├── components/
├── config/
├── features/
├── lib/
├── providers/
└── public/
```

---

## `app/` - Next.js Application Directory

```
app/
├── globals.css
├── layout.tsx
├── middleware.ts
├── (protected)/
│   ├── layout.tsx
│   └── dashboard/
│       ├── layout.tsx
│       └── page.tsx
└── (public)/
    ├── layout.tsx
    ├── page.tsx
    ├── @modal/
    │   ├── default.tsx
    │   ├── (.)forgot-password/
    │   │   └── page.tsx
    │   ├── (.)login/
    │   │   └── page.tsx
    │   └── (.)register/
    │       └── page.tsx
    ├── forgot-password/
    │   └── page.tsx
    ├── login/
    │   └── page.tsx
    └── register/
        └── page.tsx
```

---

## `components/` - Reusable UI Components

```
components/
├── ErrorBoundary.tsx
├── icons/
│   ├── IconButton.tsx
│   ├── Readme.md
│   └── index.tsx
├── layout/
│   ├── AppNavbar.tsx
│   ├── AuthPageLayout.tsx
│   ├── ChatLayout.tsx
│   ├── FullScreenContainer.tsx
│   ├── LoggedInLayout.tsx
│   └── index.ts
└── ui/
    ├── Modal.tsx
    ├── TextField.tsx
    ├── button.tsx
    ├── dropdown-menu.tsx
    └── index.ts
```

---

## `config/` - Configuration Files

```
config/
├── constants.ts
└── env.ts
```

---

## `features/` - Feature-based Modules

### `features/auth/` - Authentication Feature

```
features/auth/
├── index.ts
├── types.ts
├── api/
│   ├── auth.api.ts
│   └── useCurrentUser.ts
├── components/
│   ├── AuthModals.tsx
│   ├── ForgotPasswordForm.tsx
│   ├── LoginForm.tsx
│   └── RegisterForm.tsx
├── hooks/
│   └── use-auth.ts
└── store/
    ├── auth.schemas.ts
    └── auth.store.ts
```

### `features/chat/` - Chat Feature

```
features/chat/
├── index.ts
├── types.ts
├── api/
│   ├── chatApi.ts
│   └── index.ts
├── components/
│   ├── AppSidebar.tsx
│   ├── ChatArea.tsx
│   ├── ChatDetailsPanel.tsx
│   ├── ChatHeader.tsx
│   ├── ChatLanding.tsx
│   ├── ConversationItem.tsx
│   ├── ConversationList.tsx
│   ├── LogoutButton.tsx
│   ├── MessageInput.tsx
│   ├── MessageList.tsx
│   └── index.ts
├── hooks/
│   └── (empty)
├── socket/
│   └── (empty)
├── store/
│   └── (empty)
└── utils/
    └── (empty)
```

### `features/classes/` - Classes Feature

```
features/classes/
├── index.ts
├── types.ts
├── api/
│   └── classApi.ts
└── components/
    ├── ClassCardItem.tsx
    ├── ClassGrid.tsx
    └── ClassList.tsx
```

### `features/landing/` - Landing Page Feature

```
features/landing/
├── index.ts
├── types.ts
└── components/
    ├── AppLogo.tsx
    ├── FeaturesList.tsx
    ├── HeroSection.tsx
    ├── LandingFooter.tsx
    ├── LandingNav.tsx
    └── PasswordField.tsx
```

---

## `shared/` - Shared Libraries and Utilities

```
shared/
├── utils.ts
├── api/
│   ├── api.ts
│   └── apiClient.ts
├── auth/
│   ├── auth-event.ts
│   └── auth-sync.ts
├── hooks/
│   ├── use-click-away.ts
│   ├── use-modal.ts
│   ├── use-prevent-body-scroll.ts
│   └── useErrorResponse.ts
└── ui/
    ├── Modal.tsx
    ├── TextField.tsx
    ├── button.tsx
    ├── dropdown-menu.tsx
    └── index.ts
```

---

## `providers/` - React Context Providers

```
providers/
├── auth-provider.tsx
├── query-provider.tsx
└── root-provider.tsx
```

---

## `public/` - Static Assets

```
public/
└── Mitva.svg
```

---

## Architecture Overview

### Directory Structure Pattern

This project follows a **feature-based architecture** with the following organization:

- **`app/`**: Next.js 13+ App Router with route groups for protected and public routes
- **`components/`**: Shared UI components organized by type (icons, layout, ui)
- **`features/`**: Feature modules containing domain-specific logic, components, APIs, and stores
- **`shared/`**: Shared utilities, API clients, hooks, UI components, and helper functions
- **`providers/`**: React context providers for global state management
- **`config/`**: Application configuration and constants

### Route Groups

- **`(protected)/`**: Routes requiring authentication (dashboard, etc.)
- **`(public)/`**: Public routes (landing, login, register, forgot-password)
- **`@modal/`**: Parallel routes for modal intercepts using Next.js intercepting routes

### Feature Module Structure

Each feature follows a consistent structure:

- **`api/`**: API calls and data fetching hooks
- **`components/`**: Feature-specific components
- **`hooks/`**: Custom React hooks
- **`store/`**: State management (schemas, stores)
- **`types.ts`**: TypeScript type definitions
- **`index.ts`**: Public API exports

---

## API Management & State Handling

### Overview

The application uses a **hybrid approach** for API management, combining **React Query** for server state caching and **custom hooks** with local state for form submissions and mutations.

### API Client (`shared/api/apiClient.ts`)

- Built with **Axios** configured with:
  - Base URL from environment variables
  - **Credentials enabled** (`withCredentials: true`) for cookie-based authentication
  - **Response interceptor** that normalizes API responses and unwraps data
  - **Error interceptor** that handles 401 errors and triggers session expiry events

```typescript
// Automatic response normalization
apiClient.interceptors.response.use(
  (res) => ({
    ...res,
    data: res?.data?.data ?? res?.data,
    message: res?.data?.message,
    success: res?.data?.success,
  }),
  (error) => {
    if (error.response?.status === 401) {
      handleAuthEvent({ type: "SESSION_EXPIRED" });
    }
    return Promise.reject(error);
  },
);
```

### React Query Integration (`providers/query-provider.tsx`)

Used for **server state management** with the following configuration:

- **Stale Time**: 30 seconds (data considered fresh)
- **Refetch on Window Focus**: Disabled
- **Retry**: 1 attempt
- Wraps entire app to provide query client context

**Usage Pattern**:

```typescript
// Example: useCurrentUser hook
export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const { data } = await apiClient.get("/auth/me");
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
    refetchInterval: 4 * 60 * 1000, // Auto-refresh every 4 minutes
  });
};
```

### Custom Hooks Pattern (`features/*/hooks/`)

Used for **mutations and form submissions** with manual state management:

**State Management**:

- `loading` - Boolean flag for pending operations
- `error` - String or null for error messages
- `success` - Boolean flag for successful operations

**Example Pattern** (from `use-auth.ts`):

```typescript
export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { user } = await loginUser({ email, password });
      setUser(user);
      setSuccess(true);
      return { success: true, user };
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Login failed";
      setError(errorMessage);
      return { success: false, user: null };
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, handleLogin };
};
```

### Error Handling

**Three-Layer Error Handling System**:

1. **API Interceptor Level** (`shared/api/apiClient.ts`)
   - Catches 401 errors globally
   - Triggers session expiry events
   - Passes errors to calling code

2. **Hook Level** (`features/*/hooks/`)
   - Catches errors in try-catch blocks
   - Extracts error messages from response
   - Sets local error state
   - Returns error information to components

3. **Component Level** (`useErrorResponse` hook)
   - Optional centralized error handling
   - Automatic toast notifications based on status codes
   - Configurable error callbacks
   - Development logging

**Error Hook Usage** (`shared/hooks/useErrorResponse.ts`):

```typescript
useErrorResponse(error, {
  showToast: true,
  onError: (error) => {
    // Custom error handling
  },
});
```

**Status Code Handling**:

- `400` - Bad Request with input validation messages
- `401` - Unauthorized with session expiry notification
- `403` - Forbidden with access denial message
- `404` - Not Found
- `409` - Conflict (resource already exists)
- `422` - Unprocessable Entity
- `500+` - Server errors with retry suggestion

### Loading State Patterns

**1. Query-based Loading** (React Query):

```typescript
const { data, isLoading, isFetching, error } = useCurrentUser();

if (isLoading) return <Spinner />;
if (error) return <Error message={error.message} />;
```

**2. Mutation-based Loading** (Custom Hooks):

```typescript
const { handleLogin, loading, error } = useAuth();

<Button disabled={loading}>
  {loading ? "Logging in..." : "Login"}
</Button>
```

### State Management Architecture

**Zustand Store** (`features/*/store/`):

- Used for **client state** (auth, UI state)
- Persisted using localStorage
- Schema validation with Zod

**React Query**:

- Used for **server state** (user data, cached queries)
- Automatic background refetching
- Cache invalidation

**Local Component State**:

- Form state (React Hook Form)
- Temporary UI state
- Loading/error states for mutations

### API Call Flow

```
Component
  ↓
Custom Hook (use-auth, etc.)
  ↓
API Function (auth.api.ts, chatApi.ts)
  ↓
API Client (apiClient.ts - Axios)
  ↓
Interceptors (normalize response, handle errors)
  ↓
Return to Hook
  ↓
Update Local State (loading, error, success)
  ↓
Component Re-renders
```

### Best Practices

1. **Use React Query for GET requests** (data fetching, caching)
2. **Use Custom Hooks for POST/PUT/DELETE** (mutations, form submissions)
3. **Always handle loading states** in UI components
4. **Extract error messages** from API responses
5. **Use try-catch-finally** pattern in mutation hooks
6. **Normalize responses** at interceptor level
7. **Return structured data** from hooks (`{ success, data, message }`)

---

### Improved Error Handling System

**Centralized Error Handler** (`shared/api/errors.ts`):

```typescript
// Error type definitions
type ErrorType = "validation" | "auth" | "network" | "server" | "unknown";

interface AppError {
  type: ErrorType;
  message: string;
  statusCode: number;
  validationErrors?: Record<string, string>;
}

// Centralized error parser
export const parseApiError = (error: unknown): AppError => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const data = error.response?.data;

    if (status === 400 || status === 422) {
      return {
        type: "validation",
        message: data?.message || "Validation failed",
        statusCode: status,
        validationErrors: data?.errors,
      };
    }
    if (status === 401) {
      return {
        type: "auth",
        message: "Session expired. Please login again.",
        statusCode: 401,
      };
    }
    if (status >= 500) {
      return {
        type: "server",
        message: "Server error. Please try again later.",
        statusCode: status,
      };
    }
    return {
      type: "network",
      message: data?.message || "Network error",
      statusCode: status || 0,
    };
  }
  return {
    type: "unknown",
    message: "An unexpected error occurred",
    statusCode: 0,
  };
};
```

**Simplified Custom Hook Pattern**:

```typescript
// Use mutation hook directly with automatic loading/error handling
export const useLoginMutation = () => {
  const [appError, setAppError] = useState<AppError | null>(null);
  const router = useRouter();

  const mutate = async (email: string, password: string) => {
    try {
      setAppError(null);
      const response = await apiClient.post("/auth/login", { email, password });

      // Success - component shows data
      return response.data;
    } catch (error) {
      const parsedError = parseApiError(error);
      setAppError(parsedError);

      // Handle auth errors globally
      if (parsedError.type === "auth") {
        handleAuthEvent({ type: "SESSION_EXPIRED" });
      }
      throw parsedError;
    }
  };

  return {
    mutate,
    error: appError,
    // Component can check error.type instead of parsing messages
  };
};
```

**Component Usage** (Simpler):

```typescript
const LoginForm = () => {
  const { mutate, error, isPending } = useLoginMutation();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await mutate(formData.email, formData.password);
      // Success - show spinner was already there
      toast.success('Login successful');
    } catch (err) {
      // Error is already in `error` state
      if (error?.type === 'validation') {
        setFieldErrors(error.validationErrors);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error?.message && <ErrorAlert message={error.message} />}
      <TextField
        value={formData.email}
        error={error?.validationErrors?.email}
        disabled={isPending}
      />
      <Button disabled={isPending}>
        {isPending ? <Spinner /> : 'Login'}
      </Button>
    </form>
  );
};
```

### Recommended Approach

1. **Keep local state simple**: Only `error` and `isPending` from mutations
2. **Centralize error parsing**: Use `parseApiError()` everywhere
3. **Type errors properly**: Know error.type to handle validation vs. auth
4. **Show spinners directly**: `isPending` boolean instead of loading state
5. **Skip success flags**: Components handle success implicitly (redirect, data update)

### Updated Best Practices

1. Use React Query for GET requests with built-in loading/error
2. Use simplified custom hooks for mutations
3. Parse all errors centrally at interceptor or hook level
4. Always provide `isPending` boolean for UI
5. Provide structured error object with type and validationErrors
6. Remove `success` flag - handle via try-catch in components
7. Keep API interceptors thin - main logic in error parser

---

_Last Updated: February 15, 2026_
