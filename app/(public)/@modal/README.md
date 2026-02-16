# Auth Modal Routing (Intercepting Routes)

## ⚠️ Scope Limitation for MVP

This directory uses Next.js intercepting routes **ONLY for authentication flows**.

### ✅ Allowed Modal Routes

- `(.)login` - Login modal
- `(.)register` - Registration modal
- `(.)forgot-password` - Password reset modal

### ❌ Do NOT Add

- Create class modals
- Create announcement modals
- Attendance modals
- Any in-app feature modals

### Why This Rule?

For MVP simplicity, intercepting routes add complexity. They're useful for auth because:

1. Users can deep-link to auth pages
2. Auth modals appear over the landing page
3. Browser back button works naturally

For in-app features, use **normal component modals** instead:

- Simpler state management
- Easier to maintain
- Less routing complexity
- Better for MVP velocity

## Usage Pattern

When a user clicks "Login" from the landing page:

1. URL changes to `/login`
2. Intercepting route `(.)login` catches it
3. Modal appears over landing page
4. Browser back button closes modal

If user directly visits `/login`:

- Shows full login page (not modal)
- Defined in `app/(public)/login/page.tsx`
