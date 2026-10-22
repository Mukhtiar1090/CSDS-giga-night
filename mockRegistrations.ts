import { Registration, PaymentAccountInfo } from '../types';

export const PAYMENT_ACCOUNTS: PaymentAccountInfo[] = [
  {
    provider: 'SadaPay',
    accountTitle: 'Abdul Mohaimen',
    accountNumber: '0333-9729600',
    iban: 'PK05SADA0000003339729600',
    instructions: 'Send Rs. 2,200 to SadaPay account or via Raast using 03339729600. Save the transaction screenshot showing the TRX ID.',
    badge: 'Only Official Account'
  }
];

// Placeholder demo receipt image for pre-loaded samples
const SAMPLE_RECEIPT_APPROVED = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="600" viewBox="0 0 400 600"><rect width="400" height="600" fill="%230b1728"/><rect x="20" y="20" width="360" height="560" rx="16" fill="%2311223b" stroke="%23c89b3c" stroke-width="2"/><text x="200" y="80" font-family="sans-serif" font-size="20" font-weight="bold" fill="%23c89b3c" text-anchor="middle">SADAPAY RECEIPT</text><text x="200" y="110" font-family="sans-serif" font-size="13" fill="%2394a3b8" text-anchor="middle">Official Gala Registration</text><line x1="40" y1="130" x2="360" y2="130" stroke="%23334155" stroke-dasharray="4"/><text x="50" y="180" font-family="sans-serif" font-size="14" fill="%2394a3b8">Amount:</text><text x="350" y="180" font-family="sans-serif" font-size="22" font-weight="bold" fill="%2322c55e" text-anchor="end">PKR 2,200.00</text><text x="50" y="230" font-family="sans-serif" font-size="14" fill="%2394a3b8">Receiver:</text><text x="350" y="230" font-family="sans-serif" font-size="13" font-weight="bold" fill="%23ffffff" text-anchor="end">Abdul Mohaimen</text><text x="50" y="280" font-family="sans-serif" font-size="14" fill="%2394a3b8">Account:</text><text x="350" y="280" font-family="sans-serif" font-size="14" font-family="monospace" fill="%23c89b3c" text-anchor="end">0333-9729600</text><text x="50" y="330" font-family="sans-serif" font-size="14" fill="%2394a3b8">Status:</text><text x="350" y="330" font-family="sans-serif" font-size="14" font-weight="bold" fill="%2322c55e" text-anchor="end">SUCCESSFUL</text><text x="50" y="380" font-family="sans-serif" font-size="14" fill="%2394a3b8">Date &amp; Time:</text><text x="350" y="380" font-family="sans-serif" font-size="13" fill="%23e2e8f0" text-anchor="end">22 Oct 2026, 02:45 PM</text><rect x="50" y="440" width="300" height="80" rx="8" fill="%230b1728" stroke="%2322c55e"/><text x="200" y="475" font-family="sans-serif" font-size="14" font-weight="bold" fill="%2322c55e" text-anchor="middle">&#10003; PAID TO ABDUL MOHAIMEN (SADAPAY)</text><text x="200" y="500" font-family="sans-serif" font-size="12" fill="%2394a3b8" text-anchor="middle">CCS Welcome &amp; Farewell Gala</text></svg>';

const SAMPLE_RECEIPT_PENDING = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="600" viewBox="0 0 400 600"><rect width="400" height="600" fill="%230b1728"/><rect x="20" y="20" width="360" height="560" rx="16" fill="%2311223b" stroke="%23d97706" stroke-width="2"/><text x="200" y="80" font-family="sans-serif" font-size="20" font-weight="bold" fill="%23fbbf24" text-anchor="middle">SADAPAY RECEIPT</text><text x="200" y="110" font-family="sans-serif" font-size="13" fill="%2394a3b8" text-anchor="middle">Transfer to 0333-9729600</text><line x1="40" y1="130" x2="360" y2="130" stroke="%23334155" stroke-dasharray="4"/><text x="50" y="180" font-family="sans-serif" font-size="14" fill="%2394a3b8">Amount:</text><text x="350" y="180" font-family="sans-serif" font-size="22" font-weight="bold" fill="%23fbbf24" text-anchor="end">PKR 2,200.00</text><text x="50" y="230" font-family="sans-serif" font-size="14" fill="%2394a3b8">Receiver:</text><text x="350" y="230" font-family="sans-serif" font-size="13" font-weight="bold" fill="%23ffffff" text-anchor="end">Abdul Mohaimen</text><text x="50" y="280" font-family="sans-serif" font-size="14" fill="%2394a3b8">Account:</text><text x="350" y="280" font-family="sans-serif" font-size="14" font-family="monospace" fill="%23fbbf24" text-anchor="end">0333-9729600</text><text x="50" y="330" font-family="sans-serif" font-size="14" fill="%2394a3b8">Status:</text><text x="350" y="330" font-family="sans-serif" font-size="14" font-weight="bold" fill="%2322c55e" text-anchor="end">TRANSFERRED</text><text x="50" y="380" font-family="sans-serif" font-size="14" fill="%2394a3b8">Date &amp; Time:</text><text x="350" y="380" font-family="sans-serif" font-size="13" fill="%23e2e8f0" text-anchor="end">22 Oct 2026, 04:12 PM</text><rect x="50" y="440" width="300" height="80" rx="8" fill="%230b1728" stroke="%23fbbf24"/><text x="200" y="475" font-family="sans-serif" font-size="14" font-weight="bold" fill="%23fbbf24" text-anchor="middle">&#9203; PENDING VERIFICATION</text><text x="200" y="500" font-family="sans-serif" font-size="12" fill="%2394a3b8" text-anchor="middle">Verification by CCS Desk</text></svg>';

