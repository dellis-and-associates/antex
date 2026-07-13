/**
 * Seed the Payload CMS with the blog posts from lib/blog.ts.
 * Run with: npm run seed   (requires PAYLOAD_DATABASE_URI in .env.local)
 * Idempotent: posts whose slug already exists are skipped.
 */
import { getPayload } from "payload";
import config from "@payload-config";
import { BLOG_POSTS, type BlogBlock } from "../lib/blog";

function textNode(text: string) {
  return {
    type: "text",
    version: 1,
    text,
    detail: 0,
    format: 0,
    mode: "normal",
    style: "",
  };
}

function blockToNode(block: BlogBlock) {
  const base = {
    version: 1,
    children: [textNode(block.text)],
    direction: "ltr" as const,
    format: "" as const,
    indent: 0,
  };
  return block.type === "h2"
    ? { ...base, type: "heading", tag: "h2" }
    : { ...base, type: "paragraph", textFormat: 0, textStyle: "" };
}

function blocksToLexical(blocks: BlogBlock[]) {
  return {
    root: {
      type: "root",
      version: 1,
      children: blocks.map(blockToNode),
      direction: "ltr" as const,
      format: "" as const,
      indent: 0,
    },
  };
}

const payload = await getPayload({ config });

let created = 0;
let skipped = 0;

for (const post of BLOG_POSTS) {
  const existing = await payload.find({
    collection: "posts",
    where: { slug: { equals: post.slug } },
    limit: 1,
  });
  if (existing.docs.length > 0) {
    skipped += 1;
    continue;
  }
  await payload.create({
    collection: "posts",
    data: {
      title: post.title,
      slug: post.slug,
      topic: post.topic,
      publishedAt: post.date,
      summary: post.summary,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      content: blocksToLexical(post.body) as any,
    },
  });
  created += 1;
  payload.logger.info(`created post: ${post.slug}`);
}

payload.logger.info(`Seed complete — ${created} created, ${skipped} skipped.`);
process.exit(0);
