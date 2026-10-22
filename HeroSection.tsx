import React from 'react';
import { Calendar, MapPin, Users, Ticket, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onRegisterClick: () => void;
  onTrackClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onRegisterClick, onTrackClick }) => {
  return (
    <section id="overview" className="relative pt-12 pb-20 overflow-hidden">
      {/* Subtle circuit and glow atmospheric background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#c89b3c]/10 rounded-full blur-[140px]" />
        <div className="absolute top-10 right-10 w-[400px] h-[400px] bg-[#102d4f]/40 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Event Introduction */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            {/* Society & Department Kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#d4af37]">
              <span>U.E.T. Peshawar</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Computer Cell Society</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400">Department of Computer Systems</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] text-balance">
              Annual Welcome &amp;{' '}
              <span className="bg-gradient-to-r from-[#ffd875] via-[#d4af37] to-[#b38622] bg-clip-text text-transparent">
                Farewell Gala
              </span>{' '}
              2026
            </h1>

            {/* Subtitle / Value Proposition */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Join the official celebration welcoming our incoming fresh talent and bidding an unforgettable farewell to our graduating batch. An evening of live music concerts, prestigious awards, lavish dining, and cherished memories.
            </p>

            {/* Key Event Badges / Information strip */}
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300 pt-2 border-y border-slate-800/80 py-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#d4af37]" />
                <span className="font-semibold text-white">12 Nov 2026</span>
                <span className="text-slate-400">(05:30 PM Onwards)</span>
              </div>
              <span aria-hidden="true" className="text-slate-700 hidden sm:inline">|</span>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#d4af37]" />
                <span className="font-semibold text-white">UET Civil Lawn</span>
                <span className="text-slate-400">Peshawar</span>
              </div>
              <span aria-hidden="true" className="text-slate-700 hidden sm:inline">|</span>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#d4af37]" />
                <span className="text-slate-300">Open to CS, SE, DS &amp; AI Batches</span>
              </div>
            </div>

            {/* CTAs & Fee Callout */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onRegisterClick}
                className="px-6 py-3.5 text-sm font-bold text-[#070e18] bg-gradient-to-r from-[#d4af37] via-[#e6be58] to-[#f4d178] hover:from-[#e6be58] hover:to-[#ffe082] rounded-xl shadow-lg shadow-[#c89b3c]/20 hover:shadow-[#c89b3c]/30 transition-all flex items-center justify-center gap-2 group whitespace-nowrap"
              >
                <Ticket className="w-4 h-4 text-[#070e18]" />
                <span>Register Now — Rs. 2,200</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onTrackClick}
                className="px-5 py-3.5 text-sm font-semibold text-slate-200 bg-[#0d2238] hover:bg-[#13304d] border border-[#c89b3c]/30 rounded-xl transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                <span>Check Pass Verification</span>
              </button>
            </div>

            {/* Trust points */}
            <div className="flex items-center gap-6 text-xs text-slate-400 pt-1">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37]" />
                Automated QR Code Pass
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37]" />
                Manual Payment Screening
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37]" />
                Official Email Confirmation
              </span>
            </div>
          </div>

          {/* Right Column: Featured Visual Ticket Card with CCS Logo & Live Pass Preview */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md bg-gradient-to-b from-[#0d2238] to-[#071322] border-2 border-[#c89b3c]/40 rounded-3xl p-6 sm:p-7 shadow-2xl shadow-black/80">
              {/* Gold circuit accent lines */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#c89b3c]/20 via-transparent to-transparent rounded-tr-3xl pointer-events-none" />

              {/* Card Header with Logo */}
              <div className="flex items-center justify-between pb-5 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/5 p-1 border border-[#c89b3c]/40 flex items-center justify-center">
                    <img 
                      src="/assets/aistudio/image_54ce8a19.png" 
                      alt="CCS Logo" 
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white tracking-wide">
                      COMPUTER CELL SOCIETY
                    </h2>
                    <p className="text-[11px] text-[#d4af37] font-medium">
                      Official Event Admission
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">Single Entry</span>
                  <span className="text-xs font-mono font-bold text-[#d4af37]">PASS #CCS-2026</span>
                </div>
              </div>

              {/* Price Highlight Banner */}
              <div className="my-5 p-4 rounded-2xl bg-gradient-to-r from-[#112a45] to-[#0d2137] border border-[#c89b3c]/30 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">Official Registration Fee</span>
                  <span className="text-2xl font-black text-white tracking-tight">
                    Rs. 2,200
                  </span>
                  <span className="text-[11px] text-slate-300 ml-1">/ person</span>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2.5 py-1 text-[11px] font-bold text-[#070e18] bg-[#d4af37] rounded-md uppercase tracking-wider">
                    All Inclusive
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-1">Dinner + Concert + Gift</span>
                </div>
              </div>

              {/* Ticket Perks List */}
              <div className="space-y-2.5 text-xs text-slate-300 pb-5 border-b border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Live Concert Access:</span>
                  <span className="font-semibold text-white">Full Stage VIP Pass</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Banquet &amp; BBQ:</span>
                  <span className="font-semibold text-white">Lavish Buffet Dinner</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Graduation &amp; Welcome Shield:</span>
                  <span className="font-semibold text-white">Personalized Souvenir</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Entry Verification:</span>
                  <span className="font-semibold text-[#d4af37]">Unique QR Security Code</span>
                </div>
              </div>

              {/* Ticket Bottom Security Stamp */}
              <div className="pt-4 flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2 text-slate-400 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>REGISTRATION OPEN</span>
                </div>
                <button
                  onClick={onRegisterClick}
                  className="text-xs font-bold text-[#d4af37] hover:text-[#ffd875] underline underline-offset-4"
                >
                  Apply with Screenshot &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
