import React, { useState, useRef } from 'react';
import { Registration, PaymentMethod } from '../types';
import { generateUniquePassCode, generateVerificationHash } from '../data/mockRegistrations';
import { 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  ExternalLink, 
  Sparkles, 
  CreditCard, 
  ShieldCheck, 
  X,
  Eye
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface RegistrationSectionProps {
  onRegistrationSuccess: (newReg: Registration) => void;
  onOpenPass: (reg: Registration) => void;
}

export const RegistrationSection: React.FC<RegistrationSectionProps> = ({ 
  onRegistrationSuccess,
  onOpenPass 
}) => {
  const [formMode, setFormMode] = useState<'direct' | 'google_form'>('direct');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    section: 'CS-8A',
    semester: '8th Semester (Farewell)',
    cnic: '',
    paymentMethod: 'sadapay' as PaymentMethod,
    transactionId: ''
  });

  const [screenshotData, setScreenshotData] = useState<string>('');
  const [screenshotFileName, setScreenshotFileName] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-format CNIC with hyphens: XXXXX-XXXXXXX-X
  const handleCnicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 13) val = val.slice(0, 13);
    
    let formatted = val;
    if (val.length > 5 && val.length <= 12) {
      formatted = `${val.slice(0, 5)}-${val.slice(5)}`;
    } else if (val.length > 12) {
      formatted = `${val.slice(0, 5)}-${val.slice(5, 12)}-${val.slice(12)}`;
    }
    setFormData(prev => ({ ...prev, cnic: formatted }));
    if (errors.cnic) setErrors(prev => ({ ...prev, cnic: '' }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrors(prev => ({ ...prev, screenshot: 'Please upload a valid image file (PNG, JPG, or WEBP).' }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, screenshot: 'File size should be under 5MB.' }));
      return;
    }

    setScreenshotFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        setScreenshotData(event.target.result);
        setErrors(prev => ({ ...prev, screenshot: '' }));
      }
    };
    reader.readAsDataURL(file);
  };

  const loadSampleReceipt = () => {
    const mockReceipt = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="600" viewBox="0 0 400 600"><rect width="400" height="600" fill="%230b1728"/><rect x="20" y="20" width="360" height="560" rx="16" fill="%2311223b" stroke="%23c89b3c" stroke-width="2"/><text x="200" y="80" font-family="sans-serif" font-size="20" font-weight="bold" fill="%23c89b3c" text-anchor="middle">SADAPAY RECEIPT</text><text x="200" y="110" font-family="sans-serif" font-size="13" fill="%2394a3b8" text-anchor="middle">SadaPay Transfer</text><line x1="40" y1="130" x2="360" y2="130" stroke="%23334155" stroke-dasharray="4"/><text x="50" y="180" font-family="sans-serif" font-size="14" fill="%2394a3b8">Amount Paid:</text><text x="350" y="180" font-family="sans-serif" font-size="22" font-weight="bold" fill="%2322c55e" text-anchor="end">PKR 2,200.00</text><text x="50" y="230" font-family="sans-serif" font-size="14" fill="%2394a3b8">Receiver:</text><text x="350" y="230" font-family="sans-serif" font-size="13" font-weight="bold" fill="%23ffffff" text-anchor="end">Abdul Mohaimen</text><text x="50" y="280" font-family="sans-serif" font-size="14" fill="%2394a3b8">Number:</text><text x="350" y="280" font-family="sans-serif" font-size="14" font-family="monospace" fill="%23ffd875" text-anchor="end">03339729600</text><text x="50" y="330" font-family="sans-serif" font-size="14" fill="%2394a3b8">TRX ID:</text><text x="350" y="330" font-family="sans-serif" font-size="14" font-family="monospace" fill="%23c89b3c" text-anchor="end">SP-71930284</text><text x="50" y="380" font-family="sans-serif" font-size="14" fill="%2394a3b8">Status:</text><text x="350" y="380" font-family="sans-serif" font-size="14" font-weight="bold" fill="%2322c55e" text-anchor="end">SUCCESSFUL</text><rect x="50" y="440" width="300" height="80" rx="8" fill="%230b1728" stroke="%2322c55e"/><text x="200" y="475" font-family="sans-serif" font-size="14" font-weight="bold" fill="%2322c55e" text-anchor="middle">&#10003; PAID TO ABDUL MOHAIMEN</text><text x="200" y="500" font-family="sans-serif" font-size="12" fill="%2394a3b8" text-anchor="middle">CCS Welcome &amp; Farewell 2026</text></svg>';
    setScreenshotData(mockReceipt);
    setScreenshotFileName('sadapay_abdul_mohaimen_2200.png');
    setFormData(prev => ({ ...prev, transactionId: 'SP-71930284' }));
    setErrors(prev => ({ ...prev, screenshot: '' }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address.';
    }
    if (!formData.section.trim()) newErrors.section = 'Section is required.';
    if (!formData.semester.trim()) newErrors.semester = 'Semester is required.';
    if (!formData.cnic.trim()) {
      newErrors.cnic = 'CNIC is required.';
    } else if (formData.cnic.replace(/\D/g, '').length !== 13) {
      newErrors.cnic = 'CNIC must be 13 digits (e.g. 17301-1234567-1).';
    }
    if (!screenshotData) {
      newErrors.screenshot = 'Payment screenshot is required for fee verification.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const passCode = generateUniquePassCode();
      const verificationHash = generateVerificationHash(passCode, formData.cnic);
      const now = new Date();
      const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

      const newRegistration: Registration = {
        id: `reg-${Date.now()}`,
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        section: formData.section.trim(),
        semester: formData.semester.trim(),
        cnic: formData.cnic.trim(),
        paymentScreenshot: screenshotData,
        paymentMethod: formData.paymentMethod,
        transactionId: formData.transactionId.trim() || `TRX-${Math.floor(10000000 + Math.random() * 90000000)}`,
        amount: 2200,
        status: 'pending', // Starts as pending until organizer approves
        passCode,
        verificationHash,
        submittedAt: dateStr,
        checkedIn: false
      };

      onRegistrationSuccess(newRegistration);
      setIsSubmitting(false);

      // Fire celebratory confetti!
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#c89b3c', '#ffd875', '#ffffff', '#11223b']
      });

      // Directly open the created ticket pass
      onOpenPass(newRegistration);
    }, 600);
  };

  return (
    <section id="register" className="py-24 bg-[#091524] border-t border-slate-800/80 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-bold tracking-widest uppercase text-[#d4af37] mb-2">
            Step 1: Reserve Your Spot
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Event Registration Form
          </h2>
          <p className="mt-2 text-slate-300 text-sm">
            Fill in your student details and attach your payment screenshot of <strong className="text-[#ffd875]">Rs. 2,200</strong>. Your unique digital pass will be issued immediately upon review.
          </p>

          {/* Form Mode Selector */}
          <div className="mt-6 inline-flex p-1 bg-[#060e18] rounded-xl border border-slate-800">
            <button
              onClick={() => setFormMode('direct')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                formMode === 'direct'
                  ? 'bg-gradient-to-r from-[#c89b3c] to-[#e6be58] text-[#070e18] shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Direct Fast Portal (Instant E-Pass)
            </button>
            <button
              onClick={() => setFormMode('google_form')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                formMode === 'google_form'
                  ? 'bg-[#10243b] text-white border border-[#c89b3c]/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Google Form Integration</span>
            </button>
          </div>
        </div>

        {formMode === 'direct' ? (
          /* Direct In-App Registration Form */
          <div className="bg-[#0c1a2c] border-2 border-[#c89b3c]/40 rounded-3xl p-6 sm:p-10 shadow-2xl">
            {/* Form Banner Notice */}
            <div className="mb-8 p-4 bg-[#10243b] rounded-2xl border border-[#c89b3c]/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#c89b3c]/20 border border-[#c89b3c]/40 flex items-center justify-center text-[#d4af37]">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">Total Payable Amount</div>
                  <div className="text-lg font-bold text-white">
                    Rs. 2,200 <span className="text-xs font-normal text-slate-400">(Single Entry Pass)</span>
                  </div>
                </div>
              </div>
              <div className="text-right hidden sm:block">
                <span className="text-xs text-[#d4af37] font-semibold block">Official SadaPay Account</span>
                <a href="#fee" className="text-xs text-slate-300 hover:text-white underline">
                  03339729600 (Abdul Mohaimen)
                </a>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Field 1: Full Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    1. Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, name: e.target.value }));
                      if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                    }}
                    placeholder="e.g. Muhammad Farhan"
                    className={`w-full px-4 py-3 rounded-xl bg-[#071322] border text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#c89b3c] ${
                      errors.name ? 'border-red-500' : 'border-slate-700 focus:border-[#c89b3c]'
                    }`}
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                </div>

                {/* Field 2: Email Address */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    2. Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, email: e.target.value }));
                      if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                    }}
                    placeholder="student@uetpeshawar.edu.pk"
                    className={`w-full px-4 py-3 rounded-xl bg-[#071322] border text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#c89b3c] ${
                      errors.email ? 'border-red-500' : 'border-slate-700 focus:border-[#c89b3c]'
                    }`}
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Your official confirmation email &amp; pass code will be sent here.
                  </span>
                  {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Field 3: Section */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    3. Section <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={formData.section}
                    onChange={(e) => setFormData(prev => ({ ...prev, section: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-[#071322] border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#c89b3c]"
                  >
                    <option value="CS-8A">CS-8A (Final Year)</option>
                    <option value="CS-8B">CS-8B (Final Year)</option>
                    <option value="CS-6A">CS-6A</option>
                    <option value="CS-6B">CS-6B</option>
                    <option value="CS-4A">CS-4A</option>
                    <option value="CS-4B">CS-4B</option>
                    <option value="CS-2A">CS-2A (Freshman Welcome)</option>
                    <option value="CS-2B">CS-2B (Freshman Welcome)</option>
                    <option value="SE-A">SE (Software Eng.)</option>
                    <option value="DS-A">DS (Data Science)</option>
                    <option value="AI-A">AI (Artificial Intel.)</option>
                    <option value="Other">Other / Faculty / Guest</option>
                  </select>
                </div>

                {/* Field 4: Semester */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    4. Semester <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={formData.semester}
                    onChange={(e) => setFormData(prev => ({ ...prev, semester: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-[#071322] border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#c89b3c]"
                  >
                    <option value="8th Semester (Farewell)">8th Semester (Farewell Batch 2022-2026)</option>
                    <option value="7th Semester">7th Semester</option>
                    <option value="6th Semester">6th Semester</option>
                    <option value="5th Semester">5th Semester</option>
                    <option value="4th Semester">4th Semester</option>
                    <option value="3rd Semester">3rd Semester</option>
                    <option value="2nd Semester (Welcome)">2nd Semester (Welcome Batch 2026)</option>
                    <option value="1st Semester (Welcome)">1st Semester (Welcome Batch 2026)</option>
                    <option value="Alumni / Guest">Alumni / Department Faculty</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Field 5: CNIC */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    5. CNIC / Form B <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.cnic}
                    onChange={handleCnicChange}
                    placeholder="17301-XXXXXXX-X"
                    maxLength={15}
                    className={`w-full px-4 py-3 rounded-xl bg-[#071322] border text-white placeholder-slate-500 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#c89b3c] ${
                      errors.cnic ? 'border-red-500' : 'border-slate-700 focus:border-[#c89b3c]'
                    }`}
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    13 digits CNIC used for gate security verification on event day.
                  </span>
                  {errors.cnic && <p className="mt-1 text-xs text-red-400">{errors.cnic}</p>}
                </div>

                {/* Payment Channel Used */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Payment Channel Used <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={formData.paymentMethod}
                    onChange={(e) => setFormData(prev => ({ ...prev, paymentMethod: e.target.value as PaymentMethod }))}
                    className="w-full px-4 py-3 rounded-xl bg-[#071322] border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#c89b3c]"
                  >
                    <option value="sadapay">SadaPay (03339729600 - Abdul Mohaimen)</option>
                    <option value="meezan_bank">Raast to SadaPay (03339729600 - Abdul Mohaimen)</option>
                    <option value="cash_desk">Cash Voucher (CCS Desk)</option>
                  </select>
                </div>
              </div>

              {/* Transaction ID */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Transaction ID / TRX Reference <span className="text-slate-400 font-normal">(Optional but speeds up approval)</span>
                </label>
                <input
                  type="text"
                  value={formData.transactionId}
                  onChange={(e) => setFormData(prev => ({ ...prev, transactionId: e.target.value }))}
                  placeholder="e.g. TRX-98201481 or TID from SMS"
                  className="w-full px-4 py-3 rounded-xl bg-[#071322] border border-slate-700 text-white placeholder-slate-500 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#c89b3c]"
                />
              </div>

              {/* Field 6: Payment Screenshot Upload */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                    6. Payment Screenshot <span className="text-red-400">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={loadSampleReceipt}
                    className="text-xs text-[#d4af37] hover:text-[#ffd875] underline flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" />
                    Use Demo Verified Receipt (For Testing)
                  </button>
                </div>

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-colors ${
                    screenshotData
                      ? 'border-emerald-500/60 bg-emerald-950/20'
                      : errors.screenshot
                      ? 'border-red-500 bg-red-950/10'
                      : 'border-slate-700 hover:border-[#c89b3c] bg-[#071322]'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {screenshotData ? (
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-[#c89b3c]/50 bg-black shrink-0">
                        <img
                          src={screenshotData}
                          alt="Uploaded payment proof"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-left">
                        <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Screenshot Uploaded Successfully</span>
                        </div>
                        <p className="text-xs text-slate-300 mt-1 truncate max-w-xs">
                          {screenshotFileName || 'Payment_Proof.png'}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Click here if you want to replace with another image.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="w-12 h-12 rounded-xl bg-[#10243b] border border-[#c89b3c]/30 flex items-center justify-center text-[#d4af37]">
                        <Upload className="w-6 h-6" />
                      </div>
                      <div className="text-sm font-semibold text-white">
                        Click to upload payment screenshot or drag &amp; drop
                      </div>
                      <p className="text-xs text-slate-400">
                        PNG, JPG, or WEBP up to 5MB. Must clearly show Rs. 2,200 transferred.
                      </p>
                    </div>
                  )}
                </div>
                {errors.screenshot && <p className="mt-1.5 text-xs text-red-400">{errors.screenshot}</p>}
              </div>

              {/* Submit CTA */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 text-base font-bold text-[#070e18] bg-gradient-to-r from-[#d4af37] via-[#e6be58] to-[#f4d178] hover:from-[#e6be58] hover:to-[#ffe082] rounded-xl shadow-xl shadow-[#c89b3c]/20 hover:shadow-[#c89b3c]/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <ShieldCheck className="w-5 h-5 text-[#070e18]" />
                  <span>
                    {isSubmitting ? 'Submitting & Generating E-Pass...' : 'Submit Registration & Generate E-Pass (Rs. 2,200)'}
                  </span>
                </button>
                <p className="text-center text-[11px] text-slate-400 mt-3">
                  Upon submission, your pass code is created and queued for payment verification by the CCS Finance Desk.
                </p>
              </div>
            </form>
          </div>
        ) : (
          /* Google Form Integration Tab */
          <div className="bg-[#0c1a2c] border border-slate-800 rounded-3xl p-6 sm:p-8 text-center shadow-xl">
            <div className="max-w-xl mx-auto space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#10243b] border border-[#c89b3c]/40 flex items-center justify-center text-[#d4af37] mx-auto">
                <FileText className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white">
                Google Form Official Registration Link
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                If your society department prefers collecting responses via Google Forms with attached payment screenshots in Google Drive, you can use our standardized template containing all 6 mandatory fields.
              </p>

              {/* Standard Fields checklist */}
              <div className="bg-[#071322] rounded-2xl p-4 border border-slate-800 text-left text-xs space-y-2">
                <span className="font-bold text-[#d4af37] block mb-1">
                  Google Form Pre-Configured Fields:
                </span>
                <div className="grid grid-cols-2 gap-2 text-slate-300">
                  <div>1. Name (Short Answer)</div>
                  <div>2. Email Address (Verified)</div>
                  <div>3. Section (Dropdown/Text)</div>
                  <div>4. Semester (Dropdown)</div>
                  <div>5. CNIC (13 digits validation)</div>
                  <div>6. Payment Screenshot (File Upload)</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <a
                  href="https://docs.google.com/forms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors flex items-center gap-2"
                >
                  <span>Open Linked Google Form</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => setFormMode('direct')}
                  className="px-6 py-3 text-xs font-bold text-[#070e18] bg-[#d4af37] hover:bg-[#e6be58] rounded-xl transition-all"
                >
                  Switch Back to Direct Portal
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
