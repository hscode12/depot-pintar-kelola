import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Home, Users, DollarSign, TrendingUp, TrendingDown, Settings } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Navigation = ({ activeSection, onSectionChange }: NavigationProps) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'customers', label: 'Pelanggan', icon: Users },
    { id: 'revenue', label: 'Pendapatan', icon: TrendingUp },
    { id: 'expenses', label: 'Pengeluaran', icon: TrendingDown },
    { id: 'settings', label: 'Pengaturan', icon: Settings },
  ];

  return (
    <nav className="bg-card border-r border-border p-4 w-64 min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary">Depot Air Minum</h1>
        <p className="text-muted-foreground text-sm mt-1">Sistem Manajemen</p>
      </div>
      
      <div className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeSection === item.id ? "default" : "ghost"}
              className="w-full justify-start gap-3"
              onClick={() => onSectionChange(item.id)}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;