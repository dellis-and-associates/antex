# GoHighLevel Workflow Setup: Website Lead Intake

This guide walks through connecting the antexpestsolutions.com contact form
to GoHighLevel (GHL) so every submission becomes a CRM contact and notifies
Jason automatically.

## Where a submission goes today

When a visitor submits the form at `/contact`, the site's API route
(`app/api/contact/route.ts`) does four things, in order:

1. **Saves the lead to the site database** (Payload CMS on Supabase).
   Viewable any time at `https://www.antexpestsolutions.com/admin` under
   **Contact Submissions**. This is the permanent record, including both SMS
   consent checkboxes (required for A2P/text-messaging compliance).
2. **Forwards the lead to GHL** by POSTing JSON to the webhook URL in the
   `LEADCONNECTOR_WEBHOOK_URL` environment variable. *Skipped until you
   complete this guide and set the variable.*
3. **Emails the lead to `Jribbens@antexpestsolutions.com`** via Resend.
   *Skipped until the Resend variables are set in Vercel (see Part C).*
4. Returns success to the visitor. Steps 2 and 3 never block or fail the
   visitor's submission; errors are only logged.

Each layer is independent: if GHL is down the lead is still in the database
and the email still goes out.

## The JSON payload the site sends

Every field arrives as a string except the two consent flags (true/false):

```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "phone": "(435) 555-0142",
  "email": "jane@example.com",
  "street": "123 Desert Bloom Dr",
  "city": "St George",
  "state": "UT",
  "country": "US",
  "postalCode": "84770",
  "newCustomer": "Yes",
  "message": "Seeing ants in the kitchen every morning.",
  "consentTransactional": true,
  "consentMarketing": false,
  "submittedAt": "2026-09-02T17:45:00.000Z"
}
```

---

## Part A: Create the workflow in GHL

> Note: the **Inbound Webhook** trigger is a Premium Workflow feature. It is
> included on the GHL Pro plan; on lower plans it can be enabled under
> **Settings → Company → Enable Premium Actions & Triggers** (webhook
> executions are billed at a fraction of a cent per run).

### Step 1: Create the workflow and webhook trigger

1. Log in to GHL and open the **Antex Pest Solutions** sub-account
   (location), not the agency view.
2. Go to **Automation → Workflows → + Create Workflow → Start from Scratch**.
3. Name it `Website Lead Intake`.
4. Click **Add New Trigger** and choose **Inbound Webhook**.
5. GHL displays a unique **webhook URL** (looks like
   `https://services.leadconnectorhq.com/hooks/XXXX/webhook-trigger/YYYY`).
   **Copy it** - this is the value for `LEADCONNECTOR_WEBHOOK_URL` in Part B.

### Step 2: Teach GHL the payload shape

GHL needs one sample request before it can map fields. Either:

- **Option 1 (no tools needed):** finish Part B first, then submit the form
  once on the live site and return here, or
- **Option 2 (terminal):** paste this into a terminal, with your webhook URL:

```bash
curl -X POST "PASTE_WEBHOOK_URL_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test", "lastName": "Lead",
    "phone": "(435) 555-0142", "email": "test@example.com",
    "street": "123 Test St", "city": "St George", "state": "UT",
    "country": "US", "postalCode": "84770",
    "newCustomer": "Yes",
    "message": "Test submission from the website.",
    "consentTransactional": true, "consentMarketing": false,
    "submittedAt": "2026-09-02T17:45:00.000Z"
  }'
```

In the trigger's setup panel, click **Check for new requests** (wording may
vary slightly). The fields above should appear as mappable values. Save the
trigger.

### Step 3: Create/Update the contact

1. Click **+** below the trigger and add the action
   **Create Contact** (some accounts show **Create or Update Contact**;
   either is fine - GHL de-duplicates by email/phone).
2. Map the fields. Webhook values appear under **Inbound Webhook Trigger**
   in the field picker (they render as tags like
   `{{inboundWebhookRequest.firstName}}`):

   | GHL contact field | Webhook value        |
   |-------------------|----------------------|
   | First Name        | `firstName`          |
   | Last Name         | `lastName`           |
   | Phone             | `phone`              |
   | Email             | `email`              |
   | Address           | `street`             |
   | City              | `city`               |
   | State             | `state`              |
   | Country           | `country`            |
   | Postal Code       | `postalCode`         |

3. For the message and the extra fields, either map them into GHL **custom
   fields** (create them under Settings → Custom Fields if wanted:
   `Website Message`, `New Customer`, `SMS Consent Transactional`,
   `SMS Consent Marketing`) or include them only in the notification email
   in Step 5. Recommended: create at least `Website Message` so the note is
   on the contact record.
4. Add an **Add Contact Tag** action with tag `website-lead` so these
   contacts are filterable and other automations can key off it.

