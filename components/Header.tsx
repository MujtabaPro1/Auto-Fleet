'use client';

import { Button } from '@/components/ui/button';
import { Car } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll event to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b transition-all duration-300 ${scrolled ? 'h-14' : 'h-16'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center space-x-2">
            <Car className={`${scrolled ? 'h-6 w-6' : 'h-8 w-8'} text-slate-900 transition-all duration-300`} />
            <span className={`${scrolled ? 'text-lg' : 'text-xl'} font-bold text-slate-900 transition-all duration-300`}>AutoLab</span>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <button onClick={() => scrollToSection('services')} className="text-slate-600 hover:text-slate-900 transition-colors font-medium">
              Services
            </button>
            <button onClick={() => scrollToSection('how-it-works')} className="text-slate-600 hover:text-slate-900 transition-colors font-medium">
              How It Works
            </button>
            <button onClick={() => scrollToSection('demo')} className="text-slate-600 hover:text-slate-900 transition-colors font-medium">
              Demo
            </button>
            <Button 
              onClick={() => scrollToSection('enquiry')} 
              className="bg-slate-900 hover:bg-slate-800 shadow-md hover:shadow-lg transition-all"
              size={scrolled ? "sm" : "default"}
            >
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
          <div className="md:hidden py-3 space-y-2 border-t absolute left-0 right-0 bg-white shadow-lg">
            <button onClick={() => scrollToSection('services')} className="block w-full text-left px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50">
              Services
            </button>
            <button onClick={() => scrollToSection('how-it-works')} className="block w-full text-left px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50">
              How It Works
            </button>
            <button onClick={() => scrollToSection('demo')} className="block w-full text-left px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50">
              Demo
            </button>
            <div className="px-4 pt-2 pb-3">
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
