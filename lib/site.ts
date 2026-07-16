/**
 * Site-wide facts. Everything here is sourced from the live site
 * (antexpestsolutions.com) — the source of truth for FACTS.
 * Do not edit the verbatim strings without a compliance review.
 */

export const SITE_URL = "https://antexpestsolutions.com";

export const PHONE_DISPLAY = "(435) 313-5882";
export const PHONE_TEL = "tel:4353135882";

export const EMAIL = "info@antexpestsolutions.com";
export const EMAIL_MAILTO = "mailto:info@antexpestsolutions.com";

export const CUSTOMER_LOGIN_URL = "https://antex.pestportals.com/landing/index";

export const FOUNDED_YEAR = 2014;
export const FOUNDER = "Jason Ribbens";

/** Verbatim from the live site — the re-service guarantee. */
export const GUARANTEE_VERBATIM =
  "If pests return between scheduled visits, we'll come back and address the issue at no additional cost.";

/** Brand-voice phrasing of the same promise (BRAND-GUIDE.md §5). */
export const GUARANTEE_SHORT = "Pests return? So do we. Free.";

/** Verbatim from the live site — EPA / safety claim. */
export const EPA_CLAIM_VERBATIM =
  "We use EPA-registered products approved for use in homes, businesses, and sensitive environments like hospitals, pet facilities, and daycare centers.";

/** Live site: "5.0 Star Rating with Over 400 Reviews Online" */
export const RATING = { stars: "5.0", reviews: "400+" };

/** The 13 Utah counties listed on the live site's service-areas page. */
export const COUNTIES_SERVED = [
  "Box Elder",
  "Davis",
  "Duchesne",
  "Iron",
  "Juab",
  "Kane",
  "Salt Lake",
  "Tooele",
  "Uintah",
  "Utah",
  "Wasatch",
  "Washington",
  "Weber",
];

/**
 * SMS consent texts — copied VERBATIM from the live site's contact form.
 * Required for A2P 10DLC compliance. Never paraphrase.
 */
export const SMS_CONSENT_TRANSACTIONAL =
  "By checking this box, I consent to receive transactional messages related to my account, orders, or services I have requested. These messages may include appointment reminders, order confirmations, and account notifications among others. Message frequency may vary. Message & Data rates may apply. Reply HELP for help or STOP to opt-out.";

export const SMS_CONSENT_MARKETING =
  "By checking this box, I consent to receive marketing and promotional messages, including special offers, discounts, new product updates among others. Message frequency may vary. Message & Data rates may apply. Reply HELP for help or STOP to opt-out.";
