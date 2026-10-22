import React from 'react';
import { Music, Utensils, Award, Sparkles, Smile, Camera, Disc3, HeartHandshake } from 'lucide-react';

export const HighlightsSection: React.FC = () => {
  const highlights = [
    {
      title: 'Live Concert & Rock Band Night',
      category: 'Music & Entertainment',
      description: 'An electrifying live musical concert featuring guest vocalists and UET’s finest campus bands performing acoustic anthems, rock covers, and traditional qawwali fusion.',
      image: '/src/assets/images/event_live_concert_1792694962748.jpg',
      icon: Music,
      time: '08:00 PM – 10:30 PM',
      highlightBadge: 'Headliner Event'
    },
    {
      title: 'Lavish Banquet & BBQ Buffet',
      category: 'Gourmet Dining',
      description: 'An opulent multi-course dinner spread with charcoal grilled seekh kababs, chicken boti, aromatic mutton biryani, creamy karahi, fresh naans, gulab jamun, and traditional kheer.',
      image: '/src/assets/images/event_gala_banquet_1792694963755.jpg',
      icon: Utensils,
      time: '07:00 PM – 08:30 PM',
      highlightBadge: 'Full Dinner Included'
    },
    {
      title: 'Graduation Shields & Title Awards',
      category: 'Farewell Honor',
      description: 'Honoring our departing seniors with customized graduation shields, funny titles, department superlatives, and heartfelt tribute speeches celebrating 4 years of resilience.',
      image: '/src/assets/images/event_farewell_awards_1792694963875.jpg',
      icon: Award,
      time: '06:00 PM – 07:15 PM',
      highlightBadge: 'Senior Batch Honor'
    }
  ];

  const additionalActivities = [
    {
      title: 'Theatrical Skits & Standup Comedy',
      description: 'Hilarious campus life sketches poking good fun at assignments, semester projects, viva sessions, and university life.',
      icon: Smile,
      badge: 'Comedy & Drama'
    },
    {
      title: '360° Glam Cam & Red Carpet Wall',
      description: 'Professional photographers and a rotating slow-mo 360-degree video platform to capture you and your batchmates in formal attire.',
      icon: Camera,
      badge: 'Photo Memories'
    },
    {
      title: 'Senior-Junior Interactive Mentorship',
      description: 'Formal welcome interaction connecting incoming freshers with seasoned seniors for guidance, career paths, and society networks.',
      icon: HeartHandshake,
      badge: 'Society Bonding'
    },
    {
      title: 'DJ Party & Light Rhythm Ceremony',
      description: 'Energetic beats, glow bracelets, and synchronized stage lighting to wrap up the evening with high spirit and celebration.',
      icon: Disc3,
      badge: 'Late Night Finale'
    }
  ];

  return (
    <section id="highlights" className="py-24 bg-[#070e18] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-bold tracking-widest uppercase text-[#d4af37] mb-2">
            Experience The Extravaganza
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Event Highlights &amp; Activities
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base">
            From the grand banquet dinner to soul-stirring live melodies, explore what makes the Computer Cell Society Gala the most anticipated event of the academic year.
          </p>
        </div>

        {/* 3 Main Highlight Cards with Generated Photography */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group bg-[#0c1a2c] border border-slate-800 hover:border-[#c89b3c]/50 rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-lg"
              >
                <div>
                  {/* Image Container with Fallback */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        // Fallback container if image cannot be rendered
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c1a2c] via-black/30 to-transparent" />
                    
                    <div className="absolute top-4 left-4">
                      <span className="px-2.5 py-1 text-[11px] font-bold text-[#070e18] bg-[#ffd875] rounded-md uppercase tracking-wider shadow">
                        {item.highlightBadge}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-200">
                      <span className="font-mono text-[#d4af37] font-semibold">{item.time}</span>
                      <span className="text-slate-300 font-medium">{item.category}</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2 text-[#d4af37]">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="text-xs font-semibold uppercase tracking-wider">
                        Featured Activity
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#ffd875] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span>Included with Rs. 2,200 Pass</span>
                  <span className="font-semibold text-slate-200">&#10003; Full Access</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Secondary Activity Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {additionalActivities.map((act) => {
            const Icon = act.icon;
            return (
              <div
                key={act.title}
                className="bg-[#0b1728] border border-slate-800/80 rounded-2xl p-5 hover:border-[#c89b3c]/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-[#11263d] border border-[#c89b3c]/30 flex items-center justify-center text-[#d4af37] mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold text-[#d4af37] uppercase tracking-wider block mb-1">
                    {act.badge}
                  </span>
                  <h4 className="text-sm font-bold text-white mb-2">
                    {act.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {act.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-500 font-mono">
                  All Batches Welcome
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
