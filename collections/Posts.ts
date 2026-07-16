import type { CollectionConfig } from "payload";

/** Blog posts, rendered at /blog and /blog/[slug]. */
export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "topic", "publishedAt"],
  },
  access: { read: () => true },
  defaultSort: "-publishedAt",
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: { description: "URL path: /blog/<slug> (lowercase, hyphenated)" },
    },
    {
      name: "topic",
      type: "text",
      required: true,
      defaultValue: "Pest control",
      admin: { description: "Shown as the eyebrow label on cards" },
    },
    { name: "publishedAt", type: "date", required: true },
    {
      name: "summary",
      type: "textarea",
      required: true,
      admin: { description: "Card excerpt + meta description" },
    },
    { name: "heroImage", type: "upload", relationTo: "media" },
    { name: "content", type: "richText", required: true },
  ],
};
