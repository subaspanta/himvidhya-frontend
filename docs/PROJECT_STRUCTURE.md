# Project Folder Structure

_Updated: 2026-03-26_

## Overview

This file lists the detailed folder and file structure for the `client` (Next.js app) and `server` (Node/Express API) parts of the project. Build artifacts (`.next`, `node_modules`, `.git`) are excluded from the listing below, except for their root folders where relevant.

### Architecture note (latest)

- Route guarding in `client/features/auth/components/AuthGate.tsx` was stabilized to avoid render-phase router updates.
- Redirect side effects now run in effect-driven guard flow, preventing Router-update warning loops.

---

## Client Structure (`client/`)

```text
client
client/app
client/app/globals.css
client/app/layout.tsx
client/app/(protected)
client/app/(protected)/home
client/app/(protected)/home/page.tsx
client/app/(protected)/home/student
client/app/(protected)/home/student/page.tsx
client/app/(protected)/home/teacher
client/app/(protected)/home/teacher/page.tsx
client/app/(protected)/layout.tsx
client/app/(public)
client/app/(public)/forgot-password
client/app/(public)/forgot-password/page.tsx
client/app/(public)/layout.tsx
client/app/(public)/login
client/app/(public)/login/page.tsx
client/app/(public)/@modal
client/app/(public)/@modal/default.tsx
client/app/(public)/@modal/(.)forgot-password
client/app/(public)/@modal/(.)forgot-password/page.tsx
client/app/(public)/@modal/(.)login
client/app/(public)/@modal/(.)login/page.tsx
client/app/(public)/@modal/(.)register
client/app/(public)/@modal/(.)register/page.tsx
client/app/(public)/page.tsx
client/app/(public)/register
client/app/(public)/register/page.tsx
client/components
client/components/common
client/components/common/EmptyBatches.tsx
client/components/icons
client/components/icons/IconButton.tsx
client/components/icons/index.tsx
client/components.json
client/components/layout
client/components/layout/AuthPageLayout.tsx
client/components/layout/DashboardHeader.tsx
client/components/layout/FullScreenContainer.tsx
client/components/layout/index.ts
client/components/layout/LoggedInLayout.tsx
client/components/layout/RightAside.tsx
client/components/navbar
client/components/navbar/index.ts
client/components/navbar/NavbarBottomTabs.tsx
client/components/navbar/NavbarLinks.tsx
client/components/navbar/NavbarLogo.tsx
client/components/navbar/navbar.theme.ts
client/components/navbar/Navbar.tsx
client/components/navbar/navbar.types.ts
client/components/navbar/NavbarUserDropdown.tsx
client/components/navbar/navbar.utils.ts
client/components/ui
client/components/ui/avatar.tsx
client/components/ui/badge.tsx
client/components/ui/BatchCard.tsx
client/components/ui/button.tsx
client/components/ui/card.tsx
client/components/ui/dropdown-menu.tsx
client/components/ui/input.tsx
client/components/ui/modal.tsx
client/components/ui/StatsCard.tsx
client/components/ui/text-field.tsx
client/config
client/config/constants.ts
client/.env.local
client/eslint.config.mjs
client/features
client/features/auth
client/features/auth/api
client/features/auth/api/auth.api.ts
client/features/auth/components
client/features/auth/components/AuthGate.tsx
client/features/auth/components/AuthInitializer.tsx
client/features/auth/components/AuthModalController.tsx
client/features/auth/components/AuthModals.tsx
client/features/auth/components/AuthPageShell.tsx
client/features/auth/components/ForgotPasswordForm.tsx
client/features/auth/components/LoginForm.tsx
client/features/auth/components/RegisterForm.tsx
client/features/auth/hooks
client/features/auth/hooks/useCurrentUser.ts
client/features/auth/hooks/useForgetPassword.ts
client/features/auth/hooks/useLogin.ts
client/features/auth/hooks/useLogout.ts
client/features/auth/hooks/useRegister.ts
client/features/auth/hooks/useResetPassword.ts
client/features/auth/hooks/useVerifyOTP.ts
client/features/auth/index.ts
client/features/auth/store
client/features/auth/store/auth.store.ts
client/features/auth/types
client/features/auth/types/api.types.ts
client/features/auth/types/auth.mapper.ts
client/features/auth/types/domain.types.ts
client/features/auth/types/form.types.ts
client/features/auth/types/index.ts
client/features/auth/types/store.types.ts
client/features/auth/types/ui.types.ts
client/features/batches
client/features/batches/api
client/features/batches/components
client/features/batches/components/classroom
client/features/batches/components/classroom/AnnouncementCard.tsx
client/features/batches/components/classroom/ChannelMainFeed.tsx
client/features/batches/components/classroom/ChannelTab.tsx
client/features/batches/components/classroom/ClassHeader.tsx
client/features/batches/components/classroom/ClassSidebar.tsx
client/features/batches/components/classroom/EmptyState.tsx
client/features/batches/components/classroom/UpcomingDeadlines.tsx
client/features/batches/components/dashboard
client/features/batches/components/dashboard/BatchFilterMenu.tsx
client/features/batches/components/dashboard/ClassCardItem.tsx
client/features/batches/components/dashboard/ClassGrid.tsx
client/features/batches/components/dashboard/ClassList.tsx
client/features/batches/components/dashboard/CreateClassForm.tsx
client/features/batches/components/dashboard/JoinClassForm.tsx
client/features/batches/components/dashboard/SortMenu.tsx
client/features/batches/index.ts
client/features/batches/types.ts
client/features/home
client/features/home/api
client/features/home/api/home.api.ts
client/features/home/api/home.mapper.ts
client/features/home/data
client/features/home/hooks
client/features/home/hooks/useCreateClass.ts
client/features/home/hooks/useGetEnrolledClasses.ts
client/features/home/hooks/useJoinClass.ts
client/features/home/index.ts
client/features/home/pages
client/features/home/pages/StudentDashboardPage.tsx
client/features/home/pages/TeacherDashboardPage.tsx
client/features/landing
client/features/landing/components
client/features/landing/components/AppLogo.tsx
client/features/landing/components/FeaturesList.tsx
client/features/landing/components/Footer.tsx
client/features/landing/components/HeroSection.tsx
client/features/landing/components/LandingNav.tsx
client/features/landing/components/PasswordField.tsx
client/features/landing/index.ts
client/features/landing/types.ts
client/.git
client/.gitignore
client/global.d.ts
client/.next
client/next.config.ts
client/next-env.d.ts
client/node_modules
client/package.json
client/package-lock.json
client/postcss.config.mjs
client/providers
client/providers/index.ts
client/providers/query-provider.tsx
client/providers/root-provider.tsx
client/providers/toaster-provider.tsx
client/public
client/public/fonts
client/public/fonts/Satoshi-Black.eot
client/public/fonts/Satoshi-BlackItalic.eot
client/public/fonts/Satoshi-BlackItalic.ttf
client/public/fonts/Satoshi-BlackItalic.woff
client/public/fonts/Satoshi-BlackItalic.woff2
client/public/fonts/Satoshi-Black.ttf
client/public/fonts/Satoshi-Black.woff
client/public/fonts/Satoshi-Black.woff2
client/public/fonts/Satoshi-Bold.eot
client/public/fonts/Satoshi-BoldItalic.eot
client/public/fonts/Satoshi-BoldItalic.ttf
client/public/fonts/Satoshi-BoldItalic.woff
client/public/fonts/Satoshi-BoldItalic.woff2
client/public/fonts/Satoshi-Bold.ttf
client/public/fonts/Satoshi-Bold.woff
client/public/fonts/Satoshi-Bold.woff2
client/public/fonts/Satoshi-Italic.eot
client/public/fonts/Satoshi-Italic.ttf
client/public/fonts/Satoshi-Italic.woff
client/public/fonts/Satoshi-Italic.woff2
client/public/fonts/Satoshi-Light.eot
client/public/fonts/Satoshi-LightItalic.eot
client/public/fonts/Satoshi-LightItalic.ttf
client/public/fonts/Satoshi-LightItalic.woff
client/public/fonts/Satoshi-LightItalic.woff2
client/public/fonts/Satoshi-Light.ttf
client/public/fonts/Satoshi-Light.woff
client/public/fonts/Satoshi-Light.woff2
client/public/fonts/Satoshi-Medium.eot
client/public/fonts/Satoshi-MediumItalic.eot
client/public/fonts/Satoshi-MediumItalic.ttf
client/public/fonts/Satoshi-MediumItalic.woff
client/public/fonts/Satoshi-MediumItalic.woff2
client/public/fonts/Satoshi-Medium.ttf
client/public/fonts/Satoshi-Medium.woff
client/public/fonts/Satoshi-Medium.woff2
client/public/fonts/Satoshi-Regular.eot
client/public/fonts/Satoshi-Regular.ttf
client/public/fonts/Satoshi-Regular.woff
client/public/fonts/Satoshi-Regular.woff2
client/public/fonts/Satoshi-Variable.eot
client/public/fonts/Satoshi-VariableItalic.eot
client/public/fonts/Satoshi-VariableItalic.ttf
client/public/fonts/Satoshi-VariableItalic.woff
client/public/fonts/Satoshi-VariableItalic.woff2
client/public/fonts/Satoshi-Variable.ttf
client/public/fonts/Satoshi-Variable.woff
client/public/fonts/Satoshi-Variable.woff2
client/public/logoAndBrand.svg
client/public/Logo.svg
client/README.md
client/shared
client/shared/api
client/shared/api/axiosClient.ts
client/shared/api/error.ts
client/shared/api/queryClient.ts
client/shared/hooks
client/shared/hooks/use-click-away.ts
client/shared/hooks/use-modal.ts
client/shared/hooks/useNavItems.ts
client/shared/hooks/use-prevent-body-scroll.ts
client/shared/loading
client/shared/loading/PageLoader.tsx
client/shared/loading/Skeleton.tsx
client/shared/loading/Spinner.tsx
client/shared/loading/TopLoader.tsx
client/shared/types
client/shared/types/api.types.ts
client/shared/types/index.ts
client/shared/utils.ts
client/tailwind.config.ts
client/tsconfig.json
client/tsconfig.tsbuildinfo
client/types
client/types/dashboard.ts
```

