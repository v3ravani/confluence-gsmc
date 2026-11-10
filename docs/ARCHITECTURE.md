# Architecture Specification
## CONFLUENCE 2026 — Component Hierarchy & Data Flow

---

### 1. Folder Structure Overview

```
Confluence_event/
├── docs/
│   ├── PRD.md
│   ├── TECH_STACK.md
│   ├── ARCHITECTURE.md
│   ├── UI_IMPLEMENTATION_PLAN.md
│   └── COMPONENT_GUIDELINES.md
├── src/
│   ├── assets/logos/
│   │   ├── gsmc_crest.png
│   │   ├── confluence_dna_ring.png
│   │   └── confluence_bulb_brain.png
│   ├── components/
│   │   ├── animations/BrainWatermark.jsx
│   │   ├── buttons/PrimaryButton.jsx, OutlineButton.jsx, GhostButton.jsx
│   │   ├── cards/EventCard.jsx, InfoCard.jsx
│   │   ├── common/Chip.jsx, Divider.jsx, SectionHeading.jsx
│   │   └── navigation/Navigation.jsx, MobileDrawer.jsx
│   ├── data/
│   │   ├── events.js        (conferenceInfo, categories, scientificEvents)
│   │   ├── workshops.js     (workshopsData, googleFormUrls)
│   │   ├── registration.js  (registrationSteps, instructions)
│   │   ├── collaborators.js (collaboratorsData, instagramConfig)
│   │   └── navigation.js    (navLinks, headerBrand, brochureConfig)
│   ├── pages/
│   │   ├── Home.jsx         (clean layout with 7 sequenced sections)
│   │   ├── About.jsx        (dedicated full conference description)
│   │   ├── Event.jsx        (scientific tracks + Register via Google Form)
│   │   ├── Workshop.jsx     (hands-on modules + Register via Google Form)
│   │   ├── Merchandise.jsx  (conference apparel and collectibles)
│   │   ├── CME.jsx          (accredited medical CPD modules)
│   │   └── Contact.jsx      (secretariat & venue details)
│   ├── sections/
│   │   ├── Header/Header.jsx
│   │   ├── Hero/Hero.jsx
│   │   ├── Browse/CategoryMarquee.jsx
│   │   ├── Browse/BrowseSection.jsx
│   │   ├── Registration/RegistrationRoadmap.jsx
│   │   ├── Collaborators/Collaborators.jsx + CollaboratorsCarousel.jsx
│   │   ├── Instagram/InstagramSection.jsx
│   │   └── Footer/Footer.jsx
│   ├── styles/
│   │   ├── globals.css
│   │   └── variables.css
│   ├── App.jsx
│   └── main.jsx
```

---

### 2. Client-Side Routing (React Router DOM v6)

| Route | Page | Purpose |
|---|---|---|
| `/` | `Home.jsx` | Main conference portal (Hero, Marquee, Browse, Registration, Collaborators, Instagram) |
| `/about` | `About.jsx` | Dedicated conference heritage, vision, academic highlights & institution parameters |
| `/events` | `Event.jsx` | Scientific tracks with direct Google Form registration links |
| `/workshops` | `Workshop.jsx` | Clinical workshops with direct Google Form registration links |
| `/merchandise` | `Merchandise.jsx`| Conference apparel and collectibles |
| `/cme` | `CME.jsx` | Continuing Medical Education modules |
| `/contact` | `Contact.jsx` | Secretariat, contact phone, email, and campus address |

---

### 3. Data-Driven Decoupled Architecture

All dynamic conference data is stored in `src/data/`:
- `events.js`: Conference dates (Pre-conference, Main conference), audience lists (`openToList`), and scientific event entries with `googleFormUrl`.
- `workshops.js`: Workshop syllabus, department, duration, seat counts, and `googleFormUrl`.
- `registration.js`: 5-step registration timeline copy.
- `collaborators.js`: Partner institutions and Instagram configuration (`url`, `handle`, `placeholderPosts`).
- `navigation.js`: Route links and brochure download paths (`brochureConfig`).
