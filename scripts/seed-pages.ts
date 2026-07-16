/**
 * Seed the `pages` collection from scripts/sitemap-pages.json — the
 * "Full Sitemap" sheet of "Antex Pest Solutions full URL workbook.xlsx"
 * (2,534 URLs). Run with: npm run seed:pages
 * Idempotent: pages whose path already exists are skipped.
 */
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getPayload } from "payload";
import config from "@payload-config";
import { SITE_URL } from "../lib/site";

type SitemapRow = {
  section: string | null;
  pageType: string | null;
  title: string | null;
  url: string;
  parentUrl: string | null;
  county: string | null;
  city: string | null;
  servicePest: string | null;
  status: string | null;
  slug: string;
};

const dirname = path.dirname(fileURLToPath(import.meta.url));
const rows: SitemapRow[] = JSON.parse(
  readFileSync(path.resolve(dirname, "sitemap-pages.json"), "utf8")
);

const payload = await getPayload({ config });

// Collect paths already seeded so re-runs only create what's missing.
const existing = new Set<string>();
let page = 1;
for (;;) {
  const res = await payload.find({
    collection: "pages",
    limit: 500,
    page,
    depth: 0,
    select: { path: true },
  });
  for (const doc of res.docs) existing.add(doc.path);
  if (!res.hasNextPage) break;
  page += 1;
}
console.log(`Workbook rows: ${rows.length} — already in Payload: ${existing.size}`);

const toCreate = rows.filter((r) => !existing.has(r.url));
let created = 0;
let failed = 0;
const CONCURRENCY = 15;

for (let i = 0; i < toCreate.length; i += CONCURRENCY) {
  const batch = toCreate.slice(i, i + CONCURRENCY);
  await Promise.all(
    batch.map(async (r) => {
      try {
        await payload.create({
          collection: "pages",
          data: {
            title: r.title ?? r.url,
            path: r.url,
            fullUrl: `${SITE_URL}${r.url === "/" ? "" : r.url}` || SITE_URL,
            slug: r.slug,
            section: r.section,
            pageType: r.pageType,
            parentPath: r.parentUrl,
            county: r.county,
            city: r.city,
            servicePest: r.servicePest,
            status: r.status === "Live" ? "Live" : "Build",
          },
          depth: 0,
        });
        created += 1;
      } catch (err) {
        failed += 1;
        console.error(`FAILED ${r.url}:`, (err as Error).message);
      }
    })
  );
  if ((i / CONCURRENCY) % 10 === 0 || i + CONCURRENCY >= toCreate.length) {
    console.log(`  ${Math.min(i + CONCURRENCY, toCreate.length)}/${toCreate.length} processed…`);
  }
}

console.log(
  `Done. Created ${created}, skipped ${existing.size} existing, failed ${failed}.`
);
process.exit(failed > 0 ? 1 : 0);
