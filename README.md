# The DailyLens — Bandhan Paribar Social Welfare & Media Application

A responsive React web application based on the Figma design (`Task-Intern (Copy)`). Built for **Bandhan Paribar (As-Sunnah Foundation)**, featuring a public humanitarian portal, rich "About Us" page, interactive "News & Articles" platform with debounced search and category pagination, role-based authentication using **Better Auth** & **MongoDB Atlas**, and responsive desktop/mobile navigation.

---

## 🚀 Tech Stack

- **Frontend Core:** React 19 (JavaScript ES6+) + Vite
- **Styling & UI:** Tailwind CSS v4 + `@heroui/react` (Hero UI) + `framer-motion` + `lucide-react`
- **Routing:** `react-router-dom` v7
- **Database & Auth:** `better-auth` + native MongoDB client driver (`mongodb`) connected to **MongoDB Atlas**
- **Mock Data & API:** `public/data.json` + `useFetch` custom hook with simulated network latency, loading states, and error handling

---

## 🛠️ Key Features

1. **Floating Glassmorphic Header Navigation:**
   - Desktop floating pill navbar with backdrop blur and active page indicator.
   - Language switcher (`EN` / `BN`).
   - **Auth State Integration:** 
     - When unauthenticated: Displays *Sign in* button and *Donate* button.
     - When signed in: Automatically hides *Sign in* button and renders the user's profile avatar dropdown menu (displaying user name, email, role badge: `"user"`, *Dashboard* option, and *Sign Out*).

2. **Mobile Layout Experience:**
   - Slide-out side drawer menu + fixed bottom navigation bar (*Home*, *Donate*, *Events*, *Articles*, *About Us*).

3. **Home Page (7 Relatable Sections):**
   - **Hero Banner:** Full-width visual background with primary call to actions.
   - **Impact Metrics Counter:** Key statistics (50K+ Families, 120+ Projects, 3.5K Volunteers, 1.2M Relief Meals).
   - **Core Focus Areas:** Emergency disaster relief, education, healthcare, safe water, self-reliance, and Imam training.
   - **Featured News:** Live feed preview cards linking to full article stories.
   - **Recent Programs Completed:** Highlight cards of ground-level operational milestones.
   - **Community Testimonials:** Verified stories from flood relief recipients and leadership trainees.
   - **Newsletter Subscription:** Interactive newsletter signup call to action.

4. **Filled-Up "About Us" Page:**
   - Comprehensive organizational mission, vision statement, core values (transparency, human dignity, sustainability, inclusivity), and leadership board grid (*Shaykh Ahmadullah*, *Dr. Tariq Hossain*, *Nusrat Jahan*).

5. **Figma-Matched "News & Articles" Page:**
   - **Debounced Search:** Custom `useDebounce` hook (300ms delay) for real-time keyword filtering.
   - **Featured Top Story Card:** Prominently featured article banner at the top of the feed.
   - **Category Sidebar Filter:** Left highlight stroke indicator on active categories (*Blood Donation, Tree Plantation, Education, Disaster, Qurbani, Food Distribution, etc.*).
   - **Paginated Grid & Controls:** Numbered pagination controls (`1, 2, 3...`), previous/next arrows, and total result counts.
   - **State Handling:** Skeleton loader while fetching data, error alerts on network issues, and clear empty states.

6. **Empty Pages with Meaningful Messaging:**
   - Reusable `EmptyPage` placeholder component for *Donate*, *Events*, *Gallery*, and *Partnership* pages.

7. **Role-Based Authentication (Better Auth & MongoDB Atlas):**
   - Sign Up auto-assigns the default role `"user"`.
   - Sign In and Sign Up form validation, error messages, and loading spinners.
   - Database adapter configured for native MongoDB Atlas driver (`mongodb`).

---

## ⚙️ Installation & Setup Instructions

### 1. Prerequisites
- Node.js v18+ and npm installed on your system.

### 2. Clone and Install Dependencies
```bash
git clone <repository-url>
cd The-DailyLens
npm install
```

### 3. Environment Configuration (MongoDB Atlas)
Create a `.env.local` file in the root directory:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/dailylens?retryWrites=true&w=w-majority
```

### 4. Run Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 5. Build for Production
```bash
npm run build
npm run preview
```

---

## 📁 Project Architecture

```
The-DailyLens/
├── api/
│   └── auth.js             # Better Auth & MongoDB Atlas driver configuration
├── public/
│   └── data.json           # Mock dataset (Articles, Categories, Impact Stats, Team)
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   └── EmptyPage.jsx # Reusable placeholder layout
│   │   └── layout/
│   │       ├── Header.jsx    # Glassmorphism desktop navbar & profile dropdown
│   │       ├── MobileNav.jsx # Mobile top bar, drawer, and bottom navigation
│   │       └── Footer.jsx    # Dark footer with mission quote & link columns
│   ├── hooks/
│   │   ├── useAuth.jsx       # Auth context provider (role: "user", session)
│   │   ├── useDebounce.js    # Custom debouncing hook (300ms)
│   │   └── useFetch.js       # Data fetching hook (search, filter, pagination)
│   ├── pages/
│   │   ├── Home.jsx          # 7-section home page
│   │   ├── AboutUs.jsx       # Filled-up About Us page
│   │   ├── News.jsx          # Figma-designed News & Articles page
│   │   ├── Donate.jsx        # Empty page with message
│   │   ├── Events.jsx        # Empty page with message
│   │   ├── Gallery.jsx       # Empty page with message
│   │   ├── Partnership.jsx   # Empty page with message
│   │   ├── SignIn.jsx        # Sign In form
│   │   └── SignUp.jsx        # Sign Up form (default role: "user")
│   ├── App.jsx               # React Router routes & Auth provider wrapper
│   ├── index.css             # Tailwind CSS v4 & custom glassmorphism styles
│   └── main.jsx              # React DOM entry point
├── package.json
└── README.md
```

---

## 📄 License
This project is licensed under the MIT License.