---

## Server Structure (`server/`)

```text
server
server/config
server/config/apiVersion.js
server/config/database.js
server/config/jwt.js
server/config/passwordRules.js
server/config/rbac.js
server/controllers
server/controllers/announcement.controller.js
server/controllers/attendance.controller.js
server/controllers/auth.controller.js
server/controllers/class.controller.js
server/controllers/deadline.controller.js
server/controllers/user.controller.js
server/.env
server/.env.example
server/.git
server/.gitignore
server/helpers
server/helpers/asyncHandler.js
server/helpers/common.helper.js
server/helpers/permissions.js
server/helpers/prepareEmail.js
server/logger.js
server/logs
server/logs/combined.log
server/logs/error.log
server/logs/exceptions.log
server/logs/rejections.log
server/middleware
server/middleware/auth.middleware.js
server/middleware/errorHandler.middleware.js
server/middleware/permissions.middleware.js
server/middleware/rateLimiter.middleware.js
server/middleware/role.middleware.js
server/middleware/validateRequest.middleware.js
server/models
server/models/Announcement.model.js
server/models/AttendanceRecord.model.js
server/models/AttendanceSession.model.js
server/models/Class.model.js
server/models/Deadline.model.js
server/models/User.model.js
server/node_modules
server/package.json
server/package-lock.json
server/permissions
server/permissions/rules.js
server/README.md
server/routes
server/routes/announcement.route.js
server/routes/attendance.route.js
server/routes/auth.route.js
server/routes/class.route.js
server/routes/deadline.route.js
server/routes/user.route.js
server/schemas
server/schemas/validationSchemas.js
server/server.js
server/services
server/services/auth.service.js
server/services/class.service.js
server/services/user.service.js
server/utils
server/utils/email.js
server/utils/error
server/utils/error/errors.js
server/utils/error/handler.js
server/utils/error/index.js
server/utils/error/status-codes.js
server/utils/responseParser.js
```

---

## Notes on Key Areas

- `client/app/(public)` – Public routes like landing, login, register, forgot password, and modal routes.
- `client/app/(protected)` – Auth-protected dashboard areas (home, batches, materials, schedule, etc.).
- `client/features/*` – Feature-based modules (auth, batches, home, landing) including APIs, hooks, components, pages, and types.
- `client/shared/*` – Reusable shared utilities, hooks, API clients, and loading components.
- `client/components/*` – Presentational and layout components (navbar, layout, UI primitives).
- `server/controllers/*` – Express route controllers for announcements, attendance, auth, classes, deadlines, and users.
- `server/routes/*` – Express route definitions wired to controllers.
- `server/models/*` – Mongoose (or ORM) models for core domain entities.
- `server/middleware/*` – Cross-cutting concerns like auth, validation, permissions, rate limiting, and error handling.
- `server/services/*` – Business logic for auth, classes, and users.
- `server/config/*` – Configuration for DB, JWT, RBAC, API versioning, and password rules.
