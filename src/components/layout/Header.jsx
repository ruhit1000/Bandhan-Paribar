import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Heart, ChevronDown, User, LayoutDashboard, LogOut, Shield } from 'lucide-react';

export default function Header() {
  const { user, isAuthenticated, signOut } = useAuth();
  const [lang, setLang] = useState('EN');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Donate', path: '/donate' },
    { name: 'Events', path: '/events' },
    { name: 'About Us', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'News & Articles', path: '/news' },
    { name: 'Partnership', path: '/partnership' },
  ];

  return (
    <header className="sticky top-4 z-50 w-full px-4 sm:px-8 max-w-7xl mx-auto transition-all duration-300">
      <div className="glass-nav rounded-full px-4 sm:px-8 py-3 flex items-center justify-between shadow-lg">
        {/* Brand Logo & Name */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0097E2] to-[#0F2920] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base sm:text-lg tracking-tight text-[#0F2920]">
              Bandhan Paribar
            </span>
            <span className="text-[10px] text-gray-500 font-medium tracking-wide uppercase">
              As-Sunnah Foundation
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `transition-colors duration-200 py-1 relative hover:text-[#0097E2] ${
                  isActive
                    ? 'text-[#0097E2] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#0097E2] after:rounded-full'
                    : 'text-gray-700'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Language Switcher & Auth Section */}
        <div className="flex items-center gap-3">
          {/* Language Switcher Pill */}
          <div className="bg-[#EEF0F4] border border-[#DDDDEE] rounded-lg p-0.5 flex items-center shadow-inner">
            <button
              onClick={() => setLang('EN')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                lang === 'EN'
                  ? 'bg-[#0097E2] text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('BN')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                lang === 'BN'
                  ? 'bg-[#0097E2] text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              BN
            </button>
          </div>

          {/* Conditional Auth Rendering */}
          {isAuthenticated ? (
            /* User Profile Dropdown Icon when Signed In */
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 bg-white/90 border border-gray-200 hover:border-[#0097E2] rounded-full p-1.5 pr-3 shadow-sm hover:shadow transition-all text-left"
                aria-label="User Profile Menu"
              >
                <img
                  src={user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=user'}
                  alt={user?.name || 'User Avatar'}
                  className="w-8 h-8 rounded-full border border-gray-300 object-cover bg-gray-100"
                />
                <span className="hidden sm:inline text-xs font-semibold text-gray-800 max-w-[100px] truncate">
                  {user?.name || 'User'}
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900 truncate">{user?.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-[#0097E2] border border-blue-100">
                      <Shield className="w-3 h-3" />
                      <span>Role: {user?.role || 'user'}</span>
                    </div>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        navigate('/dashboard');
                      }}
                      className="w-full px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2.5 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-[#0097E2]" />
                      <span>Dashboard</span>
                    </button>
                  </div>

                  <div className="border-t border-gray-100 pt-1">
                    <button
                      onClick={() => {
                        signOut();
                        setDropdownOpen(false);
                        navigate('/');
                      }}
                      className="w-full px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 transition-colors"
                    >
                      <LogOut className="w-4 h-4 text-rose-500" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Unauthenticated state buttons */
            <div className="flex items-center gap-2">
              <Link
                to="/signin"
                className="hidden sm:inline-flex px-4 py-2 text-xs font-medium text-[#0F2920] hover:text-[#0097E2] border border-gray-300 hover:border-[#0097E2] rounded-xl transition-all shadow-sm"
              >
                Sign in
              </Link>
              <Link
                to="/donate"
                className="px-4 py-2 text-xs font-semibold text-white bg-[#0097E2] hover:bg-[#0081C4] rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-1.5"
              >
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>Donate</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
