import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  access: { read: () => true },
  upload: {
    // Local fallback dir; replaced by Supabase Storage when S3 env vars are set.
    staticDir: "media",
    imageSizes: [
      { name: "card", width: 768 },
      { name: "hero", width: 1600 },
    ],
    mimeTypes: ["image/*"],
  },
  fields: [{ name: "alt", type: "text", required: true }],
};
