# Product Backlog & Future Tasks

This file outlines the upcoming milestones, roadmap, and individual feature tasks planned for this repository. When an agent completes a task, it should be removed from this list and documented in `changelog.md`.

---

## Session Focus

- [ ] Task 6: Extend resumeData structure and content to support certifications.

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

### Milestone D: Skimmable Role History, Education & Certifications
*   [ ] **Card-based CV details**: Render career roles history, education, and certifications in compact, interactive cards to make the homepage an easy-to-skim summary of the CV. [Task 6]

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

### Milestone D Tasks
- [ ] **Task 6: Extend resumeData structure and content** - Add Certifications interface and certifications array (with Google Cloud certifications) to `resumeData.ts`.
- [ ] **Task 7: Create compact card components for role history, education, and certifications** - Build responsive UI cards in `page.tsx` for experience roles, education, and certifications.
- [ ] **Task 8: Implement interactive styling and transitions** - Add clean CSS rules for compact layouts, smooth transitions, and hover animations in `globals.css`.
- [ ] **Task 9: Unit verification tests** - Add test cases to `page.test.tsx` verifying card content rendering.
