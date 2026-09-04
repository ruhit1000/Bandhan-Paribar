import React from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import {
  Heart,
  ArrowRight,
  ShieldAlert,
  GraduationCap,
  Activity,
  Droplets,
  Briefcase,
  Award,
  Users,
  CheckCircle2,
  HeartHandshake,
  Utensils,
  Calendar,
  MapPin,
  Sparkles,
  Mail
} from 'lucide-react';

export default function Home() {
  const { data, loading } = useFetch('/data.json');

  const iconMap = {
    ShieldAlert: ShieldAlert,
    GraduationCap: GraduationCap,
    Activity: Activity,
    Droplets: Droplets,
    Briefcase: Briefcase,
    Award: Award,
    Users: Users,
    CheckCircle: CheckCircle2,
    HeartHandshake: HeartHandshake,
    Utensils: Utensils,
  };

  return (
    <div className="space-y-24 pb-12">
      {/* SECTION 1: Hero Banner & Primary CTA */}
      <section className="relative min-h-[75vh] flex items-center justify-center rounded-3xl overflow-hidden shadow-2xl mx-4 sm:mx-8 mt-4 bg-slate-900 text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1600&auto=format&fit=crop"
            alt="Humanitarian Relief Hero"
            className="w-full h-full object-cover opacity-35 scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F2920] via-black/50 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 py-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-wider uppercase text-blue-200 shadow-inner">
            <Sparkles className="w-4 h-4 text-[#0097E2]" />
            <span>Serving Humanity & Social Welfare</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
            Building a Compassionate & <span className="text-[#0097E2]">Self-Reliant</span> Society
          </h1>

          <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed font-normal">
            Bandhan Paribar (As-Sunnah Foundation) is committed to emergency disaster relief, safe drinking water, education support, and socio-economic empowerment across Bangladesh.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/donate"
              className="px-8 py-3.5 bg-[#0097E2] hover:bg-[#0081C4] text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-2"
            >
              <Heart className="w-5 h-5 fill-current" />
              <span>Donate Now</span>
            </Link>

            <Link
              to="/news"
              className="px-8 py-3.5 bg-white/15 hover:bg-white/25 text-white font-semibold rounded-2xl backdrop-blur-md border border-white/20 shadow-lg hover:scale-105 transition-all flex items-center gap-2"
            >
              <span>Explore News & Articles</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2: Key Impact Metrics / Counters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {data?.impactStats.map((stat) => {
            const IconComponent = iconMap[stat.icon] || Heart;
            return (
              <div
                key={stat.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all text-center space-y-3 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0097E2] flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-[#0F2920] tracking-tight">
                  {stat.value}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-gray-600">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 3: Core Focus Areas */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-semibold text-[#0097E2] tracking-wider uppercase">
            Our Core Pillars
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F2920]">
            Key Areas of Social Impact
          </h2>
          <p className="text-sm text-gray-600">
            Addressing immediate humanitarian crises while building long-term sustainable solutions for rural communities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.coreFocusAreas.map((area) => {
            const IconComponent = iconMap[area.icon] || ShieldAlert;
            return (
              <div
                key={area.id}
                className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all space-y-4 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#0097E2]/10 text-[#0097E2] flex items-center justify-center">
                  <IconComponent className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{area.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{area.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 4: Featured News & Articles Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-[#0097E2] tracking-wider uppercase">
              Latest Updates
            </span>
            <h2 className="text-3xl font-bold text-[#0F2920]">Featured News & Articles</h2>
          </div>
          <Link
            to="/news"
            className="text-sm font-semibold text-[#0097E2] hover:text-[#0081C4] flex items-center gap-1.5"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-80 bg-gray-200 animate-pulse rounded-3xl"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data?.articles.slice(0, 3).map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all flex flex-col group"
              >
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-[#0097E2] shadow-sm">
                    {article.categoryName}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-xs text-gray-400 font-medium">{article.date}</span>
                    <h3 className="font-bold text-gray-900 text-lg group-hover:text-[#0097E2] transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                  <Link
                    to="/news"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#0097E2] hover:underline"
                  >
                    <span>Read Full Story</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* SECTION 5: Recent Completed Programs Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-semibold text-[#0097E2] tracking-wider uppercase">
            Milestones Achieved
          </span>
          <h2 className="text-3xl font-bold text-[#0F2920]">Recent Programs Completed</h2>
          <p className="text-sm text-gray-600">
            Ground-level operational summaries of recent successful projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data?.recentPrograms.map((prog) => (
            <div
              key={prog.id}
              className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all space-y-4"
            >
              <img
                src={prog.image}
                alt={prog.title}
                className="w-full h-44 object-cover rounded-2xl"
              />
              <div className="space-y-2">
                <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full uppercase">
                  {prog.status}
                </span>
                <h3 className="font-bold text-gray-900 text-lg">{prog.title}</h3>
                <div className="space-y-1.5 text-xs text-gray-500 pt-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#0097E2]" />
                    <span>{prog.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#0097E2]" />
                    <span>{prog.beneficiaries}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: Beneficiary Stories & Testimonials */}
      <section className="bg-[#0F2920] text-white py-20 rounded-3xl mx-4 sm:mx-8 px-6 sm:px-12 space-y-12 shadow-2xl">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-semibold text-[#0097E2] tracking-wider uppercase">
            Voices of Hope
          </span>
          <h2 className="text-3xl font-bold">Community Testimonials</h2>
          <p className="text-sm text-gray-300">
            Real impact stories from individuals and families supported by Bandhan Paribar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data?.testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/15 space-y-6 flex flex-col justify-between"
            >
              <p className="text-sm italic text-gray-200 leading-relaxed">
                "{item.quote}"
              </p>
              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#0097E2]"
                />
                <div>
                  <h4 className="font-bold text-white text-sm">{item.name}</h4>
                  <p className="text-xs text-gray-400">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 7: Call to Action & Newsletter */}
      <section className="max-w-5xl mx-auto px-4 sm:px-8">
        <div className="bg-gradient-to-r from-[#0097E2] to-[#1E3A5F] rounded-3xl p-8 sm:p-14 text-white text-center space-y-6 shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto">
            <Mail className="w-7 h-7 text-white" />
          </div>

          <div className="space-y-2 max-w-xl mx-auto">
            <h2 className="text-3xl font-bold">Stay Updated with Our Impact</h2>
            <p className="text-sm text-blue-100">
              Subscribe to our monthly newsletter to receive genuine project reports and emergency aid calls.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Thank you for subscribing to Bandhan Paribar newsletter!');
            }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="w-full px-5 py-3.5 text-sm bg-white/10 backdrop-blur-md text-white placeholder-blue-200 border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 bg-white text-[#0097E2] font-bold text-sm rounded-2xl hover:bg-blue-50 transition-all shadow-lg shrink-0"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
