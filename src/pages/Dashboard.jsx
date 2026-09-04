import React from 'react';
import { useAuth } from '../hooks/useAuth';
import EmptyPage from '../components/common/EmptyPage';
import { LayoutDashboard, ShieldCheck } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  if (isAdmin) {
    return (
      <EmptyPage
        title="Admin Control Dashboard"
        subtitle="Admin Access Granted"
        message="The Admin Dashboard is currently under construction. You have logged in with full administrative privileges (admin@bandhan.com)."
        icon={ShieldCheck}
        actionText="Back to Home"
        actionPath="/"
      />
    );
  }

  return (
    <EmptyPage
      title="User Activity Dashboard"
      subtitle="User Access Granted"
      message="The User Dashboard is coming soon. Stay tuned for personal activity logs, donation history, and profile customization settings."
      icon={LayoutDashboard}
      actionText="Back to Home"
      actionPath="/"
    />
  );
}
