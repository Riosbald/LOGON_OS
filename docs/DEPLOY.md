# Deploy LOG_ON to Vercel

## Project build settings (configured in-repo)

| Setting | Value |
|---------|--------|
| **Framework preset** | Other (`framework: null` in `vercel.json`) — Nitro emits `.vercel/output` |
| **Install command** | `npm install` |
| **Build command** | `npm run build` |
| **Output directory** | *Leave empty* — do not set; Nitro uses `.vercel/output` |
| **Node.js version** | `22.x` |
| **Root directory** | `.` |

## Import

1. https://vercel.com/new → import **Riosbald/LOGON_OS**
2. Confirm settings above
3. Deploy

Do not set Output Directory to `dist` or `build`.
