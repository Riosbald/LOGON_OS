# Deploy LOG_ON to Vercel

## Project build settings (configured in-repo)

| Setting | Value |
|---------|--------|
| **Framework preset** | Other (`framework: null` in `vercel.json`) \u2014 Nitro emits `.vercel/output` |
| **Install command** | `npm install` |
| **Build command** | `npm run build` |
| **Output directory** | *Leave empty* \u2014 do not set; Nitro/Vercel Build Output API uses `.vercel/output` |
| **Node.js version** | `22.x` (`package.json` \u2192 `engines.node`, matches `nodejs22.x` functions) |
| **Root directory** | `.` (repo root) |

Source of truth: `vercel.json` + `package.json` engines + `vite.config.ts` (`nitro({ preset: "vercel" })`).

## One-time import

1. [vercel.com/new](https://vercel.com/new) \u2192 import **Riosbald/LOGON_OS**
2. Confirm the table above (Vercel should read `vercel.json`)
3. Deploy \u2192 open production URL
4. Later pushes to `main` auto-redeploy

## Local verify before deploy

```bash
npm install
npm run build
# should create .vercel/output (config.json, static/, functions/)
npx vercel deploy --prebuilt   # optional, needs login
```

## Notes

- `db:migrate` in the build script no-ops when `DATABASE_URL` is unset (PGLite path).
- Do not set Output Directory to `dist` or `build` \u2014 that breaks the Nitro serverless entry.
