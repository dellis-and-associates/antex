/**
 * Generate SEO page content for every doc in the `pages` collection and
 * write it back to Payload. Copy is composed from hand-written variant
 * pools keyed by page type, interpolated with city/county/service facts,
 * and selected deterministically from the page path, so every page gets
 * stable, distinct-reading content. Run with: npm run generate:content
 *
 * Client copy rules honored here: NO em dashes anywhere; guarantee and
 * EPA wording come verbatim from lib/site.ts.
 */
import { getPayload } from "payload";
import config from "@payload-config";
import {
  EPA_CLAIM_VERBATIM,
  GUARANTEE_VERBATIM,
  PHONE_DISPLAY,
  RATING,
} from "../lib/site";

/* ---------------------------------------------------------------- utils */

function hash(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
}

/** Deterministic pick: same path+key always yields the same variant. */
function pick<T>(arr: T[], seed: string, key: string): T {
  return arr[hash(seed + "::" + key) % arr.length];
}

/** Rotate an array by a hash so FAQ order varies between pages. */
function rotate<T>(arr: T[], seed: string, key: string): T[] {
  const n = hash(seed + "::" + key) % arr.length;
  return [...arr.slice(n), ...arr.slice(0, n)];
}

type Ctx = {
  path: string;
  title: string;
  pageType: string | null;
  section: string | null;
  county: string | null; // "Salt Lake County"
  city: string | null; // "Salt Lake City"
  servicePest: string | null; // "Ant Control"
  slug: string | null;
};

type Generated = {
  metaDescription: string;
  heroHeadline: string;
  heroSub: string;
  intro: string;
  sections: { heading: string; body: string }[];
  faqs: { question: string; answer: string }[];
};

const lc = (s: string) => s.toLowerCase();
const countyShort = (c: string | null) => (c ? c.replace(/ County$/, "") : "");

/* -------------------------------------------------- pest noun per service */

const PEST_NOUN: Record<string, string> = {
  "Pest Control": "household pests",
  "Ant Control": "ants",
  "Spider Control": "spiders",
  "Wasp Control": "wasps and hornets",
  "Earwig Control": "earwigs",
  "Box Elder Bug Control": "box elder bugs",
  "Cockroach Control": "cockroaches",
  "Cricket Control": "crickets",
  "Flea Control": "fleas",
  "Tick Control": "ticks",
  "Silverfish Control": "silverfish",
  "Beetle Control": "beetles",
  "Carpet Beetle Control": "carpet beetles",
  "Pantry Pest Control": "pantry pests",
  "Stink Bug Control": "stink bugs",
  "Millipede Control": "millipedes",
  "Centipede Control": "centipedes",
  "Fly Control": "flies",
  "Moth Control": "moths",
  "Rodent Control": "mice and rats",
  "Mouse Control": "mice",
  "Rat Control": "rats",
  "Vole Control": "voles",
  "Pack Rat Control": "pack rats",
  "Deer Mouse Control": "deer mice",
  "Rodent Exclusion": "rodents",
  "Termite Control": "termites",
  "Termite Inspection": "termites",
  "Real Estate Termite Inspection": "termites",
  "Trelona Termite System": "termites",
  "Subterranean Termites": "subterranean termites",
  "Bed Bug Control": "bed bugs",
  "Bed Bug Inspection": "bed bugs",
  "Aprehend Bed Bug Treatment": "bed bugs",
  "Chemical Bed Bug Treatment": "bed bugs",
  "Bed Bug Preparation": "bed bugs",
  "Mosquito Control": "mosquitoes",
  "Seasonal Mosquito Control": "mosquitoes",
  "Event Mosquito Control": "mosquitoes",
  "Wildlife Control": "nuisance wildlife",
  "Commercial Pest Control": "pests",
};

function pestNoun(service: string | null): string {
  if (!service) return "pests";
  return PEST_NOUN[service] ?? "pests";
}

/* ------------------------------------- one specific angle per service page */

const SERVICE_ANGLE: Record<string, string> = {
  "pest-control":
    "Our general pest program covers the most common Utah invaders in a single recurring plan, with quarterly barrier treatments timed to the seasons.",
  "ant-control":
    "Utah colonies often nest under slabs and in wall voids, so we pair non-repellent products with baiting to eliminate the colony rather than just the visible trail.",
  "spider-control":
    "We focus on web removal, entry sealing, and de-webbing eaves, and we treat the insect populations spiders feed on so they lose their reason to stay.",
  "wasp-control":
    "We remove active nests safely, treat void nests in walls and soffits, and knock down early-season queens before colonies get established.",
  "earwig-control":
    "Earwigs thrive in damp mulch and window wells along the Wasatch Front, so we treat harborage zones and create a dry perimeter band they will not cross.",
  "box-elder-bug-control":
    "Fall congregations on warm south-facing walls are the Utah signature. We treat exterior gathering surfaces before bugs slip inside to overwinter.",
  "cockroach-control":
    "German roaches ride in on deliveries and spread fast. We combine gel baiting, growth regulators, and sanitation coaching for lasting elimination.",
  "cricket-control":
    "We treat foundation cracks, weep holes, and tall grass margins where crickets breed, then band the perimeter to keep the chirping outside.",
  "flea-control":
    "Fleas need a coordinated hit: treating carpets and pet rest areas indoors while breaking the life cycle with growth regulators.",
  "tick-control":
    "We target tick habitat at the yard edge, brush lines, and tall grass, cutting your family's exposure where lawns meet wild ground.",
  "silverfish-control":
    "Silverfish live on starches and humidity. We treat storage areas, reduce moisture harborage, and dust the voids where they breed.",
  "beetle-control":
    "From ground beetles wandering in to stored product species, we identify the exact beetle first because the treatment differs by species.",
  "carpet-beetle-control":
    "Larvae quietly ruin wool, hides, and stored fabrics. We locate the source material, treat it, and protect closets and storage from reinfestation.",
  "pantry-pest-control":
    "Indian meal moths and weevils start in one infested package. We find and remove the source, then treat cracks in the pantry so nothing rebounds.",
  "stink-bug-control":
    "We intercept stink bugs on exterior walls in fall before they overwinter in attics and wall voids, then exclude their entry points.",
  "millipede-control":
    "Millipede migrations follow wet weather. We dry out the perimeter, treat mulch beds, and seal door thresholds where they wander in.",
  "centipede-control":
    "House centipedes hunt other insects, so we control their food supply as well as treating the damp basements they favor.",
  "fly-control":
    "We identify the breeding source first, whether drains, trash areas, or animal matter, because killing adult flies alone never solves it.",
  "moth-control":
    "Clothes moths and pantry moths need different programs. We confirm the species, remove infested material, and treat where larvae feed.",
  "rodent-control":
    "Our rodent program combines strategic trapping, tamper-resistant bait stations, and exclusion work so mice and rats cannot get back in.",
  "mouse-control":
    "A mouse fits through a hole the width of a pencil. We trap the current population and seal the gaps in your foundation, garage, and utility lines.",
  "rat-control":
    "Norway and roof rats need different placements. We identify the species, remove the population, and close the routes they travel.",
  "vole-control":
    "Voles carve runway networks through Utah lawns and girdle young trees. We knock down the population and protect turf and landscaping.",
  "pack-rat-control":
    "Pack rats nest in garages, sheds, and engine bays and hoard debris. We remove nests, trap the animals, and exclude re-entry.",
  "deer-mouse-control":
    "Deer mice matter because of hantavirus risk. We handle droppings safely, remove the population, and seal rural structures they favor.",
  "rodent-exclusion":
    "Exclusion is the permanent fix: we seal foundation gaps, vents, rooflines, and utility penetrations with rodent-proof materials.",
  "crawl-space-cleanout":
    "We remove contaminated insulation and droppings, sanitize, and restore the crawl space so it no longer attracts or shelters pests.",
  "attic-remediation":
    "After rodents or wildlife, we remove soiled insulation, sanitize, seal entry points, and re-insulate to current standards.",
  "termite-control":
    "We install and service proven termite defense systems that eliminate active colonies and protect the structure going forward.",
  "subterranean-termites":
    "Utah's termite is the subterranean termite, tunneling up from soil into sill plates. Our treatments intercept them at the soil line.",
  "termite-inspection":
    "Our inspectors check mud tubes, moisture zones, wood contact points, and past treatment evidence, then document everything in writing.",
  "real-estate-termite-inspection":
    "We deliver the wood-destroying organism documentation your closing needs, on the timeline your lender and title company expect.",
  "trelona-termite-system":
    "Trelona ATBS bait stations eliminate the colony itself, not just the foragers, with year-round monitoring by our technicians.",
  "pre-construction-termite-treatment":
    "Treating soil before the slab is poured is the cheapest termite protection a building will ever get. We work with your build schedule.",
  "post-construction-termite-treatment":
    "For existing structures we create a continuous treated zone around and beneath the foundation without tearing anything up.",
  "bed-bug-control":
    "Bed bugs survive amateur treatments. Our protocol combines inspection, targeted treatment, and follow-up verification until they are gone.",
  "bed-bug-inspection":
    "We inspect seams, headboards, outlets, and furniture joints, confirming live activity versus old evidence so you treat only if needed.",
  "aprehend-bed-bug-treatment":
    "Aprehend is a biopesticide barrier that bed bugs carry back to harborage, reaching the hidden bugs sprays miss, with less prep required.",
  "chemical-bed-bug-treatment":
    "Our conventional program rotates product classes to defeat resistant strains, with scheduled follow-ups to break the egg cycle.",
  "bed-bug-preparation":
    "Good prep makes or breaks treatment. We walk you through laundering, decluttering, and what to leave in place so treatment works.",
  "mosquito-control":
    "We treat shaded resting surfaces and standing water sources monthly through the season, cutting the population where it breeds.",
  "seasonal-mosquito-control":
    "From spring snowmelt to first frost, recurring visits keep your yard usable all season without you thinking about it.",
  "event-mosquito-control":
    "One-time treatments timed 24 to 48 hours before your wedding, reunion, or backyard event so guests stay comfortable.",
  "wildlife-control":
    "We humanely remove the animal, repair the damage, and exclude re-entry, handling the problem start to finish.",
  "bat-removal":
    "Bats are protected, so timing matters. We install one-way exits outside maternity season and seal the structure afterward.",
  "bird-control":
    "Netting, spikes, and deterrents installed where birds roost and nest, plus cleanup of the droppings they leave behind.",
  "pigeon-control":
    "Pigeons foul signage, HVAC, and ledges. We exclude roosting surfaces and remove nesting material so flocks relocate.",
  "squirrel-removal":
    "Squirrels chew through soffits and wiring. We trap or one-way-door the animals out, then repair and reinforce the entry points.",
  "skunk-control":
    "We trap and remove skunks denning under decks and sheds, then screen those spaces so the next skunk keeps moving.",
  "raccoon-control":
    "Raccoons in attics cause serious damage fast. We remove the animal, verify no young remain, and restore what they destroyed.",
  "commercial-pest-control":
    "Documented service, flexible scheduling, and audit-ready reporting designed around your business, not the other way around.",
  "property-management-pest-control":
    "One point of contact for your whole portfolio, with per-unit reporting and fast turnarounds between tenants.",
  "apartment-pest-control":
    "Multi-unit treatment protocols that stop pests from migrating unit to unit, with resident prep coordination handled by us.",
  "hoa-pest-control":
    "Community-wide programs for common areas and member homes, with consolidated billing and board-friendly reporting.",
  "self-storage-pest-control":
    "Rodent-focused programs for storage facilities: perimeter bait networks, monitoring, and documentation for your tenants' peace of mind.",
  "restaurant-pest-control":
    "Health-inspection-ready service with detailed logs, discreet scheduling, and protocols built for commercial kitchens.",
  "retail-pest-control":
    "Discreet service outside business hours that protects stock, storefronts, and your reputation with shoppers.",
  "office-building-pest-control":
    "Quiet, scheduled service for offices and common areas that keeps workspaces pest-free without disrupting your team.",
  "warehouse-pest-control":
    "Dock doors and inbound freight are the front line. We build interception programs sized for large footprints.",
  "manufacturing-pest-control":
    "Programs aligned with your QA requirements, including documentation and trend reporting for audits.",
  "school-pest-control":
    "IPM-first service for schools and daycares, scheduled around student hours, with products chosen for sensitive environments.",
  "church-pest-control":
    "Respectful, flexible scheduling for worship facilities, fellowship halls, and classrooms.",
  "hotel-pest-control":
    "Bed bug prevention and rapid-response protocols that protect guest reviews, plus discreet routine service.",
  "assisted-living-pest-control":
    "Gentle, resident-safe protocols for senior living communities, coordinated with your care staff.",
  "auto-dealership-pest-control":
    "We keep rodents out of inventory, showrooms, and service bays, protecting vehicles from wiring damage.",
};

