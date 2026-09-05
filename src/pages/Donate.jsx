import React from 'react';
import EmptyPage from '../components/common/EmptyPage';
import { Heart } from 'lucide-react';

export default function Donate() {
  return (
    <div className="py-12">
      <EmptyPage
        title="Online Donation Portal"
        subtitle="Coming Soon"
        message="Our automated online donation portal is currently under development. Stay tuned for seamless contribution options."
        icon={Heart}
        actionText="Back to Home"
        actionPath="/"
      />
    </div>
  );
}
