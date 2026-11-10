# Technology Stack Document
## CONFLUENCE 2026 — Frontend Engineering Architecture

---

### Core Framework & Build Tooling

| Technology | Version | Purpose & Rationale |
|---|---|---|
| **React.js** | `^18.3.1` | Modern declarative component architecture, hooks (`useState`, `useEffect`, `useMemo`), high-efficiency virtual DOM rendering. |
| **Vite** | `^5.4.0` | Ultra-fast Hot Module Replacement (HMR), lightning-fast native ES modules bundling, optimal production rollups. |
| **JavaScript (ES6+)** | Modern ES2023 | Clean, standards-compliant syntax with async/await, optional chaining, array methods, and modular scoping. |

---

### UI & Styling System

| Technology | Purpose & Rationale |
|---|---|
| **Tailwind CSS** | Utility-first CSS engine enabling rapid UI authoring, zero CSS bloat via purge, responsive breakpoints, and strict theme token enforcement. |
| **CSS Custom Properties** | Ingested via `variables.css` and `globals.css` to faithfully reproduce reference design tokens (navy depths, radial glow meshes, glassmorphic filters). |
| **Google Fonts** | `Sora` for modern authoritative headings; `Inter` for hyper-readable clinical body copy and numerical data. |

---

### Animation & Interactivity

| Technology | Purpose & Rationale |
|---|---|
| **Framer Motion** | Industry-standard React motion library used for: continuous circular rotation of the DNA double helix ring, sinusoidal pulsing glow on the bulb/brain, hover luminescence shifts, and viewport scroll reveals. |
| **CSS Keyframes** | Hardware-accelerated hardware compositing for background particle drifts and marquee banner translation. |

---

### Navigation & Icons

| Technology | Purpose & Rationale |
|---|---|
| **React Router DOM** | Client-side routing with hash or history routing, enabling multi-page navigation across Home, About, Events, Workshops, Merchandise, CME, and Contact without page reloads. |
| **Lucide React** | Consistent, lightweight SVG icon system (`Calendar`, `MapPin`, `Users`, `FileText`, `Sparkles`, `ExternalLink`, `Menu`, `X`, `ChevronRight`, `Download`). |

---

### Strict Frontend-Only Constraints
- **Zero Backend Dependencies**: Operates completely in-browser with zero Node.js server, Python, or database requirements.
- **Configurable Mock Data**: All event schedules, workshops, fees, and committee members reside in `src/data/`, providing effortless content updates without touching JSX logic.
- **Static Deployment Ready**: Builds into clean, cache-optimized static files in `/dist` deployable instantly to Vercel, Netlify, or GitHub Pages.

