import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ServiceIcon, type ServiceIconName } from "./icons";

export function ServiceCard({
  icon,
  title,
  copy,
  href,
}: {
  icon: ServiceIconName;
  title: string;
  copy: string;
  href: string;
}) {
  return (
    <Card className="rounded-lg border-paper-200 shadow-none px-7 pt-[30px] pb-[26px] transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:shadow-card hover:border-red-50">
      <CardHeader className="p-0 space-y-0">
        <div className="w-[52px] h-[52px] rounded-[14px] bg-red-50 grid place-items-center mb-5 text-red-700">
          <ServiceIcon name={icon} className="w-7 h-7" />
        </div>
        <CardTitle className="font-body font-semibold text-[21px] leading-snug tracking-normal text-ink-950">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 mt-2 text-basalt-700">
        <p className="text-[15px] leading-relaxed">{copy}</p>
        <Link
          href={href}
          className="inline-flex items-center gap-[7px] mt-4 font-semibold text-[14.5px] text-red-600 hover:text-red-600"
        >
          Learn more <span aria-hidden="true">→</span>
        </Link>
      </CardContent>
    </Card>
  );
}
