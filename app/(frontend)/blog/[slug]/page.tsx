import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { CTABand } from "@/components/CTABand";
import { BLOG_POSTS } from "@/lib/blog";
import { getPost } from "@/lib/posts";

type Args = { params: Promise<{ slug: string }> };

// Revalidate so CMS edits appear without a redeploy; CMS-only slugs are
// rendered on demand (dynamicParams defaults to true).
export const revalidate = 600;

export function generateStaticParams() {
  return BLOG_POSTS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    openGraph: { title: post.title, description: post.summary, type: "article" },
  };
}

export default async function BlogPostPage({ params }: Args) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <>
      <header className="bg-gradient-to-b from-paper-50 to-[#F4EEE1] pt-14 pb-14">
        <div className="max-w-[760px] mx-auto px-8">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11.5px] tracking-[0.14em] uppercase text-red-600">
            <Link href="/blog" className="hover:underline">
              Field notes
            </Link>
            <span aria-hidden="true" className="w-[26px] border-t-[1.5px] border-dashed border-[rgba(228,52,43,0.45)]" />
            <span>{post.topic}</span>
            <span aria-hidden="true" className="w-[26px] border-t-[1.5px] border-dashed border-[rgba(228,52,43,0.45)]" />
            <time dateTime={post.date} className="text-basalt-700/70">
              {post.dateDisplay}
            </time>
          </div>
          <h1 className="font-display font-bold text-[38px] max-sm:text-[30px] leading-[1.15] tracking-[-0.01em] text-ink-950 mt-5 mb-4">
            {post.title}
          </h1>
          <p className="text-[18px] leading-relaxed text-basalt-700">
            {post.summary}
          </p>
        </div>
      </header>

      <article className="py-20 max-md:py-14">
        <div className="max-w-[760px] mx-auto px-8 article-prose">
          {post.content ? (
            <RichText data={post.content} />
          ) : (
            post.body?.map((block, i) =>
              block.type === "h2" ? (
                <h2 key={i}>{block.text}</h2>
              ) : (
                <p key={i}>{block.text}</p>
              )
            )
          )}
        </div>
      </article>

      <CTABand
        eyebrow="Seeing this at home?"
        title="Get a free inspection from a local technician."
        copy="Tell us what you're finding and we'll trace it to the source: entry points, harborage and all. Guaranteed."
      />
    </>
  );
}
