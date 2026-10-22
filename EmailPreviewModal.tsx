import React, { useState } from 'react';
import { Registration } from '../types';
import { TicketQRCode } from './TicketQRCode';
import { X, Copy, Check, Mail, Send, AlertCircle, ExternalLink, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface EmailPreviewModalProps {
  registration: Registration | null;
  onClose: () => void;
  onSendEmail?: (id: string) => void;
}

export const EmailPreviewModal: React.FC<EmailPreviewModalProps> = ({ 
  registration, 
  onClose,
  onSendEmail 
}) => {
  const [copied, setCopied] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  if (!registration) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(registration.passCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendTicket = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSentSuccess(true);
      if (onSendEmail) {
        onSendEmail(registration.id);
      }
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#c89b3c', '#22c55e', '#ffffff']
      });
      setTimeout(() => setSentSuccess(false), 4000);
    }, 700);
  };

  const mailtoSubject = encodeURIComponent(`[CONFIRMED] Official E-Pass: CCS Welcome & Farewell Gala 2026 (${registration.passCode})`);
  const mailtoBody = encodeURIComponent(
`Dear ${registration.name},

Congratulations! Your registration and payment of Rs. 2,200 for the Computer Cell Society Welcome & Farewell Gala 2026 have been approved.

YOUR EVENT PASS DETAILS:
- Attendee: ${registration.name}
- Unique Pass Code: ${registration.passCode}
- Date: 12 Nov 2026 (05:30 PM)
- Venue: UET Civil Lawn, Peshawar
- Section: ${registration.section} (${registration.semester})
- CNIC: ${registration.cnic}
- Verification Hash: ${registration.verificationHash}

Please present your Unique Pass Code or E-Pass alongside your original CNIC at the entrance gate of UET Civil Lawn on 12 Nov.

Warm regards,
Computer Cell Society (CCS)
UET Peshawar`
  );

  const mailtoLink = `mailto:${registration.email}?subject=${mailtoSubject}&body=${mailtoBody}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#091524] border-2 border-[#c89b3c]/50 rounded-3xl shadow-2xl overflow-hidden my-6">
        {/* Email Client Simulated Header */}
        <div className="px-6 py-4 bg-[#060e18] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#11243a] text-[#ffd875] border border-[#c89b3c]/30 flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-2">
                <span>E-Pass Email Dispatch Center</span>
                {registration.emailSent && (
                  <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-500/40 font-mono">
                    Sent {registration.emailSentAt || ''}
                  </span>
                )}
              </div>
              <div className="text-[11px] text-slate-400">
                Official sender: <strong className="text-[#ffd875] font-mono">mukhtiarms@gmail.com</strong>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Email Metadata Strip */}
        <div className="px-6 py-3 bg-[#0a1829] border-b border-slate-800 text-xs text-slate-300 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">From:</span>
            <span className="font-semibold text-white font-mono">mukhtiarms@gmail.com</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">To:</span>
            <span className="font-medium text-slate-200">{registration.name} &lt;{registration.email}&gt;</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Subject:</span>
            <span className="font-bold text-[#ffd875]">
              [CONFIRMED] Your Official E-Pass: CCS Welcome &amp; Farewell Gala 2026 ({registration.passCode})
            </span>
          </div>
        </div>

        {/* Success toast if email sent */}
        {sentSuccess && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-emerald-950/90 border border-emerald-500/80 text-emerald-300 text-xs flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Ticket Emailed!</strong> Successfully dispatched to <u>{registration.email}</u> from <u>mukhtiarms@gmail.com</u> with QR ticket credentials.
            </span>
          </div>
        )}

        {/* Email Body Template */}
        <div className="p-6 sm:p-8 bg-slate-950 text-slate-200 text-sm space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Email Branded Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0d2238] via-[#091729] to-[#070e18] border border-[#c89b3c]/40 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#081525] p-1.5 border border-[#c89b3c]/60 mx-auto mb-3 shadow-md">
              <img 
                src="/assets/aistudio/image_54ce8a19.png" 
                alt="CCS Logo" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <h3 className="text-lg font-extrabold text-white">
              COMPUTER CELL SOCIETY · UET PESHAWAR
            </h3>
            <p className="text-xs text-[#d4af37] font-semibold mt-0.5">
              Annual Welcome &amp; Farewell Gala 2026 · 12 Nov @ UET Civil Lawn
            </p>
          </div>

          <div>
            <p className="font-semibold text-white">
              Dear {registration.name},
            </p>
            <p className="mt-2 text-slate-300 text-xs sm:text-sm leading-relaxed">
              Congratulations! Your payment for the <strong className="text-white">Computer Cell Society Welcome Party &amp; Farewell Gala 2026</strong> has been officially approved. Your digital entry pass is now active for gate admission.
            </p>
          </div>

          {/* Event Venue & Date Highlight */}
          <div className="p-4 rounded-xl bg-[#0d2238] border border-[#c89b3c]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Date &amp; Time</span>
              <span className="font-bold text-[#ffd875] text-sm">12 Nov 2026 · 05:30 PM Onwards</span>
            </div>
            <div className="sm:text-right">
              <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Official Venue</span>
              <span className="font-bold text-white text-sm">UET Civil Lawn, Peshawar</span>
            </div>
          </div>

          {/* Unique Entry Code Card */}
          <div className="p-5 rounded-2xl bg-[#09182b] border-2 border-[#c89b3c]/50 text-center">
            <div className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">
              Your Unique Gate Entry Pass Code
            </div>
            <div className="my-2">
              <span className="text-3xl font-black font-mono tracking-widest text-[#ffd875]">
                {registration.passCode}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Please present this code or the attached QR pass at the entrance of UET Civil Lawn on 12 Nov.
            </p>
            <button
              onClick={handleCopyCode}
              className="mt-3 px-3.5 py-1.5 text-xs font-semibold text-[#070e18] bg-[#d4af37] hover:bg-[#e6be58] rounded-lg transition-colors inline-flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Code Copied to Clipboard' : 'Copy Pass Code'}</span>
            </button>
          </div>

          {/* QR Code Pass Snapshot in Email */}
          <div className="p-5 rounded-2xl bg-[#060e18] border border-slate-800 flex flex-col sm:flex-row items-center gap-6">
            <div className="shrink-0">
              <TicketQRCode value={registration.verificationHash || registration.passCode} size={130} />
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="text-[#d4af37] font-bold text-sm">
                Gate Entry Verification Pass
              </div>
              <div><span className="text-slate-400">Attendee:</span> <strong className="text-white">{registration.name}</strong></div>
              <div><span className="text-slate-400">Section &amp; Semester:</span> <span className="text-slate-200">{registration.section} · {registration.semester}</span></div>
              <div><span className="text-slate-400">CNIC:</span> <span className="font-mono text-slate-200">{registration.cnic}</span></div>
              <div><span className="text-slate-400">Venue:</span> <strong className="text-white">UET Civil Lawn</strong></div>
              <div><span className="text-slate-400">Date:</span> <strong className="text-[#ffd875]">12 Nov 2026</strong></div>
              <div><span className="text-slate-400">Fee Received:</span> <span className="font-bold text-emerald-400">Rs. 2,200 (Verified)</span></div>
            </div>
          </div>

          {/* Event Day Guidelines */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2">
            <div className="font-bold text-white flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-[#d4af37]" />
              <span>Event Day Guidelines &amp; Gate Rules (12 Nov @ UET Civil Lawn)</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-300">
              <li>Gates open at <strong>05:30 PM sharp</strong> at the <strong>UET Civil Lawn</strong> entrance.</li>
              <li>Dress Code: <strong>Strictly Formal</strong> (Suits / Blazers / Traditional Formal).</li>
              <li>Carry your original CNIC or University ID card alongside this E-Pass.</li>
              <li>This pass is strictly non-transferable and admits <strong>1 Person Only</strong>.</li>
            </ul>
          </div>

          <div className="pt-4 border-t border-slate-800 text-xs text-slate-400">
            Dispatched by:<br />
            <strong>Computer Cell Society (CCS)</strong><br />
            <span className="font-mono text-[#ffd875]">mukhtiarms@gmail.com</span><br />
            Department of Computer Systems, UET Peshawar
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-[#060e18] border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <a
              href={mailtoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-[#0e2136] hover:bg-[#16314f] border border-slate-700 rounded-xl transition-colors flex items-center gap-1.5"
              title="Open draft in default email app"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Open in Mail App</span>
            </a>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSendTicket}
              disabled={isSending}
              className="px-5 py-2.5 text-xs font-bold text-[#070e18] bg-gradient-to-r from-[#d4af37] to-[#e6be58] hover:from-[#e6be58] hover:to-[#ffd875] rounded-xl shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>
                {isSending ? 'Sending from mukhtiarms@gmail.com...' : 'Send Ticket via mukhtiarms@gmail.com'}
              </span>
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
