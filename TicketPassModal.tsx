import React, { useRef } from 'react';
import { Registration } from '../types';
import { TicketQRCode } from './TicketQRCode';
import { 
  X, 
  Printer, 
  Mail, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Copy, 
  Calendar, 
  MapPin, 
  Sparkles,
  Download
} from 'lucide-react';

interface TicketPassModalProps {
  registration: Registration | null;
  onClose: () => void;
  onOpenEmail: (reg: Registration) => void;
}

export const TicketPassModal: React.FC<TicketPassModalProps> = ({ 
  registration, 
  onClose,
  onOpenEmail 
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!registration) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(registration.passCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const isApproved = registration.status === 'approved';
  const isPending = registration.status === 'pending';
  const isRejected = registration.status === 'rejected';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#081525] border-2 border-[#c89b3c]/50 rounded-3xl shadow-2xl overflow-hidden my-8">
        {/* Top Modal Controls */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#060e18] border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#c89b3c]" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Official Digital Event Pass
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* The Printable Pass Body */}
        <div id="printable-pass" className="p-6 sm:p-8 bg-gradient-to-b from-[#0b1b2f] via-[#091729] to-[#07111e]">
          {/* Ticket Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-700/80">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-[#081525] border-2 border-[#c89b3c]/60 p-1 flex items-center justify-center shrink-0 shadow-lg">
                <img 
                  src="/assets/aistudio/image_54ce8a19.png" 
                  alt="CCS Logo" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-white tracking-wide">
                  COMPUTER CELL SOCIETY
                </h3>
                <div className="text-xs text-[#d4af37] font-semibold">
                  UET Peshawar · Welcome &amp; Farewell Gala 2026
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  12 Nov 2026 · UET Civil Lawn · 05:30 PM
                </div>
              </div>
            </div>

            {/* Pass Status Hologram Box */}
            <div className="text-right">
              {isApproved && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-500/80 text-emerald-300 text-xs font-bold tracking-wide shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>PASS VERIFIED &amp; ACTIVE</span>
                </div>
              )}
              {isPending && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-950/80 border border-amber-500/80 text-amber-300 text-xs font-bold tracking-wide shadow-sm">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>PENDING PAYMENT VERIFICATION</span>
                </div>
              )}
              {isRejected && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-950/80 border border-red-500/80 text-red-300 text-xs font-bold tracking-wide shadow-sm">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <span>PAYMENT REJECTED</span>
                </div>
              )}
              <div className="text-[10px] text-slate-400 font-mono mt-1">
                Amount: <strong className="text-white">Rs. 2,200</strong> (Paid)
              </div>
            </div>
          </div>

          {/* Ticket Main Info Grid */}
          <div className="py-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Student & Pass Meta */}
            <div className="md:col-span-7 space-y-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                  Attendee Full Name
                </span>
                <span className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {registration.name}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                    Section &amp; Department
                  </span>
                  <span className="font-semibold text-slate-200">
                    {registration.section}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                    Semester
                  </span>
                  <span className="font-semibold text-slate-200">
                    {registration.semester}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                    CNIC / B-Form
                  </span>
                  <span className="font-mono font-semibold text-slate-300">
                    {registration.cnic}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                    Gate Check-In
                  </span>
                  <span className={`font-semibold ${registration.checkedIn ? 'text-emerald-400' : 'text-slate-400'}`}>
                    {registration.checkedIn ? '✓ Admitted into Civil Lawn' : 'Not yet scanned'}
                  </span>
                </div>
              </div>

              {/* Unique Pass Code Ribbon */}
              <div className="pt-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#d4af37] block mb-1">
                  Unique Entry Verification Code
                </span>
                <div className="flex items-center gap-3 bg-[#06111e] p-3 rounded-xl border border-[#c89b3c]/40">
                  <code className="text-xl sm:text-2xl font-mono font-extrabold text-[#ffd875] tracking-widest">
                    {registration.passCode}
                  </code>
                  <button
                    onClick={handleCopyCode}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-auto flex items-center gap-1 text-xs"
                    title="Copy unique code"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* QR Code Column */}
            <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-[#060e18] rounded-2xl border border-slate-800 text-center">
              <TicketQRCode value={registration.verificationHash || registration.passCode} size={150} />
              <div className="mt-2.5">
                <span className="text-[10px] font-mono tracking-wider text-slate-400 block uppercase">
                  Scan at Entrance
                </span>
                <span className="text-xs font-mono font-bold text-[#d4af37]">
                  {registration.passCode}
                </span>
              </div>
            </div>
          </div>

          {/* Ticket Security Footer */}
          <div className="pt-4 border-t border-slate-700/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
            <div>
              Hash: <span className="font-mono text-slate-300">{registration.verificationHash}</span>
            </div>
            <div>
              Registered on: <span className="text-slate-300">{registration.submittedAt}</span>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="px-6 py-4 bg-[#060e18] border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenEmail(registration)}
              className="px-4 py-2 text-xs font-semibold text-[#ffd875] bg-[#0f243b] hover:bg-[#163659] border border-[#c89b3c]/40 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>View Confirmation Email</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 text-xs font-bold text-[#070e18] bg-[#d4af37] hover:bg-[#e6be58] rounded-xl transition-all flex items-center gap-1.5 shadow"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save Pass (PDF)</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