/* ----------------------------------------------------- pest library facts */

type PestFacts = { id: string; habits: string; risk: string; prevent: string };

const PEST_FACTS: Record<string, PestFacts> = {
  Ants: {
    id: "Small social insects from 1/16 to 1/2 inch, usually black or brown, traveling in visible trails between the nest and food.",
    habits:
      "Colonies nest in soil, under slabs, and inside wall voids, sending workers along scent trails to kitchens and pet food.",
    risk: "Most Utah ants contaminate food; some, like carpenter ants, damage wood while nesting.",
    prevent:
      "Seal cracks, wipe up crumbs and spills quickly, store food in sealed containers, and keep tree branches trimmed off the house.",
  },
  "Carpenter Ants": {
    id: "Utah's largest ants, up to 1/2 inch, black or red-and-black, sometimes winged in spring.",
    habits:
      "They hollow out moist or damaged wood to nest, leaving piles of coarse sawdust called frass below exit holes.",
    risk: "Left alone, expanding galleries weaken window frames, decks, and structural lumber.",
    prevent:
      "Fix moisture problems and leaks, store firewood away from the house, and remove dead stumps near the foundation.",
  },
  "Pavement Ants": {
    id: "Small brown-black ants about 1/8 inch with faint grooves on the head and thorax.",
    habits:
      "They nest under driveways, sidewalks, and slabs, pushing up little sand craters between pavement joints.",
    risk: "Colonies invade kitchens in large numbers and contaminate anything sweet or greasy.",
    prevent:
      "Seal expansion joints and slab cracks, and keep outdoor eating areas free of crumbs.",
  },
  "Odorous House Ants": {
    id: "Tiny dark ants about 1/8 inch that give off a rotten-coconut smell when crushed.",
    habits:
      "Highly mobile colonies with many queens, relocating indoors near warmth and moisture when weather shifts.",
    risk: "They spread fast once inside and are notoriously hard to eliminate with store-bought sprays, which split colonies.",
    prevent:
      "Avoid repellent sprays, keep counters dry and clean, and eliminate honeydew-producing aphids on landscape plants.",
  },
  Spiders: {
    id: "Eight-legged arachnids from tiny cobweb spinners to inch-long hunters; most Utah species are harmless.",
    habits:
      "Spiders follow their prey indoors, settling in undisturbed corners, basements, garages, and window wells.",
    risk: "Webs and sightings alarm families, and black widows and hobo spiders warrant real caution.",
    prevent:
      "Knock down webs regularly, reduce exterior lighting that draws insect prey, and seal ground-level gaps.",
  },
  "Black Widow Spiders": {
    id: "Glossy black females about 1.5 inches across with the signature red hourglass under the abdomen.",
    habits:
      "They build strong, messy webs low to the ground in woodpiles, meter boxes, window wells, and garage corners.",
    risk: "Their venom is medically significant; bites need prompt medical attention, especially for children.",
    prevent:
      "Wear gloves around stored items, declutter garages and sheds, and treat exterior harborage each season.",
  },
  "Wolf Spiders": {
    id: "Fast, hairy hunting spiders up to 2 inches with excellent eyesight, often mistaken for tarantulas.",
    habits:
      "They chase prey on the ground instead of webbing, slipping under doors in late summer and fall.",
    risk: "Bites are rare and mild, but their size and speed make them the most startling spider in Utah homes.",
    prevent:
      "Install door sweeps, clear ground clutter near foundations, and reduce the insects they hunt.",
  },
  "Hobo Spiders": {
    id: "Brown funnel-weaving spiders about 1/2 inch with chevron markings on the abdomen.",
    habits:
      "They build funnel webs in low, dark spots and wander indoors in fall searching for mates.",
    risk: "Long blamed for necrotic bites; current science is mixed, but nobody wants them in the house.",
    prevent:
      "Seal foundation cracks, keep beds and storage off basement floors, and de-web window wells.",
  },
  Wasps: {
    id: "Slender stinging insects with narrow waists, from paper wasps to aggressive yellowjackets.",
    habits:
      "Queens start nests each spring under eaves, in wall voids, and underground, growing colonies through summer.",
    risk: "Stings hurt and can trigger severe allergic reactions; late-summer colonies defend nests aggressively.",
    prevent:
      "Knock down starter nests early, seal soffit gaps, and keep trash cans covered in summer.",
  },
  Yellowjackets: {
    id: "Bright yellow-and-black wasps about 1/2 inch that fly fast and sting repeatedly.",
    habits:
      "Colonies nest underground or in wall voids and scavenge sugary drinks and proteins at picnics.",
    risk: "They are Utah's most aggressive stinger, and disturbing a hidden ground nest can mean dozens of stings.",
    prevent:
      "Fill rodent burrows, cover food and drinks outdoors, and call a professional for any established nest.",
  },
  Hornets: {
    id: "Large social wasps, including the baldfaced hornet, black with ivory markings, up to 3/4 inch.",
    habits:
      "They build the classic gray paper footballs in trees and on building corners, housing hundreds by August.",
    risk: "Colonies defend the nest in force, and stings are more painful than a typical wasp's.",
    prevent:
      "Inspect trees and rooflines in early summer while nests are still small, and never seal an active void nest.",
  },
  "Paper Wasps": {
    id: "Reddish-brown wasps about 3/4 inch with long dangling legs in flight.",
    habits:
      "They build small open-comb umbrellas under eaves, in grills, and inside play structures.",
    risk: "Less aggressive than yellowjackets, but nests over doorways put stings one accidental bump away.",
    prevent:
      "Treat eaves in spring, check grills and mailboxes before use, and remove early nests promptly.",
  },
  Earwigs: {
    id: "Flat brown insects about 3/4 inch with unmistakable rear pincers.",
    habits:
      "They spend days in cool damp mulch and window wells and wander indoors at night through thresholds.",
    risk: "Harmless to people despite the folklore, but they chew seedlings and gather in unnerving numbers.",
    prevent:
      "Pull mulch back from the foundation, fix drippy spigots, and install tight door sweeps.",
  },
  "Box Elder Bugs": {
    id: "Black bugs 1/2 inch long with red-orange wing edging.",
    habits:
      "They feed on box elder and maple seeds all summer, then swarm warm south walls each fall seeking winter shelter.",
    risk: "Indoors they stain curtains and walls and reappear on every warm winter day.",
    prevent:
      "Seal gaps around siding and windows before fall, and treat gathering walls in September.",
  },
  Cockroaches: {
    id: "Flat, fast, greasy-looking insects from the 5/8 inch German roach to the inch-long Oriental roach.",
    habits:
      "They hide in cracks near warmth and moisture by day and forage kitchens at night.",
    risk: "Roaches spread bacteria to food surfaces, and their droppings trigger asthma and allergies.",
    prevent:
      "Deny water above all: fix leaks, dry sinks at night, keep food sealed, and inspect deliveries and boxes.",
  },
  "German Cockroaches": {
    id: "Light brown roaches 5/8 inch with two dark stripes behind the head.",
    habits:
      "Utah's fastest breeder indoors, hitching in on bags and appliances and exploding in kitchens and baths.",
    risk: "One egg case carries dozens of young, so a small sighting becomes an infestation within weeks.",
    prevent:
      "Inspect secondhand appliances, dry the sink at night, and act on the very first roach you see.",
  },
  "Oriental Cockroaches": {
    id: "Shiny black roaches about 1 inch, often called water bugs.",
    habits:
      "They live in floor drains, crawl spaces, and cool damp basements, entering along plumbing lines.",
    risk: "They carry bacteria from the drains and sewers they travel through onto floors and stored goods.",
    prevent:
      "Screen floor drains, fix crawl space moisture, and seal foundation penetrations.",
  },
  Crickets: {
    id: "Brown to black hopping insects up to 1 inch, with long antennae; males chirp.",
    habits:
      "They breed in tall grass and mulch, moving indoors as nights cool in late summer.",
    risk: "Beyond sleepless chirping, crickets chew fabrics, paper, and stored goods.",
    prevent:
      "Mow the yard margin, move woodpiles off the wall, and seal weep holes and door gaps.",
  },
  Fleas: {
    id: "Dark, side-flattened jumpers 1/8 inch long living on pets and in carpets.",
    habits:
      "Adults live on the animal; eggs and larvae develop in carpet, bedding, and shaded yard soil.",
    risk: "Itchy bites for pets and people, plus tapeworm transmission to pets.",
    prevent:
      "Keep pets on year-round vet-recommended prevention, vacuum frequently, and wash pet bedding hot.",
  },
  Ticks: {
    id: "Flat 8-legged parasites from poppy-seed nymphs to 1/4 inch fed adults.",
    habits:
      "They quest on grass tips and brush edges, latching onto hikers, pets, and kids passing by.",
    risk: "Utah ticks can transmit Rocky Mountain spotted fever, tularemia, and Colorado tick fever.",
    prevent:
      "Keep grass short, create bark or gravel borders along wild edges, and check family and pets after time outside.",
  },
  Silverfish: {
    id: "Wingless, teardrop-shaped gray insects 3/4 inch with three long tail bristles.",
    habits:
      "They favor humid storage spaces and feed at night on paper sizing, book bindings, and starches.",
    risk: "They ruin photos, documents, wallpaper, and stored fabrics slowly and silently.",
    prevent:
      "Run dehumidifiers, store keepsakes in sealed bins, and reduce paper clutter in basements.",
  },
  Beetles: {
    id: "Hard-shelled insects of many species, from 1/8 inch pantry beetles to inch-long ground beetles.",
    habits:
      "Ground beetles wander in under doors; product beetles breed inside stored food and fabrics.",
    risk: "Species determines the stakes, from nuisance sightings to infested flour and damaged wool.",
    prevent:
      "Identify before treating, keep dry goods sealed, and sweep exterior thresholds.",
  },
  "Carpet Beetles": {
    id: "Round beetles 1/8 inch mottled with black, white, and orange; larvae are fuzzy and carrot-shaped.",
    habits:
      "Adults fly to windows; larvae feed in dark closets on wool, hides, felt, and pet hair.",
    risk: "Larvae quietly destroy rugs, suits, taxidermy, and heirloom textiles.",
    prevent:
      "Dry-clean and seal seasonal clothing, vacuum along baseboards, and check cut flowers for hitchhikers.",
  },
  "Pantry Pests": {
    id: "Small moths and beetles, like Indian meal moths and flour weevils, that breed inside dry goods.",
    habits:
      "Infestations arrive inside a purchased package and spread to neighboring flour, grains, and pet food.",
    risk: "Webbing, larvae, and off flavors ruin far more food than the pests eat.",
    prevent:
      "Decant dry goods into airtight containers, rotate stock, and freeze suspect packages for a week.",
  },
  "Stink Bugs": {
    id: "Shield-shaped mottled brown bugs about 5/8 inch that release odor when crushed.",
    habits:
      "They feed on crops and gardens in summer, then slip into wall voids and attics for winter.",
    risk: "Mostly a smelly nuisance indoors, but heavy populations damage garden produce.",
    prevent:
      "Seal fall entry points, especially around window air conditioners and utility lines, and vacuum rather than swat.",
  },
  Millipedes: {
    id: "Slow, cylindrical many-legged arthropods 1 to 1.5 inches that coil when touched.",
    habits:
      "They live in moist mulch and leaf litter, migrating indoors en masse after heavy watering or rain.",
    risk: "Harmless but unwelcome, staining floors when crushed and arriving by the dozens.",
    prevent:
      "Water lawns in the morning, pull organic mulch back from the slab, and seal ground-level doors.",
  },
  Centipedes: {
    id: "Fast, flattened predators with long legs; the house centipede runs up to 1.5 inches.",
    habits:
      "They hunt insects at night in basements and bathrooms, favoring humid hiding spots.",
    risk: "Their presence signals other pest activity; large ones can pinch skin, though rarely.",
    prevent:
      "Dehumidify basements, clear floor-level clutter, and control the insects they eat.",
  },
  Flies: {
    id: "Two-winged insects from 1/8 inch fruit flies to 1/3 inch house flies.",
    habits:
      "Each species breeds in a specific material: drains, overripe fruit, trash, or animal waste.",
    risk: "Flies move bacteria from waste to food surfaces with every landing.",
    prevent:
      "Find and remove the breeding source, keep drains scrubbed, and tightly lid all trash.",
  },
  "House Flies": {
    id: "Gray flies 1/4 inch with four dark stripes behind the head.",
    habits:
      "They breed in garbage and pet waste, maturing from egg to adult in about a week in summer heat.",
    risk: "Each fly carries pathogens including Salmonella and E. coli on its feet and mouthparts.",
    prevent:
      "Empty and rinse trash cans weekly, clean up after pets promptly, and screen doors and windows.",
  },
  "Cluster Flies": {
    id: "Slightly larger than house flies with golden hairs on the thorax; sluggish flyers.",
    habits:
      "They parasitize earthworms in summer, then pack into attics and wall voids each fall, emerging on warm days.",
    risk: "A nuisance rather than a health threat, appearing at windows all winter long.",
    prevent:
      "Seal upper-story cracks and rooflines in late summer before the fall flight.",
  },
  Moths: {
    id: "Night-flying insects; the destructive indoor species are small, 1/2 inch, gold or gray.",
    habits:
      "Clothes moth larvae eat animal fibers in dark closets; pantry moth larvae web through dry goods.",
    risk: "Damage shows up as holes in wool and webbing in food long before adults are noticed.",
    prevent:
      "Store wool clean and sealed, keep pantries decanted into containers, and use pheromone monitors.",
  },
  "Clothes Moths": {
    id: "Weak-flying gold moths 1/2 inch that avoid light; larvae are white caterpillars in silken tubes.",
    habits:
      "Larvae graze on wool, cashmere, fur, and felt in undisturbed closets and under furniture.",
    risk: "They ruin heirloom textiles and expensive wardrobes invisibly until holes appear.",
    prevent:
      "Launder or dry-clean before storing, vacuum closet floors, and rotate stored garments seasonally.",
  },
  Mice: {
    id: "Small rodents 2.5 to 4 inches with large ears; droppings are rice-grain sized and pointed.",
    habits:
      "They enter through dime-sized gaps in fall, nesting in walls, garages, and stored boxes near food.",
    risk: "Mice gnaw wiring, contaminate food and surfaces, and reproduce monthly once inside.",
    prevent:
      "Seal every gap larger than a pencil, store bird seed and pet food in metal bins, and declutter storage.",
  },
  "House Mice": {
    id: "Gray-brown mice about 3 inches with nearly hairless tails and a musky odor at high populations.",
    habits:
      "Utah's most common indoor rodent, living entirely inside once established and rarely traveling far from the nest.",
    risk: "Constant droppings and urine marking wherever they travel, including drawers and pantries.",
    prevent:
      "Focus on kitchens and garages: sealed food, sealed gaps, and snap traps at the first dropping.",
  },
  "Deer Mice": {
    id: "Two-toned mice, brown above and white below, with white feet and furred tails.",
    habits:
      "They favor rural and foothill properties, cabins, sheds, and vehicles parked long-term.",
    risk: "Deer mice are Utah's hantavirus carrier, making their droppings a genuine health hazard.",
    prevent:
      "Never dry-sweep droppings; ventilate and disinfect first. Seal outbuildings and stored vehicles.",
  },
  Rats: {
    id: "Heavy-bodied rodents 7 to 10 inches plus tail; droppings are capsule-shaped and 1/2 inch or more.",
    habits:
      "Cautious and smart, they travel established runs along walls and fences, often at night only.",
    risk: "Rats gnaw structural wood, pipes, and wiring, and contaminate anything they cross.",
    prevent:
      "Remove outdoor food sources, harvest fruit trees fully, and seal openings larger than a quarter.",
  },
  "Norway Rats": {
    id: "Stocky brown rats up to 10 inches with tails shorter than their bodies.",
    habits:
      "Burrowers by nature, they dig under foundations, sheds, and compost piles and travel at ground level.",
    risk: "Their burrowing undermines slabs and their gnawing reaches wiring and plumbing.",
    prevent:
      "Eliminate ground clutter and burrow harborage, secure compost, and screen crawl space vents.",
  },
  "Roof Rats": {
    id: "Sleek black rats with tails longer than their bodies, agile climbers.",
    habits:
      "They travel power lines and tree limbs onto rooflines, entering attics through gaps at the eaves.",
    risk: "Attic nesting damages insulation and wiring, a documented fire hazard.",
    prevent:
      "Trim branches 4 feet off the roof, cap vents, and seal eave and soffit gaps.",
  },
  Voles: {
    id: "Stocky mouse-like rodents 4 to 6 inches with short tails and small hidden ears.",
    habits:
      "They stay outdoors, carving surface runways through turf and tunneling under snow all winter.",
    risk: "Spring reveals dead runway trails across lawns and girdled bark on young trees and shrubs.",
    prevent:
      "Mow close in fall, pull mulch away from trunks, and install trunk guards on young trees.",
  },
  "Pack Rats": {
    id: "Large-eared, bushy-tailed woodrats up to 8 inches that hoard shiny objects and debris.",
    habits:
      "They build bulky stick nests in garages, sheds, woodpiles, and vehicle engine compartments.",
    risk: "Chewed wiring in vehicles and equipment is their signature damage, and nests attract other pests.",
    prevent:
      "Park seldom-used vehicles away from brush, elevate stored lumber, and remove nest material completely.",
  },
  "Subterranean Termites": {
    id: "Cream-colored soft insects 1/8 inch; soldiers have amber heads; swarmers are dark with equal wings.",
    habits:
      "Colonies live in soil and travel mud tubes up foundations to feed on structural wood around the clock.",
    risk: "The most economically damaging pest in Utah, silently hollowing sills, studs, and floors.",
    prevent:
      "Keep wood off soil, fix grade and moisture issues, and get annual professional inspections.",
  },
  "Termite Swarmers": {
    id: "Dark winged termites 3/8 inch with straight antennae and two equal wing pairs that shed quickly.",
    habits:
      "Colonies release swarmers on warm spring days to found new colonies, often exiting indoors near windows.",
    risk: "A swarm indoors means an established colony is already feeding somewhere in the structure.",
    prevent:
      "Save a few specimens for identification and schedule an inspection immediately; wings alone confirm activity.",
  },
  "Termite Mud Tubes": {
    id: "Pencil-width earthen tunnels running up foundations, piers, and crawl space walls.",
    habits:
      "Termites build them to travel between soil moisture and wood while staying protected from open air.",
    risk: "Tubes are the definitive sign of active or past termite feeding on the structure.",
    prevent:
      "Break a small section and check for live termites, then leave the rest intact for the inspector.",
  },
  "Termite Damage": {
    id: "Hollowed wood with mud-lined galleries along the grain, paint bubbling, and sagging floors.",
    habits:
      "Termites eat wood from the inside out, so surfaces look fine until a screwdriver sinks through.",
    risk: "Repair costs multiply the longer feeding continues; insurance rarely covers it.",
    prevent:
      "Probe suspect wood annually, act on any hollow sound, and maintain a termite protection plan.",
  },
  "Bed Bugs": {
    id: "Flat, oval, reddish-brown insects, apple-seed sized, hiding in seams and cracks near beds.",
    habits:
      "They feed on sleeping people at night and ride luggage, furniture, and laundry between homes.",
    risk: "Itchy welts, lost sleep, and rapid spread through a home or building if untreated.",
    prevent:
      "Inspect hotel beds and secondhand furniture, keep luggage off beds, and act on the first bite pattern.",
  },
  "Bed Bug Eggs": {
    id: "Pearl-white ovals the size of a pinhead, glued in clusters inside seams, screw holes, and cracks.",
    habits:
      "Females lay 1 to 5 eggs daily; eggs hatch in about 10 days and resist many contact sprays.",
    risk: "Surviving eggs are why one-shot treatments fail and infestations rebound.",
    prevent:
      "Professional follow-up visits timed to the hatch cycle are the reliable way to break it.",
  },
  "Bed Bug Bites": {
    id: "Red, itchy welts, often in lines or clusters of three on skin exposed during sleep.",
    habits:
      "Bites appear overnight, though reactions can be delayed days and vary wildly by person.",
    risk: "Bites alone cannot confirm bed bugs; misdiagnosis wastes treatment money.",
    prevent:
      "Confirm with physical evidence, live bugs, shed skins, or fecal spotting, before treating anything.",
  },
  Mosquitoes: {
    id: "Slender biting flies 1/4 inch; females take blood meals to develop eggs.",
    habits:
      "They breed in any standing water lasting a week and rest in shaded foliage by day.",
    risk: "Utah mosquitoes can carry West Nile virus, and they ruin summer evenings outright.",
    prevent:
      "Dump standing water weekly, keep gutters flowing, and treat resting foliage during the season.",
  },
  Bats: {
    id: "Utah's flying mammals, mostly small brown species with a 9 to 12 inch wingspan.",
    habits:
      "Colonies roost in attics, chimneys, and gaps behind shutters, exiting at dusk to feed on insects.",
    risk: "Guano accumulates health risks, and any bat-human contact requires rabies evaluation.",
    prevent:
      "Bats are protected: exclusion must use one-way devices outside maternity season, never poisons.",
  },
  Birds: {
    id: "Nuisance species around structures, chiefly pigeons, starlings, and house sparrows.",
    habits:
      "They nest in vents, signage, and ledges, returning to the same protected spots year after year.",
    risk: "Droppings corrode surfaces and carry histoplasmosis; nests block vents and start fires.",
    prevent:
      "Screen vents, install deterrents on ledges, and remove nests before eggs are laid.",
  },
  Pigeons: {
    id: "Stocky gray birds with iridescent necks, thriving on buildings that mimic cliff faces.",
    habits:
      "Flocks roost on ledges, rooftops, and under solar panels, fouling everything below.",
    risk: "Acidic droppings damage roofs, walkways, and HVAC, and create slip hazards.",
    prevent:
      "Exclude roosting surfaces with spikes, netting, or wire, and never feed them.",
  },
  Squirrels: {
    id: "Bushy-tailed tree rodents, gray or red, active by day.",
    habits:
      "They enter attics through eave gaps and chewed openings, nesting in insulation, especially in fall.",
    risk: "Chewed wiring, ruined insulation, and daytime scratching in ceilings.",
    prevent:
      "Trim branches off the roof, reinforce eave vents with metal screen, and act fast at the first sound.",
  },
  Skunks: {
    id: "Black-and-white striped mammals, cat-sized, with the famous defensive spray.",
    habits:
      "They den under decks, sheds, and porches and dig small cone-shaped holes in lawns for grubs.",
    risk: "Spray incidents with pets, lawn damage, and rabies risk in rare cases.",
    prevent:
      "Screen deck skirting into the ground, control lawn grubs, and remove pet food at night.",
  },
  Raccoons: {
    id: "Masked, ringtailed mammals 2 to 3 feet long, strong and dexterous.",
    habits:
      "Mothers tear into attics and chimneys each spring to den; all raid trash and pet food at night.",
    risk: "Serious structural damage, contaminated insulation, and raccoon roundworm in droppings.",
    prevent:
      "Lock trash lids, cap chimneys, and reinforce soffits before spring denning season.",
  },
};

