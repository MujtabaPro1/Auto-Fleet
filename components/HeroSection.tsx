'use client';

import { Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative mt-4 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100"></div>
      <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] bg-[size:32px_32px]"></div>
      
      <div className="container mx-auto max-w-7xl relative z-10 pt-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-16">
          {/* Left side - Text content */}
          <div className="md:w-[45%] text-left">
            <div className="inline-flex items-center gap-2 px-5 py-3 bg-slate-900 text-white rounded-full text-md font-medium mb-8 shadow-lg">
              <span className="text-lg">Automotive Management Platform</span>
            </div>
            
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto md:mx-0 font-light">
              A complete white-label platform for Car Inspections, Appointment Bookings, AI Valuations, Auctions, and Inventory Management — built for scalability across markets.
            </p>

          </div>
          
          {/* Right side - App mockup image */}
          <div className="md:w-[55%] mt-0 lg:mt-8 md:mt-0">
            <div className="relative bg-white p-2 rounded-lg shadow-xl">
              <img 
                src="https://placehold.co/400x200" 
                alt="Automotive Management Platform Interface" 
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
