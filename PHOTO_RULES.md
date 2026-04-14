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
- ❌ Using inline styles instead of img-frame components
- ❌ Adding images without checking page footer position
