import React from 'react';
import EmptyPage from '../components/common/EmptyPage';
import { Handshake } from 'lucide-react';

export default function Partnership() {
  return (
    <EmptyPage
      title="Corporate & NGO Partnerships"
      subtitle="Collaboration Portal"
      message="We welcome corporate CSR partnerships, international institutional grants, and local NGO alliances to scale our social impact. Please reach out to partnership@bandhanparibar.org for proposals."
      icon={Handshake}
    />
  );
}
