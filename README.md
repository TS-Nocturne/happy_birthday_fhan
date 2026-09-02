## Happy Birthday

A small interactive birthday site built with Next.js.

## Run locally

```bash
pnpm dev
```

Copy `.env.example` to `.env.local` and set the gift URL before testing the TrueMoney button.

```bash
Copy-Item .env.example .env.local
```

## Deploy to Vercel

1. Push this folder to a Git repository and import it in Vercel.
2. In **Project Settings → Environment Variables**, add `NEXT_PUBLIC_TRUEMONEY_GIFT_URL` with the TrueMoney gift URL and `SITE_PASSCODE` with `0309`.
3. Select the environments where it should work (typically Production, Preview, and Development), then deploy.

The variable is intentionally prefixed with `NEXT_PUBLIC_`: the visitor's browser needs it to open the gift link. Do not place private credentials in it.

`SITE_PASSCODE` is server-only and is checked before the birthday site is shown.

The site remains locked until **3 September 2026, 00:00 Asia/Bangkok (UTC+7)** and shows a countdown before then.

## Verify before deploying

```bash
pnpm lint
pnpm build
```
