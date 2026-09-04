import React from 'react';
import EmptyPage from '../components/common/EmptyPage';
import { Calendar } from 'lucide-react';

export default function Events() {
  return (
    <EmptyPage
      title="Upcoming Welfare Events"
      subtitle="Event Calendar"
      message="We are currently organizing our next quarter's schedule for health camps, youth leadership workshops, and clean water inaugurations. Event schedules will be published shortly."
      icon={Calendar}
    />
  );
}
