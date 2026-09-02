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
2. In **Project Settings → Environment Variables**, add `NEXT_PUBLIC_TRUEMONEY_GIFT_URL` with the TrueMoney gift URL.
3. Select the environments where it should work (typically Production, Preview, and Development), then deploy.

The variable is intentionally prefixed with `NEXT_PUBLIC_`: the visitor's browser needs it to open the gift link. Do not place private credentials in it.

## Verify before deploying

```bash
pnpm lint
pnpm build
```
