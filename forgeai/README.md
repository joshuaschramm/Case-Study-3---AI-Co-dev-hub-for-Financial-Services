

```markdown
# ⚡ ForgeAI — Enterprise AI Co-Development Hub

ForgeAI is an internal AI Product Factory platform built for **Summit National Bank**, a fictional large financial services institution. The platform serves as a centralized command center that enables multiple product teams across the organization to rapidly build, test, deploy, and monitor AI-powered features — including fraud detection, personalized financial insights, automated document processing, customer sentiment analysis, and risk assessment.

ForgeAI embodies the vision of transforming how enterprises develop products in the AI era: equal parts theory and implementation, with shared tooling, reusable components, and full observability across the entire AI product lifecycle.

This project was built as a case study for the **Slalom Protogen Academy**, demonstrating accelerated product development using modern frontend technologies, a third-party design system (Ant Design), and a custom glassmorphism visual identity.

---

## 📋 Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Design System](#design-system)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Pages & Functionality](#pages--functionality)
- [Data & State Management](#data--state-management)
- [Charts & Visualizations](#charts--visualizations)
- [Theming & Customization](#theming--customization)
- [Browser Support](#browser-support)
- [Known Limitations](#known-limitations)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

- **Command Center Dashboard** — Real-time KPIs, deployment frequency charts, model accuracy trends, spend breakdowns, and a live activity feed across all AI products
- **Team Velocity Tracking** — Sprint velocity charts, team performance tables, cycle time distributions, and blocker/risk management
- **AI Product Catalog** — Searchable, filterable grid and list views of all AI products with detailed modals showing models, tech stacks, team members, and deployment history
- **Model Registry** — Central repository of all ML models with accuracy tracking, version management, side-by-side model comparison with interactive charts, and environment status
- **Deployment Management** — Visual deployment pipelines with step-by-step progress, deployment history tables, rollback capabilities, and a custom-built activity heatmap
- **Reusable Component Library** — Shared building blocks (data connectors, ML pipelines, API templates, UI widgets, auth modules, monitoring tools) with usage stats and install actions
- **Pipeline Monitor** — Real-time status of CI/CD and ML training pipelines with progress tracking, failure alerts, retry actions, and 14-day history charts
- **Performance Analytics** — API latency trends (p50/p95/p99), call volume tracking, multi-model radar chart comparisons, and error distribution breakdowns
- **Cost & Usage Management** — Budget tracking, stacked cost breakdowns, team-level spend analysis, resource utilization gauges, and AI-generated optimization recommendations
- **Glassmorphism UI** — A fully custom frosted-glass design system with translucent cards, animated gradient orbs, glow effects, and dark theme throughout

---

## 📸 Screenshots

> _Screenshots can be added here after the application is built. Recommended screenshots:_
> - Command Center with KPI cards and charts
> - Product Catalog grid view with glass cards
> - Model Registry comparison view
> - Deployment pipelines with step indicators
> - Pipeline Monitor with active pipelines
> - Cost & Usage with utilization gauges
> - Full-page view showing glassmorphism and orb background

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [Vue 3](https://vuejs.org/) | ^3.x | Frontend framework (Composition API with `<script setup>`) |
| [Ant Design Vue](https://antdv.com/) | ^4.x | UI component library (tables, menus, modals, forms, layout, etc.) |
| [Ant Design Icons Vue](https://github.com/ant-design/ant-design-icons) | `@ant-design/icons-vue` | Primary icon set |
| [Material Design Icons](https://materialdesignicons.com/) | `@mdi/font` | Supplementary icon set for edge cases |
| [Vue Router](https://router.vuejs.org/) | ^4.x | Client-side routing |
| [Pinia](https://pinia.vuejs.org/) | ^2.x | State management |
| [Chart.js](https://www.chartjs.org/) | ^4.x | Charting and data visualization |
| [vue-chartjs](https://vue-chartjs.org/) | ^5.x | Vue 3 wrapper for Chart.js |
| [Vite](https://vitejs.dev/) | ^5.x | Build tool and dev server |

---

## 🎨 Design System

ForgeAI uses a **custom glassmorphism design system** layered on top of Ant Design Vue's component library. Rather than using Ant Design's default card and panel styles, the app applies frosted-glass CSS classes to create a cohesive, modern dark-theme aesthetic.

### Core Principles

| Principle | Description |
|---|---|
| **Translucency** | All panels and cards use semi-transparent backgrounds with `backdrop-filter: blur()` to create depth |
| **Layering** | Content sits above animated gradient orbs that provide color and movement behind the glass |
| **Glow Accents** | KPI cards and status indicators use colored `box-shadow` glows to draw attention |
| **Dark Foundation** | A rich multi-stop dark gradient (`#0a0a1a` → `#1a0a2e` → `#0d1b3e` → `#0a2a1a`) serves as the base |
| **Subtle Borders** | Glass panels use `rgba(255, 255, 255, 0.1)` borders for definition without harshness |

