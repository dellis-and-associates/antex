/**
 * Seeded from the real posts on antexpestsolutions.com/blog-359502
 * (titles preserved; summaries rewritten in our own words).
 * TODO: replace with a CMS-backed source when the blog migrates.
 */
export type BlogPost = {
  slug: string;
  title: string;
  date: string; // ISO
  dateDisplay: string;
  topic: string;
  summary: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "sprayed-in-fall-now-inside",
    title: "Sprayed Them in Fall—Now They're Inside? Here's What Happened",
    date: "2026-04-30",
    dateDisplay: "April 30, 2026",
    topic: "Box elder bugs",
    summary:
      "Store-bought sprays often scatter box elder bugs instead of eliminating them — driving the survivors deeper into wall voids, where they wait out the cold and emerge indoors. Here's why the DIY approach backfires and what actually works.",
  },
  {
    slug: "box-elder-bugs-in-winter",
    title: "They Didn't Leave—They Moved In: The Truth About Box Elder Bugs in Winter",
    date: "2026-04-30",
    dateDisplay: "April 30, 2026",
    topic: "Box elder bugs",
    summary:
      "When box elder bugs vanish in late fall, they haven't gone far: they overwinter inside your walls and reappear on the first warm days. What that means for treatment timing — and why spring sightings start in autumn.",
  },
  {
    slug: "roof-rat-surge-st-george",
    title: "Why Roof Rat Infestations Are Surging in St. George Neighborhoods",
    date: "2026-04-30",
    dateDisplay: "April 30, 2026",
    topic: "Rodents",
    summary:
      "Roof rat pressure keeps climbing across St. George — and repeat infestations usually trace back to entry points the last treatment never found. How inspection-first rodent work breaks the cycle.",
  },
  {
    slug: "gap-less-than-an-inch",
    title: "A Gap Less Than an Inch: How Roof Rats Invade Washington County Homes",
    date: "2026-04-30",
    dateDisplay: "April 30, 2026",
    topic: "Rodents",
    summary:
      "A real Washington County case: nighttime scratching in the walls traced to an opening smaller than an inch. Why exclusion — finding and sealing every gap — matters more than traps alone.",
  },
  {
    slug: "where-rodents-hide",
    title: "From the Attic to the Pantry: Where Rodents Hide in Utah Homes",
    date: "2026-04-09",
    dateDisplay: "April 9, 2026",
    topic: "Rodents",
    summary:
      "Not seeing mice doesn't mean they're gone. From attic insulation to the back of the pantry, here are the harborage spots rodents actually use in Utah homes — and the signs they leave behind.",
  },
  {
    slug: "rodents-in-your-walls",
    title: "What Happens When Rodents Get Into Your Walls",
    date: "2026-04-09",
    dateDisplay: "April 9, 2026",
    topic: "Rodents",
    summary:
      "Mice in wall voids are more than a noise problem: gnawed wiring, contaminated insulation and expanding nests. What's really happening behind the drywall, and when to bring in a professional.",
  },
];
