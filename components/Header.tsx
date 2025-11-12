'use client';

import { Button } from '@/components/ui/button';
import { Car, Menu, X, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

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

  const navItems = [
    { name: 'Services', id: 'services' },
    { name: 'Solutions', id: 'content' },
    { name: 'Demo', id: 'demo' },
    { name: 'Contact', id: 'enquiry' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
      {/* Gradient background with blur */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200/50"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-2 rounded-lg shadow-md">
              <Car className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-slate-900">AutoLab</span>
              <span className="text-xs text-slate-500 -mt-1">Automotive Management</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <button 
                key={index}
                onClick={() => scrollToSection(item.id)} 
                className={`px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all font-medium ${index === navItems.length - 1 ? 'mr-2' : ''}`}
              >
                {item.name}
              </button>
            ))}
            <Button 
              onClick={() => scrollToSection('enquiry')} 
              className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white shadow-md hover:shadow-lg transition-all px-6"
              size={scrolled ? "default" : "lg"}
            >
              Book a Demo
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-slate-700" />
            ) : (
              <Menu className="h-6 w-6 text-slate-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-1 absolute left-0 right-0 top-full bg-white shadow-lg rounded-b-lg border-t border-slate-100 mt-2 overflow-hidden">
            {navItems.map((item, index) => (
              <button 
                key={index}
                onClick={() => scrollToSection(item.id)} 
                className="flex w-full text-left px-6 py-3 text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors"
              >
                <span>{item.name}</span>
                <ChevronRight className="ml-auto h-5 w-5 text-slate-400" />
              </button>
            ))}
            <div className="px-4 pt-3 pb-4">
              <Button 
                onClick={() => scrollToSection('enquiry')} 
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white py-6"
              >
                Book a Demo
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
