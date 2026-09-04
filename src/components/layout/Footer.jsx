import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white pt-16 pb-12 mt-20 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-800">
          {/* Column 1 & 2: Mission Quote & Logo */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0097E2] flex items-center justify-center text-white shadow-md">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight text-white">
                  Bandhan Paribar
                </span>
                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                  As-Sunnah Foundation
                </span>
              </div>
            </Link>

            <p className="text-sm text-gray-300 leading-relaxed font-normal pr-4">
              "This institution is striving to build an ideal welfare society by following the footsteps of the Prophet of Humanity, the Messenger of Human Freedom and Peace, the ideal of human service, the Prophet Muhammad (PBUH), in the service of humanity."
            </p>

            <div className="flex items-center gap-4 text-xs text-gray-400">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#0097E2]" />
                <span>Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-[#0097E2]" />
                <span>contact@bandhanparibar.org</span>
              </div>
            </div>
          </div>

          {/* Column 3: Company Navigation */}
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-white tracking-wide">Company</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <Link to="/" className="hover:text-[#0097E2] transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#0097E2] transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-[#0097E2] transition-colors">Our Work & Events</Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-[#0097E2] transition-colors">Gallery</Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-[#0097E2] transition-colors">News & Articles</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Donate Services */}
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-white tracking-wide">Donate</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <Link to="/donate" className="hover:text-[#0097E2] transition-colors">General Donation</Link>
              </li>
              <li>
                <Link to="/donate" className="hover:text-[#0097E2] transition-colors">Blood Donation</Link>
              </li>
              <li>
                <Link to="/donate" className="hover:text-[#0097E2] transition-colors">Emergency Blood Request</Link>
              </li>
              <li>
                <Link to="/donate" className="hover:text-[#0097E2] transition-colors">Qurbani Support</Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Others */}
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-white tracking-wide">Others</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <Link to="/partnership" className="hover:text-[#0097E2] transition-colors">Partnership</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#0097E2] transition-colors">Contact Us</Link>
              </li>
              <li>
                <span className="cursor-pointer hover:text-[#0097E2] transition-colors">Terms & Conditions</span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-[#0097E2] transition-colors">Privacy Policy</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 text-center text-xs text-gray-400">
          <p>© 2026 Bandhan Paribar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
