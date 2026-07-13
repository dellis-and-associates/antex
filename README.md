# Antex Pest Solutions — antexpestsolutions.com rebuild

Next.js 15 (App Router) + Payload CMS 3 backed by Supabase (Postgres + Storage).
Full page/feature parity with the live site: home, services (+6 detail pages),
locations, blog (+post pages), contact, privacy policy, terms, customer-login
link, and the compliance-critical contact form (SMS consent text is verbatim —
see `lib/site.ts`).

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The site is fully
functional without any environment variables — blog posts render from the
static seeds in `lib/blog.ts` and contact submissions are logged to the
server console.

## Payload CMS (blog, media, contact leads)

The admin panel lives at `/admin`. It needs Supabase credentials in
`.env.local`:

1. **Database** — set `PAYLOAD_DATABASE_URI` to the Supabase *Transaction
   Pooler* connection string (port 6543) and `PAYLOAD_SECRET` to a random
   32+ char string (`openssl rand -base64 32`). Payload creates its tables
   on first boot (dev push mode).
2. **Media storage** — set the `S3_*` vars from Supabase → Storage → S3
   connection. Without them, uploads land in `./media` (gitignored).
3. **Seed the blog** — `npm run seed` loads the six field-note posts from
   `lib/blog.ts` into the `posts` collection (idempotent).
4. Visit `/admin` and create the first admin user.

Collections: `users` (admins), `media`, `posts` (drives `/blog`), and
`contact-submissions` (every contact-form lead, including both A2P SMS
consent booleans).

When the CMS is unreachable or empty, `lib/posts.ts` silently falls back to
the static seeds so the public site never breaks. Blog pages revalidate
every 10 minutes.

## Scripts

- `npm run dev` / `build` / `start` / `lint`
- `npm run seed` — seed blog posts into Payload
- `npm run generate:types` — regenerate `payload-types.ts` after changing collections
- `npm run generate:importmap` — regenerate the admin import map after adding admin components

## Still TODO

- CRM webhook forwarding for leads (GoHighLevel/LeadConnector) — see
  `app/api/contact/route.ts`
- Map embeds on the locations page
