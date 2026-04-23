# Design System Migration Guide

## 🎨 Quick Start - Using the New Design System

### Color Usage

**❌ OLD (Don't do this):**

```tsx
<div className="bg-blue-500 text-white border-gray-200">
<p className="text-gray-600">Some text</p>
<span className="text-red-500">Error</span>
```

**✅ NEW (Do this):**

```tsx
<div className="bg-primary text-primary-foreground border-border">
<p className="text-muted-foreground">Some text</p>
<span className="text-danger">Error</span>
```

---

## 📚 Design Token Reference

### Background Colors

```tsx
bg - background; // Main app background (#FAF9F6 light / #0F172A dark)
bg - surface; // Cards, modals, elevated surfaces (white / dark gray)
bg - muted; // Subtle fills, disabled states
bg - primary; // Primary action backgrounds (#1E40AF)
bg - accent; // Interactive elements, hover states (#60A5FA)
bg - success; // Success notifications (#10B981)
bg - danger; // Error states, destructive actions (#EF4444)
```

### Text Colors

```tsx
text - foreground; // Primary text (#0F172A light / #F1F5F9 dark)
text - muted - foreground; // Secondary text, descriptions (#64748B)
text - primary; // On primary backgrounds
text - primary - foreground; // White/light text on primary
text - accent; // Links, interactive text
text - accent - foreground; // Text on accent backgrounds
text - success; // Success messages
text - danger; // Error messages
```

### Borders

```tsx
border - border; // Standard border color (light gray / dark gray)
border - primary; // Primary colored borders
border - accent; // Accent colored borders
border - danger; // Error state borders
```

---

## 🎯 Common Patterns

### Buttons

```tsx
// Primary button
<Button className="bg-primary text-primary-foreground shadow-sm hover:shadow-md">
  Click me
</Button>

// Secondary button
<Button variant="secondary" className="bg-muted text-foreground">
  Cancel
</Button>

// Danger button
<Button variant="destructive" className="bg-danger text-primary-foreground">
  Delete
</Button>

// Ghost button (links, secondary actions)
<Button variant="ghost" className="text-accent hover:bg-accent hover:text-accent-foreground">
  Learn more
</Button>
```

### Form Inputs

```tsx
// Standard input
<Input className="border-border focus:ring-accent focus:border-accent" />

// Error state input
<Input className="border-danger focus:ring-danger" />

// Using TextField (recommended)
<TextField
  label="Email"
  error={errors.email}
  // Automatically applies all design tokens
/>
```

### Cards

```tsx
<div className="bg-surface border border-border rounded-md shadow-sm hover:shadow-md p-6">
  <h3 className="font-heading font-bold text-foreground">Card Title</h3>
  <p className="text-muted-foreground">Card description</p>
</div>
```

### Badges & Tags

```tsx
// Accent badge
<span className="px-2 py-1 bg-accent/10 text-accent rounded-md text-sm font-mono">
  NEW
</span>

// Success badge
<span className="px-2 py-1 bg-success/10 text-success rounded-md text-sm">
  Active
</span>

// Danger badge
<span className="px-2 py-1 bg-danger/10 text-danger rounded-md text-sm">
  Error
</span>
```

### Interactive States

```tsx
// Hover with accent
<button className="hover:bg-accent hover:text-accent-foreground transition-colors">
  Hover me
</button>

// Focus ring
<button className="focus:outline-none focus:ring-2 focus:ring-accent">
  Focus me
</button>

// Active/pressed state
<button className="active:bg-accent/80">
  Click me
</button>

// Disabled state
<button className="disabled:opacity-50 disabled:cursor-not-allowed">
  Disabled
</button>
```

---

## 🎭 Typography

### Headings

```tsx
// Use font-heading for all headings (will use Satoshi when added, currently Inter)
<h1 className="text-4xl font-heading font-bold text-foreground">
  Main Heading
</h1>

<h2 className="text-2xl font-heading font-bold text-foreground">
  Section Heading
</h2>
```

### Body Text

```tsx
// Regular body text (Inter font applied globally)
<p className="text-base text-foreground">
  This is body text
</p>

// Muted/secondary text
<p className="text-sm text-muted-foreground">
  This is secondary text
</p>

// Small text
<span className="text-sm text-muted-foreground">
  Helper text
</span>
```

### Code & Monospace

```tsx
// Code snippets
<code className="font-mono bg-muted px-2 py-1 rounded text-accent">
  npm install
</code>

// Join codes, technical elements
<span className="font-mono text-accent">
  ABC123XYZ
</span>
```

---

## 📐 Layout & Spacing

### Border Radius (12px System)

```tsx
rounded - md; // 12px - Standard (use this most often)
rounded - sm; // 8px - Smaller elements
rounded - lg; // 16px - Larger cards
rounded - xl; // 20px - Hero sections
```

### Shadows (Subtle System)

```tsx
shadow - sm; // Default subtle shadow
hover: shadow - md; // Hover state shadow
shadow - lg; // Modals, overlays (use sparingly)
```

### Spacing (8px Grid)

```tsx
// Padding
p - 2; // 8px
p - 4; // 16px (common)
p - 6; // 24px (cards)
p - 8; // 32px (sections)

// Margin
m - 2; // 8px
m - 4; // 16px
m - 6; // 24px
m - 8; // 32px

// Gap
gap - 2; // 8px
gap - 4; // 16px (common for flex/grid)
gap - 6; // 24px
```

---

## 🌓 Dark Mode

### Enabling Dark Mode

Add the `dark` class to the `<html>` element:

```tsx
// Enable dark mode
<html className="dark">

// Disable dark mode
<html className="">
```

### Dark Mode Aware Components

All design tokens automatically adapt to dark mode. No extra work needed!

```tsx
// This automatically works in both light and dark mode:
<div className="bg-surface text-foreground border-border">
  Content adapts to theme
</div>
```

---

## ✨ Best Practices

### DO ✅

- Use semantic tokens (`bg-primary`, `text-foreground`)
- Apply `rounded-md` for 12px radius
- Use `shadow-sm` for default shadows
- Use `hover:shadow-md` for interactive elements
- Use `focus:ring-2 focus:ring-accent` for focus states
- Use `font-heading` for all headings
- Use `font-mono` for code/technical text
- Follow 8px spacing grid (p-2, p-4, p-6, p-8)

### DON'T ❌

- Never use hardcoded hex colors (`#FF0000`)
- Avoid Tailwind color classes (`text-blue-500`, `bg-red-600`)
- Don't mix rounded-\* sizes randomly
- Don't use overly large shadows (`shadow-2xl`)
- Don't use random spacing values outside 8px grid
- Don't add new color values without updating design tokens

---

## 🎯 Component Examples

### Modal

```tsx
<Modal
  isOpen={isOpen}
  onClose={onClose}
  title="Modal Title" // Uses font-heading automatically
>
  <p className="text-foreground">Modal content with proper tokens</p>
</Modal>
```

### Form

```tsx
<form className="space-y-4">
  <TextField label="Email" type="email" error={errors.email} required />

  <PasswordField label="Password" error={errors.password} required />

  <Button type="submit" className="w-full">
    Submit
  </Button>
</form>
```

### Navbar

```tsx
<AppNavbar
  isLoggedIn={isLoggedIn}
  // All styling uses tokens automatically
/>
```

---

## 🔧 Customizing the Design System

### Changing Colors

Edit [globals.css](client/app/globals.css):

```css
:root {
  --primary: 30 64 175; /* Change primary color */
  --accent: 96 165 250; /* Change accent color */
  --background: 250 249 246; /* Change background */
  /* etc. */
}
```

### Adding New Tokens

1. Add CSS variable in `globals.css`:

```css
:root {
  --my-custom-color: 100 150 200;
}
```

2. Add to Tailwind config:

```ts
colors: {
  'my-custom': 'rgb(var(--my-custom-color) / <alpha-value>)',
}
```

3. Use in components:

```tsx
<div className="bg-my-custom text-white">Custom color</div>
```

---

## 📝 Migration Checklist for New Components

When creating a new component:

- [ ] Use design tokens for all colors
- [ ] Apply `rounded-md` (12px radius)
- [ ] Use `shadow-sm` for subtle elevation
- [ ] Add `hover:shadow-md` for interactive elements
- [ ] Use `focus:ring-2 focus:ring-accent` for focus states
- [ ] Use `font-heading` for headings
- [ ] Use `font-mono` for code/technical elements
- [ ] Follow 8px spacing grid
- [ ] Test in both light and dark mode
- [ ] Verify all interactive states (hover, focus, active, disabled)

---

## 🚀 Getting Started

1. **Read this guide** - Understand the token system
2. **Reference the tokens** - Use the quick reference above
3. **Follow the patterns** - Copy from existing components
4. **Test thoroughly** - Check light/dark mode, all states
5. **Stay consistent** - Use the same tokens for similar purposes

---

## 📞 Questions?

- Check [DESIGN_SYSTEM_REFACTOR.md](DESIGN_SYSTEM_REFACTOR.md) for complete refactor details
- Check [DESIGN_SYSTEM_VERIFICATION.md](DESIGN_SYSTEM_VERIFICATION.md) for quality checklist
- Review existing components for examples
- Look at the design token definitions in `globals.css`

---

**Design System Version**: 1.0  
**Last Updated**: February 19, 2026  
**Status**: ✅ Production Ready
