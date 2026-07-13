import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { BLOG_POSTS, type BlogBlock, type BlogPost } from "./blog";

/**
 * Unified blog data layer. Posts come from Payload (Supabase Postgres) when
 * PAYLOAD_DATABASE_URI is configured and has content; otherwise the static
 * seeds in lib/blog.ts keep the site fully functional.
 */
export type PostView = {
  slug: string;
  title: string;
  date: string; // ISO
  dateDisplay: string;
  topic: string;
  summary: string;
  /** Lexical editor state — present for CMS posts. */
  content?: SerializedEditorState;
  /** Static blocks — present for seed posts. */
  body?: BlogBlock[];
};

const CMS_ENABLED = Boolean(process.env.PAYLOAD_DATABASE_URI);

async function payloadClient() {
  const { getPayload } = await import("payload");
  const { default: config } = await import("@payload-config");
  return getPayload({ config });
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function docToView(doc: any): PostView {
  return {
    slug: doc.slug,
    title: doc.title,
    date: doc.publishedAt,
    dateDisplay: formatDate(doc.publishedAt),
    topic: doc.topic,
    summary: doc.summary,
    content: doc.content as SerializedEditorState,
  };
}

function seedToView(post: BlogPost): PostView {
  return { ...post };
}

export async function getAllPosts(): Promise<PostView[]> {
  if (CMS_ENABLED) {
    try {
      const payload = await payloadClient();
      const { docs } = await payload.find({
        collection: "posts",
        sort: "-publishedAt",
        limit: 100,
        depth: 0,
      });
      // An empty CMS (before `npm run seed`) falls through to the seeds so
      // the blog never renders blank.
      if (docs.length > 0) return docs.map(docToView);
    } catch (err) {
      console.error("[blog] CMS fetch failed; serving seed posts:", err);
    }
  }
  return BLOG_POSTS.map(seedToView);
}

export async function getPost(slug: string): Promise<PostView | undefined> {
  if (CMS_ENABLED) {
    try {
      const payload = await payloadClient();
      const { docs } = await payload.find({
        collection: "posts",
        where: { slug: { equals: slug } },
        limit: 1,
        depth: 0,
      });
      if (docs[0]) return docToView(docs[0]);
    } catch (err) {
      console.error("[blog] CMS fetch failed; serving seed post:", err);
    }
  }
  const seed = BLOG_POSTS.find((p) => p.slug === slug);
  return seed ? seedToView(seed) : undefined;
}
