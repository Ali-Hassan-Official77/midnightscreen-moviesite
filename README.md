# MidnightScreen

Premium movie and web-series discovery platform built with Next.js, Tailwind CSS, Framer Motion and TMDB.

## Features
- Continuous 3D-perspective hero carousel with smooth cinematic transitions
- TMDB-powered trending, popular, top-rated, upcoming and now-playing collections
- Dedicated multi-category Genres hub with individual genre pages
- Web Series section powered by TMDB TV discovery endpoints
- Movie detail pages with poster, backdrop, rating, cast, trailer and TMDB image gallery/stills
- Search with server-side TMDB authentication
- Local My List / bookmark functionality
- Responsive desktop, tablet and mobile UI
- Production-safe TMDB image remote configuration
- Server-side API token usage; credentials are never shipped to the browser

## Environment
Create `.env.local`:

```env
TMDB_API_KEY=
TMDB_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_TMDB_IMAGE_URL=https://image.tmdb.org/t/p
API_ACCESS_TOKEN=
```

`API_ACCESS_TOKEN` should contain your TMDB v4 Read Access Token. `TMDB_API_KEY` is accepted as a fallback.

## Run

```bash
npm install
npm run dev
```

Production:

```bash
npm run build
npm start
```

## Deployment
Add the same environment variables in Vercel Project Settings → Environment Variables. Do not commit `.env.local`.

TMDB image host configuration is included in `next.config.mjs` for reliable deployed image rendering.

## Brand
CineVanta — Motion Picture Discovery
Rawalpindi, Pakistan
administrator297@cinevanta.com
