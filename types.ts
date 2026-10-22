export type RegistrationStatus = 'pending' | 'approved' | 'rejected';

export type PaymentMethod = 'sadapay' | 'easypaisa' | 'jazzcash' | 'meezan_bank' | 'cash_desk';

export interface Registration {
  id: string;
  name: string;
  email: string;
  section: string;
  semester: string;
  cnic: string;
  paymentScreenshot: string; // Base64 or image URL
  paymentMethod: PaymentMethod;
  transactionId?: string;
  amount: number; // 2200
  status: RegistrationStatus;
  passCode: string; // e.g., CCS-WF-7821
  verificationHash: string; // verification checksum
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
  checkedIn: boolean;
  checkedInAt?: string;
  emailSent?: boolean;
  emailSentAt?: string;
}

export interface PaymentAccountInfo {
  provider: string;
  accountTitle: string;
  accountNumber: string;
  iban?: string;
  instructions: string;
  badge: string;
}
