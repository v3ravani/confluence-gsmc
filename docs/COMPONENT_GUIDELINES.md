# Component Development Guidelines
## CONFLUENCE 2026 — Clean Code Conventions & Architecture Rules

---

### 1. General Principles
- **Modularity**: Every component must have a single clear responsibility. Never dump entire page logic inside `App.jsx`.
- **DRY (Don't Repeat Yourself)**: Reuse buttons, chips, dividers, cards, and section headers.
- **Data Decoupling**: Static content, dates, pricing, FAQs, and event rosters must come from `src/data/`. Never hardcode lengthy copy directly in JSX tags.
- **Accessibility**: Use semantic HTML5 elements. Provide `aria-label` on icon-only buttons. Ensure text colors pass WCAG AA contrast standards.
- **Reduced Motion Support**: Ensure Framer Motion and CSS marquee animations respect `prefers-reduced-motion`.

---

### 2. Component Taxonomy

#### Common Components (`src/components/common/`)
- `Chip.jsx`: Status badge with glowing dot indicator.
- `SectionHeading.jsx`: Consistent eyebrow, heading, and subtitle block with gradient highlight styling.
- `Divider.jsx`: Hairline subtle glass divider (`border-t border-[rgba(196,216,232,0.12)]`).

#### Buttons (`src/components/buttons/`)
- `PrimaryButton.jsx`: Dusty Blue gradient pill button with hover lift and soft glow.
- `OutlineButton.jsx`: Translucent glass button with border, supporting both internal React Router links (`href`) and external URLs (`externalHref`).
- `GhostButton.jsx`: Sleek transparent button for secondary actions.

#### Hero Specific Elements (`src/sections/Hero/Hero.jsx`)
- `DateBox`: Rectangular information panel displaying Pre-Conference and Main Conference dates side-by-side above the introduction.
- `BrochureBtn`: Vertically arranged brochure download button with file icons and hover elevation.

#### Marquee & Browse (`src/sections/Browse/`)
- `CategoryMarquee.jsx`: Seamless horizontal marquee bar cycling `EVENT ◆ WORKSHOP ◆ CME ◆ MERCHANDISE`.
- `BrowseSection.jsx`: Reference-style numbered category rows (`01` – `04`) with left accent indicator and direct route navigation.

#### Registration (`src/sections/Registration/RegistrationRoadmap.jsx`)
- `TimelineStep`: Animated step card with connector lines, numbered node badge, and scroll-triggered fade/slide.

#### Collaborators (`src/sections/Collaborators/`)
- `CollaboratorsCarousel.jsx`: Horizontal infinite logo marquee with hover/touch pause and fallback for reduced-motion.

#### Animations (`src/components/animations/`)
- `BrainWatermark.jsx`: The signature hero watermark component:
  - Outer circular DNA double helix rotating continuously (`360deg` infinite loop).
  - Inner lightbulb + brain with gentle breathing glow and intensified hover luminescence.
  - Positioned directly on the background without bounding box/card clipping.