/* ----------------------------------------------------------- shared bits */

const GUAR_SENTENCE = `${GUARANTEE_VERBATIM}`;

const SAFETY_ANSWER = `Yes. ${EPA_CLAIM_VERBATIM} Our technicians are licensed and follow label directions exactly, and we will walk you through any prep or re-entry timing for your home.`;

const CTA_LINE = [
  `Call ${PHONE_DISPLAY} or request a free quote online and we will get you scheduled.`,
  `Request a free estimate online or call ${PHONE_DISPLAY} to get on the schedule.`,
  `Get your free quote today: call ${PHONE_DISPLAY} or use our two-minute request form.`,
];

/* ------------------------------------------------------ city service page */

function buildCityService(c: Ctx): Generated {
  const seed = c.path;
  const city = c.city ?? "your city";
  const cshort = countyShort(c.county);
  const service = c.servicePest ?? "Pest Control";
  const svc = lc(service);
  const pest = pestNoun(service);
  const angle = SERVICE_ANGLE[c.slug ?? ""] ?? SERVICE_ANGLE["pest-control"];

  const heroHeadline = pick(
    [
      `${service} in ${city}, Utah`,
      `${city} ${service}`,
      `Expert ${service} in ${city}, UT`,
      `${service} for ${city} Homes and Businesses`,
      `Trusted ${service} in ${city}`,
    ],
    seed,
    "hh"
  );

  const heroSub = pick(
    [
      `Local, licensed technicians serving ${city} and the rest of ${cshort} County, backed by our simple promise: ${GUAR_SENTENCE}`,
      `Antex Pest Solutions protects ${city} properties with safe, effective ${svc}. ${GUAR_SENTENCE}`,
      `Fast scheduling, honest pricing, and results that last. That is ${svc} the Antex way, right here in ${city}.`,
      `From first inspection to final walkthrough, our ${cshort} County team handles ${pest} so you do not have to.`,
      `Rated ${RATING.stars} stars across ${RATING.reviews} reviews, Antex delivers ${svc} that ${city} neighbors recommend.`,
    ],
    seed,
    "hs"
  );

  const intro = pick(
    [
      `When ${pest} show up in ${city}, you want them gone quickly and you want them to stay gone. Antex Pest Solutions has protected Utah homes and businesses since 2014, and our ${cshort} County technicians know exactly how local conditions drive ${pest} onto your property. We start with a careful inspection, treat the source rather than just the symptoms, and stand behind every visit.`,
      `${city} sits in one of Utah's most active regions for ${pest}, and every season brings a new wave of pressure. Antex Pest Solutions combines local experience with proven products to stop infestations at the source. No scare tactics and no upselling, just straightforward ${svc} done right the first time.`,
      `Antex Pest Solutions provides professional ${svc} throughout ${city} and ${cshort} County. Our licensed technicians live and work along the same streets you do, so we know how ${pest} behave here, where they hide, and what it actually takes to keep them out of your home or business.`,
      `Finding ${pest} on your ${city} property is stressful. Getting rid of them should not be. Antex makes ${svc} simple: a thorough inspection, a clear plan and price, treatment performed by licensed technicians, and follow-through until the problem is solved.`,
      `For ${city} families and businesses dealing with ${pest}, Antex Pest Solutions is the local team neighbors recommend. We pair modern, targeted treatments with old-fashioned accountability, and we put our guarantee in writing.`,
    ],
    seed,
    "intro"
  );

  const whyBody = pick(
    [
      `${city}'s mix of established neighborhoods, newer construction, and irrigated landscaping gives ${pest} everything they need: moisture, shelter, and easy access. Utah's hot, dry summers push pests toward watered yards and cool foundations, and cold winters drive them indoors. ${angle}`,
      `Along the Wasatch corridor, ${pest} pressure rises sharply from spring through fall, and ${city} is no exception. Warm weather accelerates breeding while irrigation and shade landscaping concentrate activity around structures. ${angle}`,
      `Every ${city} property has its pressure points: expansion joints, utility penetrations, mulch beds, and the transition where lawn meets foundation. That is where ${pest} stage before they move inside. ${angle}`,
      `Utah's climate swings from baking summers to freezing winters, and ${pest} respond by seeking the stable shelter your ${city} home provides. ${angle}`,
    ],
    seed,
    "why"
  );

  const processBody = pick(
    [
      `Every job starts with a full inspection of your ${city} property, inside and out, so we treat what is actually there. You get a clear findings report and a flat price before any work begins. Treatment targets harborage and entry points, not just visible activity, and we document everything we do. Then we follow up, because lasting results come from verification, not hope.`,
      `First we inspect: attic to foundation, fence line to door threshold. Then we explain what we found in plain language and quote the work up front. Our licensed technician performs a targeted treatment designed for ${pest}, and we schedule any follow-up the situation calls for. You always know what was done and why.`,
      `We built our process around one idea: solve it at the source. That means identifying the species, locating nesting and entry sites on your ${city} property, treating with precision, and sealing the routes pests use to return. Recurring plans add seasonal barrier treatments timed to Utah's pest calendar.`,
      `Inspection, treatment, verification. Our technicians identify exactly which ${pest} you are dealing with and where they are coming from, apply the right product in the right places, and confirm results on follow-up. It is methodical on purpose, because shortcuts are why infestations come back.`,
    ],
    seed,
    "process"
  );

  const localBody = pick(
    [
      `Antex is not a national call center. We are a Utah company, and ${cshort} County is home turf. When you call ${PHONE_DISPLAY}, you reach people who know ${city}, can talk through what you are seeing, and can usually get a technician out fast. Our ${RATING.stars}-star rating across ${RATING.reviews} reviews reflects how seriously we take that.`,
      `We have served ${cshort} County since 2014, and our technicians treat properties in and around ${city} every week. That local mileage matters: we know which pests surge in which month, how local construction styles create entry points, and what actually works here.`,
      `Your neighbors in ${city} already rely on Antex for ${svc}, and our reviews show it: ${RATING.stars} stars across ${RATING.reviews} reviews. We earn that by showing up on time, communicating clearly, and standing behind the work.`,
      `From ${city} to every corner of ${cshort} County, Antex technicians are in your area constantly, which means flexible scheduling and quick response when something cannot wait.`,
    ],
    seed,
    "local"
  );

  const sections = [
    {
      heading: pick(
        [
          `Why ${city} properties deal with ${pest}`,
          `${pest.charAt(0).toUpperCase() + pest.slice(1)} pressure in ${city}`,
          `What drives ${pest} in ${city}`,
        ],
        seed,
        "s1h"
      ),
      body: whyBody,
    },
    {
      heading: pick(
        [
          `Our ${svc} process`,
          `How our ${svc} works`,
          `What to expect from Antex ${svc}`,
        ],
        seed,
        "s2h"
      ),
      body: processBody,
    },
    {
      heading: pick(
        [
          `A local team that knows ${cshort} County`,
          `${city}'s hometown pest experts`,
          `Why ${city} chooses Antex`,
        ],
        seed,
        "s3h"
      ),
      body: localBody,
    },
    {
      heading: "Our guarantee",
      body: `We keep it simple: ${GUAR_SENTENCE} Recurring service customers in ${city} never pay extra for a re-visit between treatments. ${pick(CTA_LINE, seed, "cta")}`,
    },
  ];

  const faqPool = [
    {
      question: `How much does ${svc} cost in ${city}?`,
      answer: `Pricing depends on the size of your property and the extent of the activity, so we quote after a quick inspection rather than guessing over the phone. Quotes are free, flat, and honored: the price we give is the price you pay. Call ${PHONE_DISPLAY} for a fast estimate.`,
    },
    {
      question: `How quickly can you get to my ${city} property?`,
      answer: `Our technicians work throughout ${countyShort(c.county)} County every week, and we can typically schedule ${city} visits within a day or two. If you have an urgent situation, call ${PHONE_DISPLAY} and we will do everything we can to get someone out same-day or next-day.`,
    },
    {
      question: "Are your treatments safe for kids and pets?",
      answer: SAFETY_ANSWER,
    },
    {
      question: `What if the ${pest} come back after treatment?`,
      answer: `Then so do we, at no charge. ${GUAR_SENTENCE} That guarantee is written into every recurring service plan we offer in ${city}.`,
    },
    {
      question: `Do I need recurring service or a one-time treatment?`,
      answer: `It depends on the pest and the season. One-time treatments solve isolated problems, but most ${city} homeowners choose a recurring plan because Utah's pest pressure changes month to month, and consistent barrier treatments prevent the next infestation instead of reacting to it. We will recommend honestly either way.`,
    },
    {
      question: `Do you serve areas around ${city} too?`,
      answer: `Yes. We cover all of ${countyShort(c.county)} County and 12 other Utah counties, so if you have family or a business nearby, we can help there as well.`,
    },
  ];
  const faqs = rotate(faqPool, seed, "faqrot").slice(0, 4);

  const metaDescription = pick(
    [
      `Professional ${svc} in ${city}, UT from Antex Pest Solutions. Licensed local techs, guaranteed results. Free quotes: ${PHONE_DISPLAY}.`,
      `Need ${svc} in ${city}? Antex Pest Solutions delivers safe, effective, guaranteed service across ${cshort} County. Call ${PHONE_DISPLAY}.`,
      `Antex Pest Solutions: trusted ${svc} for ${city} homes and businesses. ${RATING.stars}-star rated. Free estimates at ${PHONE_DISPLAY}.`,
    ],
    seed,
    "meta"
  );

  return { metaDescription, heroHeadline, heroSub, intro, sections, faqs };
}

