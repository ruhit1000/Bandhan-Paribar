import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Newspaper,
  Settings,
  LogOut,
  Heart,
  UserCheck,
  Menu,
  X
} from 'lucide-react';

export default function AdminSidebar({ activeTab, setActiveTab }) {
  const navigate = useNavigate();
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  const sidebarLinks = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'blog-news', label: 'Blog & News Management', icon: Newspaper },
    { id: 'settings', label: 'Setting Management', icon: Settings },
  ];

  const handleTabSelect = (tabId) => {
    setActiveTab(tabId);
    setIsOpenMobile(false);
  };

  return (
    <>
      {/* Mobile Top Header Bar with Hamburger Button */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#0097E2] flex items-center justify-center text-white font-bold">
            <Heart className="w-4 h-4 fill-current" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm text-[#0F2920]">Bandhan Paribar</span>
            <span className="text-[9px] text-gray-400 font-semibold tracking-wider uppercase">
              Admin Panel
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsOpenMobile(!isOpenMobile)}
          aria-label="Toggle Navigation Menu"
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
        >
          {isOpenMobile ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Backdrop Overlay */}
      {isOpenMobile && (
        <div
          onClick={() => setIsOpenMobile(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 md:hidden animate-in fade-in duration-200"
        />
      )}

      {/* Sidebar Panel Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-72 bg-white border-r border-gray-200 flex flex-col justify-between p-4 shadow-xl transition-transform duration-300 ease-in-out md:static md:translate-x-0 md:w-64 md:shadow-none md:z-auto ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="space-y-6">
          {/* Organization Brand Logo Header */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#0097E2] flex items-center justify-center text-white font-bold">
                <Heart className="w-4 h-4 fill-current" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm text-[#0F2920]">Bandhan Paribar</span>
                <span className="text-[9px] text-gray-400 font-semibold tracking-wider uppercase">
                  Admin Panel
                </span>
              </div>
            </div>
            {/* Close button on mobile inside drawer header */}
            <button
              onClick={() => setIsOpenMobile(false)}
              className="md:hidden p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <nav className="space-y-1">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleTabSelect(link.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                    isActive
                      ? 'bg-[#0097E2] text-white shadow-xs'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                  <span className="truncate">{link.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Admin Profile & Log Out */}
        <div className="space-y-3 pt-4 border-t border-gray-100">
          <div className="p-3 bg-gray-50 rounded-2xl flex items-center gap-3 border border-gray-100">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-[#0097E2] flex items-center justify-center font-bold text-xs shrink-0">
              <UserCheck className="w-4 h-4" />
            </div>
            <div className="max-w-[130px] truncate">
              <p className="text-xs font-bold text-gray-900 truncate">
                Super Admin
              </p>
              <p className="text-[10px] text-gray-400 truncate">
                admin@bandhan.com
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              navigate('/');
            }}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
          >
            <LogOut className="w-4 h-4 text-rose-500" />
            <span>Exit Admin</span>
          </button>
        </div>
      </aside>
    </>
  );
}
