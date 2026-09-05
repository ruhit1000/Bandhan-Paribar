import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Heart, LayoutDashboard } from 'lucide-react';

export default function Header() {
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
    <header className="hidden lg:block sticky top-4 z-50 w-full px-8 max-w-7xl mx-auto transition-all duration-300">
      <div className="glass-nav rounded-full px-8 py-3 flex items-center justify-between shadow-lg">
        {/* Brand Logo & Title */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0097E2] to-[#0F2920] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight text-[#0F2920]">
              Bandhan Paribar
            </span>
            <span className="text-[10px] text-gray-500 font-medium tracking-wide uppercase">
              As-Sunnah Foundation
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="flex items-center gap-6 text-sm font-medium">
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

        {/* Right Section: Dashboard Button & Donate Button */}
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className="px-4 py-2 text-xs font-semibold text-gray-700 hover:text-[#0097E2] bg-[#EEF0F4] hover:bg-blue-50 border border-[#DDDDEE] rounded-xl transition-all shadow-xs flex items-center gap-1.5"
          >
            <LayoutDashboard className="w-4 h-4 text-[#0097E2]" />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/donate"
            className="px-4 py-2 text-xs font-semibold text-white bg-[#0097E2] hover:bg-[#0081C4] rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-1.5"
          >
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Donate</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
