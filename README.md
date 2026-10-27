# Divya Bhogle — Portfolio

Personal portfolio built with Next.js 16 (App Router, Cache Components), TypeScript, Tailwind CSS v4, Motion, next-themes, Zod and Resend.

## Run locally

```bash
npm install
cp .env.example .env.local   # then fill in values
npm run dev                  # http://localhost:3000
```

Checks: `npm run lint`, `npx tsc --noEmit`, `npm run build`.

## Personalize

| What | Where |
| --- | --- |
| Name, title, tagline, location, socials, availability badge, About text, education | `config/site.ts` |
| Skills | `data/skills.ts` |
| Projects (add screenshots to `public/projects/` and set `image`) | `data/projects.ts` |
| Experience | `data/experience.ts` |
| Profile photo | replace `public/profile.png` (or change `profileImage`) |
| Resume | replace the PDF in `public/` and keep `resumeFile` in sync |

Lines marked `PLACEHOLDER` still need your input. A missing photo shows a monogram; a missing resume disables the download button.

## Contact form

`POST /api/contact` validates with Zod (`lib/contact.ts`, shared with the form) and sends through Resend.

| Status | Meaning |
| --- | --- |
| 200 | Sent (also returned silently for detected spam) |
| 403 | Cross-origin request |
| 413 / 415 / 400 | Body too large / not JSON / malformed JSON |
| 422 | Validation failed (`fieldErrors` included) |
| 429 | Rate limited (`Retry-After` header) |
| 502 | Resend failed |
| 503 | Email env vars not configured — the user is told the message was **not** sent |

Spam protection: honeypot field, minimum fill time, same-origin check, and IP rate limiting (5 per 10 minutes).

### Resend setup

1. Create an account at [resend.com](https://resend.com) and an API key → `RESEND_API_KEY`.
2. **Domains → Add domain**, add the DNS records it shows (SPF/DKIM) at your registrar, and wait for verification.
3. Set `CONTACT_FROM_EMAIL` to an address on that domain, e.g. `Portfolio <contact@yourdomain.com>`, and `CONTACT_TO_EMAIL` to your inbox.
4. Before a domain is verified you can test with `onboarding@resend.dev`, which only delivers to your Resend account's own email.

### Rate limiting (Upstash Redis)

Serverless instances don't share memory, so production should use Upstash: in Vercel, **Storage → Marketplace → Upstash Redis**, connect it to the project (sets `KV_REST_API_URL` / `KV_REST_API_TOKEN`), or set `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` manually. Without it, a per-instance in-memory limiter is used and a warning is logged.

## Deploy on Vercel

1. Push to GitHub and import the repo in Vercel.
2. Add the environment variables from `.env.example` (Production and Preview).
3. Set `NEXT_PUBLIC_SITE_URL` once you have a custom domain (otherwise the Vercel production URL is used).
4. Deploy, then send a test message through the form.
