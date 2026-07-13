import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Posts } from "./collections/Posts";
import { ContactSubmissions } from "./collections/ContactSubmissions";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Supabase Storage (S3-compatible) is optional: without creds, media uploads
// land in ./media on disk so local dev works before the bucket exists.
const s3Configured = Boolean(
  process.env.S3_ENDPOINT &&
    process.env.S3_BUCKET &&
    process.env.S3_ACCESS_KEY_ID &&
    process.env.S3_SECRET_ACCESS_KEY
);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: "— Antex Pest Solutions" },
  },
  collections: [Users, Media, Posts, ContactSubmissions],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "insecure-dev-secret-set-PAYLOAD_SECRET",
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  db: postgresAdapter({
    // Supabase transaction-pooler connection string (port 6543).
    pool: { connectionString: process.env.PAYLOAD_DATABASE_URI || "" },
  }),
  sharp,
  plugins: s3Configured
    ? [
        s3Storage({
          collections: { media: true },
          bucket: process.env.S3_BUCKET as string,
          config: {
            endpoint: process.env.S3_ENDPOINT,
            region: process.env.S3_REGION || "us-east-1",
            credentials: {
              accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
              secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
            },
            // Supabase's S3 endpoint requires path-style addressing.
            forcePathStyle: true,
          },
        }),
      ]
    : [],
});
