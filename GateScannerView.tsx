import React, { useState } from 'react';
import { Registration } from '../types';
import { 
  Scan, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  UserCheck, 
  Search, 
  ShieldCheck, 
  Ticket,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface GateScannerViewProps {
  registrations: Registration[];
  onCheckIn: (id: string) => void;
  onViewPass: (reg: Registration) => void;
}

export const GateScannerView: React.FC<GateScannerViewProps> = ({
  registrations,
  onCheckIn,
  onViewPass
}) => {
  const [codeInput, setCodeInput] = useState('');
  const [scannedAttendee, setScannedAttendee] = useState<Registration | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'success' | 'warning' | 'error'; text: string } | null>(null);

  const handleLookup = (codeToSearch?: string) => {
    const query = (codeToSearch || codeInput).trim().toUpperCase();
    if (!query) return;

    // Match by passCode or CNIC
    const found = registrations.find(
      r => r.passCode.toUpperCase() === query || 
           r.cnic.replace(/\D/g, '') === query.replace(/\D/g, '')
    );

    if (!found) {
      setScannedAttendee(null);
      setFeedbackMessage({
        type: 'error',
        text: `No attendee found with Code or CNIC "${query}". Please check spelling or verify registration.`
      });
      return;
    }

    setScannedAttendee(found);

    if (found.status === 'pending') {
      setFeedbackMessage({
        type: 'warning',
        text: 'ATTENTION: Payment is still Pending Approval. Finance desk must verify the screenshot before admission.'
      });
    } else if (found.status === 'rejected') {
      setFeedbackMessage({
        type: 'error',
        text: 'ENTRY DENIED: Registration was rejected by finance desk. Attendee must visit registration desk.'
      });
    } else if (found.checkedIn) {
      setFeedbackMessage({
        type: 'warning',
        text: `DUPLICATE ENTRY ALERT: Attendee was already admitted at ${found.checkedInAt?.slice(11) || 'earlier today'}!`
      });
    } else {
      setFeedbackMessage({
        type: 'success',
        text: 'VALID PASS: Registration and payment of Rs. 2,200 verified! Ready for hall admission.'
      });
    }
  };

  const handleAdmit = () => {
    if (!scannedAttendee) return;
    onCheckIn(scannedAttendee.id);
    
    // Update local state to reflect check-in
    setScannedAttendee(prev => prev ? { ...prev, checkedIn: true, checkedInAt: new Date().toLocaleTimeString() } : null);
    
    setFeedbackMessage({
      type: 'success',
      text: `✓ ADMITTED: ${scannedAttendee.name} checked into UET Civil Lawn successfully!`
    });

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#22c55e', '#d4af37', '#ffffff']
    });
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#112740] border border-[#c89b3c]/40 text-[#d4af37] text-xs font-bold mb-2">
          <Scan className="w-3.5 h-3.5" />
          <span>Event Day Reception Desk</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Gate Entry Pass Scanner &amp; Verification
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Scan QR code or enter unique Code (e.g., <code className="text-[#ffd875]">CCS-WF-8241</code>) or CNIC to admit attendees.
        </p>
      </div>

      {/* Code Input Card */}
      <div className="bg-[#0b1b2d] border-2 border-[#c89b3c]/50 rounded-3xl p-6 sm:p-8 shadow-2xl mb-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLookup();
          }}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          <div className="relative w-full">
            <Scan className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
              placeholder="Enter Pass Code (e.g. CCS-WF-8241) or CNIC..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[#060e18] border border-slate-700 text-white font-mono text-sm uppercase placeholder-slate-500 focus:outline-none focus:border-[#c89b3c]"
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-[#d4af37] to-[#e6be58] text-[#070e18] font-bold text-sm rounded-2xl hover:brightness-110 transition-all flex items-center justify-center gap-2 shrink-0 shadow"
          >
            <Search className="w-4 h-4" />
            <span>Verify Pass</span>
          </button>
        </form>

        {/* Quick Demo Code Test Buttons */}
        <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium">Quick Test with Registered Passes:</span>
          {registrations.slice(0, 4).map((reg) => (
            <button
              key={reg.id}
              onClick={() => {
                setCodeInput(reg.passCode);
                handleLookup(reg.passCode);
              }}
              className="px-2.5 py-1 rounded-lg bg-[#071322] hover:bg-[#122842] border border-slate-700 text-[#ffd875] font-mono text-[11px] transition-colors"
            >
              {reg.passCode} ({reg.name.split(' ')[0]})
            </button>
          ))}
        </div>
      </div>

      {/* Feedback Banner */}
      {feedbackMessage && (
        <div
          className={`p-4 rounded-2xl mb-8 flex items-start gap-3 border ${
            feedbackMessage.type === 'success'
              ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-200'
              : feedbackMessage.type === 'warning'
              ? 'bg-amber-950/80 border-amber-500/60 text-amber-200'
              : 'bg-red-950/80 border-red-500/60 text-red-200'
          }`}
        >
          {feedbackMessage.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
          )}
          <div className="text-xs sm:text-sm font-semibold">{feedbackMessage.text}</div>
        </div>
      )}

      {/* Scanned Attendee Card */}
      {scannedAttendee && (
        <div className="bg-[#0c1a2c] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                Verified Attendee Details
              </span>
              <h2 className="text-2xl font-extrabold text-white mt-0.5">
                {scannedAttendee.name}
              </h2>
              <div className="text-xs text-slate-300 mt-1">
                {scannedAttendee.section} · {scannedAttendee.semester}
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-mono font-bold text-[#ffd875] bg-[#06111f] px-3 py-1.5 rounded-xl border border-[#c89b3c]/40 block mb-1">
                {scannedAttendee.passCode}
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                CNIC: {scannedAttendee.cnic}
              </span>
            </div>
          </div>

          <div className="py-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="bg-[#071322] p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">Payment Status</span>
              <span className={`font-bold capitalize ${scannedAttendee.status === 'approved' ? 'text-emerald-400' : 'text-amber-400'}`}>
                {scannedAttendee.status} (Rs. 2,200)
              </span>
            </div>

            <div className="bg-[#071322] p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">TRX ID</span>
              <span className="font-mono text-slate-200">
                {scannedAttendee.transactionId || 'Verified'}
              </span>
            </div>

            <div className="bg-[#071322] p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">Channel</span>
              <span className="capitalize text-slate-200">
                {scannedAttendee.paymentMethod}
              </span>
            </div>

            <div className="bg-[#071322] p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">Gate Status</span>
              <span className={`font-bold ${scannedAttendee.checkedIn ? 'text-emerald-400' : 'text-slate-400'}`}>
                {scannedAttendee.checkedIn ? 'Already Admitted' : 'Ready to Admit'}
              </span>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => onViewPass(scannedAttendee)}
              className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-[#06111e] border border-slate-700 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <Ticket className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Inspect Full E-Pass</span>
            </button>

            {scannedAttendee.status === 'approved' && !scannedAttendee.checkedIn && (
              <button
                onClick={handleAdmit}
                className="px-6 py-2.5 text-xs font-bold text-[#070e18] bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-emerald-950"
              >
                <UserCheck className="w-4 h-4 text-[#070e18]" />
                <span>Admit &amp; Check-In Attendee Now</span>
              </button>
            )}

            {scannedAttendee.checkedIn && (
              <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-950/80 border border-emerald-500/80 text-emerald-300 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Attendee Admitted into UET Civil Lawn</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
