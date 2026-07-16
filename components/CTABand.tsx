import { Button } from "./Button";
import { Eyebrow } from "./Eyebrow";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

/**
 * The Canyon Clay call-to-action band. Clay is reserved for CTAs — this band
 * and buttons are the only large clay usage allowed (BRAND-GUIDE.md §2).
 */
export function CTABand({
  eyebrow = "Free inspections",
  title,
  copy = "Tell us what you're seeing and a member of our team will be in touch shortly to schedule your visit.",
}: {
  eyebrow?: string;
  title: string;
  copy?: string;
}) {
  return (
    <section className="bg-red-600 py-[76px]">
      <div className="max-w-wrap mx-auto px-8 flex flex-wrap items-center justify-between gap-10">
        <div>
          <Eyebrow tone="clay">{eyebrow}</Eyebrow>
          <h2 className="font-display text-h2 tracking-[-0.01em] text-white max-w-[18ch] mt-4">
            {title}
          </h2>
          <p className="text-[#FBE3D3] mt-3 max-w-[46ch]">{copy}</p>
        </div>
        <div>
          <Button href="/contact" variant="dark">
            Book a free inspection
          </Button>
          <a
            className="block mt-4 font-mono text-[15px] text-white hover:underline"
            href={PHONE_TEL}
          >
            or call {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </section>
  );
}
