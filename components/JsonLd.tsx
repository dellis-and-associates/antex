import { LOCATIONS } from "@/lib/locations";
import {
  COUNTIES_SERVED,
  FOUNDED_YEAR,
  FOUNDER,
  SITE_URL,
} from "@/lib/site";

const PHONE_E164 = "+14353135882";

/**
 * LocalBusiness structured data: one PestControl node per office, tied to a
 * shared parent Organization, with the 13 counties from the live site as
 * areaServed.
 */
export function JsonLd() {
  const areaServed = COUNTIES_SERVED.map((county) => ({
    "@type": "AdministrativeArea",
    name: `${county} County, Utah`,
  }));

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "Antex Pest Solutions",
        url: SITE_URL,
        telephone: PHONE_E164,
        foundingDate: String(FOUNDED_YEAR),
        founder: { "@type": "Person", name: FOUNDER },
        slogan: "Pest control that holds the line",
      },
      ...LOCATIONS.map((l) => ({
        "@type": "PestControl",
        "@id": `${SITE_URL}/#${l.slug}`,
        name: `Antex Pest Solutions ${l.city}`,
        parentOrganization: { "@id": `${SITE_URL}/#organization` },
        url: `${SITE_URL}/locations`,
        telephone: PHONE_E164,
        address: {
          "@type": "PostalAddress",
          streetAddress: l.streetAddress,
          addressLocality: l.addressLocality,
          addressRegion: "UT",
          addressCountry: "US",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: l.geo.latitude,
          longitude: l.geo.longitude,
        },
        areaServed,
      })),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