/* --------------------------------------------------------------- city hub */

function buildCityHub(c: Ctx): Generated {
  const seed = c.path;
  const city = c.city ?? c.title;
  const cshort = countyShort(c.county);

  const heroHeadline = pick(
    [
      `Pest Control in ${city}, Utah`,
      `${city} Pest Control Services`,
      `Your ${city} Pest Control Team`,
    ],
    seed,
    "hh"
  );

  return {
    metaDescription: `Antex Pest Solutions serves ${city}, UT with complete pest control: ants, spiders, rodents, wasps, termites, bed bugs and more. Call ${PHONE_DISPLAY}.`,
    heroHeadline,
    heroSub: pick(
      [
        `Complete pest protection for ${city} homes and businesses, from ants and spiders to rodents, termites, and wildlife. ${GUAR_SENTENCE}`,
        `Antex Pest Solutions covers every corner of ${city} with licensed technicians, honest pricing, and guaranteed results.`,
        `Whatever is bugging you in ${city}, we handle it: 27 services, one local team, ${RATING.stars} stars across ${RATING.reviews} reviews.`,
      ],
      seed,
      "hs"
    ),
    intro: pick(
      [
        `${city} is part of our ${cshort} County service area, which means Antex technicians are nearby every week. Below you will find every pest control service we offer in ${city}. Each one comes with a free inspection, a flat quote, and our written re-service guarantee.`,
        `From quarterly home protection plans to targeted rodent, termite, and bed bug work, Antex Pest Solutions brings full-service pest control to ${city}. Browse the services below, or call ${PHONE_DISPLAY} and describe what you are seeing. We will point you to the right fix.`,
        `Antex has served ${cshort} County since 2014, and ${city} properties are on our routes every week. Every service below is performed by licensed technicians using products chosen for homes with kids and pets.`,
      ],
      seed,
      "intro"
    ),
    sections: [
      {
        heading: `Pest pressure in ${city}`,
        body: pick(
          [
            `Like most of ${cshort} County, ${city} sees ants, spiders, and wasps surge through the warm months, box elder bugs swarm in fall, and mice push indoors as temperatures drop. Irrigated yards and mature landscaping keep pest populations active well beyond what the desert climate would suggest. A seasonal barrier program handles most of it; the services below handle the rest.`,
            `Utah's climate sets the pest calendar in ${city}: spring brings ants and termite swarmers, summer peaks with wasps and spiders, fall drives box elder bugs and rodents toward structures, and winter concentrates everything indoors. Our recurring plans are timed to that rhythm.`,
            `Between the benches, older tree-lined streets, and new construction, ${city} offers pests plenty of habitat. The most common calls we get here are for ants, spiders, wasps, rodents, and seasonal invaders, and our technicians see local conditions weekly.`,
          ],
          seed,
          "s1"
        ),
      },
      {
        heading: "How service works",
        body: `Every ${city} job starts with a free inspection and a flat, up-front quote. A licensed Antex technician treats the source of the problem, documents the work, and schedules any follow-up needed. Recurring customers get seasonal exterior treatments year-round. And everything is backed by our promise: ${GUAR_SENTENCE}`,
      },
    ],
    faqs: [
      {
        question: `Do you charge extra to come out to ${city}?`,
        answer: `No. ${city} is inside our standard ${cshort} County service area, so there are no travel fees. You pay the quoted service price and nothing else.`,
      },
      {
        question: "Are your treatments safe for kids and pets?",
        answer: SAFETY_ANSWER,
      },
      {
        question: "How soon can you come out?",
        answer: `Usually within a day or two, and often faster. Our routes cover ${city} weekly. Call ${PHONE_DISPLAY} and we will find the first opening.`,
      },
    ],
  };
}

