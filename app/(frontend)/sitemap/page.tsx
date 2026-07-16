import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/Eyebrow";
import { SectionHeader } from "@/components/SectionHeader";
import { StatCard } from "@/components/StatCard";
import { CTABand } from "@/components/CTABand";
import { getAllCmsPages, type CmsPage } from "@/lib/pages";
import { getAllPosts } from "@/lib/posts";
import { SERVICES } from "@/lib/services";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Site Directory",
  description:
    "Every page on antexpestsolutions.com in one place: services, pest library, and all 86 Utah cities we serve, county by county.",
  alternates: { canonical: `${SITE_URL}/sitemap` },
};

export default async function SiteDirectoryPage() {
  const [pages, posts] = await Promise.all([getAllCmsPages(), getAllPosts()]);

  const byType = (t: string) => pages.filter((p) => p.pageType === t);
  const core = pages.filter(
    (p) => ["Home", "Core Page"].includes(p.pageType ?? "") && p.path !== "/"
  );
  const services = byType("Service Page");
  const categories = byType("Pest Category");
  const pests = byType("Pest Detail Page");
  const counties = byType("County Hub");
  const cities = byType("City Hub");
  const cityServices = byType("City Service Page");

  const citiesByCounty = new Map<string, CmsPage[]>();
  for (const c of cities) {
    const key = c.county ?? "Other";
    citiesByCounty.set(key, [...(citiesByCounty.get(key) ?? []), c]);
  }
  const servicesByCityPath = new Map<string, CmsPage[]>();
  for (const s of cityServices) {
    const key = s.parentPath ?? "";
    servicesByCityPath.set(key, [...(servicesByCityPath.get(key) ?? []), s]);
  }
  const pestsByCategoryPath = new Map<string, CmsPage[]>();
  for (const p of pests) {
    const key = p.parentPath ?? "";
    pestsByCategoryPath.set(key, [...(pestsByCategoryPath.get(key) ?? []), p]);
  }

  const total = pages.length + posts.length + 4; // + blog hub, locations, legal x2

  return (
    <>
      {/* hero */}
      <header className="bg-gradient-to-b from-paper-50 to-[#F4EEE1] pt-16 pb-16">
        <div className="max-w-wrap mx-auto px-8">
          <Eyebrow>Site directory</Eyebrow>
          <h1 className="font-display text-display tracking-[-0.01em] text-ink-950 mt-[22px] mb-5 max-w-[20ch]">
            Every page. One map.
          </h1>
          <p className="text-[19px] max-w-[58ch]">
            The complete Antex Pest Solutions site: every service, every pest
            profile, and every Utah city we protect, laid out county by county.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-[14px] mt-12">
            <StatCard value={String(total.toLocaleString())}>
              pages on this site
            </StatCard>
            <StatCard value={String(counties.length)}>Utah counties</StatCard>
            <StatCard value={String(cities.length)}>cities served</StatCard>
            <StatCard value={String(services.length)}>services</StatCard>
            <StatCard value={String(pests.length)}>pest profiles</StatCard>
          </div>
        </div>
      </header>

      {/* core pages */}
      <section className="py-20 max-md:py-14">
        <div className="max-w-wrap mx-auto px-8">
          <SectionHeader eyebrow="The essentials" title="Company & help" />
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-3 list-none">
            <DirLink href="/" label="Home" />
            {core.map((p) => (
              <DirLink key={p.path} href={p.path} label={p.title} />
            ))}
            <DirLink href="/locations" label="Our Locations" />
            <DirLink href="/blog" label="Blog" />
            <DirLink href="/privacy-policy" label="Privacy Policy" />
            <DirLink href="/terms-and-conditions" label="Terms & Conditions" />
          </ul>
        </div>
      </section>

      {/* services */}
      <section className="bg-paper-50 border-y border-paper-200 py-20 max-md:py-14">
        <div className="max-w-wrap mx-auto px-8">
          <SectionHeader eyebrow={`${services.length} services`} title="Pest control services">
            Flat-priced, guaranteed, and available across our entire Utah
            service area.
          </SectionHeader>
          <ul className="columns-2 md:columns-3 lg:columns-4 gap-8 list-none [&>li]:mb-3">
            <DirLink href="/services" label="All services" strong />
            {services.map((p) => (
              <DirLink key={p.path} href={p.path} label={p.servicePest ?? p.title} />
            ))}
          </ul>
          <p className="font-mono text-[12.5px] text-basalt-700/70 mt-8">
            Featured guides:{" "}
            {SERVICES.map((s, i) => (
              <span key={s.slug}>
                {i > 0 ? " · " : ""}
                <Link href={`/services/${s.slug}`} className="text-red-700 hover:underline">
                  {s.shortName}
                </Link>
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* pest library */}
      <section className="py-20 max-md:py-14">
        <div className="max-w-wrap mx-auto px-8">
          <SectionHeader eyebrow={`${pests.length} profiles`} title="Pest library">
            Identification guides for everything that crawls, flies, or
            burrows its way onto Utah properties.
          </SectionHeader>
          <p className="mb-8 -mt-6">
            <Link href="/pest-library" className="font-mono text-[14px] text-red-700 perimeter-underline">
              Browse the full pest library
            </Link>
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[22px]">
            {categories.map((cat) => (
              <article
                key={cat.path}
                className="bg-white border border-paper-200 rounded-lg px-7 py-[26px]"
              >
                <h3 className="font-display font-bold text-[20px] text-ink-950 mb-4">
                  <Link href={cat.path} className="hover:text-red-700">
                    {cat.title}
                  </Link>
                </h3>
                <ul className="grid gap-2 list-none">
                  {(pestsByCategoryPath.get(cat.path) ?? []).map((p) => (
                    <DirLink key={p.path} href={p.path} label={p.title} small />
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* service areas */}
      <section className="bg-ink-900 text-paper-50 py-20 max-md:py-14">
        <div className="max-w-wrap mx-auto px-8">
          <SectionHeader
            eyebrow={`${cityServices.length.toLocaleString()} local pages`}
            title="Service areas, county by county"
            tone="dark"
          >
            Open a county to see its cities; open a city to see every service
            we offer there.{" "}
            <Link href="/service-areas" className="text-white underline hover:text-red-600">
              Or start from the service areas hub.
            </Link>
          </SectionHeader>
          <div className="grid gap-4">
            {counties.map((county) => {
              const countyCities = citiesByCounty.get(county.county ?? "") ?? [];
              return (
                <details
                  key={county.path}
                  className="group border border-[rgba(255,255,255,0.2)] rounded-lg px-6 py-1 open:pb-6"
                >
                  <summary className="cursor-pointer list-none flex items-center justify-between gap-4 py-4">
                    <span className="font-display font-bold text-[21px]">
                      {county.title}
                    </span>
                    <span className="font-mono text-[12px] tracking-[0.14em] uppercase text-paper-200/70">
                      {countyCities.length} cities
                      <span
                        aria-hidden="true"
                        className="text-red-600 ml-4 inline-block transition-transform duration-150 group-open:rotate-45 text-[20px] leading-none align-middle"
                      >
                        +
                      </span>
                    </span>
                  </summary>
                  <p className="mb-4 -mt-1">
                    <Link
                      href={county.path}
                      className="font-mono text-[13px] text-red-600 hover:underline"
                    >
                      Visit the {county.title} page
                    </Link>
                  </p>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {countyCities.map((city) => (
                      <details
                        key={city.path}
                        className="rounded-md bg-[rgba(255,255,255,0.05)] px-4 py-1"
                      >
                        <summary className="cursor-pointer list-none flex items-center justify-between gap-2 py-3">
                          <span className="font-semibold text-[15.5px]">
                            {city.city ?? city.title}
                          </span>
                          <span className="font-mono text-[11px] text-paper-200/60 uppercase tracking-[0.1em]">
                            {(servicesByCityPath.get(city.path) ?? []).length}{" "}
                            services
                          </span>
                        </summary>
                        <ul className="grid gap-1.5 pb-4 list-none">
                          <li>
                            <Link
                              href={city.path}
                              className="text-[13.5px] text-red-600 hover:underline"
                            >
                              {city.city ?? city.title} overview
                            </Link>
                          </li>
                          {(servicesByCityPath.get(city.path) ?? []).map((s) => (
                            <li key={s.path}>
                              <Link
                                href={s.path}
                                className="text-[13.5px] text-paper-200/85 hover:text-white hover:underline"
                              >
                                {s.servicePest ?? s.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </details>
                    ))}
                  </div>
                </details>
              );
            })}
          </div>
        </div>
      </section>

      {/* blog */}
      <section className="py-20 max-md:py-14">
        <div className="max-w-wrap mx-auto px-8">
          <SectionHeader eyebrow="From the blog" title="Latest articles" />
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 list-none">
            {posts.map((p) => (
              <DirLink key={p.slug} href={`/blog/${p.slug}`} label={p.title} />
            ))}
          </ul>
        </div>
      </section>

      <CTABand title="Found what you were looking for?" />
    </>
  );
}

function DirLink({
  href,
  label,
  small = false,
  strong = false,
}: {
  href: string;
  label: string;
  small?: boolean;
  strong?: boolean;
}) {
  return (
    <li className="break-inside-avoid">
      <Link
        href={href}
        className={`${small ? "text-[14px]" : "text-[15.5px]"} ${
          strong ? "font-semibold text-red-700" : "text-basalt-700"
        } hover:text-red-700 hover:underline leading-snug`}
      >
        {label}
      </Link>
    </li>
  );
}
