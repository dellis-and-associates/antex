import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { SectionHeader } from "@/components/SectionHeader";
import { TrustBar } from "@/components/TrustBar";
import { CTABand } from "@/components/CTABand";
import {
  getBreadcrumbs,
  getChildPages,
  getPageByPath,
  type CmsPage,
} from "@/lib/pages";
import { PHONE_DISPLAY, PHONE_TEL, SITE_URL } from "@/lib/site";

/**
 * Catch-all renderer for the 2,534-URL CMS page tree: core pages, flat
 * service pages, the pest library, and the service-areas tree. Static
 * routes (/, /services, /contact, /blog…) take precedence automatically.
 */
export const revalidate = 3600;

type Props = { params: Promise<{ slug: string[] }> };

function pathFrom(slug: string[]): string {
  return "/" + slug.map((s) => decodeURIComponent(s)).join("/");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageByPath(pathFrom(slug));
  if (!page) return {};
  return {
    title: page.title,
    description: page.metaDescription ?? undefined,
    alternates: { canonical: `${SITE_URL}${page.path}` },
  };
}

const HUB_TYPES = new Set([
  "Service Areas Hub",
  "County Hub",
  "City Hub",
  "Pest Library Hub",
  "Pest Category",
  "Services Hub",
]);

const CHILD_GRID_LABEL: Record<string, string> = {
  "Service Areas Hub": "Choose your county",
  "County Hub": "Cities we serve",
  "City Hub": "Every service available here",
  "Pest Library Hub": "Browse by category",
  "Pest Category": "Pest profiles",
};

