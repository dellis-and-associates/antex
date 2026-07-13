import type { MetadataRoute } from "next";
import { SERVICES } from "@/lib/services";
import { SITE_URL } from "@/lib/site";
import { getAllPosts } from "@/lib/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["", "/services", "/locations", "/contact", "/blog"].map(
    (path) => ({
      url: `${SITE_URL}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    })
  );

  const serviceRoutes = SERVICES.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const posts = await getAllPosts();
  const blogRoutes = posts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  const legalRoutes = ["/privacy-policy", "/terms-and-conditions"].map(
    (path) => ({
      url: `${SITE_URL}${path}`,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })
  );

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes, ...legalRoutes];
}
