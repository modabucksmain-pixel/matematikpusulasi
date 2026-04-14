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
- Image classes: `img-frame`, `img-frame.tall`, `img-frame.hero`, `img-frame.short`, `img-frame.compact`, `img-portrait`
- **CRITICAL**: Never exceed A4 page height — check content density before sizing images
- Img assets: `public/img/` — AI-generated PNGs
- See `PHOTO_RULES.md` for image placement constraints
