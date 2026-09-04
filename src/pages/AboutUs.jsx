import React from 'react';
import { useFetch } from '../hooks/useFetch';
import { Shield, Target, Compass, Heart, Users, Award, CheckCircle2 } from 'lucide-react';

export default function AboutUs() {
  const { data } = useFetch('/data.json');
  const about = data?.aboutData;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-20">
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-semibold text-[#0097E2] tracking-wider uppercase">
          About Bandhan Paribar
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0F2920]">
          In Service of Humanity & Faith
        </h1>
        <p className="text-base text-gray-600 leading-relaxed font-normal">
          Bandhan Paribar (As-Sunnah Foundation) is a non-political, non-profit government-registered organization dedicated to social welfare, education, environmental protection, and disaster management.
        </p>
      </div>

      {/* Mission & Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-sm space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0097E2] flex items-center justify-center">
            <Target className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            {about?.mission || 'To build an ideal, self-reliant, and compassionate welfare society by serving humanity without discrimination.'}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-sm space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-[#0F2920]/10 text-[#0F2920] flex items-center justify-center">
            <Compass className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            {about?.vision || 'A nation where every family has access to clean water, food, education, healthcare, and dignified livelihood opportunities.'}
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div className="space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-[#0F2920]">Our Core Values</h2>
          <p className="text-sm text-gray-600">The guiding principles behind all our operational initiatives.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {about?.coreValues.map((val, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0097E2] flex items-center justify-center font-bold text-sm">
                0{idx + 1}
              </div>
              <h3 className="font-bold text-gray-900 text-base">{val.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Leadership & Executive Team Grid */}
      <div className="space-y-12">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-semibold text-[#0097E2] tracking-wider uppercase">
            Leadership
          </span>
          <h2 className="text-3xl font-bold text-[#0F2920]">Our Executive Board</h2>
          <p className="text-sm text-gray-600">
            Guided by experienced scholars, humanitarian leaders, and community organizers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {about?.team.map((member, idx) => (
            <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all text-center p-8 space-y-4">
              <img
                src={member.image}
                alt={member.name}
                className="w-28 h-28 rounded-full object-cover mx-auto border-4 border-blue-50 shadow-md"
              />
              <div className="space-y-1">
                <h3 className="font-bold text-gray-900 text-lg">{member.name}</h3>
                <p className="text-xs font-semibold text-[#0097E2]">{member.role}</p>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
