export type ServiceStep = {
  title: "Inspect" | "Treat" | "Protect";
  copy: string;
};

export type ServiceFaq = { q: string; a: string };

export type Service = {
  slug: string;
  name: string;
  /** Short name used in footer / compact lists. */
  shortName: string;
  icon: "ant" | "rodent" | "termite" | "wasp" | "scorpion" | "building";
  /** Hero photo (public/services/*, 4:3, CC0/public-domain sources). */
  image: { src: string; alt: string };
  card: string; // service-card copy from the approved homepage
  heroEyebrow: string;
  heroTitle: string;
  heroLead: string;
  whatWeDo: { title: string; copy: string }[];
  steps: [ServiceStep, ServiceStep, ServiceStep];
  faqs: ServiceFaq[];
  ctaTitle: string;
  metaTitle: string;
  metaDescription: string;
};

export const SERVICES: Service[] = [
  {
    slug: "ants-general-pests",
    name: "Ants & general pests",
    shortName: "Ants & general pests",
    icon: "ant",
    image: {
      src: "/services/ants.webp",
      alt: "Close-up of a red ant facing the camera against a dark background",
    },
    card: "Local ant species, roaches, earwigs and crawling insects, treated at the colony, not just the trail.",
    heroEyebrow: "Ants · Roaches · Earwigs · Crawling insects",
    heroTitle: "Ant control that treats the colony, not the trail.",
    heroLead:
      "Wiping up a trail kills the ants you can see. The colony sends more. We identify the species, trace it to the nest and treat the source, then hold the perimeter so they don't come back.",
    whatWeDo: [
      {
        title: "Species identification",
        copy: "Utah's common invaders, from pavement ants and harvester ants to roaches, earwigs and box elder bugs, each need a different approach. Treatment starts with knowing exactly what you have.",
      },
      {
        title: "Colony-level treatment",
        copy: "Baits and targeted applications that workers carry back to the nest, eliminating the colony instead of just the foragers on your counter.",
      },
      {
        title: "Exterior perimeter barrier",
        copy: "A treated line around the foundation, entry points and harborage areas that stops the next wave before it gets inside.",
      },
      {
        title: "Yard treatments on request",
        copy: "We also treat yards for ticks, fleas and mosquitoes. Ask about seasonal outdoor plans when you book.",
      },
    ],
    steps: [
      {
        title: "Inspect",
        copy: "A licensed technician identifies the species, follows trails to nesting sites and maps every entry point around your foundation.",
      },
      {
        title: "Treat",
        copy: "Colony-targeted baits indoors where needed, plus an EPA-registered barrier treatment along the exterior perimeter.",
      },
      {
        title: "Protect",
        copy: "Scheduled visits keep the barrier maintained. If ants cross the line between visits, we come back and fix it free.",
      },
    ],
    faqs: [
      {
        q: "Why do the ants keep coming back after I spray?",
        a: "Store-bought sprays kill foraging workers but rarely reach the colony, and some species react by splitting into multiple colonies, making the problem worse. Colony-level baiting eliminates the source instead of the symptom.",
      },
      {
        q: "Are the treatments safe for my kids and pets?",
        a: EPA_SAFETY_ANSWER(),
      },
      {
        q: "How long does a treatment take to work?",
        a: "You'll usually see a sharp drop in activity within days. Baits need a little time to circulate through the colony. That delay is what makes them effective at the source.",
      },
      {
        q: "Do I need to do anything before you arrive?",
        a: "Very little. Clearing counters and noting where you've seen activity helps the inspection. Your technician will walk you through anything specific before treating.",
      },
      {
        q: "Do you handle other crawling insects too?",
        a: "Yes. Roaches, earwigs, box elder bugs and other general pests are covered under the same inspect-treat-protect service, along with optional yard treatments for ticks, fleas and mosquitoes.",
      },
    ],
    ctaTitle: "Seeing trails? Get a free inspection this week.",
    metaTitle: "Ant Control & General Pest Exterminator | Antex Pest Solutions",
    metaDescription:
      "Colony-level ant and general pest control in St George, Vernal & Northern Utah. Free inspections, EPA-registered products, free re-service guarantee. Call (435) 313-5882.",
  },
  {
    slug: "rodents-mice",
    name: "Rodents & mice",
    shortName: "Rodents & mice",
    icon: "rodent",
    image: {
      src: "/services/rodents.webp",
      alt: "House mouse crouched on bare ground, seen up close",
    },
    card: "It's rodent season in Utah. Exclusion, trapping and entry-point sealing. Free inspections available now.",
    heroEyebrow: "Mice · Roof rats · Exclusion",
    heroTitle: "Rodent control that seals the way in.",
    heroLead:
      "Trapping alone treats the symptom. Mice and roof rats get in through gaps smaller than an inch, so we find every entry point, seal it, and remove what's already inside.",
    whatWeDo: [
      {
        title: "Full-property inspection",
        copy: "Attic to crawl space: droppings, rub marks, gnawing and nesting sites tell us what species you have, where they're living and how they got in.",
      },
      {
        title: "Entry-point exclusion",
        copy: "We seal the gaps, vents, rooflines and utility penetrations rodents actually use. That's the step that makes results last.",
      },
      {
        title: "Trapping & removal",
        copy: "Strategic trap placement clears the animals already inside, with follow-up visits until activity stops.",
      },
      {
        title: "Wildlife control",
        copy: "Larger animals on the property? We also provide humane wildlife removal and exclusion. Ask when you book.",
      },
    ],
    steps: [
      {
        title: "Inspect",
        copy: "We walk the full structure, from roofline to foundation, garage and attic, and map every gap, droppings site and runway.",
      },
      {
        title: "Treat",
        copy: "Entry points are sealed and traps placed along active runways. No bait scattered where kids or pets could reach it.",
      },
      {
        title: "Protect",
        copy: "Follow-ups confirm the structure stays sealed through the seasonal surge. Activity returns between visits? So do we, free.",
      },
    ],
    faqs: [
      {
        q: "I hear scratching in the walls at night. Is it mice?",
        a: "Very likely mice or roof rats. Both are nocturnal and travel through wall voids and attics. Nighttime scratching is one of the most common first signs, and it's worth an inspection before nesting and gnawing damage spread.",
      },
      {
        q: "Why are roof rats such a problem in St George?",
        a: "Roof rat pressure has been rising across Washington County neighborhoods. They climb, they enter high along rooflines, and they exploit gaps under an inch wide, which is why exclusion matters more than traps alone.",
      },
      {
        q: "When is rodent season in Utah?",
        a: "Pressure spikes in fall and winter as temperatures drop and rodents move indoors, but established infestations persist year-round. The best time to seal a house is before the cold snap. The second-best time is now.",
      },
      {
        q: "Do you just set traps, or actually fix the problem?",
        a: "Both. Trapping removes the animals already inside, but the fix is exclusion: finding and sealing every entry point so the next generation can't follow the same scent trails in.",
      },
      {
        q: "What about squirrels, raccoons or other wildlife?",
        a: "We provide humane wildlife removal and exclusion as well, protecting your property while handling animals legally and safely.",
      },
    ],
    ctaTitle: "It's rodent season. Book a free inspection now.",
    metaTitle: "Rodent & Mice Exterminator - Exclusion & Removal | Antex Pest Solutions",
    metaDescription:
      "Rodent control in St George, Vernal & Northern Utah: inspection, trapping and entry-point exclusion that lasts. Free inspections during rodent season. Call (435) 313-5882.",
  },
  {
    slug: "termites",
    name: "Termites",
    shortName: "Termites",
    icon: "termite",
    image: {
      src: "/services/termites.webp",
      alt: "Macro photograph of a subterranean termite worker against a dark background",
    },
    card: "Inspections, treatment and monitoring that protect the structure itself, before damage compounds.",
    heroEyebrow: "Termites · Wood-destroying insects",
    heroTitle: "Termite protection for the structure itself.",
    heroLead:
      "Termites work quietly, and the damage compounds while you can't see it. We inspect for the early signs, treat active colonies and monitor so the structure stays protected year after year.",
    whatWeDo: [
      {
        title: "Wood-destroying insect inspections",
        copy: "Thorough WDI inspections that catch mud tubes, damaged wood, moisture conditions and other early signs, with detailed documentation, including for real-estate transactions.",
      },
      {
        title: "Targeted treatment",
        copy: "Active colonies are treated at the source with proven termiticides, applied precisely where termites live and travel.",
      },
      {
        title: "Prevention & monitoring",
        copy: "We assess the conditions that invite termites, like moisture, soil contact and wood debris, and monitor the property so new activity is caught before damage spreads.",
      },
      {
        title: "Service warranties",
        copy: "Wood-destroying insect plans include service warranties with follow-up treatments. Ask for details when you book.",
      },
    ],
    steps: [
      {
        title: "Inspect",
        copy: "A licensed technician examines the foundation, crawl spaces, wood contact points and moisture conditions for evidence of activity.",
      },
      {
        title: "Treat",
        copy: "Targeted termiticide application where colonies are active, protecting the structure without blanket-spraying the property.",
      },
      {
        title: "Protect",
        copy: "Ongoing monitoring catches new activity early, and we correct the moisture, soil and debris conditions that invite reinfestation.",
      },
    ],
    faqs: [
      {
        q: "How do I know if I have termites?",
        a: "Common signs include mud tubes on foundation walls, hollow-sounding or blistered wood, discarded wings near windows, and sagging floors. Many infestations show no visible signs at all, which is why periodic professional inspection matters.",
      },
      {
        q: "Are termites really a risk in Utah?",
        a: "Yes. Subterranean termites are active across Utah, and risk varies by neighborhood, soil and building style. Local inspection experience matters more than a national checklist.",
      },
      {
        q: "Do you do termite inspections for home sales?",
        a: "Yes. Our wood-destroying insect (WDI) inspections include the detailed documentation lenders and buyers need in a real-estate transaction.",
      },
      {
        q: "What does treatment involve?",
        a: "After the inspection maps the activity, we apply targeted termiticide treatments where the colony lives and travels, then monitor to confirm elimination. Prevention work addresses the moisture and soil conditions that attracted them.",
      },
      {
        q: "Is the treatment covered by a warranty?",
        a: "Wood-destroying insect plans include service warranties with follow-up treatments, on top of our standard guarantee: " +
          "if pests return between scheduled visits, we come back at no additional cost.",
      },
    ],
    ctaTitle: "Protect the structure. Book a termite inspection.",
    metaTitle: "Termite Inspection & Treatment | Antex Pest Solutions - Utah",
    metaDescription:
      "Termite and wood-destroying insect inspections, treatment and monitoring in St George, Vernal & Northern Utah. Detailed WDI documentation. Call (435) 313-5882.",
  },
  {
    slug: "wasps-stinging-insects",
    name: "Wasps & stinging insects",
    shortName: "Stinging insects",
    icon: "wasp",
    image: {
      src: "/services/wasps.webp",
      alt: "Paper wasps crawling on an exposed nest attached to a wall",
    },
    card: "Fast, safe removal of wasps, hornets and yellowjackets, with priority scheduling for active nests.",
    heroEyebrow: "Wasps · Hornets · Yellowjackets",
    heroTitle: "Active nest? We prioritize stinging insects.",
    heroLead:
      "A nest by the door isn't a wait-a-week problem. We schedule stinging-insect calls first, remove the nest safely and treat the area so the colony doesn't rebuild in the same spot.",
    whatWeDo: [
      {
        title: "Priority scheduling",
        copy: "Active nests near doors, play areas or work areas get moved to the front of the schedule, typically within days, not weeks.",
      },
      {
        title: "Safe nest removal",
        copy: "Proper equipment and technique to remove nests from eaves, wall voids, ground burrows and trees, without sending an agitated colony into your yard.",
      },
      {
        title: "Rebuild prevention",
        copy: "Treating the nest site and nearby harborage discourages new queens from rebuilding in the same protected spots next season.",
      },
    ],
    steps: [
      {
        title: "Inspect",
        copy: "We locate every nest on the property: visible ones and the hidden colonies in wall voids, ground burrows and eaves.",
      },
      {
        title: "Treat",
        copy: "The nest is treated and removed with proper protective equipment, at the time of day the colony is least active.",
      },
      {
        title: "Protect",
        copy: "Nest sites and likely rebuild spots are treated so returning queens don't re-establish. New activity between visits? We return free.",
      },
    ],
    faqs: [
      {
        q: "Should I knock down the nest myself?",
        a: "We don't recommend it. Yellowjackets and hornets defend their nests aggressively, and a partially destroyed nest often scatters the colony rather than eliminating it. Professional removal is faster and much safer.",
      },
      {
        q: "How quickly can you get here?",
        a: "Stinging-insect calls get priority scheduling. For active nests we're typically out within days. Tell us when you call if anyone in the household is allergic.",
      },
      {
        q: "What's the difference between wasps, hornets and yellowjackets?",
        a: "Hornets and yellowjackets are both types of wasps. Yellowjackets often nest in the ground or wall voids, hornets in aerial paper nests. The distinction matters because nest location changes how removal has to be done.",
      },
      {
        q: "Will they just come back next year?",
        a: "Colonies die off each winter, but new queens favor the same protected spots. Treating the site after removal, and sealing voids where practical, breaks that cycle.",
      },
    ],
    ctaTitle: "Active nest? Get priority scheduling today.",
    metaTitle: "Wasp, Hornet & Yellowjacket Nest Removal | Antex Pest Solutions",
    metaDescription:
      "Fast, safe wasp and stinging insect removal in St George, Vernal & Northern Utah. Priority scheduling for active nests. Call (435) 313-5882.",
  },
  {
    slug: "spiders-scorpions",
    name: "Spiders & scorpions",
    shortName: "Spiders & scorpions",
    icon: "scorpion",
    image: {
      src: "/services/spiders-scorpions.webp",
      alt: "Bark scorpion resting on sandy desert soil",
    },
    card: "Desert-climate specialists: barrier treatments tuned to St George's year-round arachnid pressure.",
    heroEyebrow: "Spiders · Scorpions · Desert pests",
    heroTitle: "Built for the desert's year-round arachnid pressure.",
    heroLead:
      "St George's climate doesn't give spiders and scorpions an off-season. Our barrier treatments are tuned to red-rock country: where they harbor, how they hunt, and the entry points they actually use.",
    whatWeDo: [
      {
        title: "Harborage inspection",
        copy: "Block walls, rock landscaping, expansion joints, weep holes: we check the places desert arachnids actually live, not just the baseboards.",
      },
      {
        title: "Exterior barrier treatment",
        copy: "A treated perimeter around the foundation and entry points, maintained on schedule so the barrier never lapses.",
      },
      {
        title: "Prey-pressure reduction",
        copy: "Spiders and scorpions follow their food. Controlling the insects they hunt makes your property a much less attractive place to settle.",
      },
    ],
    steps: [
      {
        title: "Inspect",
        copy: "We identify the species, including black widows and bark scorpions, and map harborage in walls, landscaping and structures.",
      },
      {
        title: "Treat",
        copy: "EPA-registered barrier applications at the foundation, entry points and harborage, plus targeted treatment of active sites.",
      },
      {
        title: "Protect",
        copy: "Scheduled re-treatment keeps the barrier live through the desert's long season. Crossings between visits are fixed free.",
      },
    ],
    faqs: [
      {
        q: "Are scorpions in St George dangerous?",
        a: "Most Utah scorpion stings are painful rather than dangerous, but the Arizona bark scorpion, found in the St George area, deserves respect, especially around kids and older adults. Either way, you don't want them in the house.",
      },
      {
        q: "Why do I keep finding scorpions inside?",
        a: "Scorpions flatten to fit through gaps as thin as a credit card and follow prey insects indoors. A maintained exterior barrier plus reduced insect pressure inside is what actually brings sightings down.",
      },
      {
        q: "Do you treat for black widows?",
        a: "Yes. Widows favor undisturbed corners: garages, meters, block-wall voids, patio furniture. We treat the harborage directly and maintain the perimeter so they don't re-establish.",
      },
      {
        q: "Is one treatment enough?",
        a: "In the desert, no. Arachnid pressure here is year-round, and any barrier weathers over time. Scheduled maintenance keeps the line held, and our guarantee covers anything that crosses it between visits.",
      },
    ],
    ctaTitle: "Hold the line against desert pests.",
    metaTitle: "Spider & Scorpion Control in St George, Utah | Antex Pest Solutions",
    metaDescription:
      "Spider and scorpion barrier treatments tuned to Utah's desert climate. Black widow and bark scorpion specialists in St George. Call (435) 313-5882.",
  },
  {
    slug: "commercial",
    name: "Commercial programs",
    shortName: "Commercial programs",
    icon: "building",
    image: {
      src: "/services/commercial.webp",
      alt: "Stainless steel commercial kitchen with ranges and prep tables",
    },
    card: "Documented pest management for restaurants, offices, hospitals, pet facilities and daycare centers.",
    heroEyebrow: "Restaurants · Offices · Healthcare · Facilities",
    heroTitle: "Documented pest management your auditor will like.",
    heroLead:
      "Commercial pest control is a compliance function, not just a spray. We run documented, inspection-driven programs for restaurants, warehouses, offices, hotels and healthcare facilities, scheduled around your business hours.",
    whatWeDo: [
      {
        title: "Integrated Pest Management",
        copy: "Science-based IPM programs: targeted assessment, reduced chemical use, non-chemical controls where they work better, and ongoing monitoring aligned with your regulatory requirements.",
      },
      {
        title: "Detailed documentation",
        copy: "Service reports, activity logs and treatment records kept audit-ready for health inspections, AIB-style audits and corporate compliance.",
      },
      {
        title: "Flexible scheduling",
        copy: "Service outside business hours so treatments never interrupt customers, patients or production.",
      },
      {
        title: "Sensitive-environment approved",
        copy: "Products and methods approved for hospitals, pet facilities and daycare centers: environments where the margin for error is zero.",
      },
    ],
    steps: [
      {
        title: "Inspect",
        copy: "A facility-wide assessment maps pest pressure, entry points, sanitation risk and the regulatory requirements specific to your industry.",
      },
      {
        title: "Treat",
        copy: "Targeted IPM interventions, from exclusion and monitoring stations to precise product use, scheduled outside your business hours.",
      },
      {
        title: "Protect",
        copy: "Continuous monitoring and documented recurring service keep you audit-ready, with re-service at no charge if activity returns.",
      },
    ],
    faqs: [
      {
        q: "Which industries do you serve?",
        a: "Restaurants, warehouses, offices, hotels, healthcare facilities, pet facilities and daycare centers, and anywhere else pest activity threatens compliance, reputation or health.",
      },
      {
        q: "Can you service us outside business hours?",
        a: "Yes. Commercial routes are built around your operating hours, so treatments happen when customers, patients and staff aren't on site.",
      },
      {
        q: "What documentation do we get?",
        a: "Every visit produces a service report: what was found, what was treated, product records and recommendations. Logs stay audit-ready for health inspections and corporate reviews.",
      },
      {
        q: "What is Integrated Pest Management?",
        a: "IPM is a science-based approach that prioritizes prevention: monitoring, exclusion and sanitation first, with targeted product use only where assessment shows it's needed. Less chemical, better long-term results, cleaner audits.",
      },
      {
        q: "Do you handle multi-site accounts?",
        a: "Yes. With offices in St George, Vernal and American Fork, we cover facilities across Utah's 13 most-populated counties under one documented program.",
      },
    ],
    ctaTitle: "Get a documented program for your facility.",
    metaTitle: "Commercial Pest Control & IPM Programs in Utah | Antex Pest Solutions",
    metaDescription:
      "Documented commercial pest management for restaurants, offices, hospitals and facilities across Utah. IPM programs, audit-ready records, after-hours service. Call (435) 313-5882.",
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

/** Shared FAQ answer sourced from the live site's EPA/safety claim. */
function EPA_SAFETY_ANSWER(): string {
  return "Yes. We use EPA-registered products approved for use in homes, businesses, and sensitive environments like hospitals, pet facilities, and daycare centers, applied precisely where pests live, not broadcast through your living space.";
}
