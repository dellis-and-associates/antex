import type { CollectionConfig } from "payload";

/**
 * Leads from the website contact form. Created server-side by
 * app/api/contact — no public API access. SMS consent booleans are
 * persisted for A2P 10DLC compliance; never delete them casually.
 */
export const ContactSubmissions: CollectionConfig = {
  slug: "contact-submissions",
  labels: { singular: "Contact submission", plural: "Contact submissions" },
  admin: {
    useAsTitle: "email",
    defaultColumns: ["firstName", "lastName", "phone", "city", "createdAt"],
    description: "Quote / inspection requests from the website form.",
  },
  access: {
    // Admin users only; the form writes via the local API (server-side).
    create: () => false,
    read: ({ req }) => Boolean(req.user),
    update: () => false,
  },
  fields: [
    {
      type: "row",
      fields: [
        { name: "firstName", type: "text", required: true },
        { name: "lastName", type: "text", required: true },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "phone", type: "text", required: true },
        { name: "email", type: "email", required: true },
      ],
    },
    { name: "street", type: "text", required: true },
    {
      type: "row",
      fields: [
        { name: "city", type: "text", required: true },
        { name: "state", type: "text", required: true },
        { name: "postalCode", type: "text", required: true },
        { name: "country", type: "text", required: true },
      ],
    },
    {
      name: "newCustomer",
      type: "select",
      options: ["Yes", "No"],
      defaultValue: "Yes",
    },
    { name: "message", type: "textarea", required: true },
    { name: "consentTransactional", type: "checkbox", defaultValue: false },
    { name: "consentMarketing", type: "checkbox", defaultValue: false },
  ],
};
