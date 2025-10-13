'use client';

import { Button } from '@/components/ui/button';
import { Car } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-slate-900" />
            <span className="text-xl font-bold text-slate-900">AutoLab</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('services')} className="text-slate-600 hover:text-slate-900 transition-colors">
              Services
            </button>
            <button onClick={() => scrollToSection('how-it-works')} className="text-slate-600 hover:text-slate-900 transition-colors">
              How It Works
            </button>
            <button onClick={() => scrollToSection('demo')} className="text-slate-600 hover:text-slate-900 transition-colors">
              Demo
            </button>
            <Button onClick={() => scrollToSection('enquiry')} className="bg-slate-900 hover:bg-slate-800">
              Book Your Demo
            </Button>
          </nav>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t">
            <button onClick={() => scrollToSection('services')} className="block w-full text-left px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50">
              Services
            </button>
            <button onClick={() => scrollToSection('how-it-works')} className="block w-full text-left px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50">
              How It Works
            </button>
            <button onClick={() => scrollToSection('demo')} className="block w-full text-left px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50">
              Demo
            </button>
            <div className="px-4 pt-2">
              <Button onClick={() => scrollToSection('enquiry')} className="w-full bg-slate-900 hover:bg-slate-800">
                Book Your Demo
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
