import React from 'react';
import { ShieldCheck, UserCheck, Ticket, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentView: 'portal' | 'admin' | 'scanner';
  onViewChange: (view: 'portal' | 'admin' | 'scanner') => void;
  pendingCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onViewChange, pendingCount }) => {
  return (
    <header className="sticky top-0 z-50 bg-[#070e18]/90 backdrop-blur-md border-b border-[#c89b3c]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark & Emblem */}
        <div 
          onClick={() => onViewChange('portal')} 
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="relative w-11 h-11 rounded-xl bg-[#0d2238] border border-[#c89b3c]/40 flex items-center justify-center p-1 overflow-hidden transition-transform group-hover:scale-105">
            <img 
              src="/assets/aistudio/image_54ce8a19.png" 
              alt="Computer Cell Society Logo" 
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col">
            <div className="text-lg font-bold tracking-tight text-white flex items-center gap-2 whitespace-nowrap">
              <span>Computer Cell Society</span>
              <span className="text-xs text-[#c89b3c] font-mono font-medium">UETP</span>
            </div>
            <span className="text-[11px] text-slate-400 tracking-wider uppercase font-medium">
              Welcome & Farewell Gala 2026
            </span>
          </div>
        </div>

        {/* Zone 2: Concise single-line navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          {currentView === 'portal' ? (
            <>
              <a href="#overview" className="hover:text-[#c89b3c] transition-colors whitespace-nowrap shrink-0">
                Event Overview
              </a>
              <a href="#fee" className="hover:text-[#c89b3c] transition-colors whitespace-nowrap shrink-0">
                Fee & Payment
              </a>
              <a href="#highlights" className="hover:text-[#c89b3c] transition-colors whitespace-nowrap shrink-0">
                Highlights
              </a>
              <a href="#register" className="hover:text-[#c89b3c] transition-colors whitespace-nowrap shrink-0">
                Registration
              </a>
              <a href="#track" className="hover:text-[#c89b3c] transition-colors whitespace-nowrap shrink-0">
                Verify Pass
              </a>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onViewChange('admin')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  currentView === 'admin'
                    ? 'bg-[#c89b3c] text-[#070e18]'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                Payment Approvals Desk {pendingCount > 0 && `(${pendingCount})`}
              </button>
              <button
                onClick={() => onViewChange('scanner')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  currentView === 'scanner'
                    ? 'bg-[#c89b3c] text-[#070e18]'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                Gate Pass Scanner
              </button>
            </div>
          )}
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          {currentView === 'portal' ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onViewChange('admin')}
                className="px-3.5 py-2 text-xs font-semibold text-[#f1d07c] bg-[#10243b] hover:bg-[#163150] border border-[#c89b3c]/40 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5"
                title="Open Organizer Verification & Approval Desk"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#c89b3c]" />
                <span className="hidden sm:inline">Verification Desk</span>
                {pendingCount > 0 && (
                  <span className="px-1.5 py-0.2 text-[10px] bg-[#c89b3c] text-[#070e18] font-bold rounded-full">
                    {pendingCount}
                  </span>
                )}
              </button>
              <a
                href="#register"
                className="px-4 py-2 text-xs font-bold text-[#070e18] bg-gradient-to-r from-[#d4af37] to-[#e6be58] hover:from-[#e6be58] hover:to-[#ffd700] rounded-lg shadow-md transition-all whitespace-nowrap flex items-center gap-1.5"
              >
                <Ticket className="w-3.5 h-3.5" />
                <span>Register (Rs. 2,200)</span>
              </a>
            </div>
          ) : (
            <button
              onClick={() => onViewChange('portal')}
              className="px-4 py-2 text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5"
            >
              <span>Exit Desk to Event Site</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
