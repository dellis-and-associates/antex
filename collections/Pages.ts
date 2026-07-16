import type { CollectionConfig } from "payload";

/**
 * SEO sitemap pages — one doc per URL from the "Antex Pest Solutions full
 * URL workbook" (Full Sitemap sheet, 2,534 rows). Seeded by
 * scripts/seed-pages.ts. The full path is unique; `slug` is the last path
 * segment (empty for the homepage, which stands alone).
 */
export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "path", "pageType", "section", "status"],
    listSearchableFields: ["title", "path", "slug", "city", "county"],
  },
  access: { read: () => true },
  defaultSort: "path",
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "path",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: { description: "Relative URL, e.g. /service-areas/salt-lake-county" },
    },
    {
      name: "fullUrl",
      type: "text",
      required: true,
      admin: { description: "Absolute URL on antexpestsolutions.com" },
    },
    {
      name: "slug",
      type: "text",
      index: true,
      admin: {
        description:
          "Last path segment (the /[slug] part). Empty for the homepage.",
      },
    },
    { name: "section", type: "text", index: true },
    {
      name: "pageType",
      type: "text",
      index: true,
      admin: {
        description:
          "Home, Core Page, Service Page, County Hub, City Hub, City Service Page, Pest Detail Page, …",
      },
    },
    {
      name: "parentPath",
      type: "text",
      index: true,
      admin: { description: "Parent URL from the workbook (breadcrumb parent)" },
    },
    { name: "county", type: "text", index: true },
    { name: "city", type: "text", index: true },
    {
      name: "servicePest",
      type: "text",
      index: true,
      admin: { description: "Service or pest this page targets, if any" },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "Build",
      options: ["Build", "Live"],
    },
    {
      name: "metaDescription",
      type: "textarea",
      admin: { description: "SEO meta description (~150 chars)" },
    },
    { name: "heroHeadline", type: "text" },
    { name: "heroSub", type: "textarea" },
    {
      name: "intro",
      type: "textarea",
      admin: { description: "Opening paragraph under the hero" },
    },
    {
      name: "sections",
      type: "array",
      fields: [
        { name: "heading", type: "text", required: true },
        { name: "body", type: "textarea", required: true },
      ],
    },
    {
      name: "faqs",
      type: "array",
      fields: [
        { name: "question", type: "text", required: true },
        { name: "answer", type: "textarea", required: true },
      ],
    },
  ],
};
