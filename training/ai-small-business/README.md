# Sentrell Group — Digital Workshop Experience

A static, responsive digital course preview for **AI for Small Business: Win Back 5 Hours a Week**.

**Primary audience:** Kansas City small-business owners and local event hosts.  
**Instruction:** Introductory, vendor-neutral, with practical Copilot and ChatGPT examples.  
**Product:** ~12-minute interactive preview plus a 90-minute live instructor-led workshop.  
**Buyer CTA:** Request a discovery call (prefilled email; not instant scheduling).

## Preview modules
1. Your mission
2. Build a prompt (Goal / Context / Source / Expectations)
3. Customer reply verification
4. Meeting notes source fidelity
5. Editable time-savings calculator
6. Seven-day next-step plan

No client-side analytics, storage, backend, artificial live-AI response, or required account registration. All scenarios are fictional.

## Local preview
Run from repository root:
```bash
python3 -m http.server 4173 --bind 127.0.0.1
```
Open `http://127.0.0.1:4173/training/ai-small-business/`

## Automated QA
```bash
npm install
npx playwright install chromium
npm run test:e2e
```

See `docs/ai-small-business-host-kit.md` for the full run-of-show and `docs/ai-small-business-deployment.md` for release steps.
