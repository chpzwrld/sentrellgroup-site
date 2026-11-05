# Sentrell Digital Course — Deployment and QA

## Release status
The proposed course lives at `training/ai-small-business/index.html` on the feature branch attached to [PR #1](https://github.com/chpzwrld/sentrellgroup-site/pull/1). The existing main-branch homepage and its `CNAME` file remain untouched.

## Current buyer decisions
- Buyer: Kansas City small-business owners and local event organizers
- Offering: Interactive ~12-minute preview **plus** a separate 90-minute live instructor-led workshop
- Apps taught: Vendor-neutral prompts, demonstrated with Copilot and ChatGPT links
- Primary CTA: Discovery call request via email; swap for verified scheduling URL once supplied
- Privacy: Browser-only interactive fields; no AI API, account collection, payments, analytics or local persistent storage

## Browser smoke tests
GitHub Actions runs Chromium Playwright checks in `.github/workflows/course-qa.yml`. Check the latest run on the PR for passing evidence. Tests cover:
1. Landing-page heading and discovery email
2. Prompt builder and both tool links
3. Customer-response error identification and missing-information/restrictions check
4. Calculator arithmetic and negative-savings handling
5. Mobile 375-pixel layout and no automatic scrolling past hero
6. Privacy and evidence disclaimers

If the CI run fails, repair and rerun before public release. The site must not be described as browser-verified before a successful run.

## Publication steps
1. Review [PR #1](https://github.com/chpzwrld/sentrellgroup-site/pull/1) and its GitHub Actions checks.
2. Check that the 90-minute workshop details, buyer CTA and disclaimer are correct.
3. Merge the PR into `main` **only when public release is authorized**.
4. GitHub Pages previously ran from `main`, with CNAME `sentrellgroup.com`; confirm Pages build/deployment succeeds after merge.
5. Open `https://sentrellgroup.com/training/ai-small-business/` from desktop and phone.
6. Click all six lessons and both assistant links. Send a *test request only* via the email CTA to confirm configured mail handling.
7. Provide a verified self-scheduling URL when available, then replace mailto CTA and repeat testing.

## Future enhancement backlog (not required for pilot)
- Microsoft Bookings or another verified calendar booking URL
- Accessible captions and founder-led Loom video once produced/approved
- Live event registration through a consented event-host platform
- Permissioned, optional post-event results capture and reporting dashboard
- Matched before/after pilot outcomes before any numerical performance claim

## Known limitations
- Visitors cannot schedule a definite time in-page: they initiate an email request.
- Browser fields are not submitted or stored; leaving the page resets entries.
- The preview does not automatically call Copilot, ChatGPT or an AI model; actual model practice occurs in an approved separate application.
- GitHub Pages deployment depends on repository configuration and successful post-merge publishing.
