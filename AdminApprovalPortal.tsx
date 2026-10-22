import React, { useState } from 'react';
import { Registration, RegistrationStatus } from '../types';
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  Mail, 
  DollarSign, 
  Users, 
  Clock, 
  AlertTriangle, 
  Maximize2,
  X,
  Ticket,
  UserCheck
} from 'lucide-react';

interface AdminApprovalPortalProps {
  registrations: Registration[];
  onApprove: (id: string) => void;
  onReject: (id: string, reason: string) => void;
  onViewPass: (reg: Registration) => void;
  onViewEmail: (reg: Registration) => void;
  onToggleCheckIn: (id: string) => void;
}

export const AdminApprovalPortal: React.FC<AdminApprovalPortalProps> = ({
  registrations,
  onApprove,
  onReject,
  onViewPass,
  onViewEmail,
  onToggleCheckIn
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | RegistrationStatus>('all');
  const [selectedScreenshot, setSelectedScreenshot] = useState<Registration | null>(null);
  const [rejectingItem, setRejectingItem] = useState<Registration | null>(null);
  const [rejectReason, setRejectReason] = useState('Payment receipt could not be verified or amount was incorrect.');

  // Calculated KPI stats
  const totalSubmissions = registrations.length;
  const pendingCount = registrations.filter(r => r.status === 'pending').length;
  const approvedCount = registrations.filter(r => r.status === 'approved').length;
  const totalRevenue = approvedCount * 2200;
  const checkedInCount = registrations.filter(r => r.checkedIn).length;

  // Filtered registrations
  const filteredRegistrations = registrations.filter(reg => {
    const matchesStatus = statusFilter === 'all' || reg.status === statusFilter;
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      reg.name.toLowerCase().includes(query) ||
      reg.cnic.toLowerCase().includes(query) ||
      reg.passCode.toLowerCase().includes(query) ||
      reg.email.toLowerCase().includes(query) ||
      reg.section.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });

  const handleConfirmReject = () => {
    if (!rejectingItem) return;
    onReject(rejectingItem.id, rejectReason);
    setRejectingItem(null);
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#d4af37]">
            <ShieldCheck className="w-4 h-4" />
            <span>Computer Cell Society Organizer Desk</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Payment Verification &amp; Pass Approval Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Review attendee payment screenshots, approve transactions of Rs. 2,200, and manage gate admissions.
          </p>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-[#0b1b2d] border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs">Total Applicants</span>
            <Users className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-black text-white">{totalSubmissions}</div>
          <div className="text-[11px] text-slate-400 mt-1">Registered students</div>
        </div>

        <div className="bg-[#0b1b2d] border border-amber-500/40 rounded-2xl p-4">
          <div className="flex items-center justify-between text-amber-400 mb-1">
            <span className="text-xs">Pending Reviews</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400">{pendingCount}</div>
          <div className="text-[11px] text-slate-400 mt-1">Screenshots to verify</div>
        </div>

        <div className="bg-[#0b1b2d] border border-emerald-500/40 rounded-2xl p-4">
          <div className="flex items-center justify-between text-emerald-400 mb-1">
            <span className="text-xs">Approved Passes</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400">{approvedCount}</div>
          <div className="text-[11px] text-slate-400 mt-1">Active QR passes</div>
        </div>

        <div className="bg-[#0b1b2d] border border-[#c89b3c]/50 rounded-2xl p-4">
          <div className="flex items-center justify-between text-[#d4af37] mb-1">
            <span className="text-xs">Confirmed Revenue</span>
            <DollarSign className="w-4 h-4 text-[#d4af37]" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-[#ffd875]">
            Rs. {totalRevenue.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">@ Rs. 2,200 per head</div>
        </div>

        <div className="bg-[#0b1b2d] border border-sky-500/40 rounded-2xl p-4 col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-sky-400 mb-1">
            <span className="text-xs">Gate Checked-In</span>
            <UserCheck className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-black text-sky-400">{checkedInCount}</div>
          <div className="text-[11px] text-slate-400 mt-1">Admitted at entrance</div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-[#0b1728] border border-slate-800 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Name, CNIC, or Code..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#060e18] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#c89b3c]"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-[#060e18] rounded-xl border border-slate-800 w-full sm:w-auto overflow-x-auto">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
              statusFilter === 'all'
                ? 'bg-[#122842] text-white border border-[#c89b3c]/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All ({registrations.length})
          </button>
          <button
            onClick={() => setStatusFilter('pending')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
              statusFilter === 'pending'
                ? 'bg-amber-950/80 text-amber-300 border border-amber-500/60'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Pending ({pendingCount})
          </button>
          <button
            onClick={() => setStatusFilter('approved')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
              statusFilter === 'approved'
                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/60'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Approved ({approvedCount})
          </button>
          <button
            onClick={() => setStatusFilter('rejected')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
              statusFilter === 'rejected'
                ? 'bg-red-950/80 text-red-300 border border-red-500/60'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Rejected ({registrations.filter(r => r.status === 'rejected').length})
          </button>
        </div>
      </div>

      {/* Registrations List / Table */}
      <div className="bg-[#0b1728] border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-[#070e18] text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3.5 px-4">Attendee</th>
                <th className="py-3.5 px-4">Section / Sem</th>
                <th className="py-3.5 px-4">CNIC</th>
                <th className="py-3.5 px-4">Payment Proof</th>
                <th className="py-3.5 px-4">Pass Code</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Approval Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-xs">
              {filteredRegistrations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No registrations found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredRegistrations.map((reg) => {
                  return (
                    <tr key={reg.id} className="hover:bg-[#0e2138]/50 transition-colors">
                      {/* Attendee Info */}
                      <td className="py-4 px-4">
                        <div className="font-bold text-white text-sm">{reg.name}</div>
                        <div className="text-slate-400 text-[11px] font-mono">{reg.email}</div>
                      </td>

                      {/* Section & Semester */}
                      <td className="py-4 px-4">
                        <div className="font-semibold text-slate-200">{reg.section}</div>
                        <div className="text-slate-400 text-[11px]">{reg.semester}</div>
                      </td>

                      {/* CNIC */}
                      <td className="py-4 px-4 font-mono text-slate-300">
                        {reg.cnic}
                      </td>

                      {/* Payment Proof Thumbnail */}
                      <td className="py-4 px-4">
                        <button
                          onClick={() => setSelectedScreenshot(reg)}
                          className="group relative flex items-center gap-2 p-1 rounded-xl bg-[#060e18] border border-slate-700 hover:border-[#c89b3c] transition-colors"
                          title="Click to view full screenshot"
                        >
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-black shrink-0 relative">
                            <img
                              src={reg.paymentScreenshot}
                              alt="Receipt"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                              <Maximize2 className="w-3.5 h-3.5 text-white" />
                            </div>
                          </div>
                          <div className="text-left pr-2">
                            <span className="text-[10px] font-mono text-[#ffd875] block uppercase">
                              {reg.paymentMethod}
                            </span>
                            <span className="text-[11px] text-slate-300 font-semibold block">
                              Rs. {reg.amount}
                            </span>
                          </div>
                        </button>
                      </td>

                      {/* Pass Code */}
                      <td className="py-4 px-4">
                        <code className="px-2 py-1 bg-[#06111f] rounded border border-[#c89b3c]/30 font-mono font-bold text-[#ffd875] text-xs">
                          {reg.passCode}
                        </code>
                        {reg.checkedIn && (
                          <span className="block mt-1 text-[10px] text-emerald-400 font-semibold">
                            ✓ In Venue ({reg.checkedInAt?.slice(11) || 'Checked'})
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4">
                        {reg.status === 'approved' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-950/80 border border-emerald-500/60 text-emerald-300 text-[11px] font-bold">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            Approved
                          </span>
                        )}
                        {reg.status === 'pending' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-950/80 border border-amber-500/60 text-amber-300 text-[11px] font-bold">
                            <Clock className="w-3 h-3 text-amber-400" />
                            Pending Review
                          </span>
                        )}
                        {reg.status === 'rejected' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-red-950/80 border border-red-500/60 text-red-300 text-[11px] font-bold">
                            <XCircle className="w-3 h-3 text-red-400" />
                            Rejected
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {reg.status === 'pending' && (
                            <>
                              <button
                                onClick={() => onApprove(reg.id)}
                                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
                                title="Approve payment & activate pass"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Approve</span>
                              </button>
                              <button
                                onClick={() => setRejectingItem(reg)}
                                className="px-2.5 py-1.5 bg-red-950 hover:bg-red-900 border border-red-700/60 text-red-300 rounded-lg text-xs font-semibold transition-colors"
                                title="Reject payment screenshot"
                              >
                                Reject
                              </button>
                            </>
                          )}

                          <button
                            onClick={() => onViewPass(reg)}
                            className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                            title="View E-Pass Ticket"
                          >
                            <Ticket className="w-4 h-4 text-[#d4af37]" />
                          </button>

                          {/* Mail Ticket Button */}
                          <button
                            onClick={() => onViewEmail(reg)}
                            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                              reg.emailSent
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                                : reg.status === 'approved'
                                ? 'bg-[#112740] hover:bg-[#193a5e] text-[#ffd875] border border-[#c89b3c]/50 shadow-sm'
                                : 'text-slate-400 hover:text-white hover:bg-slate-800'
                            }`}
                            title={
                              reg.emailSent
                                ? `Ticket already emailed from mukhtiarms@gmail.com`
                                : `Email official ticket from mukhtiarms@gmail.com to ${reg.email}`
                            }
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span className="text-[11px] font-medium hidden sm:inline">
                              {reg.emailSent ? 'Emailed ✓' : 'Email Ticket'}
                            </span>
                          </button>

                          <button
                            onClick={() => onToggleCheckIn(reg.id)}
                            className={`p-1.5 rounded-lg transition-colors ${
                              reg.checkedIn
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                                : 'text-slate-400 hover:text-white hover:bg-slate-800'
                            }`}
                            title={reg.checkedIn ? 'Checked-in: click to undo' : 'Mark Checked-in at Gate'}
                          >
                            <UserCheck className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Screenshot Inspection Modal */}
      {selectedScreenshot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#0b1b2d] border-2 border-[#c89b3c]/50 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white">Payment Screenshot Verification</h3>
                <p className="text-xs text-slate-400">
                  {selectedScreenshot.name} ({selectedScreenshot.section}) · Rs. {selectedScreenshot.amount}
                </p>
              </div>
              <button
                onClick={() => setSelectedScreenshot(null)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="my-4 max-h-[60vh] overflow-y-auto rounded-2xl bg-black border border-slate-800 flex items-center justify-center p-2">
              <img
                src={selectedScreenshot.paymentScreenshot}
                alt="Full receipt screenshot"
                className="w-full max-h-[50vh] object-contain rounded-xl"
              />
            </div>

            <div className="text-xs text-slate-300 space-y-1 bg-[#060e18] p-3 rounded-xl border border-slate-800 mb-4">
              <div><span className="text-slate-400">Transaction ID:</span> <span className="font-mono text-[#ffd875] font-bold">{selectedScreenshot.transactionId || 'Not provided'}</span></div>
              <div><span className="text-slate-400">Payment Channel:</span> <span className="capitalize">{selectedScreenshot.paymentMethod}</span></div>
              <div><span className="text-slate-400">Date Submitted:</span> <span>{selectedScreenshot.submittedAt}</span></div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <button
                onClick={() => setSelectedScreenshot(null)}
                className="px-4 py-2 text-xs text-slate-400 hover:text-white"
              >
                Close View
              </button>
              {selectedScreenshot.status === 'pending' && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setRejectingItem(selectedScreenshot);
                      setSelectedScreenshot(null);
                    }}
                    className="px-4 py-2 text-xs font-semibold text-red-300 bg-red-950 border border-red-800 rounded-xl hover:bg-red-900"
                  >
                    Reject Receipt
                  </button>
                  <button
                    onClick={() => {
                      onApprove(selectedScreenshot.id);
                      setSelectedScreenshot(null);
                    }}
                    className="px-5 py-2 text-xs font-bold text-[#070e18] bg-[#d4af37] hover:bg-[#e6be58] rounded-xl shadow"
                  >
                    Approve Payment (Rs. 2,200)
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Rejection Reason Modal */}
      {rejectingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-[#0b1b2d] border border-red-500/50 rounded-3xl p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <span>Reject Payment Submission</span>
            </h3>
            <p className="text-xs text-slate-300 mb-4">
              Specify reason for rejecting {rejectingItem.name}&apos;s submission. They will see this note when tracking their pass.
            </p>

            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows={3}
              className="w-full p-3 rounded-xl bg-[#060e18] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500 mb-4"
              placeholder="e.g. Screenshot does not show Rs. 2,200 amount or transaction ID is missing."
            />

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setRejectingItem(null)}
                className="px-4 py-2 text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReject}
                className="px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-500 rounded-xl transition-colors"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
