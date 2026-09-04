import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Heart, ShieldAlert, Calendar, Newspaper, Menu, X, User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function MobileNav() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user, isAuthenticated, signOut } = useAuth();

  const mobileNavItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Donate', path: '/donate', icon: Heart },
    { name: 'Events', path: '/events', icon: Calendar },
    { name: 'Articles', path: '/news', icon: Newspaper },
    { name: 'About Us', path: '/about', icon: ShieldAlert },
  ];

  return (
    <>
      {/* Mobile Top Header (Visible on small screens) */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-[#0F2920]/95 text-white px-4 py-3 flex items-center justify-between shadow-md backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#0097E2] flex items-center justify-center font-bold text-xs">
            BP
          </div>
          <span className="font-bold text-sm">Bandhan Paribar</span>
        </div>
        <button
          onClick={() => setDrawerOpen(!drawerOpen)}
          className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          aria-label="Toggle menu"
        >
          {drawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Slide-out Mobile Drawer */}
      {drawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col justify-end animate-in fade-in duration-200">
          <div className="bg-white rounded-t-3xl p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-3">
                {isAuthenticated ? (
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-10 h-10 rounded-full border border-[#0097E2]"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-[#0097E2] flex items-center justify-center">
                    <User className="w-5 h-5" />
                  </div>
                )}
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">
                    {isAuthenticated ? user?.name : 'Welcome Guest'}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {isAuthenticated ? user?.email : 'Sign in to access features'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="grid grid-cols-2 gap-3">
              <NavLink
                to="/"
                onClick={() => setDrawerOpen(false)}
                className="p-3 bg-gray-50 rounded-xl text-xs font-semibold text-gray-800 hover:bg-blue-50 hover:text-[#0097E2]"
              >
                Home
              </NavLink>
              <NavLink
                to="/news"
                onClick={() => setDrawerOpen(false)}
                className="p-3 bg-gray-50 rounded-xl text-xs font-semibold text-gray-800 hover:bg-blue-50 hover:text-[#0097E2]"
              >
                News & Articles
              </NavLink>
              <NavLink
                to="/about"
                onClick={() => setDrawerOpen(false)}
                className="p-3 bg-gray-50 rounded-xl text-xs font-semibold text-gray-800 hover:bg-blue-50 hover:text-[#0097E2]"
              >
                About Us
              </NavLink>
              <NavLink
                to="/donate"
                onClick={() => setDrawerOpen(false)}
                className="p-3 bg-gray-50 rounded-xl text-xs font-semibold text-gray-800 hover:bg-blue-50 hover:text-[#0097E2]"
              >
                Donate
              </NavLink>
              <NavLink
                to="/events"
                onClick={() => setDrawerOpen(false)}
                className="p-3 bg-gray-50 rounded-xl text-xs font-semibold text-gray-800 hover:bg-blue-50 hover:text-[#0097E2]"
              >
                Events
              </NavLink>
              <NavLink
                to="/gallery"
                onClick={() => setDrawerOpen(false)}
                className="p-3 bg-gray-50 rounded-xl text-xs font-semibold text-gray-800 hover:bg-blue-50 hover:text-[#0097E2]"
              >
                Gallery
              </NavLink>
            </nav>

            <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
              {isAuthenticated ? (
                <>
                  <NavLink
                    to="/dashboard"
                    onClick={() => setDrawerOpen(false)}
                    className="w-full text-center py-2.5 bg-[#0097E2] text-white rounded-xl text-xs font-semibold shadow-md"
                  >
                    Go to Dashboard
                  </NavLink>
                  <button
                    onClick={() => {
                      signOut();
                      setDrawerOpen(false);
                    }}
                    className="w-full text-center py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <NavLink
                    to="/signin"
                    onClick={() => setDrawerOpen(false)}
                    className="text-center py-2.5 border border-gray-300 rounded-xl text-xs font-semibold text-gray-800"
                  >
                    Sign In
                  </NavLink>
                  <NavLink
                    to="/signup"
                    onClick={() => setDrawerOpen(false)}
                    className="text-center py-2.5 bg-[#0097E2] text-white rounded-xl text-xs font-semibold"
                  >
                    Sign Up
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Fixed Mobile Bottom Navigation Bar (Figma Mobile UI Spec) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 px-2 py-2 flex items-center justify-around shadow-2xl">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all ${
                  isActive
                    ? 'text-[#0097E2] font-semibold bg-blue-50/80 scale-105'
                    : 'text-gray-500 hover:text-gray-800'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.name}</span>
            </NavLink>
          );
        })}
      </div>
    </>
  );
}
