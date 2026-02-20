# Client Folder Structure

```
client/
├── .env.local
├── .gitignore
├── components.json
├── eslint.config.mjs
├── global.d.ts
├── next-env.d.ts
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
├── tsconfig.json
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── middleware.ts
│   ├── (protected)/
│   │   ├── layout.tsx
│   │   ├── class/
│   │   └── dashboard/
│   └── (public)/
│       ├── layout.tsx
│       ├── page.tsx
│       ├── @modal/
│       ├── forgot-password/
│       ├── login/
│       └── register/
├── components/
│   ├── icons/
│   │   ├── IconButton.tsx
│   │   └── index.tsx
│   ├── layout/
│   │   ├── AppNavbar.tsx
│   │   ├── AuthPageLayout.tsx
│   │   ├── FullScreenContainer.tsx
│   │   ├── LoggedInLayout.tsx
│   │   ├── index.ts
│   │   └── navbar/
│   │       ├── Navbar.tsx
│   │       ├── navbar.theme.ts
│   │       ├── navbar.types.ts
│   │       └── components/
│   │           ├── NavbarAuthActions.tsx
│   │           ├── NavbarLinks.tsx
│   │           ├── NavbarLogo.tsx
│   │           ├── NavbarMobileMenu.tsx
│   │           ├── NavbarMobileToggle.tsx
│   │           └── NavbarUserMenu.tsx
│   └── ui/
│       ├── avatar.tsx
│       ├── button.tsx
│       ├── dropdown-menu.tsx
│       ├── input.tsx
│       ├── modal.tsx
│       └── text-field.tsx
├── config/
│   ├── constants.ts
│   └── env.ts
├── features/
│   ├── auth/
│   │   ├── api/
│   │   │   └── ...
│   │   ├── components/
│   │   │   ├── AuthModals.tsx
│   │   │   ├── ForgotPasswordForm.tsx
│   │   │   ├── LoginForm.tsx
│   │   │   └── RegisterForm.tsx
│   │   ├── hooks/
│   │   │   └── ...
│   │   ├── store/
│   │   │   └── ...
│   │   ├── index.ts
│   │   └── types.ts
│   ├── class/
│   │   ├── api/
│   │   │   └── ...
│   │   ├── components/
│   │   │   ├── dashboard/
│   │   │   │   ├── ClassCardItem.tsx
│   │   │   │   ├── ClassGrid.tsx
│   │   │   │   ├── ClassList.tsx
│   │   │   │   ├── CreateClassForm.tsx
│   │   │   │   └── JoinClassForm.tsx
│   │   │   └── classroom/
│   │   │       ├── AnnouncementCard.tsx
│   │   │       ├── ChannelMainFeed.tsx
│   │   │       ├── ChannelTab.tsx
│   │   │       ├── ClassHeader.tsx
│   │   │       ├── ClassSidebar.tsx
│   │   │       ├── EmptyState.tsx
│   │   │       └── UpcomingDeadlines.tsx
│   │   ├── index.ts
│   │   └── types.ts
│   └── landing/
│       ├── components/
│       │   ├── AppLogo.tsx
│       │   ├── FeaturesList.tsx
│       │   ├── HeroSection.tsx
│       │   ├── LandingFooter.tsx
│       │   ├── LandingNav.tsx
│       │   └── PasswordField.tsx
│       ├── index.ts
│       └── types.ts
├── providers/
│   ├── auth-provider.tsx
│   ├── index.ts
│   ├── layout-provider.tsx
│   ├── query-provider.tsx
│   └── root-provider.tsx
├── public/
├── shared/
│   ├── utils.ts
│   ├── api/
│   │   └── api.ts
│   ├── auth/
│   └── hooks/
```
