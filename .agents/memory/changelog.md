# Project History & Milestone Timeline

This file captures the chronological history of milestones, architectural decisions, and tasks completed in the repository.

---

## Sprint Chronology

### Milestone A: Core UX & Layout Fixes
*   **Accomplishment**: Fixed body layout overflow scrolling bug by replacing `overflow: hidden` with `overflow-y: auto`. Added mobile and tablet responsive media queries in `globals.css` and `cv.css`.
*   **Decisions**: Enforced scrollbar visibility when content overflows viewport height, and scaled grid/pills layouts to columns on screen width <= 600px.

### Milestone B: SEO & Content Update
*   **Accomplishment**: Restructured page headers (e.g. h2/h3) for clean semantic hierarchy, added unique DOM IDs to links, and integrated the new "epoch" project to `resumeData.ts` and the main portfolio layout. Corrected epoch's details and repo link based on actual sibling project directory analysis.
*   **Decisions**: Enforced single h1 hierarchy per page, added comprehensive unit tests for project cards rendering, and ensured zero linting errors during next build verification.

---

