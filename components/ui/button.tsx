import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium cursor-pointer transition-[transform,background-color,box-shadow,border-color,color] duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-60 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // brand variants (BRAND-GUIDE.md §2 — clay for CTAs only)
        default:
          "bg-primary text-primary-foreground shadow-cta hover:bg-red-700 hover:-translate-y-px disabled:hover:translate-y-0",
        secondary:
          "border-[1.5px] border-red-600 text-red-600 bg-transparent hover:bg-red-50",
        "ghost-dark":
          "border-[1.5px] border-paper-50/60 text-white bg-transparent hover:border-white hover:bg-white/[.08]",
        dark: "bg-ink-950 text-white hover:bg-black",
        // stock shadcn variants, kept for auxiliary UI
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        // brand CTA sizing from the approved homepage
        default:
          "gap-[10px] font-body font-semibold text-[15.5px] px-[28px] py-[15px] rounded-[10px]",
        sm: "h-8 gap-1.5 rounded-md px-3 text-xs",
        lg: "h-10 gap-2 rounded-md px-8 text-sm",
        icon: "h-9 w-9 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
