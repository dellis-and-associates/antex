import type { Metadata } from "next";
import { Eyebrow } from "@/components/Eyebrow";
import { ServiceCard } from "@/components/ServiceCard";
import { TrustBar } from "@/components/TrustBar";
import { CTABand } from "@/components/CTABand";
import { SERVICES } from "@/lib/services";

export const metadata: Metadata = {
  title: "Pest Control Services | Ants, Rodents, Termites & More",
  description:
    "Every pest on the property, one call: ants, rodents, termites, wasps, spiders & scorpions, plus documented commercial programs. Serving St George, Vernal & Northern Utah.",
};

export default function ServicesPage() {
  return (
    <>
      <header className="bg-gradient-to-b from-paper-50 to-[#F4EEE1] pt-16 pb-16">
        <div className="max-w-wrap mx-auto px-8">
          <Eyebrow>What we handle</Eyebrow>
          <h1 className="font-display text-display tracking-[-0.01em] text-ink-950 mt-[22px] mb-5 max-w-[20ch]">
            One call covers every pest on the property.
          </h1>
          <p className="text-[19px] max-w-[52ch]">
            Complete solutions for insects, rodents and wildlife, inspected,
            treated and prevented by licensed local technicians, and backed by
            our free re-service guarantee.
          </p>
        </div>
      </header>

      <TrustBar />

      <section className="py-24 max-md:py-[68px]">
        <div className="max-w-wrap mx-auto px-8">
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
          <p className="mt-12 max-w-[70ch] text-[15.5px]">
            Also available: seasonal yard treatments for ticks, fleas and
            mosquitoes, humane wildlife removal and exclusion, and
            wood-destroying insect (WDI) inspections for real-estate
            transactions. Mention what you need when you book and we&apos;ll
            build it into your plan.
          </p>
        </div>
      </section>

      <CTABand title="Not sure what's crawling? We'll find it." />
    </>
  );
}
