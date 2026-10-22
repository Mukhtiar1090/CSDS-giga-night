import React, { useState } from 'react';
import { Registration } from '../types';
import { Search, Ticket, CheckCircle2, Clock, XCircle, ArrowRight } from 'lucide-react';

interface FindPassSectionProps {
  registrations: Registration[];
  onOpenPass: (reg: Registration) => void;
}

export const FindPassSection: React.FC<FindPassSectionProps> = ({ registrations, onOpenPass }) => {
  const [query, setQuery] = useState('');
  const [searchedResult, setSearchedResult] = useState<Registration | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanQuery = query.trim().toUpperCase();
    if (!cleanQuery) return;

    const match = registrations.find(
      r => r.passCode.toUpperCase() === cleanQuery ||
           r.cnic.replace(/\D/g, '') === cleanQuery.replace(/\D/g, '') ||
           r.email.toLowerCase() === query.trim().toLowerCase()
    );

    setSearchedResult(match || null);
    setHasSearched(true);
  };

  return (
    <section id="track" className="py-20 bg-[#070e18] border-t border-slate-800 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-bold tracking-widest uppercase text-[#d4af37] mb-2">
            Attendee Self-Service
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Find Your E-Pass &amp; Check Verification
          </h2>
          <p className="mt-2 text-slate-300 text-sm">
            Already registered? Enter your CNIC, Email, or Unique Pass Code to view your digital ticket, check payment verification status, or download your entry QR code.
          </p>
        </div>

        {/* Search Input Box */}
        <div className="bg-[#0b1728] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative w-full">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter CNIC (17301-...), Email, or Code (CCS-WF-...)"
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[#060e18] border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-[#c89b3c]"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3.5 bg-gradient-to-r from-[#d4af37] to-[#e6be58] text-[#070e18] font-bold text-sm rounded-2xl hover:brightness-110 transition-all flex items-center justify-center gap-2 shrink-0 shadow"
            >
              <Ticket className="w-4 h-4" />
              <span>Track Pass</span>
            </button>
          </form>

          {/* Result Card */}
          {hasSearched && (
            <div className="mt-6 pt-6 border-t border-slate-800">
              {searchedResult ? (
                <div className="p-5 rounded-2xl bg-[#0d2238] border border-[#c89b3c]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{searchedResult.name}</span>
                      <span className="text-xs text-slate-400">({searchedResult.section})</span>
                    </div>
                    <div className="text-xs text-slate-300 mt-1">
                      Pass Code: <code className="text-[#ffd875] font-mono font-bold">{searchedResult.passCode}</code>
                    </div>
                    <div className="mt-2">
                      {searchedResult.status === 'approved' && (
                        <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                          <CheckCircle2 className="w-4 h-4" />
                          Payment Approved (Rs. 2,200) · E-Pass Active
                        </span>
                      )}
                      {searchedResult.status === 'pending' && (
                        <span className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-semibold">
                          <Clock className="w-4 h-4" />
                          Payment Verification in Progress
                        </span>
                      )}
                      {searchedResult.status === 'rejected' && (
                        <span className="inline-flex items-center gap-1.5 text-xs text-red-400 font-semibold">
                          <XCircle className="w-4 h-4" />
                          Payment Rejected: {searchedResult.rejectionReason || 'Please resubmit'}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenPass(searchedResult)}
                    className="w-full sm:w-auto px-5 py-2.5 bg-[#06111e] hover:bg-[#122842] border border-[#c89b3c]/50 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <span>Open E-Pass Ticket</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#d4af37]" />
                  </button>
                </div>
              ) : (
                <div className="text-center py-6 text-xs text-slate-400">
                  No registration found for &quot;{query}&quot;. Please verify your CNIC or submit a new registration.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
