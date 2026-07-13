import type { Metadata } from "next";
import { Eyebrow } from "@/components/Eyebrow";
import { SectionHeader } from "@/components/SectionHeader";
import { TrustBar } from "@/components/TrustBar";
import { CTABand } from "@/components/CTABand";
import { LOCATIONS } from "@/lib/locations";
import { COUNTIES_SERVED, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Locations — St George, Vernal & Northern Utah",
  description:
    "Antex Pest Solutions offices in St George, Vernal and American Fork, serving 13 Utah counties. Local exterminators, one number: (435) 313-5882.",
};

export default function LocationsPage() {
  return (
    <>
      <header className="bg-gradient-to-b from-sand-50 to-[#F4EEE1] pt-16 pb-16">
        <div className="max-w-wrap mx-auto px-8">
          <Eyebrow>Service areas</Eyebrow>
          <h1 className="font-display text-display tracking-[-0.01em] text-ink-950 mt-[22px] mb-5 max-w-[20ch]">
            Three offices. All of Utah&apos;s pest pressure covered.
          </h1>
          <p className="text-[19px] max-w-[52ch]">
            From red-rock country to the Uinta Basin to the Wasatch Front —
            local technicians who know the pests on your street, reachable at
            one number:{" "}
            <a href={PHONE_TEL} className="font-mono text-[17px] text-pine-800 perimeter-underline whitespace-nowrap">
              {PHONE_DISPLAY}
            </a>
            .
          </p>
        </div>
      </header>

      <TrustBar />

      <section className="py-24 max-md:py-[68px]">
        <div className="max-w-wrap mx-auto px-8 grid gap-16">
          {LOCATIONS.map((l, i) => (
            <article
              key={l.slug}
              className="grid lg:grid-cols-2 gap-10 items-center"
            >
              <div className={i % 2 === 1 ? "lg:order-2" : undefined}>
                <div className="font-mono text-[11.5px] tracking-[0.14em] uppercase text-pine-600">
                  {l.tagline}
                </div>
                <h2 className="font-display text-h2 tracking-[-0.01em] text-ink-950 mt-2 mb-3">
                  {l.city}
                </h2>
                <p className="max-w-[52ch]">{l.regionCopy}</p>
                <address className="not-italic mt-6 text-[15.5px]">
                  <strong className="text-ink-950">
                    {l.streetAddress}, {l.addressLocality}, UT
                  </strong>
                  <br />
                  <a
                    href={PHONE_TEL}
                    className="inline-block mt-2 font-mono text-[14px] text-pine-800 perimeter-underline"
                  >
                    {PHONE_DISPLAY}
                  </a>
                </address>
              </div>
              {/* TODO: replace with a real Google Maps embed per office */}
              <div
                className={`perimeter-line rounded-lg bg-pine-100/40 min-h-[260px] grid place-items-center ${
                  i % 2 === 1 ? "lg:order-1" : ""
                }`}
                role="img"
                aria-label={`Map of the Antex ${l.city} office at ${l.streetAddress}, ${l.addressLocality}, UT — embed coming soon`}
              >
                <div className="text-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-10 h-10 mx-auto text-pine-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Z" />
                    <circle cx="12" cy="10" r="2.6" />
                  </svg>
                  <p className="font-mono text-[12px] tracking-[0.14em] uppercase text-pine-800 mt-3">
                    Map — {l.addressLocality}, UT
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-sand-200 border-y border-[#E4D9C3] py-24 max-md:py-[68px]">
        <div className="max-w-wrap mx-auto px-8">
          <SectionHeader eyebrow="Coverage" title="Serving 13 Utah counties.">
            Wherever you are along the line, the same guarantee applies: if
            pests return between scheduled visits, so do we — free.
          </SectionHeader>
          <ul className="flex flex-wrap gap-3 list-none">
            {COUNTIES_SERVED.map((county) => (
              <li
                key={county}
                className="bg-sand-50 border border-[#E4D9C3] rounded-pill px-5 py-2 font-mono text-[12.5px] tracking-[0.1em] uppercase text-pine-800"
              >
                {county}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTABand title="Find out if we cover your street. (We do.)" />
    </>
  );
}
