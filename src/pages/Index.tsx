import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Dashboard from '@/components/Dashboard';
import CustomerManagement from '@/components/CustomerManagement';
import RevenueTracking from '@/components/RevenueTracking';
import ExpenseTracking from '@/components/ExpenseTracking';

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'customers':
        return <CustomerManagement />;
      case 'revenue':
        return <RevenueTracking />;
      case 'expenses':
        return <ExpenseTracking />;
      case 'settings':
        return <div className="p-6"><h2 className="text-2xl font-bold">Pengaturan - Coming Soon</h2></div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1">
        {renderSection()}
      </main>
    </div>
  );
};

export default Index;