export default async function CmsPage({ params }: Props) {
  const { slug } = await params;
  const path = pathFrom(slug);
  const page = await getPageByPath(path);
  if (!page) notFound();

  const [crumbs, children] = await Promise.all([
    getBreadcrumbs(page),
    HUB_TYPES.has(page.pageType ?? "") ? getChildPages(page.path) : [],
  ]);

  const isCityService = page.pageType === "City Service Page";
  const [siblings, countyCities] = isCityService
    ? await Promise.all([
        getChildPages(page.parentPath ?? ""),
        page.parentPath
          ? getChildPages(page.parentPath.split("/").slice(0, -1).join("/") || "/")
          : [],
      ])
    : [[], []];

  const otherServices = siblings
    .filter((s) => s.path !== page.path)
    .slice(0, 10);
  const nearbyCities = countyCities
    .filter((c) => c.path !== page.parentPath && c.pageType === "City Hub")
    .slice(0, 8);

  const ctaTitle = page.city
    ? `Ready to reclaim your ${page.city} property?`
    : page.servicePest
      ? `Ready to solve your ${page.servicePest.toLowerCase()} problem?`
      : "Ready for a pest-free property?";

  const jsonLd: Record<string, unknown>[] = [];
  if (crumbs.length > 0) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [...crumbs, { title: page.title, path: page.path }].map(
        (c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.title,
          item: `${SITE_URL}${c.path === "/" ? "" : c.path}`,
        })
      ),
    });
  }
  if (page.faqs.length > 0) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    });
  }

  return (
    <>
      {jsonLd.map((node, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
        />
      ))}

      {/* hero */}
      <header className="bg-gradient-to-b from-paper-50 to-[#F4EEE1] pt-12 pb-16">
        <div className="max-w-wrap mx-auto px-8">
          {crumbs.length > 0 ? (
            <nav
              aria-label="Breadcrumb"
              className="font-mono text-[12px] tracking-[0.08em] uppercase text-basalt-700/70 mb-9"
            >
              {crumbs.map((c) => (
                <span key={c.path}>
                  <Link href={c.path} className="hover:text-red-700 hover:underline">
                    {c.title}
                  </Link>
                  <span aria-hidden="true" className="mx-2 text-red-600/60">
                    /
                  </span>
                </span>
              ))}
              <span className="text-ink-950">{page.title}</span>
            </nav>
          ) : null}
          <Eyebrow>{page.section ?? "Antex Pest Solutions"}</Eyebrow>
          <h1 className="font-display text-display tracking-[-0.01em] text-ink-950 mt-[22px] mb-5 max-w-[22ch]">
            {page.heroHeadline ?? page.title}
          </h1>
          {page.heroSub ? (
            <p className="text-[19px] max-w-[58ch]">{page.heroSub}</p>
          ) : null}
          <div className="flex flex-wrap gap-4 mt-[34px]">
            <Button href="/contact">Book a free inspection</Button>
            <Button href={PHONE_TEL} variant="secondary">
              Call {PHONE_DISPLAY}
            </Button>
          </div>
        </div>
      </header>

      <TrustBar />

      {/* intro */}
      {page.intro ? (
        <section className="pt-20 max-md:pt-14">
          <div className="max-w-wrap mx-auto px-8">
            <p className="text-[19px] leading-[1.75] max-w-[68ch] text-basalt-700">
              {page.intro}
            </p>
          </div>
        </section>
      ) : null}

      {/* children grid for hub pages */}
      {children.length > 0 ? (
        <section className="py-20 max-md:py-14">
          <div className="max-w-wrap mx-auto px-8">
            <SectionHeader
              eyebrow="Explore"
              title={CHILD_GRID_LABEL[page.pageType ?? ""] ?? "Explore"}
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[18px]">
              {children.map((child) => (
                <ChildCard key={child.path} page={child} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* content sections */}
      {page.sections.length > 0 ? (
        <section className="py-20 max-md:py-14">
          <div className="max-w-wrap mx-auto px-8">
            <div className="grid md:grid-cols-2 gap-[22px]">
              {page.sections.map((s) => (
                <article
                  key={s.heading}
                  className="bg-white border border-paper-200 rounded-lg px-7 py-[26px]"
                >
                  <h2 className="font-body font-semibold text-[19px] text-ink-950 mb-2">
                    {s.heading}
                  </h2>
                  <p className="text-[15px] leading-relaxed">{s.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* related links for city service pages */}
      {isCityService && (otherServices.length > 0 || nearbyCities.length > 0) ? (
        <section className="bg-ink-900 text-paper-50 py-20 max-md:py-14">
          <div className="max-w-wrap mx-auto px-8">
            {otherServices.length > 0 ? (
              <>
                <SectionHeader
                  eyebrow="More in your area"
                  title={`Other services in ${page.city}`}
                  tone="dark"
                />
                <div className="flex flex-wrap gap-3">
                  {otherServices.map((s) => (
                    <Link
                      key={s.path}
                      href={s.path}
                      className="font-mono text-[13.5px] px-4 py-2 rounded-md border border-[rgba(255,255,255,0.25)] hover:border-red-600 hover:text-white transition-colors"
                    >
                      {s.servicePest ?? s.title}
                    </Link>
                  ))}
                </div>
              </>
            ) : null}
            {nearbyCities.length > 0 ? (
              <div className="mt-12">
                <h2 className="font-mono text-[12px] tracking-[0.2em] uppercase text-paper-200/80 mb-4">
                  {page.servicePest} nearby
                </h2>
                <div className="flex flex-wrap gap-3">
                  {nearbyCities.map((c) => (
                    <Link
                      key={c.path}
                      href={`${c.path}/${page.slug}`}
                      className="font-mono text-[13.5px] px-4 py-2 rounded-md border border-[rgba(255,255,255,0.25)] hover:border-red-600 hover:text-white transition-colors"
                    >
                      {c.city ?? c.title}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* FAQ */}
      {page.faqs.length > 0 ? (
        <section className="py-20 max-md:py-14">
          <div className="max-w-[880px] mx-auto px-8">
            <SectionHeader eyebrow="Questions" title="What people ask us" />
            <div className="grid gap-3">
              {page.faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group bg-white border border-paper-200 rounded-md px-6 py-1 open:pb-5"
                >
                  <summary className="cursor-pointer list-none flex items-center justify-between gap-4 py-4 font-semibold text-ink-950">
                    {faq.question}
                    <span
                      aria-hidden="true"
                      className="text-red-600 transition-transform duration-150 group-open:rotate-45 text-[22px] leading-none"
                    >
                      +
                    </span>
                  </summary>
                  <p className="text-[15.5px] leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CTABand title={ctaTitle} />
    </>
  );
}

function ChildCard({ page }: { page: CmsPage }) {
  const tagline =
    page.pageType === "City Hub"
      ? "27 services available"
      : page.pageType === "County Hub"
        ? "County service area"
        : (page.servicePest ?? page.pageType ?? "");
  return (
    <Link
      href={page.path}
      className="group bg-paper-50 border border-[#E0E0E0] rounded-lg px-7 py-[26px] hover:border-red-600 transition-colors"
    >
      <span className="font-display font-bold text-[20px] leading-snug text-ink-950 group-hover:text-red-700">
        {page.title}
      </span>
      {tagline ? (
        <span className="block font-mono text-[11.5px] tracking-[0.14em] uppercase text-red-600 mt-2">
          {tagline}
        </span>
      ) : null}
    </Link>
  );
}
