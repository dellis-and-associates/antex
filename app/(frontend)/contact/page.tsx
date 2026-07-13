import type { Metadata } from "next";
import { Eyebrow } from "@/components/Eyebrow";
import { ContactForm } from "@/components/ContactForm";
import { CheckIcon } from "@/components/icons";
import { LOCATIONS } from "@/lib/locations";
import {
  EPA_CLAIM_VERBATIM,
  GUARANTEE_VERBATIM,
  PHONE_DISPLAY,
  PHONE_TEL,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Get a Free Pest Inspection — Contact Antex",
  description:
    "Book a free pest inspection in St George, Vernal or Northern Utah. Tell us what you're seeing and we'll schedule your visit — or call (435) 313-5882.",
};

export default function ContactPage() {
  return (
    <section className="py-16 max-md:py-12">
      <div className="max-w-wrap mx-auto px-8 grid lg:grid-cols-[.85fr_1.15fr] gap-16 items-start">
        <div>
          <Eyebrow>Free inspection</Eyebrow>
          <h1 className="font-display text-display tracking-[-0.01em] text-ink-950 mt-[22px] mb-5">
            Tell us what you&apos;re seeing.
          </h1>
          <p className="text-[19px] max-w-[48ch]">
            A member of our team will be in touch shortly to schedule your free
            inspection — usually the same week.
          </p>
          <a
            href={PHONE_TEL}
            className="inline-block mt-6 font-mono text-[17px] text-pine-800 perimeter-underline"
          >
            Prefer to talk? {PHONE_DISPLAY}
          </a>

          <ul className="mt-10 grid gap-4 list-none text-[15.5px]">
            <li className="flex gap-3">
              <CheckIcon className="flex-none w-5 h-5 text-pine-600 mt-1" />
              <span>{GUARANTEE_VERBATIM}</span>
            </li>
            <li className="flex gap-3">
              <CheckIcon className="flex-none w-5 h-5 text-pine-600 mt-1" />
              <span>{EPA_CLAIM_VERBATIM}</span>
            </li>
          </ul>

          <div className="mt-10 border-t border-dashed border-[rgba(31,106,71,0.45)] pt-8 grid gap-3 text-[14.5px]">
            {LOCATIONS.map((l) => (
              <p key={l.slug}>
                <strong className="text-ink-950">{l.city}</strong> —{" "}
                {l.streetAddress}, {l.addressLocality}, UT
              </p>
            ))}
          </div>
        </div>

        <div className="bg-sand-200/60 border border-sand-200 rounded-lg p-8 max-sm:p-5">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