/* ------------------------------------------------------------- county hub */

function buildCountyHub(c: Ctx): Generated {
  const seed = c.path;
  const county = c.county ?? c.title;
  const cshort = countyShort(county);

  return {
    metaDescription: `Antex Pest Solutions serves ${county}, Utah with full-service pest control in every city. Licensed, guaranteed, ${RATING.stars}-star rated. ${PHONE_DISPLAY}.`,
    heroHeadline: pick(
      [
        `Pest Control in ${county}, Utah`,
        `${county} Pest Control Services`,
        `Serving All of ${county}`,
      ],
      seed,
      "hh"
    ),
    heroSub: pick(
      [
        `Licensed local technicians covering every city in ${county}, with 27 services and one simple guarantee: ${GUAR_SENTENCE}`,
        `From ants to wildlife, Antex protects ${cshort} County homes and businesses with safe, effective, guaranteed pest control.`,
      ],
      seed,
      "hs"
    ),
    intro: pick(
      [
        `Antex Pest Solutions has served ${county} since 2014. Our technicians run routes through the county every week, which means fast scheduling, local knowledge, and no travel fees anywhere below. Choose your city to see every service we offer there, or call ${PHONE_DISPLAY} to talk through what you are seeing.`,
        `${county} is a core part of our Utah service area. Every city listed below gets the full Antex lineup: general pest plans, rodent control and exclusion, termite systems, bed bug treatment, mosquito programs, and wildlife removal, all backed by our written guarantee.`,
      ],
      seed,
      "intro"
    ),
    sections: [
      {
        heading: `What we treat in ${cshort} County`,
        body: `The heavy hitters in ${county} are ants, spiders, and wasps through the warm months, box elder bugs and stink bugs each fall, and mice, rats, and voles when the weather turns. We also run termite inspections and Trelona bait systems, bed bug protocols, seasonal mosquito programs, and humane wildlife removal. If it invades homes or businesses in Utah, we handle it.`,
      },
      {
        heading: "Local coverage, county-wide",
        body: `Because our routes cross ${cshort} County weekly, we schedule fast and show up when we say we will. Every visit is performed by a licensed technician, documented, and backed by our re-service guarantee. ${GUAR_SENTENCE}`,
      },
    ],
    faqs: [
      {
        question: `Which cities in ${county} do you serve?`,
        answer: `All of them. The city pages below list every community we serve in ${county}, and if yours is not listed, call ${PHONE_DISPLAY}; we almost certainly still cover you.`,
      },
      {
        question: "Is there a travel fee?",
        answer: `No. All of ${county} is inside our standard service area.`,
      },
      {
        question: "Are your treatments safe for kids and pets?",
        answer: SAFETY_ANSWER,
      },
    ],
  };
}

