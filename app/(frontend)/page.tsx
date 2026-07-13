import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { SectionHeader } from "@/components/SectionHeader";
import { ServiceCard } from "@/components/ServiceCard";
import { Step, Steps } from "@/components/Step";
import { StatCard } from "@/components/StatCard";
import { AreaCard } from "@/components/AreaCard";
import { TrustBar } from "@/components/TrustBar";
import { CTABand } from "@/components/CTABand";
import { PerimeterFrame } from "@/components/PerimeterFrame";
import { HouseScene } from "@/components/HouseScene";
import { CheckIcon } from "@/components/icons";
import { SERVICES } from "@/lib/services";
import { LOCATIONS } from "@/lib/locations";
import { GUARANTEE_SHORT, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Antex Pest Solutions — Pest Control in St George, Vernal & Northern Utah",
  description:
    "Local exterminator and pest control in St George, Vernal & Northern Utah. Ants, rodents, termites, wasps, spiders & scorpions — safe, effective & guaranteed since 2014. Free inspections: (435) 313-5882.",
};

const WHY_POINTS = [
  {
    title: "Root-cause treatment.",
    copy: "We fix the conditions that invite pests — inspection, exclusion and prevention, not just visible symptoms.",
  },
  {
    title: "Faster response.",
    copy: "We schedule quicker than the big franchises — critical for rodents and stinging insects.",
  },
  {
    title: "Less chemical, more precision.",
    copy: "Tailored plans reduce unnecessary product use while improving results.",
  },
  {
    title: "Certified technicians.",
    copy: "Ongoing training keeps our team current on methods, products and safety practice.",
  },
];

