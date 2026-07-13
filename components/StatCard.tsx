import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

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
    <Card className="rounded-md border-paper-200 shadow-none px-6 py-[26px] text-basalt-700">
      <CardContent className="p-0">
        <div className="font-display font-extrabold text-[38px] leading-[1.05] text-red-600">
          {value}
          {suffix ? <small className="text-[20px]">{suffix}</small> : null}
        </div>
        <div className="text-small mt-2">{children}</div>
      </CardContent>
    </Card>
  );
}