/* ------------------------------------------------------------ service page */

function buildServicePage(c: Ctx): Generated {
  const seed = c.path;
  const service = c.servicePest ?? c.title;
  const svc = lc(service);
  const pest = pestNoun(service);
  const angle = SERVICE_ANGLE[c.slug ?? ""] ?? "";

  return {
    metaDescription: pick(
      [
        `${service} across Utah from Antex Pest Solutions. Licensed technicians, safe products, guaranteed results. Free quotes: ${PHONE_DISPLAY}.`,
        `Utah ${svc} done right. Antex Pest Solutions: ${RATING.stars}-star rated, licensed, guaranteed. Call ${PHONE_DISPLAY} for a free estimate.`,
      ],
      seed,
      "meta"
    ),
    heroHeadline: pick(
      [`${service} in Utah`, `Utah ${service}`, `Professional ${service}`],
      seed,
      "hh"
    ),
    heroSub: pick(
      [
        `Safe, effective ${svc} for homes and businesses across 13 Utah counties. ${GUAR_SENTENCE}`,
        `Licensed Antex technicians deliver ${svc} that actually lasts, backed by ${RATING.reviews} five-star reviews statewide.`,
        `From the first inspection to the final follow-up, Antex handles ${svc} start to finish, guaranteed.`,
      ],
      seed,
      "hs"
    ),
    intro: `${angle} Antex Pest Solutions has provided professional ${svc} across Utah since 2014. Every job starts with a real inspection and a flat quote, is performed by a licensed technician, and is backed by our written guarantee. ${pick(CTA_LINE, seed, "cta")}`,
    sections: [
      {
        heading: `What our ${svc} includes`,
        body: pick(
          [
            `A thorough inspection to confirm the species and locate activity, a clear written quote, targeted treatment of harborage and entry points, and scheduled follow-up where the situation calls for it. We treat causes, not just symptoms, so results hold up long after we leave.`,
            `Everything the job actually needs and nothing you do not: identification, source treatment, entry-point work, and documented results. Our technicians explain what they found and what they did in plain language, every visit.`,
          ],
          seed,
          "s1"
        ),
      },
      {
        heading: "Why homeowners choose Antex",
        body: `We are a Utah company with local technicians, not a national franchise call center. Our ${RATING.stars}-star rating across ${RATING.reviews} reviews comes from showing up on time, quoting honestly, and standing behind the work. ${EPA_CLAIM_VERBATIM}`,
      },
      {
        heading: "Our guarantee",
        body: `${GUAR_SENTENCE} If ${pest} give you trouble between visits, one call to ${PHONE_DISPLAY} puts a technician back on your property at no charge.`,
      },
      {
        heading: "Serving all of Utah",
        body: `Antex provides ${svc} across 13 counties, from Salt Lake and Utah County to Washington County in the south. Wherever you are, a licensed local technician is nearby. Browse our service areas or call to confirm coverage for your address.`,
      },
    ],
    faqs: [
      {
        question: `How much does ${svc} cost?`,
        answer: `It depends on property size and the extent of activity, which is why we inspect first and quote flat. Estimates are free and the quoted price is the final price. Call ${PHONE_DISPLAY} to get started.`,
      },
      {
        question: "Are your treatments safe for kids and pets?",
        answer: SAFETY_ANSWER,
      },
      {
        question: `What if the problem comes back?`,
        answer: `${GUAR_SENTENCE} That is in writing on every recurring plan.`,
      },
      {
        question: "How soon can you come out?",
        answer: `Typically within a day or two anywhere in our 13-county service area. Call ${PHONE_DISPLAY} for the first available opening in your city.`,
      },
    ],
  };
}

/* -------------------------------------------------------------- pest page */

function buildPestDetail(c: Ctx): Generated {
  const seed = c.path;
  const name = c.title;
  const facts =
    PEST_FACTS[name] ??
    ({
      id: `${name} are among the pests Utah homeowners report most often.`,
      habits: `${name} seek food, moisture, and shelter around structures, with activity peaking in the warm months.`,
      risk: `Left untreated, ${lc(name)} populations grow and become harder to eliminate.`,
      prevent: `Seal entry points, reduce moisture, and keep food sources secured.`,
    } as PestFacts);

  return {
    metaDescription: `${name} in Utah: how to identify them, the risks they pose, and how Antex Pest Solutions gets rid of them for good. Call ${PHONE_DISPLAY}.`,
    heroHeadline: pick(
      [`${name} in Utah`, `${name}: Identification and Control`, `All About ${name}`],
      seed,
      "hh"
    ),
    heroSub: pick(
      [
        `What ${lc(name)} look like, why they are on your property, and how Antex eliminates them, guaranteed.`,
        `Your field guide to ${lc(name)} in Utah, from identification to professional control.`,
      ],
      seed,
      "hs"
    ),
    intro: `${facts.id} This page covers how to recognize ${lc(name)}, what draws them to Utah properties, and what actually works to get rid of them. If you think you have ${lc(name)} now, skip ahead and call ${PHONE_DISPLAY}; inspections are free.`,
    sections: [
      { heading: `How to identify ${lc(name)}`, body: facts.id },
      { heading: "Behavior and habits", body: facts.habits },
      { heading: `Why ${lc(name)} are a problem`, body: facts.risk },
      {
        heading: `How Antex handles ${lc(name)}`,
        body: `Our technicians confirm the species first, because effective control depends on it. Then we treat the source: nesting sites, harborage, and the routes onto your property, using professional products applied precisely. ${GUAR_SENTENCE}`,
      },
      { heading: "Prevention tips", body: facts.prevent },
    ],
    faqs: [
      {
        question: `Are ${lc(name)} dangerous?`,
        answer: facts.risk,
      },
      {
        question: `How do I get rid of ${lc(name)}?`,
        answer: `Store-bought products usually treat the symptom, not the source, which is why the problem returns. Professional control pairs correct identification with source treatment. Call ${PHONE_DISPLAY} for a free inspection and flat quote.`,
      },
      {
        question: `How do I keep ${lc(name)} away?`,
        answer: facts.prevent,
      },
    ],
  };
}

/* ---------------------------------------------------------- pest category */

const CATEGORY_COPY: Record<string, { blurb: string; body: string }> = {
  Insects: {
    blurb:
      "Ants, spiders, wasps, roaches, and the rest of Utah's most common household invaders.",
    body: "Insects make up the bulk of Utah pest calls: ant trails in the kitchen, spiders in the basement, wasps under the eaves, box elder bugs on the south wall every fall. Browse the profiles below to identify what you are seeing, or call us and describe it. Correct identification is the first step in getting rid of anything.",
  },
  Rodents: {
    blurb:
      "Mice, rats, voles, and pack rats: Utah's cold-season home invaders.",
    body: "Rodents cause more structural damage than any pest except termites, gnawing wiring, contaminating food, and nesting in insulation. Utah sees house mice and deer mice indoors, Norway and roof rats in urban areas, and voles tearing up lawns. Identification matters because trapping and exclusion strategies differ by species.",
  },
  Termites: {
    blurb:
      "Subterranean termites and the warning signs they leave behind.",
    body: "Utah's termite is the subterranean termite, and it causes the most expensive pest damage in the state, usually before anyone notices. Learn the warning signs below: swarmers in spring, mud tubes on foundations, and wood that sounds hollow. If you see any of them, an inspection cannot wait.",
  },
  "Bed Bugs": {
    blurb:
      "Identification, eggs, bites, and why professional treatment is the only fix.",
    body: "Bed bugs are Utah's most stubborn indoor pest, resistant to store-bought sprays and expert at hiding. These profiles cover the bugs themselves, their eggs, and how to read bite patterns, so you can confirm what you are dealing with before spending a dollar on the wrong fix.",
  },
  Mosquitoes: {
    blurb: "Utah's summer biters and how to take your yard back.",
    body: "Mosquitoes breed in any standing water that lasts a week, and Utah's irrigation culture gives them plenty. Beyond ruining evenings, local species can carry West Nile virus. Learn their habits below, then let our seasonal program cut the population where it breeds.",
  },
  Wildlife: {
    blurb:
      "Bats, birds, squirrels, skunks, and raccoons around Utah structures.",
    body: "When wildlife moves into attics, chimneys, and crawl spaces, the damage adds up fast and the removal rules matter: several Utah species are protected and require specific humane methods. These profiles explain what you are hearing in the walls and how professional removal works.",
  },
};

function buildPestCategory(c: Ctx): Generated {
  const name = c.title;
  const copy = CATEGORY_COPY[name] ?? {
    blurb: `Utah's most common ${lc(name)}.`,
    body: `Profiles of the ${lc(name)} Utah property owners deal with most.`,
  };
  return {
    metaDescription: `${name} of Utah: identification guides and control advice from Antex Pest Solutions. ${copy.blurb} Call ${PHONE_DISPLAY}.`,
    heroHeadline: `${name}`,
    heroSub: copy.blurb,
    intro: copy.body,
    sections: [
      {
        heading: "When to call a professional",
        body: `Identification guides help you understand the problem, but established infestations need professional treatment at the source. Antex inspections are free, quotes are flat, and every job is backed by our guarantee. ${GUAR_SENTENCE}`,
      },
    ],
    faqs: [],
  };
}

/* ------------------------------------------------------------- core pages */

