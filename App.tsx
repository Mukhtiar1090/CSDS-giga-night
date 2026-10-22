import React, { useState, useEffect } from 'react';
import { Registration } from './types';
import { getStoredRegistrations, saveStoredRegistrations } from './data/mockRegistrations';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeeAndPaymentSection } from './components/FeeAndPaymentSection';
import { HighlightsSection } from './components/HighlightsSection';
import { RegistrationSection } from './components/RegistrationSection';
import { FindPassSection } from './components/FindPassSection';
import { TicketPassModal } from './components/TicketPassModal';
import { EmailPreviewModal } from './components/EmailPreviewModal';
import { AdminApprovalPortal } from './components/AdminApprovalPortal';
import { GateScannerView } from './components/GateScannerView';
import { Footer } from './components/Footer';

export default function App() {
  const [registrations, setRegistrations] = useState<Registration[]>(() => getStoredRegistrations());
  const [currentView, setCurrentView] = useState<'portal' | 'admin' | 'scanner'>('portal');
  const [activePass, setActivePass] = useState<Registration | null>(null);
  const [activeEmail, setActiveEmail] = useState<Registration | null>(null);

  // Synchronize state with LocalStorage whenever registrations update
  useEffect(() => {
    saveStoredRegistrations(registrations);
  }, [registrations]);

  const pendingCount = registrations.filter(r => r.status === 'pending').length;

  const handleRegisterSuccess = (newReg: Registration) => {
    setRegistrations(prev => [newReg, ...prev]);
  };

  const handleApprove = (id: string) => {
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    setRegistrations(prev =>
      prev.map(item => {
        if (item.id === id) {
          const updated: Registration = {
            ...item,
            status: 'approved',
            reviewedAt: dateStr,
            reviewedBy: 'CCS Finance Executive'
          };
          if (activePass?.id === id) setActivePass(updated);
          return updated;
        }
        return item;
      })
    );
  };

  const handleReject = (id: string, reason: string) => {
    setRegistrations(prev =>
      prev.map(item => {
        if (item.id === id) {
          const updated: Registration = {
            ...item,
            status: 'rejected',
            rejectionReason: reason
          };
          if (activePass?.id === id) setActivePass(updated);
          return updated;
        }
        return item;
      })
    );
  };

  const handleSendEmail = (id: string) => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    setRegistrations(prev =>
      prev.map(item => {
        if (item.id === id) {
          const updated: Registration = {
            ...item,
            emailSent: true,
            emailSentAt: timeStr
          };
          if (activeEmail?.id === id) setActiveEmail(updated);
          if (activePass?.id === id) setActivePass(updated);
          return updated;
        }
        return item;
      })
    );
  };

  const handleToggleCheckIn = (id: string) => {
    const timeStr = new Date().toLocaleTimeString();
    setRegistrations(prev =>
      prev.map(item => {
        if (item.id === id) {
          const newCheckedIn = !item.checkedIn;
          const updated: Registration = {
            ...item,
            checkedIn: newCheckedIn,
            checkedInAt: newCheckedIn ? timeStr : undefined
          };
          if (activePass?.id === id) setActivePass(updated);
          return updated;
        }
        return item;
      })
    );
  };

  const scrollToSection = (id: string) => {
    if (currentView !== 'portal') {
      setCurrentView('portal');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#070e18] text-slate-100 flex flex-col font-sans">
      {/* Navbar with 3-zone contract & portal switcher */}
      <Navbar
        currentView={currentView}
        onViewChange={setCurrentView}
        pendingCount={pendingCount}
      />

      <main className="flex-1">
        {currentView === 'portal' && (
          <>
            {/* Hero Section */}
            <HeroSection
              onRegisterClick={() => scrollToSection('register')}
              onTrackClick={() => scrollToSection('track')}
            />

            {/* Fee & Payment Section (Rs. 2,200 per head & accounts) */}
            <FeeAndPaymentSection />

            {/* Highlights (Concert, BBQ Dinner, Awards, Skits) */}
            <HighlightsSection />

            {/* Registration Form with 6 mandatory fields & Screenshot Upload */}
            <RegistrationSection
              onRegistrationSuccess={handleRegisterSuccess}
              onOpenPass={(reg) => setActivePass(reg)}
            />

            {/* Attendee Self-Service: Find My Pass & Check Status */}
            <FindPassSection
              registrations={registrations}
              onOpenPass={(reg) => setActivePass(reg)}
            />
          </>
        )}

        {currentView === 'admin' && (
          <AdminApprovalPortal
            registrations={registrations}
            onApprove={handleApprove}
            onReject={handleReject}
            onViewPass={(reg) => setActivePass(reg)}
            onViewEmail={(reg) => setActiveEmail(reg)}
            onToggleCheckIn={handleToggleCheckIn}
          />
        )}

        {currentView === 'scanner' && (
          <GateScannerView
            registrations={registrations}
            onCheckIn={(id) => handleToggleCheckIn(id)}
            onViewPass={(reg) => setActivePass(reg)}
          />
        )}
      </main>

      {/* Global E-Pass Modal */}
      <TicketPassModal
        registration={activePass}
        onClose={() => setActivePass(null)}
        onOpenEmail={(reg) => {
          setActivePass(null);
          setActiveEmail(reg);
        }}
      />

      {/* Global Confirmation Email Preview Modal */}
      <EmailPreviewModal
        registration={activeEmail}
        onClose={() => setActiveEmail(null)}
        onSendEmail={handleSendEmail}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
