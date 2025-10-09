'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, TrendingUp, Shield } from 'lucide-react';

export default function HeroSection() {
  const scrollToDemo = () => {
    document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100"></div>
      <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] bg-[size:32px_32px]"></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full text-sm font-medium mb-8 shadow-lg">
            <Sparkles className="h-4 w-4" />
            <span>Automotive Management Platform</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
          The Complete
            <span className="block bg-gradient-to-r from-slate-950 to-slate-600 bg-clip-text text-transparent px-1 py-2 my-1">
              Automotive Management Platform
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
          A complete white-label platform for Car Inspections, Appointment Bookings, AI Valuations, Auctions, and Inventory Management — built for scalability across markets.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button onClick={scrollToDemo} size="lg" className="bg-slate-900 hover:bg-slate-800 text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all">
              Book Free Demo <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} variant="outline" size="lg" className="text-lg px-8 py-6 border-2 hover:bg-slate-50">
              Explore Features
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-slate-200">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
              <Sparkles className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">AI-Powered</h3>
            <p className="text-slate-600">Buy & Sell with the power of Machine-learning models trained on real-world market data deliver instant, transparent car valuations.</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-slate-200">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Scalable</h3>
            <p className="text-slate-600">From single-site dealerships to nationwide platforms — grow seamlessly without changing systems.</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-slate-200">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-100 rounded-lg mb-4">
              <Shield className="h-6 w-6 text-slate-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Secure</h3>
            <p className="text-slate-600">Enterprise-grade encryption, data isolation, and compliance built into every layer.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