function buildCore(c: Ctx): Generated {
  const seed = c.path;
  const base: Generated = {
    metaDescription: "",
    heroHeadline: c.title,
    heroSub: "",
    intro: "",
    sections: [],
    faqs: [],
  };

  const FAQ_SETS: Record<string, { sub: string; faqs: { question: string; answer: string }[] }> = {
    "/faq": {
      sub: "Straight answers to the questions we hear most.",
      faqs: [
        {
          question: "Do you offer free inspections?",
          answer: `Yes. Every service starts with a free inspection and a flat written quote. Call ${PHONE_DISPLAY} to schedule.`,
        },
        {
          question: "Are your treatments safe for kids and pets?",
          answer: SAFETY_ANSWER,
        },
        {
          question: "What is your guarantee?",
          answer: `${GUAR_SENTENCE} It is written into every recurring service plan.`,
        },
        {
          question: "What areas do you serve?",
          answer:
            "We serve 13 Utah counties, including Salt Lake, Utah, Davis, Weber, and Washington County. See our service areas page for every city.",
        },
        {
          question: "Do I need recurring service?",
          answer:
            "Not always. One-time treatments solve isolated problems. Recurring plans exist because Utah pest pressure changes with the seasons, and prevention costs less than reaction. We recommend honestly based on what we find.",
        },
        {
          question: "How fast can you come out?",
          answer: `Usually within a day or two anywhere in our service area, often faster for urgent problems. Call ${PHONE_DISPLAY}.`,
        },
      ],
    },
    "/residential-faq": {
      sub: "What Utah homeowners ask before their first visit.",
      faqs: [
        {
          question: "Do I need to leave the house during treatment?",
          answer:
            "For most general treatments, no. Your technician will tell you if a specific product requires temporary re-entry timing for rooms, kids, or pets, and exactly how long.",
        },
        {
          question: "How should I prepare for my first visit?",
          answer:
            "Usually nothing more than clearing access to baseboards, the garage perimeter, and under sinks. For specialty services like bed bug or flea treatment we provide a specific prep sheet.",
        },
        {
          question: "Will one treatment fix my problem?",
          answer:
            "Sometimes, but many pests require follow-up timed to their egg cycles. We tell you up front what the situation needs, and our guarantee covers re-visits between scheduled treatments.",
        },
        {
          question: "What is included in a recurring plan?",
          answer: `Seasonal exterior barrier treatments, interior service whenever needed, coverage for Utah's common household pests, and our re-service guarantee: ${GUARANTEE_VERBATIM}`,
        },
        {
          question: "Are the products safe around my garden?",
          answer:
            "We treat ornamental beds and structural perimeters, not vegetable gardens, and we choose products and placements accordingly. Tell your technician about gardens, beehives, ponds, or chickens and we will plan around them.",
        },
      ],
    },
    "/commercial-faq": {
      sub: "Answers for facility managers, owners, and franchisees.",
      faqs: [
        {
          question: "Can you service our facility outside business hours?",
          answer:
            "Yes. Early morning, evening, and weekend service windows are standard for restaurants, retail, offices, and schools.",
        },
        {
          question: "Do you provide documentation for health inspections and audits?",
          answer:
            "Yes. Every visit produces a service report, and commercial accounts get logbooks, trend reports, and product documentation ready for inspectors and third-party audits.",
        },
        {
          question: "Do you handle multi-location accounts?",
          answer: `Yes. Property managers and multi-site operators get one point of contact, consolidated billing, and consistent protocols across locations. Call ${PHONE_DISPLAY} to set up a walkthrough.`,
        },
        {
          question: "What industries do you serve?",
          answer:
            "Restaurants, hotels, offices, retail, warehouses, manufacturing, schools, churches, self-storage, auto dealerships, property management, HOAs, and assisted living, each with protocols fitted to the industry.",
        },
        {
          question: "Is service discreet?",
          answer:
            "Completely. Unmarked service is available on request, and technicians work around your customers and staff.",
        },
      ],
    },
    "/rodent-faq": {
      sub: "Mice, rats, and what it takes to keep them out.",
      faqs: [
        {
          question: "I heard scratching in the walls. Is it mice?",
          answer:
            "Possibly mice, but rats, squirrels, and even birds sound similar. Timing helps: mice and rats are active at night, squirrels at dawn and dusk. An inspection identifies the animal by droppings, gnaw marks, and entry points, and the answer changes the treatment.",
        },
        {
          question: "Why do I still have mice after setting traps?",
          answer:
            "Traps catch individuals; they do not stop the entry points or the breeding. A pair of mice becomes dozens in a season. Lasting control combines trapping, strategic baiting, and sealing every gap larger than a pencil.",
        },
        {
          question: "What is rodent exclusion?",
          answer:
            "Exclusion is the permanent half of rodent control: sealing foundation gaps, utility penetrations, vents, and rooflines with steel and rodent-proof materials so the next mouse never gets in. We inspect, seal, and warranty the work.",
        },
        {
          question: "Are rodent droppings dangerous?",
          answer:
            "Treat them with respect. Deer mouse droppings in Utah can carry hantavirus, so never dry-sweep or vacuum droppings in enclosed spaces. Ventilate, wet down with disinfectant, and wear gloves, or let our crew handle cleanout safely.",
        },
        {
          question: "Do you clean up contaminated attics and crawl spaces?",
          answer: `Yes. Our attic remediation and crawl space cleanout services remove soiled insulation, sanitize, seal entry points, and restore the space. Call ${PHONE_DISPLAY} for an assessment.`,
        },
      ],
    },
    "/termite-faq": {
      sub: "What Utah property owners should know about termites.",
      faqs: [
        {
          question: "Are termites really a problem in Utah?",
          answer:
            "Yes. Subterranean termites are active across Utah, and because they eat wood from the inside out, damage typically goes unnoticed for years. Annual inspections are cheap insurance.",
        },
        {
          question: "What are the warning signs of termites?",
          answer:
            "Winged swarmers indoors in spring, shed wings on windowsills, pencil-width mud tubes on foundation walls, and wood that sounds hollow when tapped. Any one of them justifies an immediate inspection.",
        },
        {
          question: "What is the Trelona termite system?",
          answer:
            "Trelona ATBS is a professionally monitored bait system installed around your structure. Foraging termites carry the bait back to the colony, eliminating it at the source, and our technicians service the stations year-round.",
        },
        {
          question: "Do I need a termite inspection to sell my house?",
          answer: `Many Utah lenders require wood-destroying organism documentation before closing. Our real estate termite inspections deliver the paperwork on your closing timeline. Call ${PHONE_DISPLAY} to schedule.`,
        },
        {
          question: "How much does termite treatment cost?",
          answer:
            "It depends on the structure's footprint and the extent of activity, so we inspect first and quote flat. Compared to repairing termite damage, which insurance rarely covers, protection is inexpensive.",
        },
      ],
    },
    "/bed-bug-faq": {
      sub: "Facts over panic: what works against bed bugs.",
      faqs: [
        {
          question: "How do I know if I have bed bugs?",
          answer:
            "Look for physical evidence near sleeping areas: apple-seed-sized brown bugs in mattress seams, pepper-like fecal spotting, shed skins, and pearl-white eggs in crevices. Bites alone cannot confirm bed bugs since reactions vary by person.",
        },
        {
          question: "Can I get rid of bed bugs myself?",
          answer:
            "Rarely. Store-bought foggers scatter bed bugs deeper into walls and make professional treatment harder. Eggs resist most consumer sprays entirely. Professional protocols exist because this pest defeats everything else.",
        },
        {
          question: "What is Aprehend?",
          answer:
            "Aprehend is a biopesticide barrier applied where bed bugs travel. Bugs cross it and carry the spores back to hidden harborage, reaching the bugs sprays cannot. It requires less prep than conventional treatment and keeps working for weeks.",
        },
        {
          question: "How should I prepare for treatment?",
          answer:
            "It depends on the treatment type. Aprehend needs minimal prep; conventional treatment needs laundering and decluttering per our prep sheet. Over-preparing can actually hurt by relocating bugs, so follow the sheet exactly.",
        },
        {
          question: "Did I get bed bugs because my home is dirty?",
          answer:
            "No. Bed bugs follow people, not filth. They arrive in luggage, secondhand furniture, and visitors' belongings, and the cleanest homes get them. What matters is acting fast once they arrive.",
        },
      ],
    },
  };

  switch (c.path) {
    case "/":
      return {
        ...base,
        metaDescription: `Antex Pest Solutions: safe, effective, guaranteed pest control across Utah since 2014. ${RATING.stars}-star rated. Free quotes: ${PHONE_DISPLAY}.`,
        heroHeadline: "Utah Pest Control, Done Right",
        heroSub: `Safe, effective pest control for homes and businesses across 13 Utah counties. ${GUAR_SENTENCE}`,
        intro: `Antex Pest Solutions has protected Utah properties since 2014 with licensed technicians, honest flat pricing, and a written re-service guarantee.`,
        sections: [],
        faqs: [],
      };
    case "/about":
      return {
        ...base,
        metaDescription: `Antex Pest Solutions has served Utah since 2014: family-run, licensed, ${RATING.stars}-star rated across ${RATING.reviews} reviews. Meet the company.`,
        heroHeadline: "About Antex Pest Solutions",
        heroSub:
          "A Utah company built on straight answers, careful work, and results we stand behind.",
        intro: `Antex Pest Solutions was founded in 2014 by Jason Ribbens with a simple premise: treat every home like your own and every customer like a neighbor, because here, they are. A decade later we serve 13 Utah counties with a team of licensed technicians and a ${RATING.stars}-star rating across ${RATING.reviews} reviews.`,
        sections: [
          {
            heading: "How we work",
            body: `Every job starts with a real inspection, not a sales pitch. We quote flat and up front, treat the source of the problem, document what we did, and stand behind it: ${GUARANTEE_VERBATIM}`,
          },
          {
            heading: "What we believe",
            body: `Pest control done right protects families, and that starts with product choices. ${EPA_CLAIM_VERBATIM} It continues with technicians who show up on time, explain their work in plain language, and never sell you something you do not need.`,
          },
          {
            heading: "Where we serve",
            body: "From our home base along the Wasatch Front, Antex serves 13 Utah counties: Box Elder, Davis, Duchesne, Iron, Juab, Kane, Salt Lake, Tooele, Uintah, Utah, Wasatch, Washington, and Weber.",
          },
        ],
        faqs: [],
      };
    case "/why-choose-us":
      return {
        ...base,
        metaDescription: `Why Utah chooses Antex Pest Solutions: flat pricing, licensed local techs, safe products, and a written re-service guarantee. ${PHONE_DISPLAY}.`,
        heroHeadline: "Why Choose Antex",
        heroSub:
          "Plenty of companies spray and pray. Here is what doing it right looks like.",
        intro:
          "Choosing a pest control company means letting someone into your home and trusting their word about an invisible problem. We think that trust has to be earned in specific, checkable ways.",
        sections: [
          {
            heading: "A guarantee with no fine print",
            body: `${GUAR_SENTENCE} No re-visit fees, no arguing, no expiration mid-season. If the pests are back, so are we.`,
          },
          {
            heading: "Flat, honest pricing",
            body: "We quote after inspecting, in writing, and the number does not move. No surprise line items, no pressure to bundle services you do not need, and no teaser rates that double at renewal.",
          },
          {
            heading: "Products chosen for families",
            body: `${EPA_CLAIM_VERBATIM} Our technicians are licensed, background-checked, and trained to explain every product and placement they use.`,
          },
          {
            heading: "Local and accountable",
            body: `We live where we work. When you call ${PHONE_DISPLAY}, you reach our Utah team, not a national routing queue, and our ${RATING.stars}-star rating across ${RATING.reviews} reviews is the receipt.`,
          },
        ],
        faqs: [],
      };
    case "/our-team":
      return {
        ...base,
        metaDescription:
          "Meet the licensed technicians and office team behind Antex Pest Solutions, serving Utah since 2014.",
        heroHeadline: "Meet the Antex Team",
        heroSub:
          "Licensed, background-checked, and probably treating a house on your street this week.",
        intro:
          "Antex is a team of Utah locals: technicians who know the difference between a hobo spider and a wolf spider at a glance, and office staff who answer the phone like neighbors because you are one.",
        sections: [
          {
            heading: "Founded by Jason Ribbens",
            body: "Jason founded Antex in 2014 after seeing too much of the industry's pattern: scare tactics, inflated contracts, and technicians trained to sell rather than solve. Antex was built to be the opposite, and the company still runs on that standard.",
          },
          {
            heading: "Licensed and trained",
            body: `Every Antex technician is state-licensed, background-checked, and continuously trained on products, pest biology, and safety protocols. ${EPA_CLAIM_VERBATIM}`,
          },
        ],
        faqs: [],
      };
    case "/reviews":
      return {
        ...base,
        metaDescription: `Antex Pest Solutions reviews: ${RATING.stars} stars across ${RATING.reviews} reviews from Utah homeowners and businesses.`,
        heroHeadline: "Customer Reviews",
        heroSub: `${RATING.stars} stars across ${RATING.reviews} reviews, earned one visit at a time.`,
        intro:
          "We do not pay for reviews and we do not cherry-pick them. What Utah customers say about Antex reflects the way we run every job: show up, be straight, solve it, stand behind it.",
        sections: [
          {
            heading: "What customers mention most",
            body: "Three themes repeat across our reviews: technicians who explain what they are doing and why, problems that actually stay solved, and honest recommendations, including the times we advise against paying for service you do not need.",
          },
        ],
        faqs: [],
      };
    case "/request-quote":
      return {
        ...base,
        metaDescription: `Request a free pest control quote from Antex Pest Solutions. Flat pricing, fast scheduling, guaranteed results across Utah. ${PHONE_DISPLAY}.`,
        heroHeadline: "Request a Free Quote",
        heroSub:
          "Tell us what you are seeing and we will get back to you fast with a plan and a flat price.",
        intro: `Two minutes now saves you weeks of pest trouble. Fill out the form with what you are seeing, or call ${PHONE_DISPLAY} and talk to a real person on our Utah team. Every quote starts with a free inspection, and the price we give is the price you pay.`,
        sections: [
          {
            heading: "What happens next",
            body: "We reach out the same business day to talk through the problem and schedule your free inspection. Your technician confirms what is happening, explains the fix, and quotes it flat. You decide from there, no pressure and no obligation.",
          },
        ],
        faqs: [],
      };
    case "/services":
      return {
        ...base,
        metaDescription: `Every pest control service Antex offers in Utah: general pests, rodents, termites, bed bugs, mosquitoes, wildlife, and commercial programs.`,
        heroHeadline: "Pest Control Services",
        heroSub: `65 services, one standard: inspect first, quote flat, treat the source, guarantee the result.`,
        intro:
          "From quarterly home protection to termite bait systems, bed bug protocols, and full commercial programs, every Antex service is performed by licensed Utah technicians and backed by our written guarantee.",
        sections: [],
        faqs: [],
      };
    case "/service-areas":
      return {
        ...base,
        metaDescription: `Antex Pest Solutions serves 86 cities across 13 Utah counties. Find your city and see every service available at your address.`,
        heroHeadline: "Utah Service Areas",
        heroSub: `13 counties, 86 cities, one local team. Find yours below.`,
        intro: `Antex technicians run weekly routes across the Wasatch Front and beyond, from Box Elder County to Washington County. Choose your county below to find your city and see every service we offer there. No travel fees anywhere in our coverage area.`,
        sections: [],
        faqs: [
          {
            question: "My city is not listed. Can you still help?",
            answer: `Probably yes. Our routes expand constantly, and we often serve addresses just outside listed cities. Call ${PHONE_DISPLAY} and we will confirm coverage in seconds.`,
          },
          {
            question: "Do you charge travel fees?",
            answer:
              "No. Every listed city is inside our standard service area, and the quoted service price is the full price.",
          },
        ],
      };
    case "/pest-library":
      return {
        ...base,
        metaDescription: `The Antex Pest Library: identification guides for 54 Utah pests, from ants and spiders to termites, bed bugs, and wildlife.`,
        heroHeadline: "Utah Pest Library",
        heroSub:
          "Know your enemy. Identification guides for the pests Utah properties actually face.",
        intro:
          "Correct identification is the first step in solving any pest problem, because the treatment that eliminates one species does nothing to another. Browse by category below, or call us and describe what you are seeing. Our team identifies pests over the phone every day.",
        sections: [],
        faqs: [],
      };
    case "/contact":
      return {
        ...base,
        metaDescription: `Contact Antex Pest Solutions: call ${PHONE_DISPLAY} or send a message. Free inspections and flat quotes across Utah.`,
        heroHeadline: "Contact Us",
        heroSub: `Call ${PHONE_DISPLAY} or drop us a line. Real people, same-day replies.`,
        intro: `Whether you have a pest emergency or just a question, our Utah team is easy to reach. Call, use the form, and we will get back to you the same business day.`,
        sections: [],
        faqs: [],
      };
  }

  const faqSet = FAQ_SETS[c.path];
  if (faqSet) {
    const topic = c.title.replace(/ FAQ$/, "");
    return {
      ...base,
      metaDescription: `${c.title}: answers from Antex Pest Solutions about ${lc(topic)} pest control in Utah. Call ${PHONE_DISPLAY} with anything else.`,
      heroHeadline: c.title.endsWith("FAQ")
        ? c.title.replace(/ FAQ$/, ": Frequently Asked Questions")
        : c.title,
      heroSub: faqSet.sub,
      intro: `The questions below come straight from Utah customers. If yours is not here, call ${PHONE_DISPLAY} and ask a real person; we are happy to help even if you never book a service.`,
      sections: [],
      faqs: faqSet.faqs,
    };
  }

  // Generic fallback for anything unmapped.
  return {
    ...base,
    metaDescription: `${c.title} | Antex Pest Solutions, Utah's trusted pest control company. Call ${PHONE_DISPLAY}.`,
    heroSub: `Antex Pest Solutions: safe, effective, guaranteed pest control across Utah.`,
    intro: `Antex Pest Solutions serves homes and businesses across 13 Utah counties with licensed technicians and guaranteed results. ${pick(CTA_LINE, seed, "cta")}`,
    sections: [],
    faqs: [],
  };
}