### Step 4: Respect the SMS consent flags (important)

The form has two separate checkboxes and their values arrive as
`consentTransactional` and `consentMarketing`. To stay A2P-compliant, do not
text people who did not opt in:

1. Add an **If/Else** branch after the contact is created.
2. Branch condition: `consentMarketing` **is** `true` → add tag
   `sms-marketing-optin`. Only marketing campaigns filtered to this tag may
   text promotions.
3. Optionally a second branch: `consentTransactional` is `true` → add tag
   `sms-transactional-optin` for appointment reminders.
4. If both are false, add no SMS tags. The lead can still be called or
   emailed.

### Step 5: Notify Jason

1. Add an **Internal Notification** action (type: **Email**).
2. Recipient: `Jribbens@antexpestsolutions.com` (or pick the user).
3. Subject: `New website lead: {{inboundWebhookRequest.firstName}} {{inboundWebhookRequest.lastName}}`
4. Body: include the phone, email, address, `newCustomer`, `message`, and
   both consent values so the email is actionable without opening GHL.
5. Optional: add a second Internal Notification of type **SMS** or **App**
   to ping Jason's phone the moment a lead lands.

> This GHL notification and the site's own Resend email (Part C) overlap on
> purpose during launch. Once you trust the GHL workflow, you can disable
> either one; keeping both costs nothing but a duplicate email.

### Step 6 (optional): Create an opportunity

If Jason works a pipeline: add a **Create Opportunity** action, pick the
pipeline and stage (e.g. `New Leads`), and set the opportunity name to
`{{inboundWebhookRequest.firstName}} {{inboundWebhookRequest.lastName}} - website`.

### Step 7: Publish

Toggle the workflow from **Draft** to **Publish** (top right) and save.

---

## Part B: Point the website at the webhook

1. Open the Vercel project → **Settings → Environment Variables**.
2. Add `LEADCONNECTOR_WEBHOOK_URL` = the URL copied in Part A Step 1.
   Environment: **Production** (add to Preview too if you want test leads
   from preview deploys - usually you do not).
3. **Redeploy** the site (Deployments → ⋯ on the latest → Redeploy) so the
   variable takes effect.
4. For local testing, the same variable exists in `.env.local` (currently
   empty).

---

## Part C: The direct email to Jribbens@ (Resend)

The route also emails each lead directly. To activate it, three variables
must be set in Vercel (they are already scaffolded in `.env.local`):

1. `RESEND_API_KEY`: from [resend.com](https://resend.com) → API Keys.
2. `OWNER_EMAIL`: `Jribbens@antexpestsolutions.com` (this is also the code
   default).
3. `EMAIL_FROM`: `Antex Website <leads@antexpestsolutions.com>` - but this
   only works after the domain is verified:
   - In Resend: **Domains → Add Domain** → `antexpestsolutions.com`.
   - Resend shows 3-4 DNS records (DKIM TXT, SPF/Return-Path). Add them in
     the domain's DNS manager - the same GHL DNS access used for the site
     records. Verification usually completes within an hour.
   - Until then, Resend can only send to the account owner's own address
     from `onboarding@resend.dev`, so verify the domain before launch.

Deliverability note: sending "from" the domain with proper DKIM/SPF keeps
these notifications out of spam. Do not set `EMAIL_FROM` to a Gmail address.

---

## Part D: End-to-end test

1. Deploy with the variables set.
2. Submit the live form at `https://www.antexpestsolutions.com/contact`
   using real-looking test data and a real phone/email you control.
3. Verify, in order:
   - **GHL**: contact exists with tag `website-lead`, message on record,
     workflow shows one execution (workflow → **Execution Logs**).
   - **Inbox**: `Jribbens@antexpestsolutions.com` received both the GHL
     internal notification and the site's Resend email.
   - **Site admin**: the submission appears under Contact Submissions at
     `/admin`.
4. Delete the test contact in GHL afterwards so it does not enter follow-up
   automations.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| No contact in GHL | `LEADCONNECTOR_WEBHOOK_URL` unset or site not redeployed | Check Vercel env vars, redeploy |
| Workflow never fires | Workflow still in Draft | Publish it |
| Fields empty on contact | Mapping saved before sample request was received | Re-send the curl sample, re-map, save |
| No Resend email | Domain not verified, or `RESEND_API_KEY` missing in Vercel | Part C; check Vercel function logs for `[contact]` errors |
| Duplicate contacts | Create Contact instead of Create or Update | Switch action type, or accept and merge |
| Lead texted without consent | SMS automation not filtered by consent tag | Filter all SMS campaigns to `sms-marketing-optin` |

Vercel function logs (Project → Logs, filter `[contact]`) show every
forwarding/email error; visitor submissions succeed regardless.
