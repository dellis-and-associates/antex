import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";

export function SectionHeader({
  eyebrow,
  title,
  children,
  tone = "light",
  as: Heading = "h2",
  className = "",
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  tone?: "light" | "dark";
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={`max-w-[640px] mb-12 ${className}`}>
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <Heading
        className={`font-display text-h2 tracking-[-0.01em] mt-4 mb-3 ${
          tone === "dark" ? "text-white" : "text-ink-950"
        }`}
      >
        {title}
      </Heading>
      {children ? (
        <p className={tone === "dark" ? "text-paper-200" : undefined}>{children}</p>
      ) : null}
    </div>
  );
}
