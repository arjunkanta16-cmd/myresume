# KANTA LEELA TRILOK ARJUN Portfolio

Premium portfolio and dynamic resume generator built with Next.js, Tailwind CSS, Framer Motion, and a mock admin console.

## Run locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run start
```

## Highlights

- Modern responsive portfolio for software, DevOps, and AI-oriented roles
- Dark and light mode support
- Scroll animations and polished project cards
- Hidden admin panel with mock password and OTP flows
- Real-time resume PDF generation through `/api/resume`
- Resume preview page ready for deployment on Vercel

## Deployment Notes

- Set `NEXT_PUBLIC_SITE_URL` in Vercel for canonical metadata, sitemap, and robots output
- Default deployment target is Vercel-compatible and works with `next build`
- Resume download is generated server-side through the Next.js route handler
