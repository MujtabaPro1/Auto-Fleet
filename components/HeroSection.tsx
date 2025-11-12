'use client';

import { ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import AnimateOnScroll from './AnimateOnScroll';

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  const scrollToEnquiry = () => {
    document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth' });
  };

  const keyFeatures = [
    'AI-Powered Valuation',
    'Digital Inspections',
    'Inventory Management',
    'Auction Platform'
  ];

  return (
    <section className="relative mt-4 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Abstract background elements */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10"></div>
      </div>
      
      {/* Animated gradient orb */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Left side - Text content */}
          <div className="md:w-[50%] text-left">
            <div className={`inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium mb-6 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
              <Sparkles className="h-4 w-4" />
              <span>Next-Generation Automotive Solutions</span>
            </div>
            
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight ${isLoaded ? 'animate-fade-in delay-100' : 'opacity-0'}`}>
              Transform Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 animate-gradient">Automotive Business</span> With Our Platform
            </h1>
            
            <p className={`text-xl text-slate-300 mb-8 leading-relaxed ${isLoaded ? 'animate-fade-in delay-200' : 'opacity-0'}`}>
              A comprehensive white-label solution that streamlines inspections, valuations, auctions, and inventory management—designed for dealerships that demand excellence.
            </p>

            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 ${isLoaded ? 'animate-fade-in delay-300' : 'opacity-0'}`}>
              {keyFeatures.map((feature, index) => (
                <div key={index} className={`flex items-center gap-2 ${isLoaded ? `animate-slide-in-left delay-${300 + (index * 100)}` : 'opacity-0'}`}>
                  <CheckCircle className="h-5 w-5 text-blue-400" />
                  <span className="text-slate-200">{feature}</span>
                </div>
              ))}
            </div>

            <div className={`flex flex-col sm:flex-row gap-4 ${isLoaded ? 'animate-fade-in delay-700' : 'opacity-0'}`}>
              <Button 
                onClick={scrollToEnquiry}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-lg text-lg font-medium shadow-lg hover:shadow-blue-500/20 transition-all animate-pulse duration-1000"
              >
                Book a Free Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                className="border-slate-600 text-black hover:bg-slate-700 px-8 py-6 rounded-lg text-lg font-medium"
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Services
              </Button>
            </div>
          </div>
          
          {/* Right side - App mockup image */}
          <div className="md:w-[50%] mt-8 md:mt-0">
            <div className={`relative ${isLoaded ? 'animate-scale-up delay-300' : 'opacity-0'}`}>
              {/* Glowing effect behind the image */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-30 animate-pulse"></div>
              
              {/* Main image with glass effect */}
              <div className="relative bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50 backdrop-blur-sm shadow-2xl transform transition-all duration-700 hover:scale-[1.02] hover:rotate-1">
                <img 
                  src="banner-rembg.png" 
                  alt="Automotive Management Platform Interface" 
                  className="w-full h-auto object-contain relative z-10 drop-shadow-2xl"
                />
                
                {/* Stats overlay */}
                <div className={`absolute -bottom-6 -right-6 bg-slate-800/90 backdrop-blur-md px-6 py-4 rounded-xl border border-slate-700/50 shadow-xl ${isLoaded ? 'animate-slide-in-right delay-700' : 'opacity-0'}`}>
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-slate-400 text-sm">Efficiency Increase</p>
                      <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 animate-gradient">+45%</p>
                    </div>
                    <div className="h-10 w-0.5 bg-slate-700"></div>
                    <div>
                      <p className="text-slate-400 text-sm">Time Saved</p>
                      <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 animate-gradient">12hrs/week</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
