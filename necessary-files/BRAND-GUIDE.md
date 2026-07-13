# Antex Pest Solutions — Rebrand v1.0
## "Hold the Perimeter"

Antex's job, literally, is drawing and defending a treated line around a property. The entire identity is built on that idea: a shield mark, a dashed perimeter motif, and a palette taken from the ground Antex actually works on — Utah juniper and red-rock sandstone.

---

## 1 · Logo

**The mark:** a crest-style shield containing a geometric ant, ringed by a dashed *perimeter line* — the pest is identified, contained, and held inside the line. Reads clearly at 24px (favicon) and on a truck door.

| File | Use |
|---|---|
| `logos/antex-mark.svg` | App icon, favicon, social avatar, watermark |
| `logos/antex-logo-horizontal.svg` | Website header, documents, invoices |
| `logos/antex-logo-reversed.svg` | Dark surfaces (footer, vehicle wraps, uniforms) |
| `logos/antex-mark-mono.svg` | Single-color: stamps, embroidery, engraving |

Clear space: keep a margin of ½ the shield's width on all sides. Never place the clay accent behind the mark.

## 2 · Color tokens

| Token | Hex | Role |
|---|---|---|
| `ink-950` Night Pine | `#0F1C17` | Footer, dark surfaces, headings |
| `pine-800` Deep Juniper | `#17402F` | Hero surfaces, dark cards |
| `pine-600` Juniper | `#1F6A47` | **Primary brand** — logo, links, icons |
| `pine-100` Mist | `#DCEDE2` | Tints, tags, icon wells |
| `sand-50` Bone | `#FAF6EE` | Page background |
| `sand-200` Sandstone | `#EFE7D7` | Cards, wells, dividers |
| `clay-600` Canyon Clay | `#C2551E` | **CTAs and highlights only** — scarcity keeps it powerful |
| `basalt-700` Basalt | `#33413A` | Body text |

Rule of thumb: ~60% sand, ~30% pine/ink, ~10% clay.

## 3 · Typography

- **Display — Bricolage Grotesque 700/800.** Headlines and the wordmark. Confident, slightly characterful, unmistakably not a template.
- **Body — Archivo 400/500/600.** Everything readable: paragraphs, UI, buttons.
- **Utility — Space Mono.** Eyebrows, phone numbers, data labels. Always uppercase with +8% (0.16em) tracking — the "inspection report" voice.

Scale: Display 64/66 · H2 40/46 · H3 24/32 · Body 17/28 · Small 14/22 · Eyebrow 13.

## 4 · Signature motif — the perimeter line

A 1.5px dashed line (`dash 5 / gap 7`, round caps, Juniper at 45% opacity) that appears around the hero visual, inside the shield, on process step dividers, and under phone-number links. It's the one decorative device in the system, and it means something: *the treated barrier we maintain.* Don't add other ornament.

## 5 · Voice

Plain verbs, homeowner's vocabulary, specific over clever. Buttons say exactly what happens: "Book a free inspection", not "Get started". The guarantee is stated as a promise, not marketing: *"Pests return? So do we — free."*

## 6 · Getting this into Figma

Your Figma connector hit its Starter-plan MCP call limit, so this package is structured for import:

1. **Tokens** → install the *Tokens Studio* plugin in Figma → import `design-tokens.json` → "Create styles & variables". You get the full color/type/space/radius system as Figma Variables.
2. **Logos** → drag the four SVGs straight onto the canvas (Figma imports SVG natively, fully editable vectors).
3. **Homepage UI** → open `antex-homepage.html` in a browser to review, then use the *html.to.design* plugin (paste the file or a hosted URL) to convert it into editable Figma frames — or ask me to push it into your file directly once the Figma limit resets or the plan is upgraded.
4. Fonts: enable **Bricolage Grotesque**, **Archivo**, **Space Mono** (all free Google Fonts, available in Figma's font picker).
