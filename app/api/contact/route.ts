import { NextResponse } from "next/server";

const REQUIRED_FIELDS = [
  "firstName",
  "lastName",
  "phone",
  "email",
  "street",
  "city",
  "state",
  "country",
  "postalCode",
  "message",
] as const;

export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // Honeypot: real users never see this field. Bots fill it. Pretend success.
  if (typeof data.company === "string" && data.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const missing = REQUIRED_FIELDS.filter(
    (f) => typeof data[f] !== "string" || (data[f] as string).trim() === ""
  );
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required fields: ${missing.join(", ")}` },
      { status: 422 }
    );
  }
  const email = data.email as string;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 422 });
  }
  const phoneDigits = (data.phone as string).replace(/\D/g, "");
  if (phoneDigits.length < 10) {
    return NextResponse.json({ error: "Invalid phone number" }, { status: 422 });
  }

  const lead = {
    firstName: data.firstName,
    lastName: data.lastName,
    phone: data.phone,
    email: data.email,
    street: data.street,
    city: data.city,
    state: data.state,
    country: data.country,
    postalCode: data.postalCode,
    newCustomer: data.newCustomer ?? "Yes",
    message: data.message,
    consentTransactional: data.consentTransactional === "yes",
    consentMarketing: data.consentMarketing === "yes",
    submittedAt: new Date().toISOString(),
  };

  // Persist to Payload (Supabase Postgres) when the CMS is configured.
  // Failures never block the visitor — the lead is logged either way.
  let saved = false;
  if (process.env.PAYLOAD_DATABASE_URI) {
    try {
      const { getPayload } = await import("payload");
      const { default: config } = await import("@payload-config");
      const payload = await getPayload({ config });
      await payload.create({
        collection: "contact-submissions",
        data: {
          firstName: lead.firstName as string,
          lastName: lead.lastName as string,
          phone: lead.phone as string,
          email: lead.email as string,
          street: lead.street as string,
          city: lead.city as string,
          state: lead.state as string,
          country: lead.country as string,
          postalCode: lead.postalCode as string,
          newCustomer: lead.newCustomer === "No" ? "No" : "Yes",
          message: lead.message as string,
          consentTransactional: lead.consentTransactional,
          consentMarketing: lead.consentMarketing,
        },
        overrideAccess: true,
      });
      saved = true;
    } catch (err) {
      console.error("[contact] failed to save lead to Payload:", err);
    }
  }

  // TODO(CRM): forward `lead` to the GoHighLevel/LeadConnector inbound webhook
  // that powers the current site's form. Set the webhook URL in an env var
  // (e.g. LEADCONNECTOR_WEBHOOK_URL) and POST the payload there — including
  // both SMS consent booleans, which must be persisted for A2P compliance.
  if (!saved) {
    console.log("[contact] new lead (CMS not configured):", lead);
  }

  return NextResponse.json({ ok: true });
}
