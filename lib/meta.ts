import type { Metadata } from "next";
import { SITE_URL } from "./site";

/**
 * Shared social-card image (public/og.png, 1200x630, brand lockup).
 * Referenced relative to metadataBase so it resolves to the full URL.
 */
export const OG_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "Antex Pest Solutions. Pest control in St George, Vernal & Northern Utah.",
};

type PageMetaOptions = {
  /** Plain page title; also used for og:title and twitter:title. */
  title: string;
  /**
   * When true the <title> skips the "| Antex Pest Solutions" template
   * (for titles that already carry the brand).
   */
  absolute?: boolean;
  description: string;
  /** Site-relative path ("/contact") used for the canonical + og:url. */
  path: string;
  ogType?: "website" | "article";
};

/**
 * Builds the full Metadata object for a page: title/description,
 * canonical URL, and matching OpenGraph + Twitter cards. Next.js does
 * NOT deep-merge `openGraph` with the layout's, so every page that
 * wants correct og:title/og:url must set the whole block; this keeps
 * that in one place.
 */
export function pageMeta({
  title,
  absolute = false,
  description,
  path,
  ogType = "website",
}: PageMetaOptions): Metadata {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: ogType,
      siteName: "Antex Pest Solutions",
      url,
      title,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
