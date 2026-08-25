# Site Structure & SEO Reference

## Routes

| Route | Type | Source | Notes |
| --- | --- | --- | --- |
| `/` | Static (ISR via Sanity fetch) | `app/(site)/page.tsx` | Marketing homepage — Hero, Capabilities, What ATOS Unlocks, Inventory Control, Tier Priority (A/B/C), Analytics Layer, Audience Grid, Proven Results, Latest Insights (3 posts), CTA. |
| `/blog` | Static (ISR via Sanity fetch) | `app/(site)/blog/page.tsx` | Full blog listing, reuses `BlogCard`. |
| `/blog/[slug]` | Dynamic | `app/(site)/blog/[slug]/page.tsx` | Individual post, Portable Text content, per-post `generateMetadata` + `BlogPosting` JSON-LD. |
| `/studio/[[...tool]]` | Client (Sanity Studio) | `app/studio/[[...tool]]/page.tsx` | Not wrapped by the marketing `Header`/`Footer` (outside the `(site)` route group). Disallowed in `robots.ts`. |
| `/sitemap.xml` | Generated | `app/sitemap.ts` | Home, `/blog`, and every published post (`lastModified` from Sanity `_updatedAt`). |
| `/robots.txt` | Generated | `app/robots.ts` | Allows all, disallows `/studio`, points to `/sitemap.xml`. |
| `/opengraph-image` | Generated | `app/opengraph-image.tsx` | Default 1200×630 OG image via `next/og`, used as the site-wide social share image unless a page defines its own. |

## Layout composition

- `app/layout.tsx` — root layout: `<html>`/`<body>`, Roboto font, site-wide `Metadata` (title template, description, OpenGraph/Twitter defaults, robots, icons).
- `app/(site)/layout.tsx` — wraps `/`, `/blog`, `/blog/[slug]` with the shared `Header` and `Footer` (`components/Header.tsx`, `components/Footer.tsx`) and injects `Organization` JSON-LD. The `(site)` route group exists specifically so Sanity Studio is excluded from this chrome.

## Reusable components

- `components/ui/Card.tsx`, `Badge.tsx`, `Button.tsx` — cross-page primitives.
- `components/BlogCard.tsx` — reused on the homepage "Latest insights" section and the full `/blog` listing.
- `app/(site)/_components/FeatureCard.tsx` — one card shape reused across Capabilities (6), What ATOS Unlocks (3), and Audience Grid (4) = 13 usages.
- `app/(site)/_components/DarkFeatureCard.tsx`, `TierCard.tsx`, `StatCard.tsx`, `DashboardFrame.tsx` — each backs a repeated grid (Inventory Control, Tier Priority, Proven Results) or the two dashboard mockups (Hero, Analytics Layer).

## SEO/metadata checklist

- [x] Title template (`%s | RAMS Digital`) + per-page titles/descriptions.
- [x] `metadataBase` + canonical URLs on `/` and `/blog`.
- [x] OpenGraph + Twitter card metadata site-wide, with per-post OG image (post cover) on blog posts.
- [x] `Organization` JSON-LD (site-wide) and `BlogPosting` JSON-LD (per post).
- [x] `sitemap.xml` generated from live Sanity content.
- [x] `robots.txt` disallowing `/studio`.
- [x] Default social share image (`opengraph-image`).

## Known placeholders (update before launch)

- `NEXT_PUBLIC_SITE_URL` is not set — `app/lib/site.ts` falls back to `https://rams.digital`. Set the real production domain in env vars.
- Header/Footer nav items without a matching section (`Hardware`, `Services`, product sub-pages listed in the footer) link to `#` — replace once those pages exist.
- CTA buttons in `CtaSection.tsx` use `mailto:` placeholders — swap for a real contact/demo-request flow.
