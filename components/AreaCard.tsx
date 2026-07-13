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
    <div className="bg-sand-50 border border-[#E4D9C3] rounded-lg px-7 py-[30px]">
      <div className="font-display font-bold text-[24px] text-ink-950">
        {city}
      </div>
      <div className="font-mono text-[11.5px] tracking-[0.14em] uppercase text-pine-600 mt-1.5 mb-4">
        {tagline}
      </div>
      <p className="text-[15px] leading-[1.7]">
        {streetAddress}
        <br />
        {locality}, UT
      </p>
      {children}
      <a
        className="inline-block mt-[14px] font-mono text-[14px] text-pine-800 perimeter-underline"
        href={PHONE_TEL}
      >
        {PHONE_DISPLAY}
      </a>
    </div>
  );
}
