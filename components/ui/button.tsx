import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils";

// const buttonVariants = cva(
//   "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
//   {
//     variants: {
//       variant: {
//         default:
//           "bg-primary text-primary-foreground rounded-md shadow-sm hover:shadow-md hover:bg-primary/90",
//         destructive:
//           "bg-danger text-primary-foreground rounded-md shadow-sm hover:shadow-md hover:bg-danger/90",
//         outline:
//           "border border-border bg-background rounded-md shadow-sm hover:shadow-md hover:bg-accent hover:text-accent-foreground",
//         secondary:
//           "bg-muted text-foreground rounded-md shadow-sm hover:shadow-md hover:bg-muted/80",
//         ghost: "hover:bg-accent hover:text-accent-foreground rounded-md",
//         link: "text-accent underline-offset-4 hover:underline",
//       },
//       size: {
//         default: "h-10 px-4 py-2",
//         sm: "h-8 px-3 text-xs",
//         lg: "h-12 px-6 text-base",
//         icon: "h-10 w-10",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//       size: "default",
//     },
//   },
// );

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm hover:shadow-md hover:bg-primary/95 rounded-[var(--radius)]", // your original — kept unchanged

        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:shadow-md hover:bg-destructive/95 rounded-[var(--radius)]", // kept strong but subtle

        outline:
          "border border-border bg-background text-foreground rounded-[var(--radius)] hover:bg-accent-subtle hover:text-accent-subtle-foreground hover:border-accent/40 shadow-sm transition-colors", // softer, calmer hover

        secondary:
          "bg-muted/70 text-foreground rounded-[var(--radius)] hover:bg-muted hover:text-foreground shadow-sm transition-colors", // very subtle, almost flat

        ghost:
          "hover:bg-accent-subtle hover:text-accent-subtle-foreground rounded-[var(--radius)] text-foreground", // minimal, clean — perfect for icons/menus

        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80 transition-colors p-0 h-auto", // clean link style, no background
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-xs rounded-md",
        lg: "h-11 px-6 text-base rounded-lg",
        icon: "h-9 w-9 rounded-full", // smaller & rounder for icon buttons
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
