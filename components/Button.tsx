import Link from "next/link";
import type { ReactNode } from "react";
import { Button as UIButton } from "@/components/ui/button";

/** Brand-facing wrapper around the shadcn/ui button (components/ui/button.tsx).
 *  Variant names predate the migration: "primary" maps to the shadcn default. */
type ButtonVariant = "primary" | "secondary" | "ghost-dark" | "dark";

export function Button({
  href,
  variant = "primary",
  children,
  type,
  disabled,
  className = "",
}: {
  href?: string;
  variant?: ButtonVariant;
  children: ReactNode;
  type?: "submit" | "button";
  disabled?: boolean;
  className?: string;
}) {
  const uiVariant = variant === "primary" ? "default" : variant;
  if (href) {
    return (
      <UIButton asChild variant={uiVariant} className={className}>
        <Link href={href}>{children}</Link>
      </UIButton>
    );
  }
  return (
    <UIButton
      type={type ?? "button"}
      variant={uiVariant}
      disabled={disabled}
      className={className}
    >
      {children}
    </UIButton>
  );
}