/* ---------------------------------------------------------------- routing */

function generate(c: Ctx): Generated {
  switch (c.pageType) {
    case "City Service Page":
      return buildCityService(c);
    case "City Hub":
      return buildCityHub(c);
    case "County Hub":
      return buildCountyHub(c);
    case "Service Page":
      return buildServicePage(c);
    case "Pest Detail Page":
      return buildPestDetail(c);
    case "Pest Category":
      return buildPestCategory(c);
    default:
      return buildCore(c);
  }
}

/* ------------------------------------------------------------------- main */

const payload = await getPayload({ config });

type Doc = Ctx & { id: number | string };
const docs: Doc[] = [];
let pageNum = 1;
for (;;) {
  const res = await payload.find({
    collection: "pages",
    limit: 500,
    page: pageNum,
    depth: 0,
    sort: "path",
  });
  for (const d of res.docs) {
    docs.push({
      id: d.id,
      path: d.path,
      title: d.title,
      pageType: d.pageType ?? null,
      section: d.section ?? null,
      county: d.county ?? null,
      city: d.city ?? null,
      servicePest: d.servicePest ?? null,
      slug: d.slug ?? null,
    });
  }
  if (!res.hasNextPage) break;
  pageNum += 1;
}
console.log(`Generating content for ${docs.length} pages…`);

// Guard: the client's no-em-dash rule applies to all generated copy.
let emDashHits = 0;

let updated = 0;
let failed = 0;
const CONCURRENCY = 15;
for (let i = 0; i < docs.length; i += CONCURRENCY) {
  const batch = docs.slice(i, i + CONCURRENCY);
  await Promise.all(
    batch.map(async (doc) => {
      try {
        const g = generate(doc);
        const flat = JSON.stringify(g);
        if (flat.includes("—")) emDashHits += 1;
        await payload.update({
          collection: "pages",
          id: doc.id,
          data: g,
          depth: 0,
        });
        updated += 1;
      } catch (err) {
        failed += 1;
        console.error(`FAILED ${doc.path}:`, (err as Error).message);
      }
    })
  );
  if ((i / CONCURRENCY) % 20 === 0 || i + CONCURRENCY >= docs.length) {
    console.log(`  ${Math.min(i + CONCURRENCY, docs.length)}/${docs.length}`);
  }
}

console.log(
  `Done. Updated ${updated}, failed ${failed}, em-dash violations ${emDashHits}.`
);
process.exit(failed > 0 ? 1 : 0);