export const INITIAL_REGISTRATIONS: Registration[] = [
  {
    id: 'reg-001',
    name: 'Muhammad Hamza Khan',
    email: 'hamza.uet22@gmail.com',
    section: 'CS-8A',
    semester: '8th Semester (Graduating)',
    cnic: '17301-4920194-3',
    paymentScreenshot: SAMPLE_RECEIPT_APPROVED,
    paymentMethod: 'sadapay',
    transactionId: 'TRX-9482018471',
    amount: 2200,
    status: 'approved',
    passCode: 'CCS-WF-8241',
    verificationHash: 'V8241-UETP-CS8A',
    submittedAt: '2026-10-21 14:32',
    reviewedAt: '2026-10-21 16:10',
    reviewedBy: 'Vice President CCS',
    checkedIn: false
  },
  {
    id: 'reg-002',
    name: 'Ayesha Siddiqui',
    email: 'ayesha.siddiqui@uetpeshawar.edu.pk',
    section: 'CS-2B',
    semester: '2nd Semester (Freshman/Welcome)',
    cnic: '17301-8192044-8',
    paymentScreenshot: SAMPLE_RECEIPT_PENDING,
    paymentMethod: 'sadapay',
    transactionId: 'JC-772910385',
    amount: 2200,
    status: 'pending',
    passCode: 'CCS-WF-4190',
    verificationHash: 'V4190-UETP-CS2B',
    submittedAt: '2026-10-22 09:15',
    checkedIn: false
  },
  {
    id: 'reg-003',
    name: 'Bilal Ahmed Afridi',
    email: 'bilal.afridi@gmail.com',
    section: 'CS-8B',
    semester: '8th Semester (Graduating)',
    cnic: '17301-1928374-1',
    paymentScreenshot: SAMPLE_RECEIPT_APPROVED,
    paymentMethod: 'meezan_bank',
    transactionId: 'MEZ-38291048',
    amount: 2200,
    status: 'approved',
    passCode: 'CCS-WF-9904',
    verificationHash: 'V9904-UETP-CS8B',
    submittedAt: '2026-10-20 18:40',
    reviewedAt: '2026-10-20 19:20',
    reviewedBy: 'General Secretary CCS',
    checkedIn: true,
    checkedInAt: '2026-10-22 10:30'
  },
  {
    id: 'reg-004',
    name: 'Zainab Noor',
    email: 'zainab.noor99@gmail.com',
    section: 'SE-4A',
    semester: '4th Semester',
    cnic: '17301-6543219-4',
    paymentScreenshot: SAMPLE_RECEIPT_PENDING,
    paymentMethod: 'easypaisa',
    transactionId: 'EP-55194028',
    amount: 2200,
    status: 'pending',
    passCode: 'CCS-WF-1358',
    verificationHash: 'V1358-UETP-SE4A',
    submittedAt: '2026-10-22 11:20',
    checkedIn: false
  }
];

const STORAGE_KEY = 'ccs_event_registrations_v2';

export function getStoredRegistrations(): Registration[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_REGISTRATIONS));
      return INITIAL_REGISTRATIONS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INITIAL_REGISTRATIONS;
  } catch {
    return INITIAL_REGISTRATIONS;
  }
}

export function saveStoredRegistrations(registrations: Registration[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(registrations));
  } catch (err) {
    console.error('Failed to save registrations', err);
  }
}

export function generateUniquePassCode(): string {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `CCS-WF-${randomNum}`;
}

export function generateVerificationHash(code: string, cnic: string): string {
  const cleanCnic = cnic.replace(/\D/g, '').slice(-4);
  return `${code}-${cleanCnic}-VERIFIED`;
}
