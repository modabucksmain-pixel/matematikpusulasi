# Agent Instructions

## Package Manager
Use **npm**: `npm install`, `npm run dev`, `npm run build`

## Commit Attribution
AI commits MUST include:
```
Co-Authored-By: Gemini <noreply@google.com>
```

## Stack
- Vite static site (HTML/CSS/JS)
- No framework, no TypeScript
- Magazine: 40 standalone HTML pages in `public/pages/`
- Website: root HTML files (`index.html`, `bulmacalar.html`, etc.)

## File-Scoped Commands
| Task | Command |
|------|---------|
| Dev server | `npm run dev` |
| Build | `npm run build` |
| Preview | `npm run preview` |

## Key Conventions
- Magazine pages: A4 fixed (210mm × 297mm), `overflow: hidden`
- Shared styles: `public/pages/magazine-common.css`
- Design tokens: `design-tokens.css`
- **CRITICAL**: Never exceed A4 page height — check content density before sizing images
- Img assets: `public/img/` — AI-generated PNGs
- See `PHOTO_RULES.md` for image placement constraints

## Image Classes

### Frame Sizes (full-width, centered)
| Class | Height | Use |
|-------|--------|-----|
| `img-frame` | 200px | Standard article |
| `img-frame.compact` | 120px | Dense/puzzle pages |
| `img-frame.short` | 160px | TOC, text-heavy |
| `img-frame.tall` | 240px | Feature with sparse content |
| `img-frame.hero` | 280px | Minimal text pages |
| `img-frame.inset` | 200px, 70% width | Pull-quote style centered |
| `img-frame.landscape-natural` | auto (max 200px) | Preserves natural AR |

### Float/Wrap Utilities (text wraps around image)
| Class | Behavior |
|-------|----------|
| `img-wrap-right` | Float right, max 45% width, text wraps left |
| `img-wrap-left` | Float left, max 45% width, text wraps right |

### Portrait (biography pages)
- `img-portrait` with `float:right` or `float:left`
- Alternating sides per consecutive bio page
- Max width: 220-240px, height: auto

### Background Watermark
- `img-bg-hero`: absolute positioned, 15% opacity, behind title area
- Use on dense pages (puzzles, reference) where space is tight

## Photo Placement Rules
1. **NEVER** use same treatment on consecutive pages — every photo is UNIQUE
2. **NEVER** limit to 1 photo per page — use 2-3 photos with different treatments
3. **NEVER** use square images in landscape frames — regenerate as 16:9
4. **Always analyze** page elements (cards, grids, quotes) before sizing photos
5. **Always verify** page-footer visibility after placing images
6. **Vary text layouts** — not every page needs newspaper 2-column
7. See `PHOTO_RULES.md` for the full treatment catalog and sizing guide
