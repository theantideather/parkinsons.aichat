# Parkinson's Communication Helper

- Dev: `npm run dev`
- Build: `npm run build`

## Netlify
- This repo includes `netlify.toml` and `@netlify/plugin-nextjs`.
- In Netlify, set:
  - Build command: `npm run build`
  - Publish directory: `.next`
- Environment (optional):
  - `NODE_VERSION` matching your local Node (e.g., 20)
  - `NPM_FLAGS=--legacy-peer-deps` only if needed

## Gujarati TTS
- OS/browser needs a Gujarati voice installed. After installing, reload the app.