export default function Home() {
  return (
    <>
      {/* hero */}
      <header className="bg-gradient-to-b from-sand-50 to-[#F4EEE1] pt-[84px] pb-[90px] overflow-hidden">
        <div className="max-w-wrap mx-auto px-8 grid lg:grid-cols-[1.05fr_.95fr] gap-[72px] items-center">
          <div>
            <Eyebrow>Licensed & local · Utah since 2014</Eyebrow>
            <h1 className="font-display text-display tracking-[-0.01em] text-ink-950 mt-[22px] mb-5">
              Pest protection that{" "}
              <em className="not-italic text-pine-600">holds the line.</em>
            </h1>
            <p className="text-[19px] max-w-[52ch]">
              Antex draws a treated perimeter around your home or business — and
              stands behind it. If pests cross it between visits, we come back
              and fix it at no charge.
            </p>
            <div className="flex flex-wrap gap-4 mt-[34px] mb-[30px]">
              <Button href="/contact">Book a free inspection</Button>
              <Button href={PHONE_TEL} variant="secondary">
                Call {PHONE_DISPLAY}
              </Button>
            </div>
            <div className="flex flex-wrap gap-[26px] text-small">
              {["EPA-registered products", "Safe for kids & pets", "Same-week scheduling"].map(
                (item) => (
                  <span key={item} className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-pine-600" />
                    {item}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="relative">
            <PerimeterFrame>
              <HouseScene />
              <div
                id="guarantee"
                className="absolute -bottom-6 left-[34px] bg-white border border-sand-200 rounded-[14px] shadow-card px-5 py-[14px] flex items-center gap-[13px]"
              >
                <div className="font-display font-extrabold text-[26px] leading-none text-pine-600">
                  100%
                </div>
                <div className="text-[12.5px] leading-[1.35]">
                  <b className="text-ink-950">Re-service guarantee</b>
                  <br />
                  {GUARANTEE_SHORT}
                </div>
              </div>
            </PerimeterFrame>
          </div>
        </div>
      </header>

      <TrustBar />

      {/* services */}
      <section id="services" className="py-24 max-md:py-[68px]">
        <div className="max-w-wrap mx-auto px-8">
          <SectionHeader
            eyebrow="What we handle"
            title="One call covers every pest on the property."
          >
            Complete solutions for insects, rodents and wildlife — inspected,
            treated and prevented by licensed local technicians.
          </SectionHeader>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[22px]">
            {SERVICES.map((s) => (
              <ServiceCard
                key={s.slug}
                icon={s.icon}
                title={s.name}
                copy={s.card}
                href={`/services/${s.slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* process */}
      <section id="process" className="bg-pine-800 text-sand-50 py-24 max-md:py-[68px]">
        <div className="max-w-wrap mx-auto px-8">
          <SectionHeader
            eyebrow="How it works"
            title="Three steps. One held perimeter."
            tone="dark"
          >
            Every service follows the same disciplined sequence — because
            lasting protection is a process, not a spray.
          </SectionHeader>
          <Steps>
            <Step num="STEP 01" title="Inspect">
              A licensed technician walks the full property, identifies the
              species and maps every entry point and harborage.
            </Step>
            <Step num="STEP 02" title="Treat">
              Targeted, EPA-registered products applied where pests actually
              live — tailored to your property, never one-size-fits-all.
            </Step>
            <Step num="STEP 03" title="Protect">
              Scheduled visits keep the barrier sealed. If anything crosses the
              line between visits, we return free of charge.
            </Step>
          </Steps>
        </div>
      </section>

      {/* why / stats */}
      <section id="why" className="py-24 max-md:py-[68px]">
        <div className="max-w-wrap mx-auto px-8 grid lg:grid-cols-2 gap-20 max-lg:gap-[52px] items-start">
          <div>
            <Eyebrow>Why Antex</Eyebrow>
            <h2 className="font-display text-h2 tracking-[-0.01em] text-ink-950 mt-[18px] mb-[14px]">
              Local knowledge big national chains can&apos;t fake.
            </h2>
            <p>
              Founded in St George in 2014 by Jason Ribbens, Antex knows Utah&apos;s
              pests the way only locals can — seasonal rodent surges, native ant
              species, termite risk by neighborhood and building style.
            </p>
            <ul className="mt-[30px] grid gap-[18px] list-none">
              {WHY_POINTS.map((p) => (
                <li key={p.title} className="flex gap-[14px] text-[16px]">
                  <CheckIcon className="flex-none w-[22px] h-[22px] text-pine-600 mt-[3px]" />
                  <span>
                    <b className="text-ink-950">{p.title}</b> {p.copy}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <StatCard value="2014">
              Founded in St George — family-owned and operated ever since
            </StatCard>
            <StatCard value="3">
              Offices across Utah: St George, Vernal & American Fork
            </StatCard>
            <StatCard value="100" suffix="%">
              Free re-service guarantee between scheduled visits
            </StatCard>
            <StatCard value="7" suffix=" days">
              Typical same-week scheduling, even in peak season
            </StatCard>
          </div>
        </div>
      </section>

      {/* areas */}
      <section
        id="areas"
        className="bg-sand-200 border-y border-[#E4D9C3] py-24 max-md:py-[68px]"
      >
        <div className="max-w-wrap mx-auto px-8">
          <SectionHeader
            eyebrow="Service areas"
            title="Three offices. All of Utah's pest pressure covered."
          />
          <div className="grid md:grid-cols-3 gap-[22px]">
            {LOCATIONS.map((l) => (
              <AreaCard
                key={l.slug}
                city={l.city}
                tagline={l.tagline}
                streetAddress={l.streetAddress}
                locality={l.addressLocality}
              />
            ))}
          </div>
        </div>
      </section>

      {/* testimonial */}
      <section className="py-24 max-md:py-[68px]">
        <div className="max-w-[880px] mx-auto px-8 text-center">
          <div className="text-clay-600 text-[20px] tracking-[6px]" aria-label="Five star rating">
            ★★★★★
          </div>
          <blockquote className="font-display font-bold text-[clamp(24px,2.8vw,34px)] leading-[1.3] text-ink-950 mt-[26px] mb-[22px]">
            &ldquo;They found entry points two other companies missed, sealed
            them the same visit, and the mice never came back. When we called
            about wasps in July, they were out in two days.&rdquo;
          </blockquote>
          <cite className="not-italic font-mono text-[13px] tracking-[0.14em] uppercase text-pine-600">
            Homeowner · Washington Fields, St George
          </cite>
        </div>
      </section>

      <CTABand
        eyebrow="Rodent season is here"
        title="Get a free inspection this week."
      />
    </>
  );
}
