

```markdown
# PLAN.md — ForgeAI: Enterprise AI Co-Development Hub for a Financial Services Firm

## Overview

ForgeAI is an internal AI Product Factory platform for a fictional large bank called "Summit National Bank." The platform enables multiple product teams across the organization to rapidly build, test, and deploy AI-powered features such as fraud detection alerts, personalized financial insights, automated document processing, and customer sentiment analysis. It provides a centralized dashboard for managing AI models, monitoring performance, tracking team velocity, and sharing reusable components.

The app uses a **glassmorphism design system** — translucent cards, frosted-glass backgrounds, soft blurs, and subtle borders — layered on top of a rich dark gradient background. All UI components come from **Ant Design Vue** instead of Vuetify.

---

## Tech Stack

- **Framework:** Vue 3 (Composition API with `<script setup>`)
- **UI Library:** Ant Design Vue 4.x (`ant-design-vue`)
- **Icons:** Ant Design Icons Vue (`@ant-design/icons-vue`) supplemented by Material Design Icons (`@mdi/font`) where Ant Design does not provide a suitable icon
- **Charts:** Chart.js via `vue-chartjs`
- **Routing:** Vue Router 4
- **State Management:** Pinia
- **Build Tool:** Vite
- **Mock Data:** Local JSON files in `/src/data/`

---

## Project Setup Instructions

1. Scaffold a new Vue 3 project using Vite:
   ```bash
   npm create vite@latest forgeai -- --template vue
   cd forgeai
   ```
2. Install dependencies:
   ```bash
   npm install ant-design-vue@^4 @ant-design/icons-vue @mdi/font vue-router@^4 pinia chart.js vue-chartjs
   ```
3. Configure Ant Design Vue in `src/main.js`:
   ```js
   import Antd from 'ant-design-vue'
   import 'ant-design-vue/dist/reset.css'
   import '@mdi/font/css/materialdesignicons.css'

   app.use(Antd)
   ```
4. Configure the Ant Design theme using CSS-in-JS `ConfigProvider` in `App.vue` (see Theme Configuration section).
5. Configure Vue Router in `src/router/index.js`.
6. Configure Pinia in `src/stores/`.
7. Register all plugins in `src/main.js`.
8. Import the global glassmorphism stylesheet in `src/main.js`:
   ```js
   import './styles/glass.css'
   ```

---

## Glassmorphism Design System

### File: `/src/styles/glass.css`

This file defines the core glassmorphism utility classes used throughout the entire application. Every card, panel, sidebar, and modal in the app should use one of these classes instead of a plain solid background.

```css
/* ============================================
   FORGEAI GLASSMORPHISM DESIGN SYSTEM
   ============================================ */

/* ---------- Page Background ---------- */
/* Applied to the root #app or body element.
   This is the rich gradient that sits behind
   all glass layers. */
.forge-bg {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 25%, #0d1b3e 50%, #0a2a1a 75%, #0a0a1a 100%);
  background-attachment: fixed;
}

/* ---------- Animated Orbs ---------- */
/* Decorative blurred gradient orbs that float
   behind the glass panels for depth. Place a
   .forge-orb-container as a fixed-position
   sibling of the main content. */
.forge-orb-container {
  position: fixed;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.forge-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
  animation: orbFloat 20s ease-in-out infinite alternate;
}

.forge-orb--purple {
  width: 600px;
  height: 600px;
  background: #7c4dff;
  top: -10%;
  left: -5%;
}

.forge-orb--teal {
  width: 500px;
  height: 500px;
  background: #00bfa5;
  bottom: -10%;
  right: -5%;
  animation-delay: -10s;
}

.forge-orb--orange {
  width: 400px;
  height: 400px;
  background: #ff6d00;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: -5s;
}

@keyframes orbFloat {
  0%   { transform: translate(0, 0) scale(1); }
  50%  { transform: translate(30px, -30px) scale(1.1); }
  100% { transform: translate(-20px, 20px) scale(0.95); }
}

/* ---------- Glass Card (Primary) ---------- */
/* The main glass panel used for most content
   cards, stat cards, and sections. */
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.glass-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px rgba(124, 77, 255, 0.15);
  transform: translateY(-2px);
}

/* ---------- Glass Card (Subtle) ---------- */
/* A more transparent variant for nested cards
   or secondary panels inside a glass-card. */
.glass-card-subtle {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

/* ---------- Glass Sidebar ---------- */
/* Used for the navigation drawer / sidebar. */
.glass-sidebar {
  background: rgba(10, 10, 30, 0.7);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 4px 0 24px rgba(0, 0, 0, 0.4);
}

/* ---------- Glass Topbar ---------- */
/* Used for the top app bar / header. */
.glass-topbar {
  background: rgba(10, 10, 30, 0.5);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
}

/* ---------- Glass Modal / Dialog ---------- */
/* Used for modal overlays and dialogs. */
.glass-modal {
  background: rgba(20, 20, 40, 0.85);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  box-shadow: 0 16px 64px rgba(0, 0, 0, 0.5);
}

/* ---------- Glass Input ---------- */
/* Override for Ant Design input fields to
   match the glass aesthetic. */
.glass-input .ant-input,
.glass-input .ant-select-selector,
.glass-input .ant-picker {
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  border-radius: 10px !important;
  color: #e0e0e0 !important;
}

.glass-input .ant-input:focus,
.glass-input .ant-select-selector:focus,
.glass-input .ant-input-focused {
  border-color: rgba(124, 77, 255, 0.5) !important;
  box-shadow: 0 0 12px rgba(124, 77, 255, 0.2) !important;
}

.glass-input .ant-input::placeholder {
  color: rgba(255, 255, 255, 0.3) !important;
}

/* ---------- Glass Table ---------- */
/* Override for Ant Design tables. */
.glass-table .ant-table {
  background: transparent !important;
  color: #e0e0e0;
}

.glass-table .ant-table-thead > tr > th {
  background: rgba(255, 255, 255, 0.05) !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
  color: rgba(255, 255, 255, 0.7) !important;
  font-weight: 600;
}

.glass-table .ant-table-tbody > tr > td {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
  color: #e0e0e0 !important;
}

.glass-table .ant-table-tbody > tr:hover > td {
  background: rgba(255, 255, 255, 0.05) !important;
}

.glass-table .ant-table-pagination .ant-pagination-item {
  background: rgba(255, 255, 255, 0.05) !important;
  border-color: rgba(255, 255, 255, 0.1) !important;
}

.glass-table .ant-table-pagination .ant-pagination-item a {
  color: #e0e0e0 !important;
}

/* ---------- Glass Tabs ---------- */
/* Override for Ant Design tabs. */
.glass-tabs .ant-tabs-tab {
  color: rgba(255, 255, 255, 0.5) !important;
}

.glass-tabs .ant-tabs-tab-active .ant-tabs-tab-btn {
  color: #7c4dff !important;
}

.glass-tabs .ant-tabs-ink-bar {
  background: #7c4dff !important;
}

/* ---------- Glass Tag / Badge ---------- */
.glass-tag {
  background: rgba(255, 255, 255, 0.08) !important;
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
  color: #e0e0e0 !important;
  backdrop-filter: blur(8px);
  border-radius: 8px;
}

/* ---------- Glow Effects ---------- */
/* Colored glow accents for KPI cards and
   status indicators. */
.glow-purple { box-shadow: 0 0 20px rgba(124, 77, 255, 0.3), inset 0 0 20px rgba(124, 77, 255, 0.05); }
.glow-teal   { box-shadow: 0 0 20px rgba(0, 191, 165, 0.3), inset 0 0 20px rgba(0, 191, 165, 0.05); }
.glow-orange { box-shadow: 0 0 20px rgba(255, 109, 0, 0.3), inset 0 0 20px rgba(255, 109, 0, 0.05); }
.glow-blue   { box-shadow: 0 0 20px rgba(68, 138, 255, 0.3), inset 0 0 20px rgba(68, 138, 255, 0.05); }
.glow-green  { box-shadow: 0 0 20px rgba(105, 240, 174, 0.3), inset 0 0 20px rgba(105, 240, 174, 0.05); }
.glow-red    { box-shadow: 0 0 20px rgba(255, 82, 82, 0.3), inset 0 0 20px rgba(255, 82, 82, 0.05); }
.glow-yellow { box-shadow: 0 0 20px rgba(255, 215, 64, 0.3), inset 0 0 20px rgba(255, 215, 64, 0.05); }

/* ---------- Status Dot ---------- */
/* Animated pulsing dot for live/active states. */
.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
  animation: pulse 2s ease-in-out infinite;
}

