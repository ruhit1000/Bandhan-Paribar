import React from 'react';
import EmptyPage from '../components/common/EmptyPage';
import { Heart } from 'lucide-react';

export default function Donate() {
  return (
    <EmptyPage
      title="Online Donation Portal"
      subtitle="Coming Soon"
      message="Our secure automated donation gateway is currently undergoing scheduled maintenance and security upgrades. In the meantime, you can reach out directly via our contact channels to make contributions."
      icon={Heart}
    />
  );
}
