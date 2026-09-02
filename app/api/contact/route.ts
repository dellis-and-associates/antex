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

  // Forward to the GoHighLevel inbound-webhook workflow, which creates the
  // CRM contact and runs the client's follow-up automations. Both SMS
  // consent booleans ride along (required for A2P compliance downstream).
  // Setup guide: docs/ghl-workflow-setup.md
  if (process.env.LEADCONNECTOR_WEBHOOK_URL) {
    try {
      const res = await fetch(process.env.LEADCONNECTOR_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (!res.ok) throw new Error(`GHL webhook responded ${res.status}`);
    } catch (err) {
      console.error("[contact] failed to forward lead to GHL:", err);
    }
  }

  // Email the lead to the owner via Resend. Never blocks the visitor.
  if (process.env.RESEND_API_KEY) {
    try {
      const yn = (v: boolean) => (v ? "Yes" : "No");
      const text = [
        "New lead from antexpestsolutions.com",
        "",
        `Name: ${lead.firstName} ${lead.lastName}`,
        `Phone: ${lead.phone}`,
        `Email: ${lead.email}`,
        `Address: ${lead.street}, ${lead.city}, ${lead.state} ${lead.postalCode}, ${lead.country}`,
        `New customer: ${lead.newCustomer}`,
        "",
        "Message:",
        `${lead.message}`,
        "",
        `SMS consent, transactional: ${yn(lead.consentTransactional)}`,
        `SMS consent, marketing: ${yn(lead.consentMarketing)}`,
        `Submitted: ${lead.submittedAt}`,
      ].join("\n");
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from:
            process.env.EMAIL_FROM ??
            "Antex Website <leads@antexpestsolutions.com>",
          to: process.env.OWNER_EMAIL ?? "Jribbens@antexpestsolutions.com",
          reply_to: lead.email,
          subject: `New lead: ${lead.firstName} ${lead.lastName} (${lead.city})`,
          text,
        }),
      });
      if (!res.ok) {
        throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
      }
    } catch (err) {
      console.error("[contact] failed to email lead notification:", err);
    }
  }

  if (!saved) {
    console.log("[contact] new lead (CMS not configured):", lead);
  }

  return NextResponse.json({ ok: true });
}
