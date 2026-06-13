# Product Backlog & Future Tasks

This file outlines the upcoming milestones, roadmap, and individual feature tasks planned for this repository. When an agent completes a task, it should be removed from this list and documented in `changelog.md`.

---

## Session Focus

- [x] Run SEO audits and reach optimization check to maximize search reach.

---

## High-Level Roadmap

### Milestone A: Core UX & Layout Fixes
*   [x] **Layout Bug Fixes**: Correct body overflow behavior so page scrollbar appears when content exceeds the viewport. [Task 1]
*   [x] **Accessibility & Responsiveness**: Adapt layout and components to mobile, tablet, and desktop viewports. [Task 2]

### Milestone B: SEO & Content Update
*   [x] **SEO Optimization**: Enforce clean heading hierarchy, rich page metadata, and unique testing IDs. [Task 3]
*   [x] **Project Integrations**: Add the "epoch" project to resume data and display it alongside trackvenn. [Task 4]

### Milestone C: SEO Audits & Reach Optimization
*   [x] **SEO best practices check**: Perform automated schema validation, meta tags audit, and structured data optimization to maximize website reach. [Task 5]

---

## Active Backlog Tasks

### Milestone A Tasks
- [x] **Task 1: Fix layout scroll bug** - Locate and remove `overflow: hidden` on the body element in `globals.css`, verifying that scrollbars appear correctly when content exceeds the screen height.
- [x] **Task 2: Responsive styling for common device sizes** - Implement media queries in `globals.css` and `cv.css` to scale layout, cards, padding, and fonts gracefully on mobile and tablet.

### Milestone B Tasks
- [x] **Task 3: Enforce SEO & Semantic HTML best practices** - Ensure single `h1` per page, structure nested headings, update title/description metadata, and add unique `id`s on interactive elements.
- [x] **Task 4: Integrate "epoch" project** - Add the "epoch" project to `resumeData.ts` and update the home page to filter and render it similar to `trackvenn`.

### Milestone C Tasks
- [x] **Task 5: SEO and Metadata Validation Audits** - Audit site schema, structured data (JSON-LD), OpenGraph tags, and verify search index compatibility.
