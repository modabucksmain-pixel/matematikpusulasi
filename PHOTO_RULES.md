# 📐 PHOTO PLACEMENT RULES — Matematik Pusulası Magazine

## CRITICAL: A4 Page Overflow Prevention

**A4 page = 210mm × 297mm. Content MUST NOT exceed page height.**

### Before changing ANY image size:
1. **READ the full page HTML first** — count total content blocks
2. **Calculate remaining space** after headers, footers, text columns
3. **Dense pages (many eras/boxes)**: use `img-frame` (200px) or `img-frame short` (160px)
4. **Light pages (few content blocks)**: can use `img-frame tall` (240px) or `img-frame hero` (280px)
5. **NEVER blindly upgrade to hero/tall** without checking content density

### Size Guide:
| Class | Height | Use When |
|-------|--------|----------|
| `img-frame compact` | 120px | Very dense pages, puzzle pages |
| `img-frame short` | 160px | TOC, pages with lots of text |
| `img-frame` (default) | 200px | Standard article pages |
| `img-frame tall` | 240px | Feature pages with sparse content |
| `img-frame hero` | 280px | ONLY for pages with minimal text |

### Portrait Images:
- Mathematician pages (10-16): Use `img-portrait` with `float:right`
- Max width: 220-240px, height: auto
- Always include `portrait-label` caption

### Content Density Categories:
- **High density** (pages 4,5,33,36): timeline entries, many boxes → `img-frame` or `short`
- **Medium density** (pages 6-8,20-28): standard article → `img-frame` or `tall`
- **Low density** (pages 1,17,19): cover/artistic → `img-frame tall` or `hero`

## Mistakes to NEVER repeat:
- ❌ Upgrading dense pages to hero/tall → causes overflow
- ❌ Not reading page content before changing image size
- ❌ Adding images without checking page footer position
- ❌ **Converting ALL images to same float** → LAZY, every photo MUST be unique
- ❌ Using same width/position on consecutive pages
- ❌ **Not analyzing page elements before designing photo placement**
- ❌ **Limiting page to 1 photo** — pages can and SHOULD have 2-3 photos
- ❌ **Same text layout on every page** — vary column styles, not just newspaper

## CORE RULE: Every Photo is UNIQUE
Before placing any image:
1. READ the full page HTML
2. COUNT elements (cards, grids, code blocks, quotes)
3. MEASURE available whitespace
4. DESIGN custom: width, height, border, shadow, position, shape
5. Each page's photo treatment must be DIFFERENT from adjacent pages

## MULTI-PHOTO RULE
- A page can have **2-3 photos**, not just 1
- Use DIFFERENT treatments for each photo on the same page
- Example: 1 large banner at top + 1 small float in text + 1 accent near footer
- More photos = more visual richness, like a real magazine spread

## TEXT LAYOUT VARIETY
- Don't use same newspaper 2-column on every page
- Options: single wide column, 2 columns, 3 narrow columns, mixed widths
- Some pages: text wraps around a large image (magazine style)
- Some pages: text in sidebar + main content area
- Each page's text flow should COMPLEMENT its unique photo placement

## BACKGROUND HERO TREATMENT (Newspaper Style)
- Some images should go **BIG — behind the content** at low opacity
- Like newspaper front pages where a large photo sits behind the headline
- Use `position:absolute` + low opacity (0.08–0.15) + `z-index:0`
- Content sits on top with `position:relative; z-index:1`
- The `.page` div needs `position:relative; overflow:hidden`
- Best for: title areas, dense pages where floating images compete
- Pattern: `<div style="position:absolute; top:X; left:0; width:100%; height:Ypx; opacity:0.12; z-index:0;"><img ...></div>`

## Unique Treatment Ideas:
- Vary widths: 30%, 38%, 45%, 55%, 65%
- Vary borders: thin gold, thick double, dashed, none
- Vary shadows: subtle, dramatic, colored glow
- Vary shapes: rounded corners (4px vs 12px vs 50%), clipped
- Vary positions: tight to text, overlapping headers, full-bleed edge
- Vary captions: below, overlay, side-label, no caption

## Proven Treatment Catalog (use as reference):
| Style | Inline CSS Pattern | Best For |
|-------|-------------------|----------|
| 📜 Manuscript sidebar | `float:right; width:35%; border:3px double #C9A84C` | History pages |
| 🕌 Centered medallion | `display:inline-block; width:140px; border-radius:50%` | Cultural pages |
| 📊 Tech diagram | `float:right; width:55%; box-shadow:0 0 18px rgba(blue)` | Science pages |
| 🃏 Rotated card | `float:left; width:38%; transform:rotate(-2deg); border:4px solid #fff` | Game/fun pages |
| 📸 Polaroid | `background:#fff; padding:6px 6px 20px; transform:rotate(1.5deg)` | Casual/daily pages |
| 📺 Broadcast banner | `width:100%; height:70px; border-bottom:3px solid #C9A84C` | Sports/action pages |
| 🎵 Vinyl record | `width:120px; height:120px; border-radius:50%; border:6px solid #2a1f0e` | Music pages |
| 🖼️ Gallery frame | `display:inline-block; width:55%; border:6px solid #C9A84C` | Art pages |
| 📝 Subtle accent | `width:25%; opacity:0.75; filter:sepia(0.3)` | Dense puzzle pages |
| 💎 Diamond | `width:100px; height:100px; transform:rotate(45deg)` | Mystery/puzzle pages |
| 🔴 Evidence strip | `width:100%; height:80px; border-top:2px solid #ff1744` | Dark/conspiracy pages |
| ⬡ Hexagon badge | `clip-path:polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)` | Future/career pages |
| 💜 Purple glow | `border-radius:12px; box-shadow:0 4px 20px rgba(103,58,183,0.3)` | Tech pages |
| 🟢 Hacker strip | `width:65%; height:85px; border:2px solid #00E676` | Code/crypto pages |
