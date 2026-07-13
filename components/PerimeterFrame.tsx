import type { ReactNode } from "react";

/**
 * The signature motif: a dashed perimeter border with four solid corner
 * ticks — "the treated barrier we maintain" (BRAND-GUIDE.md §4).
 * This is the only decorative device in the system.
 */
export function PerimeterFrame({
  children,
  className = "",
  padded = true,
}: {
  children: ReactNode;
  className?: string;
  padded?: boolean;
}) {
  const corner = "absolute w-[14px] h-[14px] border-pine-600";
  return (
    <div
      className={`relative rounded-lg perimeter-line bg-white/35 ${
        padded ? "p-[26px]" : ""
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className={`${corner} -top-0.5 -left-0.5 border-t-[2.5px] border-l-[2.5px] rounded-tl-sm`}
      />
      <span
        aria-hidden="true"
        className={`${corner} -top-0.5 -right-0.5 border-t-[2.5px] border-r-[2.5px] rounded-tr-sm`}
      />
      <span
        aria-hidden="true"
        className={`${corner} -bottom-0.5 -left-0.5 border-b-[2.5px] border-l-[2.5px] rounded-bl-sm`}
      />
      <span
        aria-hidden="true"
        className={`${corner} -bottom-0.5 -right-0.5 border-b-[2.5px] border-r-[2.5px] rounded-br-sm`}
      />
      {children}
    </div>
  );
}
