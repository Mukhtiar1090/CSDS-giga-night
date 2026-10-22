import React from 'react';
import { Mail, Phone, MapPin, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050b14] border-t border-slate-800/80 text-slate-400 text-xs py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          {/* Col 1: Brand & Bio */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0c1c2e] border border-[#c89b3c]/40 p-1 flex items-center justify-center">
                <img 
                  src="/assets/aistudio/image_54ce8a19.png" 
                  alt="CCS Logo" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="text-sm font-bold text-white tracking-wide block">
                  Computer Cell Society
                </span>
                <span className="text-[11px] text-[#d4af37] font-semibold">
                  U.E.T. Peshawar
                </span>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs max-w-sm">
              The premier student technical and cultural society of the Department of Computer Systems Engineering, University of Engineering &amp; Technology, Peshawar.
            </p>
            <div className="text-[11px] text-slate-500">
              Welcome &amp; Farewell Gala 2026 · 12 Nov @ UET Civil Lawn
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Event Portal
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#overview" className="hover:text-[#d4af37] transition-colors">
                  Event Overview (12 Nov)
                </a>
              </li>
              <li>
                <a href="#fee" className="hover:text-[#d4af37] transition-colors">
                  Registration Fee (Rs. 2,200)
                </a>
              </li>
              <li>
                <a href="#highlights" className="hover:text-[#d4af37] transition-colors">
                  Concert &amp; Dinner Highlights
                </a>
              </li>
              <li>
                <a href="#register" className="hover:text-[#d4af37] transition-colors">
                  Direct Registration Form
                </a>
              </li>
              <li>
                <a href="#track" className="hover:text-[#d4af37] transition-colors">
                  Find &amp; Verify My E-Pass
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Helplines */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Student Registration Support
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <span>UET Civil Lawn, Main Campus, Jamrud Road, Peshawar</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span className="font-mono">mukhtiarms@gmail.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>0333 9729600 (Abdul Mohaimen · SadaPay Helpline)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            &copy; 2026 Computer Cell Society (CCS), UET Peshawar. All rights reserved.
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
