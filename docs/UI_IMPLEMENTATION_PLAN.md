# UI Implementation Plan
## CONFLUENCE 2026 — Milestone Roadmap & Visual Execution

---

### Final Homepage Structure (Strict Reference Sequence)

1. **Header and Navigation**:
   - Official Seth GS Medical College & KEM Hospital crest in top-left corner.
   - Institutional title typography beside the crest.
   - Clean, active-route navigation links: `Home | About | Event | Workshop | Merchandise | CME | Contact`.
   - Responsive slide-over mobile drawer.

2. **Hero Section**:
   - **Text Hierarchy** (Sequential animated reveal):
     1. `CONFLUENCE` (Primary, most prominent heading)
     2. `CONFLUENCE 2026` (Outlined uppercase typography matching JIPMER reference)
     3. College Name: `SETH GS MEDICAL COLLEGE & KING EDWARD VII MEMORIAL HOSPITAL`
     4. `Where Ideas Meet` (Distinctive serif italic tagline)
   - **Date Boxes**: Two rectangular information panels side-by-side above description:
     - `PRE-CONFERENCE`: 9 & 10 DECEMBER 2026
     - `MAIN CONFERENCE`: 11–13 DECEMBER 2026
   - **Shortened Description**:
     - Concise, polished 4-paragraph CONFLUENCE introduction.
   - **Only Two Buttons**:
     - `EXPLORE` (Smoothly scrolls to `#browse`)
     - `ABOUT THE CONFERENCE` (Navigates to `/about` page)
   - **Right Column**:
     - Translucent animated brain watermark (rotating DNA ring + breathing glow bulb).
     - Two vertically stacked brochure buttons:
       - `VIEW EVENT BROCHURE`
       - `VIEW WORKSHOP BROCHURE`

3. **Marquee**:
   - Continuous moving horizontal banner placed directly above the Browse section.
   - Sequence: `EVENT ◆ WORKSHOP ◆ CME ◆ MERCHANDISE`.

4. **Browse Section**:
   - 4 clickable categories in exact sequence:
     1. `EVENT` (`/events`)
     2. `WORKSHOP` (`/workshops`)
     3. `MERCHANDISE` (`/merchandise`)
     4. `CME` (`/cme`)
   - Numbered rows (`01` – `04`), hover slide and gradient accent bar.

5. **How Registration Works**:
   - Interactive Framer Motion scroll timeline.
   - Actual registration workflow:
     - `01 – EXPLORE EVENTS`
     - `02 – SELECT YOUR EVENT`
     - `03 – COMPLETE REGISTRATION FORM`
     - `04 – COMPLETE PAYMENT`
     - `05 – CONFIRM YOUR REGISTRATION`
   - Individual Google Form URLs configured per event and workshop.

6. **Meet Our Collaborators**:
   - Continuous moving logo carousel with hover/touch pause.
   - Clean neutral monograms until official partner logos are uploaded.

7. **Instagram Section**:
   - Two-column card: official `@confluence_gsmc` branding + 3×2 grid of posts.
   - "Visit Instagram" CTA button.

8. **Footer**:
   - Seth GSMC & KEM Hospital branding, 4-column link layout, address, contact secretariat, copyright.

---

### Design System: Dusty Blue + Sage + Vintage Pink + Warm Cream

| Token | Hex | Usage |
|---|---|---|
| Dusty Blue (Primary) | `#4a6a8a` / `#3a5068` | Buttons, borders, header accents |
| Slate Navy | `#162030` / `#1e2d3d` / `#0f1824` | Background layers |
| Sage Green | `#7d8f72` / `#a8b89e` | Workshop badges, practical tracks |
| Vintage Pink / Blush | `#c4909a` / `#b87888` / `#ddb4be` | Eyebrow labels, serif taglines, accents |
| Warm Cream | `#f0ebe2` / `#d8cfc0` | Primary & secondary text ink |
