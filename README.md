# Bandhan Paribar — Social Welfare & Media Portal

A modern, responsive React web application built for **Bandhan Paribar (As-Sunnah Foundation)** based on the Figma design (`Task-Intern (Copy)`). Featuring a humanitarian public portal, comprehensive "About Us" page, interactive "News & Articles" platform with debounced search, dynamic article details view, an **Admin Management Dashboard** with TipTap headless rich text editing, and client-side content persistence.

---

## 🚀 Tech Stack

- **Frontend Core:** React 19 (JavaScript ES6+) + Vite
- **Styling & UI:** Tailwind CSS v4 + `@heroui/react` (Hero UI) + `framer-motion` + `lucide-react`
- **Routing:** `react-router-dom` v7
- **Rich Text Editor:** TipTap (`@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extension-underline`, `@tiptap/extension-link`, `@tiptap/extension-placeholder`)
- **Data & Storage:** `public/data.json` + client-side Article Service (`articleService.js`) with persistent `localStorage` synchronization

---

## 🛠️ Key Features

1. **Floating Glassmorphic Header Navigation:**
   - Desktop floating glass navbar with active page indicators.
   - **Direct Dashboard Access:** Includes a quick-access **Dashboard** button linking to management controls.

2. **Mobile Responsive Navigation:**
   - Top mobile header with hamburger menu toggle.
   - Slide-out mobile navigation drawer + fixed bottom navigation bar (*Home*, *Articles*, *Donate*, *Dashboard*).

3. **Home Page (7 Relatable Sections):**
   - **Hero Banner:** Full-width background image with primary call-to-action buttons.
   - **Impact Metrics Counter:** Real-time statistics (50K+ Families, 120+ Projects, 3.5K Volunteers, 1.2M Relief Meals).
   - **Core Focus Areas:** Emergency disaster relief, education, healthcare, safe drinking water, self-reliance, and Imam training.
   - **Featured News:** Live feed preview cards linking directly to full article detail pages.
   - **Recent Programs:** Operational milestone highlight cards.
   - **Community Testimonials:** Verified stories from flood relief recipients and trainees.
   - **Newsletter Subscription:** Interactive email signup section.

4. **News & Articles Platform:**
   - **Debounced Search:** Custom `useDebounce` hook (300ms) for real-time keyword filtering.
   - **Category Sidebar Filter:** Category selector (*Disaster Relief, Education, Tree Plantation, Clean Water, Qurbani, Food Distribution, etc.*).
   - **Paginated Grid & Controls:** 9 cards per page with numeric pagination controls (`1, 2, 3...`), previous/next buttons, and total item badges.
   - **Dynamic Article Details Page (`/news/:id`):** Full story reader view with category badges, hero image, italic excerpt quote box, and related articles grid.

5. **Admin Management Dashboard (`/dashboard`):**
   - **Responsive Sidebar Navigation:** 4 administrative routes (*Dashboard Overview*, *User Management*, *Blog & News Management*, *Setting Management*).
   - **Dashboard Overview:** Analytical hero welcome banner, quick metrics grid, and recent published news feed.
   - **Blog & News Management Workspace:**
     - Content table showing thumbnail, title, published date, source link to details page, and action dropdown.
     - **Action Dropdown:** Edit and Delete content controls.
     - **TipTap Rich Text Editor:** Headless editor for content creation and updates featuring Bold, Italic, Underline, Heading 2, Bullet List, Quote, Link insertion, and Clear Formatting.
     - **Cover Image Modal:** Upload modal dialog for managing article cover images.

6. **Online Donation Portal (`/donate`):**
   - Clean placeholder page with a "Coming Soon" message as the portal undergoes upgrades.

---

## ⚙️ Running Locally

### 1. Clone & Install Dependencies
```bash
git clone <repository-url>
cd The-DailyLens
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 3. Production Build
```bash
npm run build
npm run preview
```

---

## 📁 Project Architecture

```
The-DailyLens/
├── public/
│   └── data.json              # Mock dataset (Articles, Categories, Impact Stats, Team)
├── src/
│   ├── components/
│   │   ├── admin/
│   │   │   ├── AdminSidebar.jsx      # Responsive admin sidebar & mobile drawer
│   │   │   ├── ImageUploadModal.jsx  # Image upload modal dialog
│   │   │   └── TipTapEditor.jsx      # TipTap rich text editor component
│   │   ├── common/
│   │   │   └── EmptyPage.jsx         # Reusable placeholder layout
│   │   └── layout/
│   │       ├── Header.jsx            # Desktop glassmorphism navbar with Dashboard button
│   │       ├── MobileNav.jsx         # Mobile top bar, drawer, and bottom navigation
│   │       └── Footer.jsx            # Dark footer with mission quote & links
│   ├── hooks/
│   │   ├── useDebounce.js        # Custom debouncing hook (300ms)
│   │   └── useFetch.js           # Data fetching hook
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── AdminOverview.jsx     # Overview metrics & recent news feed
│   │   │   ├── BlogNewsManagement.jsx# Article table, search, pagination & action dropdown
│   │   │   └── CreateContent.jsx     # Content form supporting create & edit modes
│   │   ├── Home.jsx              # 7-section home page
│   │   ├── AboutUs.jsx           # Filled-up About Us page
│   │   ├── News.jsx              # Figma-designed News & Articles page
│   │   ├── ArticleDetails.jsx    # Dynamic article details page (/news/:id)
│   │   ├── Donate.jsx            # Coming Soon placeholder page
│   │   ├── Events.jsx            # Events page
│   │   ├── Gallery.jsx           # Gallery page
│   │   ├── Partnership.jsx       # Partnership page
│   │   └── Dashboard.jsx         # Main dashboard layout container
│   ├── services/
│   │   └── articleService.js     # Article CRUD helper functions & localStorage sync
│   ├── App.jsx                   # React Router routes
│   ├── index.css                 # Tailwind CSS v4 & TipTap ProseMirror styles
│   └── main.jsx                  # React DOM entry point
├── package.json
└── README.md
```

---
