# Dupha Prints — Website

A Next.js 14 (App Router) + TypeScript + Tailwind CSS site for Dupha Prints,
a printing and branding studio in Lekki, Lagos.

This README is the source of truth for getting the project running locally
and deploying it. Read the **Known limitations** section before going live —
a few pieces need real credentials or infrastructure this codebase can't
supply on its own.

---

## 1. What's included

- All 20 pages from the brief (Home, About, Services, Portfolio, Products,
  Industries, Partnership, Careers, Testimonials, Blog, FAQ, Contact, Quote,
  Privacy Policy, Terms & Conditions, Cookie Policy, Sitemap, Thank You,
  Coming Soon, custom 404).
- GSAP-driven hero with a cinematic "product drop" animation (bottle + two
  umbrella colourways, as requested), Lenis smooth scroll, scroll reveals,
  glass cards, a CMYK "press check" colour-bar used as a signature structural
  device throughout.
- Enquiry system: Quote, Contact, Careers (with resume upload), and
  Partnership forms — React Hook Form + Zod validation, honeypot + basic
  rate limiting, Prisma models, and Resend email sending.
- A lightweight, cookie-based admin dashboard at `/admin` to review
  submissions.
- SEO: per-page metadata, Open Graph/Twitter tags, JSON-LD `LocalBusiness`
  schema, dynamic `robots.txt` and `sitemap.xml`.
- Security headers (via `next.config.mjs`), input validation, honeypot
  fields, and simple in-memory rate limiting on every API route.

Privacy Policy, Terms & Conditions, and Cookie Policy pages are built as
**framework only** — the layout, headings, and structure are ready, and the
actual legal copy is intentionally left as placeholders per the request.
Have a lawyer review and fill these in before launch.

Portfolio and Products use placeholder colour tiles / SVG icons instead of
real photography, since no product images were available when this was
built — swap them for real photos any time (see `app/portfolio/page.tsx`
and `components/home/PrintProps.tsx`).

---

## 2. Known limitations (read this first)

This project was generated in an environment with **no internet access**,
so nothing here has been installed, compiled, or run. Before you treat this
as production-ready:

1. **Run `npm install` and `npm run build` locally.** Dependency versions
   in `package.json` are current as of writing but may need a `npm update`
   if a package has moved on. Fix any type errors that surface — they
   weren't caught by a compiler here.
2. **3D (Three.js/WebGL) and Auth.js were intentionally scoped out** of this
   pass. The brief asked for floating 3D printing objects and full Auth.js
   authentication; building those well needs real 3D assets and a proper
   user/roles model respectively. What's shipped instead: a 2D GSAP hero
   animation that fulfils the same "cinematic product reveal" brief, and a
   simple signed-cookie admin login (single admin account via environment
   variables) that protects `/admin` without extra infrastructure. Upgrade
   to next-auth/Auth.js if you need multiple admin users or roles.
3. **File uploads (resumes) require a Vercel Blob store.** Without
   `BLOB_READ_WRITE_TOKEN` set, the careers form still submits, just without
   an attached file.
4. **Email and database are both optional at runtime** — the app won't
   crash without `RESEND_API_KEY` or `DATABASE_URL`, but forms won't
   actually persist or send until you configure them.
5. **Rate limiting is in-memory**, so it resets whenever a serverless
   function cold-starts and isn't shared across regions. Fine for a small
   business site; swap for Upstash Redis if abuse becomes a problem.
6. **No CMS UI yet** for editing Home/About/Services copy — content lives
   in `lib/site-data.ts` and directly in page files. The admin dashboard
   currently only manages form submissions, not page content, since a full
   content-editing UI is a substantial separate build.
7. Add a real `og-cover.jpg` (1200×630) to `public/images/` — it's
   referenced in metadata but not included.

None of this is hidden by design — it's flagged here so you know exactly
what to check before launch instead of finding out from a user report.

---

## 3. Local setup

```bash
npm install
cp .env.example .env
# fill in .env with real values (see below)
npx prisma generate
npx prisma migrate dev --name init   # requires DATABASE_URL to be reachable
npm run dev
```

Visit `http://localhost:3000`.

### Environment variables

| Variable | Required for | Notes |
|---|---|---|
| `DATABASE_URL` | Storing form submissions | PostgreSQL connection string (Vercel Postgres, Supabase, Neon, etc.) |
| `RESEND_API_KEY` | Sending enquiry emails | From resend.com |
| `ENQUIRY_TO_EMAIL` | Sending enquiry emails | Where business notifications land |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | `/admin` login | Single admin account |
| `SESSION_SECRET` | `/admin` login | Any long random string |
| `BLOB_READ_WRITE_TOKEN` | Resume uploads | Auto-added when you connect Vercel Blob |
| `NEXT_PUBLIC_GA_ID` | Google Analytics | Optional |
| `NEXT_PUBLIC_CLARITY_ID` | Microsoft Clarity | Optional |
| `NEXT_PUBLIC_SITE_URL` | SEO metadata, sitemap | Your production domain |

---

## 4. Deploying to Vercel

1. Push this project to a GitHub repository.
2. Import the repo in Vercel.
3. Add the environment variables above in **Project Settings → Environment
   Variables**.
4. Add a Postgres database (Vercel Postgres, or connect an external one) and
   a Blob store if you want resume uploads — both auto-populate the right
   env vars.
5. Deploy. Every push to `main` deploys to production; every pull request
   gets a preview deployment automatically.
6. Run `npx prisma migrate deploy` (via a Vercel deploy hook, or manually
   against the production `DATABASE_URL`) to create the tables.

---

## 5. Project structure

```
app/                — routes (App Router), one folder per page
components/
  layout/           — Header, Footer, smooth-scroll provider
  ui/                — Button, GlassCard, SectionHeading, ColorBar, Accordion
  home/              — Hero (product-drop animation), ServicesGrid, Testimonials
  forms/             — Quote, Contact, Careers, Partnership, Newsletter forms
  admin/             — Admin-only components
lib/                 — site data, Prisma client, Resend client, Zod schemas, auth, rate limiting
prisma/schema.prisma — database models
```

---

## 6. Design system notes

The visual identity is built around a printer's **CMYK colour-check bar** —
the strip a print shop runs alongside a job to verify registration and ink
density before it's approved. It shows up as the divider between sections
(`components/ui/ColorBar.tsx`) and as small "registration mark" accents
(`.registration-mark` in `app/globals.css`) instead of a generic gradient
rule, since it's an artifact from the client's actual industry rather than
a decorative default.

Palette (see `tailwind.config.ts`):
- Ink Navy `#0B1E3D` — primary dark
- Reduced-shade Navy `#1B3A63` — the "navy umbrella" tone from the brief
- Paper `#F7F5F1` — warm off-white background
- Print Cyan `#17A6C2` — primary accent
- Baby Blue `#BFE1EA` — the "umbrella" tint from the brief
- Press Red `#E63946` — secondary accent, used sparingly

Typography: Fraunces (display) + Inter (body) + IBM Plex Mono (labels/data).
