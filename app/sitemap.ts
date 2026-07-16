import type { MetadataRoute } from "next";
import { SERVICES } from "@/lib/services";
import { SITE_URL } from "@/lib/site";
import { getAllPosts } from "@/lib/posts";
import { getAllCmsPages } from "@/lib/pages";

/** Priority by CMS page type: hubs rank above leaves. */
const TYPE_PRIORITY: Record<string, number> = {
  Home: 1,
  "Core Page": 0.8,
  "Services Hub": 0.9,
  "Service Page": 0.8,
  "Service Areas Hub": 0.9,
  "County Hub": 0.8,
  "City Hub": 0.7,
  "City Service Page": 0.6,
  "Pest Library Hub": 0.8,
  "Pest Category": 0.7,
  "Pest Detail Page": 0.6,
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];
  const seen = new Set<string>();
  const add = (entry: MetadataRoute.Sitemap[number]) => {
    if (seen.has(entry.url)) return;
    seen.add(entry.url);
    entries.push(entry);
  };

  add({ url: SITE_URL, changeFrequency: "monthly", priority: 1 });
  for (const path of ["/services", "/locations", "/contact", "/blog", "/sitemap"]) {
    add({
      url: `${SITE_URL}${path}`,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  for (const s of SERVICES) {
    add({
      url: `${SITE_URL}/services/${s.slug}`,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  const posts = await getAllPosts();
  for (const p of posts) {
    add({
      url: `${SITE_URL}/blog/${p.slug}`,
      changeFrequency: "yearly",
      priority: 0.6,
    });
  }

  // The full CMS page tree: core pages, 65 services, pest library, and the
  // service-areas tree (2,534 URLs total).
  const cmsPages = await getAllCmsPages();
  for (const page of cmsPages) {
    add({
      url: page.path === "/" ? SITE_URL : `${SITE_URL}${page.path}`,
      lastModified: page.updatedAt,
      changeFrequency: "monthly",
      priority: TYPE_PRIORITY[page.pageType ?? ""] ?? 0.5,
    });
  }

  for (const path of ["/privacy-policy", "/terms-and-conditions"]) {
    add({
      url: `${SITE_URL}${path}`,
      changeFrequency: "yearly",
      priority: 0.3,
    });
  }

  return entries;
}