.status-dot--active  { background: #69f0ae; }
.status-dot--warning { background: #ffd740; }
.status-dot--error   { background: #ff5252; }

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%      { opacity: 0.5; transform: scale(1.3); }
}

/* ---------- Utility: Text ---------- */
.text-glow {
  text-shadow: 0 0 10px rgba(124, 77, 255, 0.5);
}

.text-primary   { color: #7c4dff !important; }
.text-secondary { color: #00bfa5 !important; }
.text-accent    { color: #ff6d00 !important; }
.text-muted     { color: rgba(255, 255, 255, 0.45) !important; }
.text-light     { color: rgba(255, 255, 255, 0.85) !important; }

/* ---------- Scrollbar (Dark Glass) ---------- */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.02);
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}
```

---

## Ant Design Theme Configuration

### File: `src/App.vue` (ConfigProvider wrapper)

Wrap the entire app in Ant Design's `<a-config-provider>` with a dark-compatible token configuration:

```js
const themeConfig = {
  token: {
    colorPrimary: '#7C4DFF',
    colorSuccess: '#69F0AE',
    colorWarning: '#FFD740',
    colorError: '#FF5252',
    colorInfo: '#448AFF',
    colorBgBase: '#0a0a1a',
    colorBgContainer: 'transparent',
    colorBgElevated: 'rgba(20, 20, 40, 0.85)',
    colorBorder: 'rgba(255, 255, 255, 0.1)',
    colorText: 'rgba(255, 255, 255, 0.85)',
    colorTextSecondary: 'rgba(255, 255, 255, 0.45)',
    colorTextTertiary: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 12,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSize: 14,
    controlHeight: 40,
  },
  algorithm: 'dark',
}
```

---

## Application Layout

### File: `src/App.vue`

- Wrap everything in `<a-config-provider :theme="themeConfig">`.
- Apply the `forge-bg` class to the root `<div>`.
- Include the `<div class="forge-orb-container">` with three orb divs (`forge-orb--purple`, `forge-orb--teal`, `forge-orb--orange`) as the first child — these float behind all content.
- Use `<a-layout>` as the main layout wrapper with `min-height: 100vh` and `background: transparent`.

- **Sidebar:** Use `<a-layout-sider>` with `width="280"`, `collapsible`, and apply the `glass-sidebar` class.
  - A header section at the top containing the app logo/name "⚡ ForgeAI" in bold and a subtitle "Summit National Bank" in small muted text.
  - An `<a-divider>` below the header (styled with `border-color: rgba(255,255,255,0.08)`).
  - Use `<a-menu>` with `theme="dark"` and `mode="inline"` for navigation. Group items using `<a-menu-item-group>` with group titles:
    - **OVERVIEW**
      - Command Center — icon: `DashboardOutlined`
      - Team Velocity — icon: `RocketOutlined`
    - **AI PRODUCTS**
      - Product Catalog — icon: `AppstoreOutlined`
      - Model Registry — icon: `ExperimentOutlined`
      - Deployments — icon: `CloudUploadOutlined`
    - **ENGINEERING**
      - Component Library — icon: `BuildOutlined`
      - Pipeline Monitor — icon: `ApiOutlined`
    - **INSIGHTS**
      - Performance Analytics — icon: `LineChartOutlined`
      - Cost & Usage — icon: `DollarOutlined`
  - At the bottom of the sider, show a user info card with `glass-card-subtle` class containing:
    - An `<a-avatar>` with initials "JC" and `style="background: #7c4dff"`
    - Name: "Jordan Chen"
    - Role: "Platform Engineering Lead"
    - An `<a-tag>` color purple: "Admin"

- **Header:** Use `<a-layout-header>` with the `glass-topbar` class and `position: sticky; top: 0; z-index: 10`.
  - An `<a-input-search>` in the center with placeholder "Search products, models, pipelines..." and the `glass-input` class, max-width 500px.
  - On the right side, use `<a-space>`:
    - `<a-badge>` with `count={5}`: wrapping an `<a-button>` type text with `BellOutlined` icon
    - `<a-button>` type text with `SettingOutlined` icon
    - `<a-button>` type text with `QuestionCircleOutlined` icon

- **Content:** Use `<a-layout-content>` with `padding: 24px` and `position: relative; z-index: 1` (so content sits above the orbs). Place `<router-view>` inside.

---

## Pages & Components

### Page 1: Command Center (Dashboard)

#### File: `src/views/CommandCenterView.vue`

- **Page Header:**
  - Use `<a-page-header>` with title "Command Center" and subtitle "Real-time overview of the AI Product Factory". Add a `DashboardOutlined` icon before the title.
  - In the `extra` slot, place an `<a-segmented>` component with options: "Last 24 Hours", "Last 7 Days" (default), "Last 30 Days", "Last Quarter". These do not need to change data — they are for visual completeness.

- **KPI Cards Row:**
  - Use `<a-row :gutter="[16, 16]">` with six `<a-col :xs="24" :sm="12" :md="8" :lg="4">` columns.
  - Each KPI card is a `<div class="glass-card" style="padding: 20px;">` with a colored glow class:
    1. **Active AI Products** — Glow: `glow-purple`. Icon: `AppstoreOutlined` in a circle with purple background. Value: "18" (large, bold, white). Label: "Active AI Products" (muted). Trend: `<a-tag color="success">` "+3 this quarter" with `ArrowUpOutlined`.
    2. **Models in Production** — Glow: `glow-teal`. Icon: `ExperimentOutlined`. Value: "42". Trend: `<a-tag color="success">` "+7 this month".
    3. **Deployments This Week** — Glow: `glow-blue`. Icon: `CloudUploadOutlined`. Value: "23". Trend: `<a-tag color="success">` "+12% vs last week".
    4. **Avg Deploy Time** — Glow: `glow-orange`. Icon: `ClockCircleOutlined`. Value: "14 min". Trend: `<a-tag color="success">` "-3 min improvement" with `ArrowDownOutlined`.
    5. **Pipeline Success Rate** — Glow: `glow-green`. Icon: `CheckCircleOutlined`. Value: "96.2%". Trend: `<a-tag color="success">` "+1.8%".
    6. **Monthly AI Spend** — Glow: `glow-yellow`. Icon: `DollarOutlined`. Value: "$284K". Trend: `<a-tag color="warning">` "+8% vs budget" with `WarningOutlined`.

- **Charts Row 1:**
  - `<a-row :gutter="[16, 16]">` with `<a-col :xs="24" :lg="16">` and `<a-col :xs="24" :lg="8">`:
    1. **Deployment Frequency (Stacked Bar Chart):** A `<div class="glass-card" style="padding: 20px;">` with title "Deployment Frequency" in `text-light` class. Use `vue-chartjs` `<Bar>` component. X-axis: last 12 weeks ("W1" through "W12"). Two stacked datasets: "Successful" (color `#69F0AE`) data: [15, 18, 22, 19, 25, 21, 28, 24, 30, 27, 23, 23] and "Failed" (color `#FF5252`) data: [2, 1, 3, 1, 0, 2, 1, 3, 1, 0, 2, 0]. Chart background must be transparent. Grid lines should be `rgba(255,255,255,0.05)`. Tick labels should be `rgba(255,255,255,0.5)`.
    2. **Product Status Breakdown (Doughnut Chart):** A `<div class="glass-card" style="padding: 20px;">` with title "Product Status". Use `vue-chartjs` `<Doughnut>`. Segments: "Production" (8, `#69F0AE`), "Staging" (4, `#448AFF`), "Development" (5, `#FFD740`), "Archived" (1, `#666`). Cutout: 70%. Below the chart, show a centered label: "18 Total Products".

- **Charts Row 2:**
  - `<a-row :gutter="[16, 16]">` with two `<a-col :xs="24" :lg="12">`:
    1. **Model Accuracy Trends (Line Chart):** Glass card with title "Model Accuracy Trends". `<Line>` chart. X-axis: "Jan"–"Jun". Three datasets:
       - "Fraud Detection" (`#7C4DFF`): [94.2, 94.8, 95.1, 95.6, 96.0, 96.3]
       - "Sentiment Analysis" (`#00BFA5`): [88.5, 89.2, 90.1, 89.8, 91.2, 91.8]
       - "Document Processing" (`#FF6D00`): [91.0, 91.5, 92.3, 93.0, 93.2, 93.8]
       - Y-axis min 85, max 100. Transparent background. Semi-transparent line fills.
    2. **AI Spend by Category (Horizontal Bar):** Glass card with title "Monthly AI Spend by Category". `<Bar>` with `indexAxis: 'y'`. Categories: "Compute (GPU)", "Storage", "API Calls", "Data Transfer", "Licensing". Data: [142000, 48000, 38000, 28000, 28000]. Colors: `['#7C4DFF', '#00BFA5', '#FF6D00', '#448AFF', '#FFD740']`.

- **Recent Activity Feed:**
  - A `<div class="glass-card" style="padding: 20px;">` with title "Live Activity Feed" and a `<span class="status-dot status-dot--active"></span>` next to the title.
  - Use `<a-list>` with `dataSource` bound to 8 activity items. Each `<a-list-item>` shows:
    - An `<a-avatar>` (size 36) with a colored background and icon based on type:
      - Deployment: `CloudUploadOutlined`, bg `#448AFF`
      - Model Update: `ExperimentOutlined`, bg `#7C4DFF`
      - Pipeline Run: `ApiOutlined`, bg `#00BFA5`
      - Alert: `WarningOutlined`, bg `#FFD740`
      - Error: `CloseCircleOutlined`, bg `#FF5252`
    - Description text in `text-light` class
    - Team name as an `<a-tag>` with `glass-tag` class
    - Timestamp in `text-muted` class

---

### Page 2: Team Velocity

#### File: `src/views/TeamVelocityView.vue`

- **Page Header:**
  - `<a-page-header>` with title "Team Velocity" and subtitle "Track how fast your teams are shipping AI products". Icon: `RocketOutlined`.

- **Sprint Summary Cards:**
  - `<a-row :gutter="[16, 16]">` with four `<a-col :xs="24" :sm="12" :md="6">` glass cards:
    1. **Current Sprint** — "Sprint 14", dates "Mar 30 – Apr 10, 2026". Icon: `CalendarOutlined`. Glow: `glow-purple`.
    2. **Story Points Completed** — "68 / 85". Use `<a-progress>` with `percent={80}` `strokeColor="#00BFA5"` `trailColor="rgba(255,255,255,0.1)"`. Glow: `glow-teal`.
    3. **Sprint Burndown** — "On Track" with `<a-tag color="success">`. Icon: `CheckCircleOutlined`. Glow: `glow-green`.
    4. **Team Members Active** — "24 / 26". Icon: `TeamOutlined`. Glow: `glow-blue`.

- **Velocity Chart:**
  - Glass card titled "Sprint Velocity — Last 8 Sprints".
  - `<Bar>` chart. X-axis: "Sprint 7"–"Sprint 14". Two bar datasets:
    - "Committed" (`#7C4DFF` at 50% opacity): [75, 80, 82, 78, 85, 80, 88, 85]
    - "Completed" (`#00BFA5`): [70, 78, 80, 72, 82, 79, 84, 68]
  - A `<Line>` overlay for "Average Velocity" as a dashed horizontal line at 77, color `#FFD740`.

- **Team Breakdown Table:**
  - Glass card titled "Team Performance".
  - Use `<a-table>` with the `glass-table` class. Columns: Team Name, Product Focus, Members, Sprint Points (show as "completed / committed"), Completion Rate (use `<a-progress>` with `size="small"`), Deployments This Sprint, Status.
  - Status column: `<a-tag>` — On Track = green, At Risk = orange, Behind = red.
  - 6 team rows from `/src/data/teams.json`:
    1. "Sentinel" — Fraud Detection — 5 members
    2. "Athena" — Financial Insights — 4 members
    3. "DocuMind" — Document Processing — 4 members
    4. "Pulse" — Customer Sentiment — 3 members
    5. "Guardian" — Risk Assessment — 5 members
    6. "Nexus" — Platform & Infrastructure — 5 members

- **Cycle Time Distribution Chart:**
  - Glass card titled "Feature Cycle Time Distribution (Days)".
  - `<Bar>` chart. X-axis: "1-2 days", "3-5 days", "6-10 days", "11-15 days", "16-20 days", "21+ days". Data: [8, 15, 22, 12, 5, 2]. Color: `#7C4DFF`. Below the chart, an `<a-tag>` "Median: 7 days".

- **Blockers & Risks:**
  - Glass card titled "Active Blockers & Risks" with `WarningOutlined` icon.
  - Use `<a-list>` with 5 items. Each shows:
    - Severity: `<a-badge>` with `status` prop — "error" for Critical, "warning" for High, "processing" for Medium
    - Description text
    - Team as `<a-tag>` with `glass-tag` class
    - Days open in `text-muted`
    - `<a-button>` type link size small: "View"

---

### Page 3: Product Catalog

#### File: `src/views/ProductCatalogView.vue`

- **Page Header:**
  - `<a-page-header>` with title "AI Product Catalog" and subtitle "All AI products built and managed through ForgeAI". Icon: `AppstoreOutlined`.
  - In the `extra` slot: `<a-button>` type primary with `PlusOutlined` icon: "New Product".

- **Filters Bar:**
  - A `<div class="glass-card" style="padding: 16px; margin-bottom: 16px;">` containing an `<a-row :gutter="16">`:
    - `<a-col>`: `<a-input-search>` placeholder "Search products..." with `glass-input` class.
    - `<a-col>`: `<a-select>` for Status: "All", "Production", "Staging", "Development", "Archived". Style with `glass-input` class.
    - `<a-col>`: `<a-select>` for Domain: "All", "Fraud & Risk", "Customer Experience", "Operations", "Compliance", "Revenue". Style with `glass-input` class.
    - `<a-col>`: `<a-segmented>` for view mode with options: grid icon (`AppstoreOutlined`) and list icon (`UnorderedListOutlined`). Default: grid.

- **Product Grid (default view):**
  - `<a-row :gutter="[16, 16]">` with `<a-col :xs="24" :sm="12" :md="8" :lg="6">`.
  - Each product is a `<div class="glass-card" style="padding: 20px; cursor: pointer;">`:
    - A colored top accent line (height 3px, border-radius top) based on status: Production = `#69F0AE`, Staging = `#448AFF`, Development = `#FFD740`, Archived = `#666`.
    - Product icon: a large (40px) Ant Design or MDI icon inside a `<div>` with a semi-transparent colored background circle (48px, border-radius 50%).
    - Product name (bold, `text-light`, font-size 16px)
    - Description (one line, `text-muted`, font-size 13px, `text-overflow: ellipsis`)
    - Domain: `<a-tag>` with `glass-tag` class
    - Status: `<a-tag>` colored by status
    - A row of small metrics in `text-muted` font-size 12px:
      - Models: count with `ExperimentOutlined`
      - Uptime: percentage with `CheckCircleOutlined`
      - Users: count with `UserOutlined`
    - Team name with `TeamOutlined` icon in `text-muted`
    - `<a-button>` type link block: "View Details"
  - 8 products from `/src/data/products.json`.

- **Product List View (alternate):**
  - `<a-table>` with `glass-table` class. Columns: Product Name (with icon), Domain, Status, Models, Uptime, Active Users, Team, Last Updated.

- **Filter Logic:**
  - Reactive filtering with `computed`. Filter by search text, status, and domain.

- **Product Detail Modal:**
  - Clicking "View Details" opens an `<a-modal>` with `class="glass-modal"` and `width={900}`:
    - Product name, icon, status tag
    - Full description
    - `<a-tabs>` with `glass-tabs` class:
      - **Overview Tab:**
        - 4 mini glass-card-subtle stat cards: Models Count, API Calls/Day, Avg Latency, Uptime %
        - Tech Stack: row of `<a-tag>` components
        - Team members: `<a-avatar-group>`
      - **Models Tab:**
        - `<a-table>` with `glass-table` class listing models: Name, Version, Accuracy (`<a-progress>`), Status, Last Trained
      - **Deployments Tab:**
        - `<a-timeline>` showing last 5 deployments: version, date, environment, deployer, status

---

### Page 4: Model Registry

#### File: `src/views/ModelRegistryView.vue`

- **Page Header:**
  - `<a-page-header>` title "Model Registry", subtitle "Central repository of all AI/ML models". Icon: `ExperimentOutlined`.
  - Extra: `<a-button>` type primary "Register Model" with `PlusOutlined`.

- **Registry Stats Row:**
  - `<a-row :gutter="[16, 16]">` with four `<a-col :xs="24" :md="6">` glass cards with glows:
    1. Total Models: "42", `ExperimentOutlined`, `glow-purple`
    2. Production Models: "28", `CheckCircleOutlined`, `glow-green`
    3. Avg Accuracy: "93.4%", `AimOutlined`, `glow-teal`
    4. Retrained This Month: "12", `SyncOutlined`, `glow-blue`

- **Models Data Table:**
  - Glass card containing `<a-table>` with `glass-table` class.
  - Columns: Model Name, Product, Version, Framework, Accuracy (use `<a-progress>` with `size="small"` — green if >90, yellow if 80-90, red if <80), Latency (ms), Status, Environment, Last Trained, Actions.
  - Status: `<a-tag>` — Active = green, Training = blue with `<LoadingOutlined>` spinning, Deprecated = default/grey, Failed = red.
  - Environment: `<a-tag>` — Production = green outlined, Staging = blue outlined, Development = orange outlined.
  - Actions: `<a-space>` with `<a-button>` icon buttons: `EyeOutlined`, `HistoryOutlined`, `DownloadOutlined`.
  - 15+ rows from `/src/data/models.json`. Enable sorting and search.

- **Model Comparison Section:**
  - Glass card titled "Model Comparison" with `SwapOutlined` icon.
  - `<a-row :gutter="16">`: two `<a-col :span="12">` each with an `<a-select>` (glass-input class): "Select Model A" and "Select Model B", populated from the model list.
  - When both selected, show:
    - Side-by-side `<a-row>` with two `<a-col>` glass-card-subtle panels showing each model's stats.
    - A `<Bar>` chart comparing 5 metrics (Accuracy, Precision, Recall, F1 Score, Latency normalized) with two datasets colored `#7C4DFF` and `#00BFA5`.
  - Default (none selected): a centered placeholder with `SwapOutlined` icon (large, muted) and text "Select two models above to compare their performance metrics."

---

### Page 5: Deployments

#### File: `src/views/DeploymentsView.vue`

- **Page Header:**
  - `<a-page-header>` title "Deployments", subtitle "Track and manage all AI product deployments". Icon: `CloudUploadOutlined`.
  - Extra: `<a-button>` type primary "New Deployment" with `PlusOutlined`.

- **Deployment Stats Row:**
  - Four glass cards with glows:
    1. Deployments Today: "5", `CloudUploadOutlined`, `glow-purple`
    2. Success Rate: "96.2%", `CheckCircleOutlined`, `glow-green`
    3. Avg Deploy Time: "14 min", `ClockCircleOutlined`, `glow-blue`
    4. Rollbacks This Week: "1", `UndoOutlined`, `glow-yellow`

- **Active Deployment Pipelines:**
  - Glass card titled "Active Deployment Pipelines".
  - Show 3 pipelines, each inside a `<div class="glass-card-subtle" style="padding: 16px; margin-bottom: 12px;">`:
    1. **Fraud Detection v3.2** — Use `<a-steps>` with `size="small"`:
       - Build ✅ → Test ✅ → Staging ✅ → Approval ⏳ (current) → Production ⬜
       - Subtitle: "Awaiting sign-off from Risk team"
       - Triggered by, timestamp in `text-muted`
    2. **Sentiment Analysis v2.1** — Steps: Build ✅ → Test ✅ → Staging 🔄 (current with `<LoadingOutlined>`) → Approval ⬜ → Production ⬜
       - Subtitle: "Running integration tests..." with `<a-progress>` indeterminate style (use `status="active"` and a small progress bar)
    3. **Doc Processor v4.0** — Steps: Build ✅ → Test ❌ (error)
       - Subtitle in red: "3 unit tests failed"

- **Deployment History Table:**
  - Glass card with `<a-table>` `glass-table` class. Columns: Deployment ID, Product, Version, Environment, Triggered By, Start Time, Duration, Status, Actions.
  - Status: `<a-tag>` — Success = green, In Progress = blue with `<LoadingOutlined>`, Failed = red, Rolled Back = orange.
  - Actions: `EyeOutlined` (view logs), `UndoOutlined` (rollback — only for successful production).
  - 12+ rows from `/src/data/deployments.json`.

- **Deployment Activity Heatmap:**
  - Glass card titled "Deployment Activity — Last 4 Weeks".
  - Build with plain HTML/CSS grid (not a chart library). 4 rows (weeks) × 7 columns (Mon–Sun).
  - Each cell is a `<div>` (36px × 36px, border-radius 6px) with background opacity based on deployment count:
    - 0: `rgba(255,255,255,0.03)`
    - 1-2: `rgba(124,77,255,0.25)`
    - 3-4: `rgba(124,77,255,0.5)`
    - 5+: `rgba(124,77,255,0.85)`
  - Wrap each cell in `<a-tooltip>` showing "X deployments".
  - Day labels (M, T, W, T, F, S, S) across the top in `text-muted`.
  - Week labels on the left.
  - Legend row below the grid showing the color scale.

---

### Page 6: Component Library

#### File: `src/views/ComponentLibraryView.vue`

- **Page Header:**
  - `<a-page-header>` title "Reusable Component Library", subtitle "Shared building blocks for accelerated AI product development". Icon: `BuildOutlined`.
  - Extra: `<a-button>` type primary "Contribute Component" with `PlusOutlined`.

- **Library Stats Row:**
  - Four glass cards:
    1. Total Components: "56", `BuildOutlined`, `glow-purple`
    2. Most Used: "Auth Module", `TrophyOutlined`, `glow-teal`
    3. New This Month: "4", `PlusSquareOutlined`, `glow-orange`
    4. Avg Reuse Rate: "3.2 products", `SyncOutlined`, `glow-green`

- **Category Tabs:**
  - `<a-tabs>` with `glass-tabs` class:
    - All (`AppstoreOutlined`)
    - Data Connectors (`DatabaseOutlined`)
    - ML Pipelines (`ApiOutlined`)
    - API Templates (`CodeOutlined`)
    - UI Widgets (`LayoutOutlined`)
    - Auth & Security (`LockOutlined`)
    - Monitoring (`EyeOutlined`)

- **Component Grid:**
  - `<a-row :gutter="[16, 16]">` with `<a-col :xs="24" :sm="12" :md="8">`.
  - Each component is a `<div class="glass-card" style="padding: 20px;">`:
    - Large icon (32px) in a colored semi-transparent circle
    - Component name (bold, `text-light`)
    - Description (2 lines, `text-muted`, font-size 13px)
    - Category: `<a-tag>` with `glass-tag` class
    - Version: `text-muted` font-size 12px
    - Stats row in `text-muted` font-size 12px:
      - Used in X products (`AppstoreOutlined`)
      - X downloads (`DownloadOutlined`)
      - X stars (`StarOutlined`)
    - Maintained by: team name, `text-muted`
    - `<a-space>`:
      - `<a-button>` size small outlined: "View Docs"
      - `<a-button>` size small type primary ghost: "Install" with `DownloadOutlined`
  - 12+ components from `/src/data/components.json`.

- **Filter Logic:**
  - Filter by active tab category and search text.

---

### Page 7: Pipeline Monitor

#### File: `src/views/PipelineMonitorView.vue`

- **Page Header:**
  - `<a-page-header>` title "Pipeline Monitor", subtitle "Real-time status of all CI/CD and ML training pipelines". Icon: `ApiOutlined`.

- **Pipeline Status Summary:**
  - Four glass cards:
    1. Running: "7", `PlayCircleOutlined`, `glow-blue`. Add `<span class="status-dot status-dot--active"></span>` next to the value.
    2. Queued: "3", `ClockCircleOutlined`, `glow-yellow`
    3. Succeeded (Today): "18", `CheckCircleOutlined`, `glow-green`
    4. Failed (Today): "2", `CloseCircleOutlined`, `glow-red`

- **Active Pipelines List:**
  - Glass card titled "Currently Running".
  - Use `<a-list>` with 7 items. Each `<a-list-item>`:
    - Pipeline name (`text-light`, bold)
    - Type: `<a-tag>` — "ML Training" (purple), "CI/CD" (blue), "Data ETL" (teal)
    - Triggered by in `text-muted`
    - Started: relative time in `text-muted`
    - `<a-progress>` with `percent` value, `strokeColor` based on type, `trailColor="rgba(255,255,255,0.1)"`
    - Estimated remaining in `text-muted`
    - `<a-button>` danger type text icon `StopOutlined` to cancel

- **Pipeline History Chart:**
  - Glass card titled "Pipeline Runs — Last 14 Days".
  - `<Line>` chart. X-axis: "Mar 24"–"Apr 6". Three datasets with area fill:
    - "Succeeded" (`#69F0AE`): [12, 15, 14, 18, 16, 20, 13, 17, 19, 22, 18, 21, 16, 18]
    - "Failed" (`#FF5252`): [1, 0, 2, 1, 0, 1, 3, 0, 1, 0, 2, 1, 0, 2]
    - "Cancelled" (`#FFD740`): [0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0]

- **Failed Pipeline Alerts:**
  - Glass card titled "Recent Failures" with `CloseCircleOutlined` icon in red.
  - `<a-list>` with 4 items. Each shows:
    - Pipeline name (`text-light`)
    - Failure reason (`text-muted`, font-size 13px)
    - Failed at: timestamp in `text-muted`
    - `<a-space>`:
      - `<a-button>` type link size small: "View Logs"
      - `<a-button>` type link size small with `SyncOutlined`: "Retry"

---

### Page 8: Performance Analytics

#### File: `src/views/PerformanceAnalyticsView.vue`

- **Page Header:**
  - `<a-page-header>` title "Performance Analytics", subtitle "Monitor AI model and product performance". Icon: `LineChartOutlined`.
  - Extra: `<a-select>` (glass-input) for Time Range: "Last 7 Days", "Last 30 Days" (default), "Last 90 Days", "Last Year".

- **Top-Level Metrics:**
  - Four glass cards with glows:
    1. Avg Model Accuracy: "93.4%", `AimOutlined`, `glow-green`
    2. Avg API Latency: "128ms", `ThunderboltOutlined`, `glow-blue`
    3. Total API Calls (30d): "12.4M", `ApiOutlined`, `glow-purple`
    4. Error Rate: "0.34%", `BugOutlined`, `glow-red`

- **API Latency Over Time (Line Chart):**
  - Glass card titled "API Latency Trends (p50, p95, p99)".
  - `<Line>` chart. X-axis: 30 days (show every 5th label). Three datasets:
    - "p50" (`#69F0AE`): fluctuating 80-120ms
    - "p95" (`#FFD740`): fluctuating 200-350ms
    - "p99" (`#FF5252`): fluctuating 400-800ms
  - 30 data points each from `/src/data/performance.json`.

- **API Calls Volume (Bar Chart):**
  - Glass card titled "Daily API Call Volume".
  - `<Bar>` chart. 30 data points fluctuating 300K-500K. Color: `#7C4DFF`.

- **Model Performance Comparison (Radar Chart):**
  - Glass card titled "Model Performance Comparison".
  - `<Radar>` chart. Axes: "Accuracy", "Precision", "Recall", "F1 Score", "Latency (inv)", "Throughput". Four datasets:
    - "Fraud Detection" (`#7C4DFF`): [96, 95, 94, 95, 88, 82]
    - "Sentiment Analysis" (`#00BFA5`): [92, 90, 93, 91, 95, 90]
    - "Doc Processing" (`#FF6D00`): [94, 92, 91, 92, 78, 75]
    - "Risk Assessment" (`#448AFF`): [90, 88, 92, 90, 85, 88]
  - Semi-transparent fills. Radar grid lines: `rgba(255,255,255,0.1)`. Point labels: `rgba(255,255,255,0.6)`.

- **Error Breakdown (Doughnut Chart):**
  - Glass card titled "Error Distribution by Type".
  - `<Doughnut>` chart. Segments: "Timeout" (35%, `#FFD740`), "Rate Limit" (25%, `#FF6D00`), "Model Error" (20%, `#FF5252`), "Data Validation" (12%, `#448AFF`), "Other" (8%, `#666`). Cutout: 65%.

---

### Page 9: Cost & Usage

#### File: `src/views/CostUsageView.vue`

- **Page Header:**
  - `<a-page-header>` title "Cost & Usage", subtitle "Track AI infrastructure costs and resource utilization". Icon: `DollarOutlined`.
  - Extra: `<a-select>` (glass-input) for Time Range: "This Month" (default), "Last 3 Months", "Last 6 Months", "This Year".

- **Budget Overview Cards:**
  - Four glass cards:
    1. Monthly Budget: "$320,000", `DollarOutlined`, `glow-purple`
    2. Spent to Date: "$284,000", `glow-yellow`. Use `<a-progress>` `percent={89}` `strokeColor="#FFD740"` `trailColor="rgba(255,255,255,0.1)"`.
    3. Projected Overage: "$12,000", `WarningOutlined`, `glow-red`
    4. Cost per API Call: "$0.023", `CalculatorOutlined`, `glow-blue`. Trend: `<a-tag color="success">` "-8% vs last month".

- **Monthly Cost Trend (Stacked Bar Chart):**
  - Glass card titled "Monthly Cost Breakdown".
  - `<Bar>` stacked. X-axis: "Nov"–"Apr". Five datasets:
    - "Compute (GPU)" (`#7C4DFF`): [110, 125, 130, 138, 142, 148]
    - "Storage" (`#00BFA5`): [35, 38, 40, 42, 45, 48]
    - "API Calls" (`#FF6D00`): [25, 28, 30, 33, 36, 38]
    - "Data Transfer" (`#448AFF`): [18, 20, 22, 24, 26, 28]
    - "Licensing" (`#FFD740`): [22, 24, 25, 26, 27, 28]
  - Values in thousands. Add a `<Line>` overlay for "Budget" as a dashed line at 320, color `#FF5252`.

- **Cost by Team (Horizontal Bar):**
  - Glass card titled "Cost by Team — This Month".
  - `<Bar>` with `indexAxis: 'y'`. Teams and data: "Sentinel" $68K, "Athena" $52K, "DocuMind" $48K, "Guardian" $45K, "Pulse" $38K, "Nexus" $33K. Color: `#7C4DFF`.

- **Resource Utilization Gauges:**
  - Glass card titled "Resource Utilization".
  - `<a-row :gutter="[16, 16]">` with four `<a-col :xs="12" :md="6">`. Each contains a `<div class="glass-card-subtle" style="padding: 20px; text-align: center;">`:
    - Use `<a-progress>` with `type="dashboard"` (this renders a gauge/semicircle):
      1. GPU Utilization: 78%, `strokeColor="#69F0AE"`
      2. CPU Utilization: 62%, `strokeColor="#69F0AE"`
      3. Memory: 85%, `strokeColor="#FFD740"`
      4. Storage: 71%, `strokeColor="#69F0AE"`
    - Set `trailColor="rgba(255,255,255,0.1)"` and `width={120}` for all gauges.
    - Label below each gauge in `text-muted`.

- **Cost Optimization Recommendations:**
  - Glass card titled "Optimization Recommendations" with `BulbOutlined` icon.
  - `<a-list>` with 4 items. Each shows:
    - Description text (`text-light`)
    - Potential savings: `<a-tag color="success">` (e.g., "$4,200/mo")
    - `<a-button>` size small type primary ghost: "Implement"
  - Recommendations:
    1. "Downscale Athena staging environment during off-hours" — $4,200/mo
    2. "Switch DocuMind training to spot instances" — $8,500/mo
    3. "Archive unused Sentiment v1.x model artifacts" — $1,800/mo
    4. "Consolidate duplicate data pipelines (Sentinel + Guardian)" — $3,200/mo

---

## Mock Data Files

### File: `/src/data/member.json`
```json
{
  "name": "Jordan Chen",
  "role": "Platform Engineering Lead",
  "team": "Nexus",
  "accessLevel": "Admin",
  "initials": "JC"
}
```

### File: `/src/data/products.json`
- Array of at least 8 product objects with fields: `id`, `name`, `description`, `icon` (Ant Design icon component name string, e.g., "SecurityScanOutlined"), `domain` (one of: "Fraud & Risk", "Customer Experience", "Operations", "Compliance", "Revenue"), `status` (one of: "Production", "Staging", "Development", "Archived"), `team`, `models` (count), `uptime` (percentage string), `activeUsers` (count), `apiCallsPerDay` (string like "1.2M"), `avgLatency` (string like "95ms"), `techStack` (array of strings), `teamMembers` (array of `{ name, initials, role }`), `lastUpdated` (date string), `deploymentHistory` (array of `{ version, date, environment, deployer, status }`), `associatedModels` (array of `{ name, version, accuracy, status, lastTrained }`).
- Products:
  1. "FraudShield" — Fraud Detection — icon: "SecurityScanOutlined" — Production
  2. "InsightEngine" — Personalized Financial Insights — icon: "BulbOutlined" — Production
  3. "DocuMind" — Document Processing — icon: "FileSearchOutlined" — Production
  4. "SentimentPulse" — Customer Sentiment Analysis — icon: "SmileOutlined" — Production
  5. "RiskRadar" — Risk Assessment — icon: "RadarChartOutlined" — Staging
  6. "ComplianceBot" — Regulatory Compliance — icon: "AuditOutlined" — Development
  7. "RevenuePredict" — Revenue Forecasting — icon: "RiseOutlined" — Staging
  8. "ChatAssist" — Customer Service AI — icon: "MessageOutlined" — Development

### File: `/src/data/models.json`
- Array of at least 15 model objects with fields: `id`, `name`, `product`, `version`, `framework` (e.g., "TensorFlow", "PyTorch", "scikit-learn", "XGBoost", "Hugging Face"), `accuracy` (number 0-100), `precision` (number 0-100), `recall` (number 0-100), `f1Score` (number 0-100), `latency` (number in ms), `status` (one of: "Active", "Training", "Deprecated", "Failed"), `environment` (one of: "Production", "Staging", "Development"), `lastTrained` (date string), `trainingDataSize` (string like "2.4M records"), `throughput` (number).

### File: `/src/data/teams.json`
- Array of 6 team objects with fields: `id`, `name`, `productFocus`, `members` (count), `sprintPointsCommitted`, `sprintPointsCompleted`, `completionRate` (percentage), `deploymentsThisSprint`, `status` (one of: "On Track", "At Risk", "Behind"), `memberDetails` (array of `{ name, initials, role }`).

### File: `/src/data/deployments.json`
- Array of at least 12 deployment objects with fields: `id`, `product`, `version`, `environment`, `triggeredBy`, `startTime` (ISO datetime string), `duration` (string like "12 min"), `status` (one of: "Success", "In Progress", "Failed", "Rolled Back"), `logs` (string summary).
- Also include a `heatmapData` property: an array of 28 numbers (values 0-8) representing deployment counts for each day over the last 4 weeks (Monday to Sunday).

### File: `/src/data/components.json`
- Array of at least 12 reusable component objects with fields: `id`, `name`, `description`, `icon` (Ant Design icon component name string), `category` (one of: "Data Connectors", "ML Pipelines", "API Templates", "UI Widgets", "Auth & Security", "Monitoring"), `version`, `usedInProducts` (count), `downloads` (count), `stars` (count), `maintainedBy` (team name).

### File: `/src/data/activity.json`
- Array of at least 8 activity feed objects with fields: `id`, `type` (one of: "deployment", "model_update", "pipeline_run", "alert", "error"), `description`, `team`, `timestamp` (relative time string like "12 min ago").

### File: `/src/data/pipelines.json`
- Object containing:
  - `active`: array of 7 running pipeline objects with `name`, `type` (one of: "ML Training", "CI/CD", "Data ETL"), `triggeredBy`, `startedAgo` (string), `progress` (number 0-100), `estimatedRemaining` (string)
  - `failed`: array of 4 failed pipeline objects with `name`, `failureReason`, `failedAt` (timestamp string)

### File: `/src/data/performance.json`
- Object containing:
  - `latencyP50`: array of 30 numbers (80-120 range)
  - `latencyP95`: array of 30 numbers (200-350 range)
  - `latencyP99`: array of 30 numbers (400-800 range)
  - `dailyApiCalls`: array of 30 numbers (300000-500000 range)
  - `dateLabels`: array of 30 date strings

### File: `/src/data/costs.json`
- Object containing:
  - `monthlyBudget`: 320000
  - `spentToDate`: 284000
  - `projectedOverage`: 12000
  - `costPerApiCall`: 0.023
  - `monthlyCostBreakdown`: object with arrays for each cost category (6 months of data)
  - `costByTeam`: object mapping team names to monthly cost numbers
  - `resourceUtilization`: object with `gpu`, `cpu`, `memory`, `storage` percentages
  - `heatmapData`: array of 28 numbers for the deployment heatmap

---

## Pinia Stores

### File: `/src/stores/userStore.js`
- State: `user` (loaded from `member.json`)
- Getters: `initials`, `isAdmin`

### File: `/src/stores/productStore.js`
- State: `products` (loaded from `products.json`), `searchQuery`, `statusFilter`, `domainFilter`, `viewMode` ("grid" or "list")
- Getters: `filteredProducts`, `productById(id)`, `productCount`, `productionCount`, `statusBreakdown`

### File: `/src/stores/modelStore.js`
- State: `models` (loaded from `models.json`), `searchQuery`, `selectedModelA` (id or null), `selectedModelB` (id or null)
- Getters: `filteredModels`, `modelById(id)`, `comparisonData` (returns formatted data for the comparison chart when both models are selected), `totalModels`, `productionModels`, `avgAccuracy`

### File: `/src/stores/teamStore.js`
- State: `teams` (loaded from `teams.json`)
- Getters: `totalMembers`, `avgCompletionRate`, `teamsAtRisk`

### File: `/src/stores/deploymentStore.js`
- State: `deployments` (loaded from `deployments.json`), `heatmapData`
- Getters: `deploymentsToday`, `successRate`, `avgDeployTime`, `rollbackCount`, `recentDeployments`

### File: `/src/stores/pipelineStore.js`
- State: `activePipelines`, `failedPipelines` (loaded from `pipelines.json`)
- Getters: `runningCount`, `queuedCount`, `succeededToday`, `failedToday`

### File: `/src/stores/costStore.js`
- State: `costs` (loaded from `costs.json`)
- Getters: `budgetUsagePercentage`, `isOverBudget`, `utilizationStatus(resource)` (returns color based on threshold)

---

## Router Configuration

### File: `/src/router/index.js`

Define the following routes:

| Path | Name | Component |
|---|---|---|
| `/` | CommandCenter | `CommandCenterView.vue` |
| `/velocity` | TeamVelocity | `TeamVelocityView.vue` |
| `/products` | ProductCatalog | `ProductCatalogView.vue` |
| `/models` | ModelRegistry | `ModelRegistryView.vue` |
| `/deployments` | Deployments | `DeploymentsView.vue` |
| `/components` | ComponentLibrary | `ComponentLibraryView.vue` |
| `/pipelines` | PipelineMonitor | `PipelineMonitorView.vue` |
| `/analytics` | PerformanceAnalytics | `PerformanceAnalyticsView.vue` |
| `/costs` | CostUsage | `CostUsageView.vue` |

---

## File Structure Summary

```
forgeai/
├── public/
├── src/
│   ├── App.vue
│   ├── main.js
│   ├── styles/
│   │   └── glass.css
│   ├── plugins/
│   │   └── antd.js
│   ├── router/
│   │   └── index.js
│   ├── stores/
│   │   ├── userStore.js
│   │   ├── productStore.js
│   │   ├── modelStore.js
│   │   ├── teamStore.js
│   │   ├── deploymentStore.js
│   │   ├── pipelineStore.js
│   │   └── costStore.js
│   ├── views/
│   │   ├── CommandCenterView.vue
│   │   ├── TeamVelocityView.vue
│   │   ├── ProductCatalogView.vue
│   │   ├── ModelRegistryView.vue
│   │   ├── DeploymentsView.vue
│   │   ├── ComponentLibraryView.vue
│   │   ├── PipelineMonitorView.vue
│   │   ├── PerformanceAnalyticsView.vue
│   │   └── CostUsageView.vue
│   ├── data/
│   │   ├── member.json
│   │   ├── products.json
│   │   ├── models.json
│   │   ├── teams.json
│   │   ├── deployments.json
│   │   ├── components.json
│   │   ├── activity.json
│   │   ├── pipelines.json
│   │   ├── performance.json
│   │   └── costs.json
│   └── components/
│       ├── charts/
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
│       │   ├── AppSidebar.vue
│       │   ├── AppHeader.vue
│       │   └── OrbBackground.vue
│       ├── deployments/
│       │   ├── DeploymentPipeline.vue
│       │   └── DeploymentHeatmap.vue
│       ├── products/
│       │   ├── ProductCard.vue
│       │   └── ProductDetailModal.vue
│       ├── pipelines/
│       │   ├── ActivePipelineItem.vue
│       │   └── FailedPipelineItem.vue
│       └── common/
│           ├── GlassKpiCard.vue
│           └── GlassPageHeader.vue
├── package.json
├── vite.config.js
└── PLAN.md
```

---

## Additional Instructions for Copilot Agent

1. **Do not use any external APIs.** All data should come from the local JSON files in `/src/data/`.
2. **All components must use Vue 3 Composition API** with `<script setup>` syntax.
3. **Use Ant Design Vue 4.x** (`ant-design-vue`) as the primary UI library. Do NOT use Vuetify. Import components from `ant-design-vue` (e.g., `<a-button>`, `<a-table>`, `<a-card>`, `<a-tag>`, `<a-progress>`, `<a-steps>`, `<a-tabs>`, `<a-list>`, `<a-select>`, `<a-input>`, `<a-modal>`, `<a-menu>`, `<a-layout>`, `<a-avatar>`, `<a-badge>`, `<a-tooltip>`, `<a-divider>`, `<a-segmented>`, `<a-timeline>`, `<a-page-header>`, `<a-row>`, `<a-col>`, `<a-space>`, `<a-config-provider>`).
4. **Icons:** Use `@ant-design/icons-vue` as the primary icon set. Import icons individually (e.g., `import { DashboardOutlined, RocketOutlined } from '@ant-design/icons-vue'`). If an Ant Design icon is not available for a specific use case, fall back to MDI via `<span class="mdi mdi-icon-name"></span>` from `@mdi/font`.
5. **Glassmorphism is mandatory.** Do NOT use solid-background Ant Design cards (`<a-card>`). Instead, use plain `<div>` elements with the glassmorphism CSS classes defined in `/src/styles/glass.css` (e.g., `glass-card`, `glass-card-subtle`, `glass-sidebar`, `glass-topbar`, `glass-modal`). The only Ant Design layout components that should be used structurally are `<a-layout>`, `<a-layout-sider>`, `<a-layout-header>`, `<a-layout-content>`, `<a-row>`, and `<a-col>`.
6. **All Ant Design tables must use the `glass-table` class**, all tabs must use the `glass-tabs` class, and all input/select fields must use the `glass-input` class to override default Ant Design styling for the dark glass theme.
7. **Charts must use `vue-chartjs`** with `chart.js`. Register Chart.js components (CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, RadialLinearScale, Title, Tooltip, Legend, Filler) in `main.js`. All chart backgrounds must be `transparent`. Grid lines must be `rgba(255,255,255,0.05)`. Tick labels must be `rgba(255,255,255,0.5)`. Legend labels must be `rgba(255,255,255,0.7)`.
8. **The animated orb background** (`OrbBackground.vue` or inline in `App.vue`) must be rendered as a fixed-position layer behind all content (`z-index: 0`). All page content must have `position: relative; z-index: 1` to sit above the orbs.
9. **Create a reusable `GlassKpiCard.vue` component** in `/src/components/common/` that accepts props for `title`, `value`, `icon` (Ant Design icon component), `glowClass` (e.g., "glow-purple"), `trendText`, and `trendType` ("success", "warning", "error"). Use this for all KPI cards across every page.
10. **Responsive design:** All pages must work on desktop (1200px+) and tablet (768px). Use Ant Design's `<a-row>` and `<a-col>` with responsive breakpoint props (`:xs`, `:sm`, `:md`, `:lg`). The sidebar should be collapsible on tablet.
11. **No placeholder content.** Every card, table, list, and chart must be populated with realistic mock data.
12. **Navigation menu** should highlight the active route using Vue Router's current route path bound to `<a-menu :selectedKeys>`.
13. **Consistent spacing:** Use `padding: 20px` for glass cards. Use `margin-bottom: 16px` between major sections. Use `<a-row :gutter="[16, 16]">` for all grid layouts.
14. **Deployment heatmap** must be built with plain HTML/CSS divs and the glassmorphism utility classes — do NOT use a chart library for the heatmap. Each cell must have an `<a-tooltip>` showing the count.
15. **Spinning loading icons:** For any "Training" or "In Progress" status, use `<LoadingOutlined :spin="true" />` from `@ant-design/icons-vue`.
16. **The `<a-config-provider>`** must wrap the entire app in `App.vue` with the dark theme token configuration specified in the Theme Configuration section. Set `algorithm` to the dark algorithm imported from `ant-design-vue`: `import { theme } from 'ant-design-vue'` then use `algorithm: theme.darkAlgorithm`.
```