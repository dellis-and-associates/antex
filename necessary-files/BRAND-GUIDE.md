# Antex Pest Solutions — Rebrand v2.0
## Red / Black — the ant lockup

The identity is built directly from the logo: a line-drawn ant whose body carries the wordmark — **ANTEX** in Antex Red, **PEST SOLUTIONS** knocked out of an Ant Black bar. Two colors, white space, and one decorative device (the treated-perimeter line). Everything else stays out of the way.

---

## 1 · Logo

**The mark:** a single-weight outline ant (antennae up, body as an inverted teardrop) with the wordmark locked across its thorax. Supplied as a raster lockup; keep it on white or near-white surfaces at full color.

| File | Use |
|---|---|
| `public/logo.webp` | Website header, documents, invoices — light surfaces |
| `public/logo-reversed.webp` | Dark surfaces (footer, vehicle wraps, uniforms) — ant/bar inverted to white, red preserved |
| `app/icon.svg` | Favicon / app icon — simplified ant glyph on an Antex Red tile |
| `new-logo.webp` (repo root) | Master source file |

Clear space: keep a margin of ½ the bar's height on all sides. Never place the red accent behind the mark; never recolor the red.

The v1.0 shield SVGs (`antex-mark.svg`, `antex-logo-horizontal.svg`, `antex-logo-reversed.svg`, `antex-mark-mono.svg`) are **deprecated** — do not use.

## 2 · Color tokens

| Token | Hex | Role |
|---|---|---|
| `ink-950` Ant Black | `#101010` | Footer, headings, the logo's ant & bar |
| `ink-900` Charcoal | `#1B1B1B` | Hero surfaces, dark cards |
| `red-600` Antex Red | `#E4342B` | **Primary brand** — wordmark, CTAs, links, icons |
| `red-700` Brick | `#B9241C` | Hover/pressed, text links on light, destructive |
| `red-50` Blush | `#FDECEA` | Tints, tags, icon wells |
| `paper-50` Paper | `#FAFAFA` | Page background |
| `paper-200` Fog | `#ECECEC` | Cards, wells, dividers |
| `basalt-700` Basalt | `#3E3E3E` | Body text |

Rule of thumb: ~60% paper/white, ~30% ink, ~10% red. Red is loud — scarcity keeps it powerful. Large red surfaces are reserved for the CTA band.

## 3 · Typography

- **Display — Plus Jakarta Sans 700/800.** Headlines and the wordmark. Clean, modern and confident.
- **Body — Archivo 400/500/600.** Everything readable: paragraphs, UI, buttons.
- **Utility — Archivo 600.** Eyebrows, phone numbers, data labels. Always uppercase with +8% (0.16em) tracking — the "inspection report" voice.

Scale: Display 64/66 · H2 40/46 · H3 24/32 · Body 17/28 · Small 14/22 · Eyebrow 13.

## 4 · Signature motif — the perimeter line

A 1.5px dashed line (`dash 5 / gap 7`, round caps, Antex Red at 40% opacity on light; white at 30% on dark) that appears around the hero visual, on process step dividers, and under phone-number links. It's the one decorative device in the system, and it means something: *the treated barrier we maintain.* Don't add other ornament.

## 5 · Voice

Plain verbs, homeowner's vocabulary, specific over clever. Buttons say exactly what happens: "Book a free inspection", not "Get started". The guarantee is stated as a promise, not marketing: *"Pests return? So do we. Free."* (No em dashes anywhere in site copy — client preference.)

## 6 · Getting this into Figma

1. **Tokens** → install the *Tokens Studio* plugin in Figma → import `design-tokens.json` → "Create styles & variables". You get the full color/type/space/radius system as Figma Variables.
2. **Logos** → drag `public/logo.webp` / `public/logo-reversed.webp` onto the canvas.
3. Fonts: enable **Plus Jakarta Sans** and **Archivo** (both free Google Fonts, available in Figma's font picker).
