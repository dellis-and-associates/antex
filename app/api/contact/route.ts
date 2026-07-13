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

  // TODO(CRM): forward `lead` to the GoHighLevel/LeadConnector inbound webhook
  // that powers the current site's form. Set the webhook URL in an env var
  // (e.g. LEADCONNECTOR_WEBHOOK_URL) and POST the payload there — including
  // both SMS consent booleans, which must be persisted for A2P compliance.
  console.log("[contact] new lead (CRM webhook not yet configured):", lead);

  return NextResponse.json({ ok: true });
}
