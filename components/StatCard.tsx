import type { ReactNode } from "react";

export function StatCard({
  value,
  suffix,
  children,
}: {
  value: string;
  suffix?: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-white border border-sand-200 rounded-md px-6 py-[26px]">
      <div className="font-display font-extrabold text-[38px] leading-[1.05] text-pine-600">
        {value}
        {suffix ? <small className="text-[20px]">{suffix}</small> : null}
      </div>
      <div className="text-small mt-2">{children}</div>
    </div>
  );
}