### Glass CSS Classes

| Class | Usage |
|---|---|
| `glass-card` | Primary content cards, stat cards, chart containers |
| `glass-card-subtle` | Nested or secondary panels inside a `glass-card` |
| `glass-sidebar` | Navigation sidebar |
| `glass-topbar` | Top application header bar |
| `glass-modal` | Modal and dialog overlays |
| `glass-input` | Wrapper class for Ant Design inputs, selects, and pickers |
| `glass-table` | Wrapper class for Ant Design tables |
| `glass-tabs` | Wrapper class for Ant Design tabs |
| `glass-tag` | Transparent tag/badge style |
| `glow-purple` | Purple glow accent for cards |
| `glow-teal` | Teal glow accent for cards |
| `glow-orange` | Orange glow accent for cards |
| `glow-blue` | Blue glow accent for cards |
| `glow-green` | Green glow accent for cards |
| `glow-red` | Red glow accent for cards |
| `glow-yellow` | Yellow glow accent for cards |

### Animated Background

Three large, blurred gradient orbs (purple, teal, orange) float behind all content using CSS `@keyframes` animations. They are rendered in a fixed-position container at `z-index: 0`, while all page content sits at `z-index: 1`.

The full glassmorphism stylesheet is located at `/src/styles/glass.css`.

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** — v18.0.0 or higher ([Download](https://nodejs.org/))
- **npm** — v9.0.0 or higher (included with Node.js)

You can verify your installations by running:

```bash
node --version
npm --version
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/forgeai.git
cd forgeai
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

The application will be available at **http://localhost:5173** (default Vite port).

### 4. Build for Production

```bash
npm run build
```

The production-ready files will be output to the `dist/` directory.

### 5. Preview the Production Build

```bash
npm run preview
```

---

## 📁 Project Structure

```
forgeai/
├── public/                              # Static assets
├── src/
│   ├── App.vue                          # Root component (ConfigProvider, layout, sidebar, header, orbs)
│   ├── main.js                          # Entry point (Ant Design, Chart.js, Pinia, Router registration)
│   ├── styles/
│   │   └── glass.css                    # Complete glassmorphism design system stylesheet
│   ├── plugins/
│   │   └── antd.js                      # Ant Design Vue configuration (optional — can be in main.js)
│   ├── router/
│   │   └── index.js                     # Vue Router route definitions (9 routes)
│   ├── stores/
│   │   ├── userStore.js                 # Current user profile and access level
│   │   ├── productStore.js              # AI products with filtering, search, and view mode
│   │   ├── modelStore.js               # ML models with comparison selection logic
│   │   ├── teamStore.js                 # Team data and sprint metrics
│   │   ├── deploymentStore.js           # Deployments, heatmap data, and stats
│   │   ├── pipelineStore.js             # Active and failed pipeline data
│   │   └── costStore.js                 # Budget, cost breakdowns, and utilization
│   ├── views/
│   │   ├── CommandCenterView.vue        # Main dashboard with KPIs, charts, and activity feed
│   │   ├── TeamVelocityView.vue         # Sprint velocity, team table, cycle time, blockers
│   │   ├── ProductCatalogView.vue       # Product grid/list with filters and detail modals
│   │   ├── ModelRegistryView.vue        # Model table, stats, and side-by-side comparison
│   │   ├── DeploymentsView.vue          # Pipeline steppers, history table, and heatmap
│   │   ├── ComponentLibraryView.vue     # Reusable component grid with category tabs
│   │   ├── PipelineMonitorView.vue      # Active pipelines, history chart, failure alerts
│   │   ├── PerformanceAnalyticsView.vue # Latency, volume, radar, and error charts
│   │   └── CostUsageView.vue            # Budget, cost trends, team spend, utilization gauges
│   ├── data/
│   │   ├── member.json                  # Current user profile
│   │   ├── products.json                # 8 AI product definitions with full metadata
│   │   ├── models.json                  # 15+ ML model records
│   │   ├── teams.json                   # 6 engineering teams with sprint data
│   │   ├── deployments.json             # 12+ deployment records and 28-day heatmap data
│   │   ├── components.json              # 12+ reusable component definitions
│   │   ├── activity.json                # 8 live activity feed entries
│   │   ├── pipelines.json               # 7 active + 4 failed pipeline records
│   │   ├── performance.json             # 30-day latency, API volume, and date labels
│   │   └── costs.json                   # Budget, monthly breakdowns, team costs, utilization
│   └── components/
│       ├── charts/                      # 14 chart components (Bar, Line, Doughnut, Radar)
│       │   ├── DeploymentFrequencyChart.vue
│       │   ├── ProductStatusChart.vue
│       │   ├── ModelAccuracyChart.vue
│       │   ├── SpendByCategoryChart.vue
│       │   ├── VelocityChart.vue
│       │   ├── CycleTimeChart.vue
│       │   ├── ModelComparisonChart.vue
│       │   ├── PipelineHistoryChart.vue
│       │   ├── LatencyTrendsChart.vue
│       │   ├── ApiVolumeChart.vue
│       │   ├── ModelRadarChart.vue
│       │   ├── ErrorDistributionChart.vue
│       │   ├── MonthlyCostChart.vue
│       │   └── CostByTeamChart.vue
│       ├── layout/
│       │   ├── AppSidebar.vue           # Glass sidebar with grouped navigation menu
│       │   ├── AppHeader.vue            # Glass top bar with search and action icons
│       │   └── OrbBackground.vue        # Animated floating gradient orbs
│       ├── deployments/
│       │   ├── DeploymentPipeline.vue   # Ant Design Steps-based pipeline visualization
│       │   └── DeploymentHeatmap.vue    # Custom CSS grid heatmap with tooltips
│       ├── products/
│       │   ├── ProductCard.vue          # Glass card for product grid view
│       │   └── ProductDetailModal.vue   # Tabbed modal with overview, models, deployments
│       ├── pipelines/
│       │   ├── ActivePipelineItem.vue   # List item with progress bar and cancel action
│       │   └── FailedPipelineItem.vue   # List item with failure reason and retry action
│       └── common/
│           ├── GlassKpiCard.vue         # Reusable KPI card with icon, value, trend, and glow
│           └── GlassPageHeader.vue      # Reusable page header wrapper
├── index.html                           # HTML entry point
├── package.json                         # Project metadata and dependencies
├── vite.config.js                       # Vite build configuration
├── PLAN.md                              # Detailed build plan for Copilot Agent
└── README.md                            # This file
```

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server with hot module replacement |
| `npm run build` | Build the application for production (output to `dist/`) |
| `npm run preview` | Serve the production build locally for testing |
| `npm run lint` | Run ESLint to check for code quality issues (if configured) |

---

## 📄 Pages & Functionality

### 📊 Command Center (`/`)
The main dashboard providing a bird's-eye view of the entire AI Product Factory. Features six KPI cards with glow accents and trend indicators, a stacked deployment frequency bar chart, a product status doughnut chart, model accuracy trend lines, a horizontal spend-by-category bar chart, and a live activity feed with color-coded event types. A segmented time range control allows visual toggling between 24-hour, 7-day, 30-day, and quarterly views.

### 🚀 Team Velocity (`/velocity`)
Sprint-level performance tracking across all six engineering teams. Includes sprint summary cards with progress indicators, an 8-sprint velocity bar chart with a rolling average overlay line, a team performance data table with completion rate progress bars and status tags, a feature cycle time distribution histogram, and an active blockers and risks list with severity indicators.

### 📦 Product Catalog (`/products`)
A searchable, filterable catalog of all 8 AI products. Supports both grid view (glass cards with status accent bars, icons, domain tags, and metric summaries) and list view (data table). Filters include text search, status dropdown, and domain dropdown. Clicking "View Details" opens a tabbed modal with three tabs: Overview (metrics, tech stack, team), Models (associated ML models table), and Deployments (timeline of recent releases).

### 🧠 Model Registry (`/models`)
The central repository for all 15+ ML models. Features a stats row (total models, production count, average accuracy, monthly retraining count), a full data table with accuracy progress bars, framework labels, status tags with spinning loading indicators for training models, and environment badges. The model comparison section allows selecting two models via dropdowns and displays a side-by-side stat comparison with an interactive bar chart across five performance metrics.

### ☁️ Deployments (`/deployments`)
Deployment lifecycle management with three active pipeline visualizations using Ant Design's Steps component (showing build → test → staging → approval → production with current-step highlighting), a deployment history data table with status chips and rollback actions, and a custom-built 4-week × 7-day deployment activity heatmap using CSS grid with tooltips showing daily counts and a color-scale legend.

### 🧩 Component Library (`/components`)
A catalog of 12+ reusable engineering building blocks organized by category (Data Connectors, ML Pipelines, API Templates, UI Widgets, Auth & Security, Monitoring). Each component card shows usage stats (products using it, downloads, stars), version number, maintaining team, and actions to view documentation or install. Category tabs filter the grid.

### 🔧 Pipeline Monitor (`/pipelines`)
Real-time monitoring of all CI/CD and ML training pipelines. Shows running/queued/succeeded/failed counts, a list of 7 active pipelines with progress bars and estimated completion times, a 14-day pipeline history line chart with area fills for succeeded/failed/cancelled runs, and a recent failures list with failure reasons, log viewing, and retry actions.

### 📈 Performance Analytics (`/analytics`)
Deep-dive performance monitoring with four top-level metrics, a 30-day API latency chart showing p50/p95/p99 percentiles, a daily API call volume bar chart, a radar chart comparing four models across six performance dimensions, and an error distribution doughnut chart breaking down failures by type.

### 💰 Cost & Usage (`/costs`)
Financial management and resource optimization. Includes budget overview cards with progress bars, a 6-month stacked cost trend chart with a budget line overlay, a team-level horizontal cost comparison bar chart, four resource utilization dashboard gauges (GPU, CPU, Memory, Storage) using Ant Design's dashboard progress component, and four AI-generated cost optimization recommendations with estimated savings and implementation actions.

---

## 🗃️ Data & State Management

### Mock Data

All data is served from local JSON files in `/src/data/`. No external APIs, databases, or backend services are required. The application is entirely self-contained.

| File | Records | Description |
|---|---|---|
| `member.json` | 1 | Current user profile (Jordan Chen, Platform Engineering Lead) |
| `products.json` | 8 | AI product definitions with metadata, tech stacks, team members, models, and deployment history |
| `models.json` | 15+ | ML model records with accuracy, precision, recall, F1, latency, framework, and environment |
| `teams.json` | 6 | Engineering teams with sprint metrics, completion rates, and member details |
| `deployments.json` | 12+ | Deployment records plus a 28-element heatmap array (4 weeks × 7 days) |
| `components.json` | 12+ | Reusable engineering components with usage stats and category classifications |
| `activity.json` | 8 | Live activity feed entries with type, description, team, and relative timestamps |
| `pipelines.json` | 11 | 7 active pipelines with progress data + 4 failed pipelines with failure reasons |
| `performance.json` | 30 days | Latency arrays (p50, p95, p99), daily API call volumes, and date labels |
| `costs.json` | 6 months | Budget, monthly cost breakdowns by category, team costs, and resource utilization percentages |

### Pinia Stores

State management is handled by 7 Pinia stores:

| Store | Responsibility |
|---|---|
| `userStore` | Current user profile, initials, and admin status |
| `productStore` | Products with search, status/domain filtering, view mode toggle, and status breakdown |
| `modelStore` | Models with search, filtering, and dual-model comparison selection and chart data |
| `teamStore` | Teams with aggregate metrics (total members, avg completion rate, at-risk teams) |
| `deploymentStore` | Deployments with daily stats, success rate, heatmap data, and rollback tracking |
| `pipelineStore` | Active and failed pipelines with running/queued/succeeded/failed counts |
| `costStore` | Budget tracking, utilization percentages, overage detection, and threshold-based status colors |

---

## 📊 Charts & Visualizations

All charts are built with [Chart.js](https://www.chartjs.org/) via the [vue-chartjs](https://vue-chartjs.org/) wrapper. The following Chart.js components are registered globally in `main.js`:

- `CategoryScale`
- `LinearScale`
- `RadialLinearScale` (required for Radar charts)
- `BarElement`
- `ArcElement`
- `PointElement`
- `LineElement`
- `Title`
- `Tooltip`
- `Legend`
- `Filler` (required for area fills under Line charts)

### Chart Style Requirements (Dark Glass Theme)

All charts are configured to be visually consistent with the glassmorphism design:

| Property | Value |
|---|---|
| Canvas background | `transparent` |
| Grid lines | `rgba(255, 255, 255, 0.05)` |
| Tick labels | `rgba(255, 255, 255, 0.5)` |
| Legend labels | `rgba(255, 255, 255, 0.7)` |
| Tooltip background | `rgba(20, 20, 40, 0.9)` |
| Tooltip border | `rgba(255, 255, 255, 0.1)` |
| Tooltip text | `rgba(255, 255, 255, 0.85)` |

### Charts by Page

| Page | Chart | Type | Description |
|---|---|---|---|
| Command Center | Deployment Frequency | Stacked Bar | 12-week successful vs. failed deployments |
| Command Center | Product Status | Doughnut | Production / Staging / Development / Archived breakdown |
| Command Center | Model Accuracy Trends | Line | 6-month accuracy for 3 models |
| Command Center | AI Spend by Category | Horizontal Bar | Monthly spend across 5 cost categories |
| Team Velocity | Sprint Velocity | Bar + Line | 8-sprint committed vs. completed with average overlay |
| Team Velocity | Cycle Time Distribution | Bar | Feature completion time histogram |
| Model Registry | Model Comparison | Bar | Side-by-side 5-metric comparison of 2 selected models |
| Pipeline Monitor | Pipeline History | Line (filled) | 14-day succeeded / failed / cancelled pipeline runs |
| Performance | API Latency Trends | Line | 30-day p50 / p95 / p99 latency percentiles |
| Performance | API Call Volume | Bar | 30-day daily API call counts |
| Performance | Model Performance | Radar | 4-model comparison across 6 dimensions |
| Performance | Error Distribution | Doughnut | Error type breakdown (Timeout, Rate Limit, etc.) |
| Cost & Usage | Monthly Cost Breakdown | Stacked Bar + Line | 6-month costs by category with budget line overlay |
| Cost & Usage | Cost by Team | Horizontal Bar | Monthly spend per engineering team |

### Non-Chart Visualizations

| Page | Visualization | Implementation |
|---|---|---|
| Deployments | Activity Heatmap | Custom CSS grid with `<a-tooltip>` on each cell |
| Cost & Usage | Resource Utilization Gauges | Ant Design `<a-progress type="dashboard">` |
| Deployments | Pipeline Steppers | Ant Design `<a-steps>` with custom status icons |

---

## 🎨 Theming & Customization

### Ant Design Theme Tokens

The app overrides Ant Design's default theme using `<a-config-provider>` with the dark algorithm and custom token values:

| Token | Value | Purpose |
|---|---|---|
| `colorPrimary` | `#7C4DFF` | Primary brand color (purple) |
| `colorSuccess` | `#69F0AE` | Success states |
| `colorWarning` | `#FFD740` | Warning states |
| `colorError` | `#FF5252` | Error states |
| `colorInfo` | `#448AFF` | Informational elements |
| `colorBgBase` | `#0a0a1a` | Base background (near-black) |
| `colorBgContainer` | `transparent` | Container backgrounds (glass handles this) |
| `colorBgElevated` | `rgba(20, 20, 40, 0.85)` | Elevated surfaces (dropdowns, popovers) |
| `colorBorder` | `rgba(255, 255, 255, 0.1)` | Default border color |
| `colorText` | `rgba(255, 255, 255, 0.85)` | Primary text |
| `colorTextSecondary` | `rgba(255, 255, 255, 0.45)` | Secondary/muted text |
| `borderRadius` | `12` | Global border radius |
| `fontFamily` | `'Inter', system fonts` | Typography |

### Color Palette

| Color | Hex | Usage |
|---|---|---|
| Purple | `#7C4DFF` | Primary brand, KPI glows, chart datasets |
| Teal | `#00BFA5` | Secondary accent, success-adjacent, chart datasets |
| Orange | `#FF6D00` | Tertiary accent, alerts, chart datasets |
| Blue | `#448AFF` | Informational, staging status, chart datasets |
| Green | `#69F0AE` | Success states, production status, healthy metrics |
| Red | `#FF5252` | Error states, failed status, critical alerts |
| Yellow | `#FFD740` | Warning states, at-risk status, budget alerts |

### Customizing the Glass Effect

To adjust the glassmorphism intensity, modify these values in `/src/styles/glass.css`:

- **Blur intensity:** Change `backdrop-filter: blur(20px)` — higher values = more frosted
- **Transparency:** Change `rgba(255, 255, 255, 0.05)` background — higher alpha = more opaque
- **Border visibility:** Change `rgba(255, 255, 255, 0.1)` border — higher alpha = more visible edges
- **Glow intensity:** Change `box-shadow` values in `.glow-*` classes — higher spread = more prominent glow
- **Orb opacity:** Change `.forge-orb` opacity (default `0.3`) — higher = more colorful background

---

## 🌐 Browser Support

| Browser | Supported | Notes |
|---|---|---|
| Chrome | ✅ Latest 2 versions | Full `backdrop-filter` support |
| Firefox | ✅ Latest 2 versions | Full `backdrop-filter` support (v103+) |
| Safari | ✅ Latest 2 versions | Full `-webkit-backdrop-filter` support |
| Edge | ✅ Latest 2 versions | Full `backdrop-filter` support |
| Internet Explorer | ❌ Not supported | No `backdrop-filter`, no ES module support |

> **Note:** The glassmorphism effect relies on `backdrop-filter: blur()`, which is supported in all modern browsers. In older browsers that lack support, glass panels will appear as semi-transparent dark panels without the frosted blur effect — the app remains fully functional.

---

## ⚠️ Known Limitations

| Limitation | Details |
|---|---|
| **No backend / API** | All data is static mock data from JSON files. No CRUD operations persist between sessions. |
| **No authentication** | The app assumes a logged-in user (Jordan Chen). There is no login flow or role-based access control. |
| **No real-time updates** | The activity feed and pipeline statuses are static. In a production app, these would use WebSockets or polling. |
| **Map placeholder** | The Store Locator (if applicable) uses a placeholder instead of an interactive map library. |
| **Chart interactivity** | Time range filters on dashboards are visual only — they do not change the underlying chart data. |
| **Mobile optimization** | The app is optimized for desktop (1200px+) and tablet (768px+). Mobile phone layouts (< 768px) may require additional responsive work. |
| **Accessibility** | The dark glassmorphism theme may present contrast challenges for some users. A high-contrast or light mode toggle is not currently implemented. |

---

## 🤝 Contributing

This project was built as a Protogen Academy case study. If you'd like to extend or improve it:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature-name`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature-name`)
5. Open a Pull Request

### Code Style Guidelines

- Use Vue 3 Composition API with `<script setup>` syntax exclusively
- Use Ant Design Vue 4.x components for all UI elements (`<a-button>`, `<a-table>`, `<a-modal>`, etc.)
- Use `@ant-design/icons-vue` as the primary icon set; fall back to `@mdi/font` only when needed
- Apply glassmorphism CSS classes (`glass-card`, `glass-table`, etc.) instead of default Ant Design card backgrounds
- Keep all chart configurations consistent with the dark glass theme (transparent backgrounds, muted grid lines)
- Follow the existing file and folder structure
- Keep components focused, reusable, and well-documented with props

### Potential Enhancements

- [ ] Add WebSocket-based real-time activity feed
- [ ] Implement functional time range filters that update chart data
- [ ] Add a light/high-contrast theme toggle for accessibility
- [ ] Build a login page with role-based access (Admin, Team Lead, Developer)
- [ ] Add drag-and-drop dashboard customization
- [ ] Integrate a real charting heatmap library (e.g., `cal-heatmap`)
- [ ] Add end-to-end tests with Cypress or Playwright
- [ ] Add unit tests with Vitest for Pinia stores and utility functions

---

## 📄 License

This project is for educational and demonstration purposes as part of the Slalom Protogen Academy. It is not intended for commercial use.

MIT License — see [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

- [Slalom](https://www.slalom.com/) — Protogen Academy program and accelerated product development methodology
- [Ant Design Vue](https://antdv.com/) — Enterprise-grade UI component library
- [Chart.js](https://www.chartjs.org/) — Flexible charting library
- [vue-chartjs](https://vue-chartjs.org/) — Vue 3 integration for Chart.js
- [Ant Design Icons](https://ant.design/components/icon) — Comprehensive icon set
- [Material Design Icons](https://materialdesignicons.com/) — Supplementary icon library
- Glassmorphism design inspiration from [ui.glass/generator](https://ui.glass/generator/) and [glassmorphism.com](https://glassmorphism.com/)
```