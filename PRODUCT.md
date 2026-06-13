# Briques — Product brief (for `$impeccable` and future design work)

> Source of truth for design context on this marketing site
> (`briques-web/`). The Flutter app's brand details live in
> `../briques-ai/briques/CLAUDE.md`; pricing rules live in
> `../PRICING.md`. This file is the brand-side condensation.

---

## register

**brand**

This site is the marketing surface — design IS the product here. The
Flutter app is the product side. Don't conflate the two: the Flutter
side is restrained and tool-shaped; this site can be louder and more
opinionated.

---

## Product (one paragraph)

Briques is an AI-powered micro-app builder. You describe an app in
plain language, the AI plans it (pages, tables, fields, flow), and a
Flutter renderer brings it to life on your phone within a minute.
Apps are **single-user** at v1 (no sharing, no multi-tenant) — a
Briques app is something *you* build for *yourself*, the way someone
builds a personal spreadsheet. Pricing is two tiers: Free ($0) and
Pro ($9/mo).

---

## Users

Two halves, similar shape:

- **Solo professionals replacing spreadsheets.** Freelancers
  tracking clients, indie founders tracking churn, real estate
  agents tracking listings. Already use Notion / Airtable /
  spreadsheets. Want a real native app for their use case but
  aren't willing to learn React Native or pay $20k for a builder.
- **Curious tinkerers.** People who keep a Notes file of "apps I
  wish existed" and would build them in a weekend if the friction
  were near zero. Often technical-adjacent (designers, marketers,
  PMs) but rarely full developers.

What they share: **the app they want is single-user, small, and
specific.** They don't want to build the next Slack. They want to
build a weather log for their fishing trips.

---

## Brand voice (three concrete words)

**Crafted, warm, opinionated.**

Not "modern" / "clean" / "AI-powered" — those are reflex words.
Crafted = something a person made, not something a template
generated. Warm = inviting, not cold-tech. Opinionated = we have
specific aesthetic taste, not "we'll do whatever you want."

The brand should feel like a small kit-company catalog from 1978
that happens to ship to your phone. Not like another Vercel landing
page.

---

## Anti-references (don't look like these)

- Vercel / Linear / Stripe — too cold, too tech-startup, too
  monochrome. We're warm.
- Webflow / Framer / Bubble — too no-code-template, too gradient,
  too "everyone gets a personal brand." We're opinionated.
- Notion — close in audience, but Notion's brand is intentionally
  blank-canvas neutral. We're not neutral.
- Magazine-editorial pastiche (display-serif + drop caps + grid
  rules + "The Briques Quarterly No. 04" cuteness). The site
  shouldn't pretend to be a magazine. The site is a marketing
  surface for a software tool.

---

## Visual identity

### Palette — Sunlit (full palette strategy)

Five named accent roles on cream paper. All on warm OKLCH/hex
neutrals tinted toward the apricot hue (no pure `#000` / `#fff`).

| Token | Hex | Role |
|---|---|---|
| `paper` | `#FAF7F0` | Background everywhere |
| `ink` | `#1A1714` | Primary text |
| `inkSoft` | `#5A5246` | Secondary text |
| `inkMuted` | `#857F76` | Tertiary text |
| `border` | `#E8E2D2` | Hairline strokes |
| `apricot` | `#F4A261` | Primary accent — CTAs, anchor warmth |
| `sage` | `#A3B18A` | Calm/data, secondary |
| `butter` | `#F2D26F` | Highlight, "look here" |
| `sky` | `#A7C7E7` | Info, quotes, quiet |
| `rose` | `#E29578` | Second-warm, accent |
| `cream` | `#F4ECD8` | Tinted surface (slightly darker than paper) |

These mirror the Flutter app's `SunlitAccent` palette in
`briques-ai/briques/lib/widgets/brick.dart` exactly. Same brand
across product + marketing.

### Typography

- **Body / UI**: Geist (400 / 500 / 600 / 700), self-hosted from
  `assets/fonts`. This mirrors the Flutter app so the website and
  installed product feel like one system.
- **Display accent**: Instrument Serif (400 + italic). Use it for
  controlled editorial moments, especially italic emphasis and
  large brand-led headlines. One word in italic does more than
  five words in bold.
- **Two families only.** Geist + Instrument Serif. No mono. No
  third typeface.
- Scale ratio ≥1.25 between steps. Aggressive contrast on display
  sizes (clamp to 6rem on hero).
