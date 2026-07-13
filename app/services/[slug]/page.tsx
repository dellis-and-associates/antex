import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { SectionHeader } from "@/components/SectionHeader";
import { Step, Steps } from "@/components/Step";
import { TrustBar } from "@/components/TrustBar";
import { CTABand } from "@/components/CTABand";
import { PerimeterFrame } from "@/components/PerimeterFrame";
import { ServiceIcon } from "@/components/icons";
import { getService, SERVICES } from "@/lib/services";
import { GUARANTEE_VERBATIM, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const service = getService(params.slug);
  if (!service) return {};
  return {
    title: { absolute: service.metaTitle },
    description: service.metaDescription,
  };
}

export default function ServicePage({ params }: Props) {
  const service = getService(params.slug);
  if (!service) notFound();

  return (
    <>
      {/* hero */}
      <header className="bg-gradient-to-b from-sand-50 to-[#F4EEE1] pt-16 pb-16">
        <div className="max-w-wrap mx-auto px-8 grid lg:grid-cols-[1.2fr_.8fr] gap-16 items-center">
          <div>
            <Eyebrow>{service.heroEyebrow}</Eyebrow>
            <h1 className="font-display text-display tracking-[-0.01em] text-ink-950 mt-[22px] mb-5 max-w-[18ch]">
              {service.heroTitle}
            </h1>
            <p className="text-[19px] max-w-[52ch]">{service.heroLead}</p>
            <div className="flex flex-wrap gap-4 mt-[34px]">
              <Button href="/contact">Book a free inspection</Button>
              <Button href={PHONE_TEL} variant="secondary">
                Call {PHONE_DISPLAY}
              </Button>
            </div>
          </div>
          <div className="max-lg:hidden">
            <PerimeterFrame className="grid place-items-center py-16">
              <div className="w-[120px] h-[120px] rounded-[28px] bg-pine-100 grid place-items-center text-pine-800">
                <ServiceIcon name={service.icon} className="w-16 h-16" />
              </div>
            </PerimeterFrame>
          </div>
        </div>
      </header>

      <TrustBar />

      {/* what we do */}
      <section className="py-24 max-md:py-[68px]">
        <div className="max-w-wrap mx-auto px-8">
          <SectionHeader eyebrow="What we do" title={`${service.name}, handled properly.`} />
          <div className="grid md:grid-cols-2 gap-[22px]">
            {service.whatWeDo.map((item) => (
              <article
                key={item.title}
                className="bg-white border border-sand-200 rounded-lg px-7 py-[26px]"
              >
                <h3 className="font-body font-semibold text-[19px] text-ink-950 mb-2">
                  {item.title}
                </h3>
                <p className="text-[15px] leading-relaxed">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* process applied to this pest */}
      <section className="bg-pine-800 text-sand-50 py-24 max-md:py-[68px]">
        <div className="max-w-wrap mx-auto px-8">
          <SectionHeader
            eyebrow="How it works"
            title="Inspect. Treat. Protect."
            tone="dark"
          >
            The same disciplined sequence behind every Antex service — applied
            to {service.name.toLowerCase()}.
          </SectionHeader>
          <Steps>
            {service.steps.map((step, i) => (
              <Step key={step.title} num={`STEP 0${i + 1}`} title={step.title}>
                {step.copy}
              </Step>
            ))}
          </Steps>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 max-md:py-[68px]">
        <div className="max-w-[880px] mx-auto px-8">
          <SectionHeader eyebrow="Questions" title="What homeowners ask us" />
          <div className="grid gap-3">
            {service.faqs.map((faq) => (
              <details
                key={faq.q}
                className="group bg-white border border-sand-200 rounded-md px-6 py-1 open:pb-5"
              >
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4 py-4 font-semibold text-ink-950">
                  {faq.q}
                  <span
                    aria-hidden="true"
                    className="text-pine-600 transition-transform duration-150 group-open:rotate-45 text-[22px] leading-none"
                  >
                    +
                  </span>
                </summary>
                <p className="text-[15.5px] leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-8 text-[14.5px] font-mono text-pine-800">
            Our guarantee: {GUARANTEE_VERBATIM}
          </p>
        </div>
      </section>

      <CTABand title={service.ctaTitle} />
    </>
  );
}
