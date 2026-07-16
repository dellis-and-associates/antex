/**
 * Seeded from the real posts on antexpestsolutions.com/blog-359502
 * (titles preserved; article copy rewritten in our own words).
 *
 * These seeds do double duty:
 *  1. Static fallback content when the Payload CMS is not configured
 *     (PAYLOAD_DATABASE_URI unset) or unreachable.
 *  2. Source data for `npm run seed`, which loads them into Payload.
 */
export type BlogBlock = { type: "h2" | "p"; text: string };

export type BlogPost = {
  slug: string;
  title: string;
  date: string; // ISO
  dateDisplay: string;
  topic: string;
  summary: string;
  body: BlogBlock[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "sprayed-in-fall-now-inside",
    title: "Sprayed Them in Fall, Now They're Inside? Here's What Happened",
    date: "2026-04-30",
    dateDisplay: "April 30, 2026",
    topic: "Box elder bugs",
    summary:
      "Store-bought sprays often scatter box elder bugs instead of eliminating them, driving the survivors deeper into wall voids, where they wait out the cold and emerge indoors. Here's why the DIY approach backfires and what actually works.",
    body: [
      {
        type: "p",
        text: "A Utah homeowner called us this spring with a puzzle: they'd sprayed the box elder bugs clustering on their siding last fall, watched them disappear, and considered the job done. Then the bugs showed up inside, in two rooms at once.",
      },
      { type: "h2", text: "The spray looked like it worked" },
      {
        type: "p",
        text: "That's the deceptive part. A store-bought spray knocks down the bugs it touches, and the visible cluster on the sunny side of the house thins out. What you can't see is what the survivors do next: they push deeper into the gaps they were already staged around (expansion joints, siding edges, weep holes) and settle into the wall voids behind them.",
      },
      { type: "h2", text: "Scattered, not eliminated" },
      {
        type: "p",
        text: "Consumer aerosols aren't formulated or applied the way professional treatments are. Against a mass of box elder bugs, a partial knockdown mostly disperses the group. The ones that don't die relocate, and in fall, 'relocate' means moving from the outside of your wall to the inside of it, right before the cold seals them in for the winter.",
      },
      { type: "h2", text: "Why they emerged indoors in spring" },
      {
        type: "p",
        text: "Bugs that overwinter in a wall void wake up when things warm up. Some find their way back outside; plenty follow the warmth the other direction: into the living space. That's why the 'fixed' problem from October reappears in March, on windows and light fixtures, in rooms nowhere near where you sprayed.",
      },
      { type: "h2", text: "What actually resolved it" },
      {
        type: "p",
        text: "We treated the exterior with a professional-grade product at the gathering spots box elder bugs actually use, applied with enough pressure and coverage to reach where they stage, not just where they sit. Combined with sealing the entry gaps, that broke the cycle for good.",
      },
      {
        type: "p",
        text: "If you're seeing box elder bugs indoors this spring, the fix starts with an inspection, not another can of spray. We'll tell you exactly where they got in, and inspections are free.",
      },
    ],
  },
  {
    slug: "box-elder-bugs-in-winter",
    title: "They Didn't Leave, They Moved In: The Truth About Box Elder Bugs in Winter",
    date: "2026-04-30",
    dateDisplay: "April 30, 2026",
    topic: "Box elder bugs",
    summary:
      "When box elder bugs vanish in late fall, they haven't gone far: they overwinter inside your walls and reappear on the first warm days. What that means for treatment timing, and why spring sightings start in autumn.",
    body: [
      {
        type: "p",
        text: "Every October, homeowners across Utah watch the box elder bugs disappear from their siding and assume winter killed them off. A family in Draper thought exactly that, until March, when the bugs started showing up inside: on the windows, around light fixtures, on the bathroom walls.",
      },
      { type: "h2", text: "Where they actually go" },
      {
        type: "p",
        text: "Box elder bugs don't migrate and they don't die off when it gets cold. They overwinter, tucked into wall voids, attic spaces and the protected gaps around your home's envelope. The mass you saw sunning on the south wall in September was staging, not visiting. When the temperature dropped, they simply moved a few inches inward.",
      },
      { type: "h2", text: "Spring doesn't bring them back. It wakes them up." },
      {
        type: "p",
        text: "The first stretch of warm days activates the bugs that spent winter inside your walls. Interior warmth confuses some of them into emerging on the wrong side, which is why they appear indoors in rooms that don't even face the sun, seemingly from nowhere. There's no new infestation in March; it's the October population, coming out of storage.",
      },
      { type: "h2", text: "Why fall is the treatment window" },
      {
        type: "p",
        text: "Once box elder bugs are inside the wall, options narrow: interior sprays chase individual bugs while the reservoir stays put. The right moment is fall, while they're still staged on the exterior: a thorough perimeter treatment plus sealing the entry points they cluster around. That's what finally ended the Draper family's seasonal cycle: one properly timed exterior treatment, and the following spring stayed quiet.",
      },
      {
        type: "p",
        text: "Seeing them emerge indoors right now? An inspection will map where they overwintered and which gaps need sealing before next fall. If they return between scheduled visits, so do we. Free.",
      },
    ],
  },
  {
    slug: "roof-rat-surge-st-george",
    title: "Why Roof Rat Infestations Are Surging in St. George Neighborhoods",
    date: "2026-04-30",
    dateDisplay: "April 30, 2026",
    topic: "Rodents",
    summary:
      "Roof rat pressure keeps climbing across St. George, and repeat infestations usually trace back to entry points the last treatment never found. How inspection-first rodent work breaks the cycle.",
    body: [
      {
        type: "p",
        text: "Ask any pest control company working Southern Utah and you'll hear the same thing: roof rat calls keep climbing. St. George's rapid growth built exactly the habitat this non-native species thrives in: dense neighborhoods with mature landscaping, irrigation, and block walls that work like rat highways.",
      },
      { type: "h2", text: "What's driving the surge" },
      {
        type: "p",
        text: "Roof rats follow three things: water, warmth and easy access. In a desert climate, an irrigated neighborhood is an oasis, and dry spells push rats toward structures even harder. New construction constantly disturbs existing populations and sends them looking for the next harborage, often the attic two streets over.",
      },
      { type: "h2", text: "\"We already have pest control, so why do we still have rats?\"" },
      {
        type: "p",
        text: "We hear this weekly, and one recent case explains it. A St. George homeowner had an active service with another provider, yet the rats kept coming. Our inspection found two unsealed exterior entry points the previous company had never located, and bait stations placed where rats simply didn't travel. Treatment without a thorough inspection is guesswork. The equipment was there, but it wasn't where the rats were.",
      },
      { type: "h2", text: "Inspection first. Always." },
      {
        type: "p",
        text: "Roof rats can enter through a gap smaller than an inch, high on a roofline you'll never look at. Effective control means walking the full structure, mapping every entry point and travel route, sealing what can be sealed, and placing stations where the evidence says rats actually move. Not every company inspects first. We do. Always.",
      },
      {
        type: "p",
        text: "If you're in a St. George neighborhood and hearing movement at night, or your current treatment isn't ending the problem, book a free inspection. We'll show you exactly what the last inspection missed.",
      },
    ],
  },
  {
    slug: "gap-less-than-an-inch",
    title: "A Gap Less Than an Inch: How Roof Rats Invade Washington County Homes",
    date: "2026-04-30",
    dateDisplay: "April 30, 2026",
    topic: "Rodents",
    summary:
      "A real Washington County case: nighttime scratching in the walls traced to an opening smaller than an inch. Why exclusion (finding and sealing every gap) matters more than traps alone.",
    body: [
      {
        type: "p",
        text: "The homeowner noticed two things: dark streaks along the garage baseboards, and a scratching sound in the walls that only started after dark. By the time they called us, the sounds had been going on for weeks.",
      },
      { type: "h2", text: "The entry point nobody would have guessed" },
      {
        type: "p",
        text: "Our inspection traced the activity to a single opening: the gap where the AC line ran through the exterior wall. Less than an inch. More than enough. Roof rats are climbers and squeezers. If a gap fits their skull, the rest of the body follows. Utility penetrations, roofline vents and garage-door corners are the usual suspects, and most of them sit above eye level.",
      },
      { type: "h2", text: "Why this keeps happening in Washington County" },
      {
        type: "p",
        text: "Roof rat calls have risen across the county, and this winter made it worse: a dry season pushes rats toward irrigated yards and warm structures earlier than usual. The streaks the homeowner saw were rub marks: grease and dirt from fur tracing a regular route along the baseboard. Rub marks plus nighttime sound is as close to a confirmed diagnosis as it gets before we open anything up.",
      },
      { type: "h2", text: "The fix: seal, then remove" },
      {
        type: "p",
        text: "We sealed the AC-line gap and every other candidate opening we found, placed tamper-resistant bait stations around the structure's exterior, and trapped out the population already inside. Order matters: remove the rats without sealing the route and the next family moves in on the same scent trail.",
      },
      {
        type: "p",
        text: "Hearing scratching at night, or seeing streaks along baseboards? Those are early-stage signs, and early is the cheap time to fix this. We're scheduling free inspections across Washington County now.",
      },
    ],
  },
  {
    slug: "where-rodents-hide",
    title: "From the Attic to the Pantry: Where Rodents Hide in Utah Homes",
    date: "2026-04-09",
    dateDisplay: "April 9, 2026",
    topic: "Rodents",
    summary:
      "Not seeing mice doesn't mean they're gone. From attic insulation to the back of the pantry, here are the harborage spots rodents actually use in Utah homes, and the signs they leave behind.",
    body: [
      {
        type: "p",
        text: "Most people think if they don't see a mouse, they don't have a mouse. In our experience it's closer to the opposite: by the time you see one in the open, the hidden population is established. Rodents are built for concealment, and Utah homes offer them a lot of places to use it.",
      },
      { type: "h2", text: "It takes almost nothing to get in" },
      {
        type: "p",
        text: "All the invitation a mouse needs is a crack in the foundation, an open vent, or a loose attic hatch. Once inside, they pick harborage by three rules: dark, undisturbed, close to food or nesting material.",
      },
      { type: "h2", text: "Where we actually find them" },
      {
        type: "p",
        text: "The attic tops the list: insulation makes premium nesting material, and nobody visits. We routinely find nests tunneled into attic insulation, droppings hidden behind wall insulation, and mice living inside pantry walls, inches from a food supply they raid at night. Garages, crawl spaces and the voids under kitchen cabinets round out the usual circuit.",
      },
      { type: "h2", text: "Checking under the sink isn't an inspection" },
      {
        type: "p",
        text: "If you're only checking under the sink, you're missing 90% of the problem. The evidence that matters sits in places a flashlight-and-a-glance check never reaches: rub marks on rafters, droppings behind insulation, gnawing at the attic hatch. That's why our inspections run top to bottom: attic, walls, crawl space, garage, exterior.",
      },
      {
        type: "p",
        text: "If something feels off (noises, a smell, chewed packaging), trust it. A full-home inspection is free, and if we find activity we'll map every harborage and entry point before recommending a treatment plan.",
      },
    ],
  },
  {
    slug: "rodents-in-your-walls",
    title: "What Happens When Rodents Get Into Your Walls",
    date: "2026-04-09",
    dateDisplay: "April 9, 2026",
    topic: "Rodents",
    summary:
      "Mice in wall voids are more than a noise problem: gnawed wiring, contaminated insulation and expanding nests. What's really happening behind the drywall, and when to bring in a professional.",
    body: [
      {
        type: "p",
        text: "Think mice in the walls are just a little scratching noise? The sound is the smallest part of the problem. A wall void is warm, dark and protected: ideal rodent habitat. And everything a rodent does in there costs you something.",
      },
      { type: "h2", text: "Wiring: the fire risk nobody sees" },
      {
        type: "p",
        text: "Rodent teeth grow continuously, so rodents gnaw constantly, and electrical wiring insulation is a favorite target. A chewed wire inside a wall void is a genuine fire hazard, and it's invisible until something arcs. This isn't scare-tactics copy; gnawed wiring is one of the most common things we document when walls get opened up.",
      },
      { type: "h2", text: "Pipes, insulation and the nest itself" },
      {
        type: "p",
        text: "Plastic supply lines get chewed too, and a pinhole leak inside a wall does slow, expensive damage before it's discovered. Meanwhile the insulation around the nest is being shredded for bedding and contaminated with droppings and urine, which degrades its performance and leaves an odor that lingers for weeks, especially if a rodent dies in the void.",
      },
      { type: "h2", text: "That noise is a warning" },
      {
        type: "p",
        text: "Scratching at night means an active, growing population. Mice don't move in alone, and they don't move out on their own. Waiting turns a trapping-and-exclusion job into a repair project. The right response is prompt: inspect, seal the entry points, remove the population, and verify the walls have gone quiet.",
      },
      {
        type: "p",
        text: "Hearing it right now? Book a free inspection. We'll find how they got in, what they've reached, and seal the problem at its source, guaranteed.",
      },
    ],
  },
];
