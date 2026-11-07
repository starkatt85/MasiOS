# Masi Online Service Centre

Responsive single-page Astro website for a local E-Sevai and online service centre.
The project uses Tailwind CSS 4, daisyUI 5, and Sass.

## Project structure

```text
/
├── public/
│   └── images/mapshot.png
├── src/
│   ├── components/
│   │   ├── About.astro
│   │   ├── Contact.astro
│   │   ├── DocumentServices.astro
│   │   ├── Gallery.astro
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── Reviews.astro
│   │   ├── Services.astro
│   │   └── SiteFooter.astro
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   └── index.astro
│   ├── scripts/
│   │   └── site.ts
│   └── styles/
│       ├── global.css
│       └── site.scss
├── astro.config.mjs
└── package.json
```

`src/pages/index.astro` composes the page from section components. Global Tailwind
and daisyUI configuration lives in `src/styles/global.css`, while page-specific
SCSS is imported by `BaseLayout.astro`. Browser-only scramble and scroll animation
logic lives in `src/scripts/site.ts`.

## Commands

Run these commands from the project root:

| Command | Action |
| --- | --- |
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start the local Astro development server |
| `pnpm build` | Build the production site into `dist/` |
| `pnpm preview` | Preview the production build locally |
