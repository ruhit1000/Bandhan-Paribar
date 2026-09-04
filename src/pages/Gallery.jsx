import React from 'react';
import EmptyPage from '../components/common/EmptyPage';
import { Image } from 'lucide-react';

export default function Gallery() {
  return (
    <EmptyPage
      title="Photo & Media Gallery"
      subtitle="Media Archives"
      message="High-resolution photo albums and field documentary videos of our recent flood relief and winter clothing distribution projects are currently being curated."
      icon={Image}
    />
  );
}
