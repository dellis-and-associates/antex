import type { ReactNode } from "react";

/**
 * The "inspection report" label: semibold body face, uppercase, 0.16em
 * tracking, led by a short dashed perimeter tick (BRAND-GUIDE.md §3, §4).
 */
export function Eyebrow({
  children,
  tone = "light",
  className = "",
}: {
  children: ReactNode;
  /** light = on light surfaces (Juniper), dark = on pine/ink, clay = on clay band */
  tone?: "light" | "dark" | "clay";
  className?: string;
}) {
  const text = {
    light: "text-red-600",
    dark: "text-paper-200",
    clay: "text-[#FBE3D3]",
  }[tone];
  const tick = {
    light: "border-[rgba(228,52,43,0.45)]",
    dark: "border-[rgba(255,255,255,0.4)]",
    clay: "border-[rgba(251,227,211,0.6)]",
  }[tone];
  return (
    <p
      className={`flex items-center gap-[14px] font-mono text-eyebrow uppercase ${text} ${className}`}
    >
      <span
        aria-hidden="true"
        className={`w-[26px] border-t-[1.5px] border-dashed ${tick}`}
      />
      {children}
    </p>
  );
}
