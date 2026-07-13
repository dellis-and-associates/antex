import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

export function AreaCard({
  city,
  tagline,
  streetAddress,
  locality,
  children,
}: {
  city: string;
  tagline: string;
  streetAddress: string;
  locality: string;
  children?: React.ReactNode;
}) {
  return (
    <Card className="rounded-lg bg-paper-50 border-[#E0E0E0] shadow-none px-7 py-[30px] text-basalt-700">
      <CardHeader className="p-0 space-y-0">
        <CardTitle className="font-display font-bold text-[24px] leading-normal tracking-normal text-ink-950">
          {city}
        </CardTitle>
        <div className="font-mono text-[11.5px] tracking-[0.14em] uppercase text-red-600 mt-1.5">
          {tagline}
        </div>
      </CardHeader>
      <CardContent className="p-0 mt-4">
        <p className="text-[15px] leading-[1.7]">
          {streetAddress}
          <br />
          {locality}, UT
        </p>
        {children}
        <a
          className="inline-block mt-[14px] font-mono text-[14px] text-red-700 perimeter-underline"
          href={PHONE_TEL}
        >
          {PHONE_DISPLAY}
        </a>
      </CardContent>
    </Card>
  );
}
