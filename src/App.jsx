import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import Header from './components/layout/Header';
import MobileNav from './components/layout/MobileNav';
import Footer from './components/layout/Footer';

// Pages
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import News from './pages/News';
import Donate from './pages/Donate';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import Partnership from './pages/Partnership';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import EmptyPage from './components/common/EmptyPage';
import { LayoutDashboard } from 'lucide-react';

function DashboardPlaceholder() {
  return (
    <EmptyPage
      title="Admin & User Dashboard"
      subtitle="Coming Soon"
      message="The user dashboard analytics and content management panel will be built in the next phase. Your current role is recognized as User."
      icon={LayoutDashboard}
    />
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col justify-between bg-[#F4F5F7]">
          <div>
            <Header />
            <MobileNav />
            {/* Main content padding accounts for fixed mobile top bar (pt-16) and bottom nav (pb-24) */}
            <main className="pt-16 lg:pt-4 pb-24 lg:pb-0">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/news" element={<News />} />
                <Route path="/donate" element={<Donate />} />
                <Route path="/events" element={<Events />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/partnership" element={<Partnership />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/dashboard" element={<DashboardPlaceholder />} />
              </Routes>
            </main>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
