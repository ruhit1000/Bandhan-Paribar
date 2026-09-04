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
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col justify-between bg-[#F4F5F7]">
          <div>
            <Header />
            <MobileNav />
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
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </main>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
