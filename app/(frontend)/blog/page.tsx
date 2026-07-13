import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/Eyebrow";
import { CTABand } from "@/components/CTABand";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog — Utah Pest Control Field Notes",
  description:
    "Field notes from Antex technicians: rodents, box elder bugs and the pest pressure Utah homeowners actually face — St George to the Wasatch Front.",
};

// Revalidate so posts published in the CMS appear without a redeploy.
export const revalidate = 600;

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <>
      <header className="bg-gradient-to-b from-sand-50 to-[#F4EEE1] pt-16 pb-16">
        <div className="max-w-wrap mx-auto px-8">
          <Eyebrow>Field notes</Eyebrow>
          <h1 className="font-display text-display tracking-[-0.01em] text-ink-950 mt-[22px] mb-5 max-w-[20ch]">
            What Utah&apos;s pests are doing right now.
          </h1>
          <p className="text-[19px] max-w-[52ch]">
            Written by the technicians who inspect these homes every day — no
            scare tactics, just what we&apos;re seeing on the line and what to
            do about it.
          </p>
        </div>
      </header>

      <section className="py-24 max-md:py-[68px]">
        <div className="max-w-[880px] mx-auto px-8">
          <div className="grid gap-[22px]">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-white border border-sand-200 rounded-lg px-8 py-7 max-sm:px-5 transition-shadow hover:shadow-[0_2px_16px_rgba(28,38,32,0.08)]"
              >
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11.5px] tracking-[0.14em] uppercase text-pine-600">
                  <span>{post.topic}</span>
                  <span aria-hidden="true" className="w-[26px] border-t-[1.5px] border-dashed border-[rgba(31,106,71,0.45)]" />
                  <time dateTime={post.date} className="text-basalt-700/70">
                    {post.dateDisplay}
                  </time>
                </div>
                <h2 className="font-display font-bold text-[24px] leading-[1.25] text-ink-950 mt-3 mb-2">
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-[15.5px] leading-relaxed">{post.summary}</p>
                <p className="mt-4">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="font-mono text-[13px] tracking-[0.08em] uppercase text-pine-800 hover:underline"
                  >
                    Read the full note →
                  </Link>
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        eyebrow="Seen something similar?"
        title="Ask a technician, not a search bar."
        copy="Describe what you're finding and we'll tell you what it likely is — and inspect for free if it needs a closer look."
      />
    </>
  );
}
