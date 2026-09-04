import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import EmptyPage from '../components/common/EmptyPage';
import AdminSidebar from '../components/admin/AdminSidebar';
import BlogNewsManagement from './admin/BlogNewsManagement';
import AdminOverview from './admin/AdminOverview';
import { LayoutDashboard, Users, Settings } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [activeTab, setActiveTab] = useState('dashboard');

  if (isAdmin) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row">
        {/* Admin Sidebar */}
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Admin Main Content Workspace */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          {activeTab === 'dashboard' && <AdminOverview onNavigateTab={setActiveTab} />}

          {activeTab === 'blog-news' && <BlogNewsManagement />}

          {activeTab === 'users' && (
            <div className="max-w-4xl mx-auto py-12">
              <EmptyPage
                title="User Management"
                subtitle="Role & Permissions Control"
                message="User Management features are under active development. Select 'Blog & News Management' from the sidebar to manage content."
                icon={Users}
                actionText="Go to Blog & News Management"
                onAction={() => setActiveTab('blog-news')}
              />
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="max-w-4xl mx-auto py-12">
              <EmptyPage
                title="Setting Management"
                subtitle="System & Platform Preferences"
                message="System settings and configuration controls are coming soon. Select 'Blog & News Management' from the sidebar to manage content."
                icon={Settings}
                actionText="Go to Blog & News Management"
                onAction={() => setActiveTab('blog-news')}
              />
            </div>
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <EmptyPage
          title="User Activity Dashboard"
          subtitle="User Dashboard Coming Soon"
          message="User Dashboard is coming soon. Stay tuned for personal activity logs, donation history, and profile customization settings."
          icon={LayoutDashboard}
          actionText="Back to Home"
          actionPath="/"
        />
      </div>
    </div>
  );
}
