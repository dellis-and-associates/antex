import type { CollectionConfig } from "payload";

/** Admin users for /admin. The first user is created on first visit to /admin. */
export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: { useAsTitle: "email" },
  fields: [
    { name: "name", type: "text" },
  ],
};
