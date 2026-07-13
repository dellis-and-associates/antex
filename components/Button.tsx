import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost-dark" | "dark";

const styles: Record<ButtonVariant, string> = {
  primary:
    "bg-clay-600 text-white shadow-cta hover:bg-clay-700 hover:-translate-y-px",
  secondary:
    "border-[1.5px] border-pine-600 text-pine-600 bg-transparent hover:bg-pine-100",
  "ghost-dark":
    "border-[1.5px] border-sand-50/60 text-white bg-transparent hover:border-white hover:bg-white/[.08]",
  dark: "bg-ink-950 text-white hover:bg-black",
};

const base =
  "inline-flex items-center gap-[10px] font-body font-semibold text-[15.5px] px-[28px] py-[15px] rounded-[10px] transition-[transform,background-color,box-shadow] duration-150 cursor-pointer border-0";

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
  const cls = `${base} ${styles[variant]} ${className}`;
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type ?? "button"} disabled={disabled} className={`${cls} disabled:opacity-60 disabled:hover:translate-y-0`}>
      {children}
    </button>
  );
}
