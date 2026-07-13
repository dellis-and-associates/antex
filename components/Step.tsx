import type { ReactNode } from "react";

/**
 * One step in the Inspect → Treat → Protect band. Rendered inside <Steps>,
 * which draws the shared dashed perimeter around the group.
 */
export function Step({
  num,
  title,
  children,
}: {
  num: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="px-[34px] py-[38px] border-[rgba(220,237,226,0.35)] [border-style:dashed] border-0 max-md:[&:not(:first-child)]:border-t-[1.5px] md:[&:not(:first-child)]:border-l-[1.5px]">
      <div className="font-mono text-[13px] tracking-[0.2em] text-clay-600">
        {num}
      </div>
      <h3 className="font-body font-semibold text-[23px] text-white mt-[14px] mb-[10px]">
        {title}
      </h3>
      <p className="text-pine-100 text-[15.5px]">{children}</p>
    </div>
  );
}

export function Steps({ children }: { children: ReactNode }) {
  return (
    <div className="grid md:grid-cols-3 perimeter-line-dark rounded-lg">
      {children}
    </div>
  );
}
