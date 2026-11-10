# CONFLUENCE 2026 — Official Website

**Seth GS Medical College & King Edward VII Memorial Hospital, Mumbai**

---

## Overview

CONFLUENCE 2026 is the official website for the annual international undergraduate medical and research conference hosted by Seth GSMC & KEM Hospital. Initiated in 2014, the five-day hybrid conference covers scientific events, clinical workshops, CME programmes and merchandise.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Production build
npm run build

# 4. Preview production build
npm run preview
```

---

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| React | 18.3 | UI framework |
| Vite | 5.4 | Build tool |
| Tailwind CSS | 3.4 | Utility-first styling |
| Framer Motion | 11.5 | Animations |
| React Router DOM | 6.26 | Client-side routing |
| Lucide React | 0.441 | Icon system |

---

## Colour Palette

| Name | Hex | Usage |
|------|-----|-------|
| Dusty Blue | `#4a6a8a` | Primary accent, buttons, links |
| Slate Blue | `#6a8ba8` | Secondary text |
| Sage Green | `#7d8f72` | Tertiary accent, CME tag |
| Vintage Pink | `#c4909a` | Eyebrow labels, highlights |
| Warm Cream | `#f0ebe2` | Body text |
| Deep Navy | `#0f1824` | Background (deepest) |

---

## Routes

| Path | Page |
|------|------|
| `/` | Homepage (all sections) |
| `/about` | About CONFLUENCE |
| `/events` | Scientific Events |
| `/workshops` | Hands-on Workshops |
| `/merchandise` | Official Merchandise |
| `/cme` | CME Programmes |
| `/contact` | Contact |

---

## Project Structure

```
src/
├── App.jsx
├── main.jsx
├── assets/logos/
├── components/
│   ├── animations/BrainWatermark.jsx
│   ├── buttons/PrimaryButton.jsx
│   ├── buttons/OutlineButton.jsx
│   ├── buttons/GhostButton.jsx
│   ├── cards/EventCard.jsx
│   ├── cards/InfoCard.jsx
│   ├── common/Chip.jsx
│   ├── common/Divider.jsx
│   ├── common/SectionHeading.jsx
│   └── navigation/Navigation.jsx, MobileDrawer.jsx
├── data/
│   ├── collaborators.js  — carousel logos + Instagram config
│   ├── events.js         — conference info, categories, featured events
│   ├── merchandise.js    — merchandise items
│   ├── navigation.js     — nav links, brand, brochure URLs
│   ├── registration.js   — registration steps (configurable)
│   └── workshops.js      — workshop listings
├── pages/
│   ├── Home.jsx, About.jsx, Contact.jsx
│   ├── Event.jsx, Workshop.jsx, Merchandise.jsx, CME.jsx
├── sections/
│   ├── Header/, Hero/, About/, EventInfo/
│   ├── Browse/BrowseSection.jsx
│   ├── Registration/RegistrationRoadmap.jsx
│   ├── Collaborators/Collaborators.jsx + CollaboratorsCarousel.jsx
│   ├── Instagram/InstagramSection.jsx
│   └── Footer/Footer.jsx
└── styles/
    ├── globals.css
    └── variables.css
```

---

## Placeholders (replace when ready)

- Collaborator logos → `src/assets/logos/collaborators/*.png` (set in `data/collaborators.js`)
- Instagram posts → update `instagramConfig.url` in `data/collaborators.js`
- Event brochure PDF → update `brochureConfig.eventBrochureUrl` in `data/navigation.js`
- Merchandise brochure PDF → `brochureConfig.merchandiseBrochureUrl`
- Registration steps → update titles/descriptions in `data/registration.js`
