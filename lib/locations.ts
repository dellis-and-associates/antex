export type OfficeLocation = {
  slug: string;
  city: string;
  tagline: string;
  streetAddress: string;
  addressLocality: string;
  /** Approximate office coordinates for LocalBusiness JSON-LD. */
  geo: { latitude: number; longitude: number };
  regionCopy: string;
};

export const LOCATIONS: OfficeLocation[] = [
  {
    slug: "st-george",
    city: "St George",
    tagline: "HQ · Desert & red-rock country",
    streetAddress: "1332 W 320 N",
    addressLocality: "St George",
    geo: { latitude: 37.1146, longitude: -113.6056 },
    regionCopy:
      "Our home base since 2014. Scorpions, ants and roof rats thrive in Washington County's desert climate — we treat them year-round, street by street.",
  },
  {
    slug: "vernal",
    city: "Vernal",
    tagline: "Uinta Basin",
    streetAddress: "134 W Main",
    addressLocality: "Vernal",
    geo: { latitude: 40.4555, longitude: -109.5287 },
    regionCopy:
      "Covering the Uinta Basin, where hard winters push mice, voles and spiders indoors every fall. Local technicians who know the seasonal pressure.",
  },
  {
    slug: "northern-utah",
    city: "Northern Utah",
    tagline: "Wasatch Front & SLC metro",
    streetAddress: "428 S 830 E",
    addressLocality: "American Fork",
    geo: { latitude: 40.3717, longitude: -111.7808 },
    regionCopy:
      "Serving the Wasatch Front and Salt Lake metro from American Fork — homes, restaurants and commercial facilities across Utah, Salt Lake, Davis and Weber counties.",
  },
];
