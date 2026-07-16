import { cache } from "react";

/**
 * Data layer for the CMS `pages` collection: the 2,534-URL SEO architecture
 * (core pages, 65 services, pest library, and the service-areas tree of
 * counties, cities, and city-service pages). Rendered by
 * app/(frontend)/[...slug]/page.tsx.
 */
export type CmsPageSection = { heading: string; body: string };
export type CmsPageFaq = { question: string; answer: string };

export type CmsPage = {
  id: number | string;
  title: string;
  path: string;
  fullUrl: string;
  slug: string | null;
  section: string | null;
  pageType: string | null;
  parentPath: string | null;
  county: string | null;
  city: string | null;
  servicePest: string | null;
  status: string;
  metaDescription: string | null;
  heroHeadline: string | null;
  heroSub: string | null;
  intro: string | null;
  sections: CmsPageSection[];
  faqs: CmsPageFaq[];
  updatedAt: string;
};

const CMS_ENABLED = Boolean(process.env.PAYLOAD_DATABASE_URI);

async function payloadClient() {
  const { getPayload } = await import("payload");
  const { default: config } = await import("@payload-config");
  return getPayload({ config });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function docToPage(doc: any): CmsPage {
  return {
    id: doc.id,
    title: doc.title,
    path: doc.path,
    fullUrl: doc.fullUrl,
    slug: doc.slug ?? null,
    section: doc.section ?? null,
    pageType: doc.pageType ?? null,
    parentPath: doc.parentPath ?? null,
    county: doc.county ?? null,
    city: doc.city ?? null,
    servicePest: doc.servicePest ?? null,
    status: doc.status,
    metaDescription: doc.metaDescription ?? null,
    heroHeadline: doc.heroHeadline ?? null,
    heroSub: doc.heroSub ?? null,
    intro: doc.intro ?? null,
    sections: (doc.sections ?? []).map(
      (s: { heading: string; body: string }) => ({
        heading: s.heading,
        body: s.body,
      })
    ),
    faqs: (doc.faqs ?? []).map(
      (f: { question: string; answer: string }) => ({
        question: f.question,
        answer: f.answer,
      })
    ),
    updatedAt: doc.updatedAt,
  };
}

export const getPageByPath = cache(
  async (path: string): Promise<CmsPage | null> => {
    if (!CMS_ENABLED) return null;
    try {
      const payload = await payloadClient();
      const { docs } = await payload.find({
        collection: "pages",
        where: { path: { equals: path } },
        limit: 1,
        depth: 0,
      });
      return docs[0] ? docToPage(docs[0]) : null;
    } catch (err) {
      console.error(`[pages] fetch failed for ${path}:`, err);
      return null;
    }
  }
);

/** Direct children in the URL tree (e.g. a county hub's city hubs). */
export const getChildPages = cache(
  async (parentPath: string): Promise<CmsPage[]> => {
    if (!CMS_ENABLED) return [];
    try {
      const payload = await payloadClient();
      const { docs } = await payload.find({
        collection: "pages",
        where: { parentPath: { equals: parentPath } },
        limit: 200,
        sort: "title",
        depth: 0,
      });
      return docs.map(docToPage);
    } catch (err) {
      console.error(`[pages] children fetch failed for ${parentPath}:`, err);
      return [];
    }
  }
);

/** Every page, for sitemap.xml and the /sitemap directory. Light fields only. */
export const getAllCmsPages = cache(async (): Promise<CmsPage[]> => {
  if (!CMS_ENABLED) return [];
  try {
    const payload = await payloadClient();
    const all: CmsPage[] = [];
    let page = 1;
    for (;;) {
      const res = await payload.find({
        collection: "pages",
        limit: 1000,
        page,
        sort: "path",
        depth: 0,
        select: {
          title: true,
          path: true,
          fullUrl: true,
          slug: true,
          section: true,
          pageType: true,
          parentPath: true,
          county: true,
          city: true,
          servicePest: true,
          status: true,
          updatedAt: true,
        },
      });
      all.push(...res.docs.map(docToPage));
      if (!res.hasNextPage) break;
      page += 1;
    }
    return all;
  } catch (err) {
    console.error("[pages] full fetch failed:", err);
    return [];
  }
});

/** Ancestor chain for breadcrumbs, root first, excluding the page itself. */
export const getBreadcrumbs = cache(
  async (page: CmsPage): Promise<{ title: string; path: string }[]> => {
    const prefixes: string[] = [];
    const segs = page.path.split("/").filter(Boolean);
    for (let i = 1; i < segs.length; i++) {
      prefixes.push("/" + segs.slice(0, i).join("/"));
    }
    if (prefixes.length === 0) return [];
    if (!CMS_ENABLED) return [];
    try {
      const payload = await payloadClient();
      const { docs } = await payload.find({
        collection: "pages",
        where: { path: { in: prefixes } },
        limit: prefixes.length,
        depth: 0,
        select: { title: true, path: true },
      });
      const byPath = new Map(docs.map((d) => [d.path, d.title as string]));
      return prefixes
        .filter((p) => byPath.has(p))
        .map((p) => ({ title: byPath.get(p) as string, path: p }));
    } catch {
      return [];
    }
  }
);
