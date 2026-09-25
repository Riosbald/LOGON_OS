# Deploy LOG_ON to Vercel

## Build (already configured)

- Vite + TanStack Start
- Nitro preset: `vercel` in `vite.config.ts`
- Build command: `npm run build`
- Local build verified: succeeds and emits `.vercel/output`

## One-time: connect the GitHub repo

1. Open [vercel.com/new](https://vercel.com/new)
2. Import **Riosbald/LOGON_OS**
3. Framework: leave auto (or Other). Build: `npm run build`. Output: leave default for Nitro/Vercel.
4. Deploy. Production URL will be `https://<project>.vercel.app`
5. Every push to `main` redeploys automatically.

## Optional CLI (your machine)

```bash
npm i -g vercel
cd LOGON_OS
vercel login
vercel link   # select / create project
vercel --prod
```

Requires a Vercel account token; the agent sandbox has no `VERCEL_TOKEN`.

## Preview checklist after deploy

- `/` `/systems/business` `/systems/assurance` `/systems/intelligence` `/systems/vertical-os`
- `/insights` `/audit` `/control-plane` `/research`