- Body line length capped at 65–75ch.

### Decoration — the LEGO brick

The brick is the signature decorative element. Used as:
- Header bands at the top of pages (a row of 4–6 bricks of varying
  sizes/colors)
- Section dividers (single brick or short brick band)
- Brand mark in the nav (the transparent yellow Briques mark + the wordmark)
- Numbered list "leading bullets" (brick with a number on it)

Web bricks are **PNG-backed CSS components** using transparent
source assets in `assets/bricks`. Use those files as-is: no recolor,
no generated variants, no non-uniform stretching. The existing
`.brick--{cols}x{rows}` class vocabulary chooses the closest original
asset while preserving its natural aspect ratio.

The Flutter side renders bricks via a CustomPainter
(`brick.dart`) — the web reproduction matches the visual
language while using web image assets for more realistic depth.

---

## Tone of copy

- Sentences over phrases. "Describe an app. Briques builds it." > "AI app builder."
- Specific verbs over generic ones. "Type a sentence. Get an app." > "Empower your creativity with AI."
- No corporate marketing-speak. No "revolutionize", "empower",
  "transform", "supercharge", "unlock potential."
- No em dashes. Use commas, colons, semicolons, periods, parentheses.
- Lowercase headlines OK; sentence case is the default. Title Case
  feels too formal.
- "Briques" never reads "Briques.AI" or "Briques.app" inline —
  just "Briques." The TLD shows up in URLs and the footer only.

---

## Strategic principles

- **Small over scalable.** Briques is intentionally for tiny apps
  built by one person for themselves. We're not selling
  "build the next Notion." We're selling "build the thing you've
  been saying you'd build for two years."
- **Single-user is a feature.** No accounts to manage, no
  permissions matrix, no sharing UX, no multi-tenant data. The
  apps you build are yours alone.
- **AI is the assistant, not the brand.** Briques uses AI to
  generate apps; that's plumbing. The product is "your app",
  not "AI built your app." Don't lead with "AI-powered."
- **Warm over slick.** A cream paper background, hand-placed bricks,
  serif headlines. Slick is everywhere; warm is rare in this
  category.
- **Honest pricing.** $9/mo Pro, $0 Free, that's the entire price
  page. No usage-based gotchas, no per-seat math (single-user, so
  the math is always 1).

---

## Pages on this site

- `/` (index) — landing
- `/beta` — iOS TestFlight beta signup and feedback route
- `/pricing` — Free + Pro tier comparison
- `/privacy` — privacy policy (legal, must be kept current)
- `/terms` — terms of service (legal, must be kept current)
- `/contact` — direct email links (no contact form; nothing to POST to yet)

Future (not now): blog (when there's something to blog), changelog,
a proper /about (the in-app About screen covers it for now).

---

## Constraints

- **Static site.** No build step. HTML + CSS + minimal vanilla JS.
  Deploys to Cloudflare Pages by uploading the directory.
- **Asset-backed decoration.** The nav mark and social image use the
  transparent `assets/images/logo.png`; decorative bricks use the
  original transparent PNG assets under `assets/bricks`.
- **Two webfont families only.** Geist and Instrument Serif, both
  self-hosted in `assets/fonts` (the serif was moved off Google
  Fonts 2026-06 to remove the render-blocking third-party request).
- **No JS frameworks.** Vanilla `<script>` tags only, and only
  where strictly needed (form validation, tab switching).

---

## Tool exceptions (Hallmark and similar design skills)

Generic anti-AI-slop rulebooks flag three things on this site that
are deliberate brand choices, not defects. When running Hallmark
(audit / redesign / study) or any similar skill, these exceptions
override its defaults:

- **Italic serif headlines stay.** Hallmark bans italic display
  type as an AI tell. Here, Instrument Serif italic for identity
  moments is a named brand rule ("one word in italic does more
  than five words in bold"). Do not de-italicise headings.
- **The Sunlit palette is locked.** Never let a theme catalog or
  palette generator replace it. It mirrors the Flutter app
  (`brick.dart`) exactly; the website and product are one system.
- **The hero phone mock stays.** Rules against "re-drawn device
  chrome" target fake decoration. The CSS-built iPhone shows the
  actual product UI in real markup and is the site's signature
  "show, don't sell" move. Real product screenshots elsewhere use
  the `.shot` figure (plain hairline border, no fake chrome).
