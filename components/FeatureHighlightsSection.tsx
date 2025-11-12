'use client';
import React, { useState } from 'react';
import { 
  Database, 
  ClipboardCheck, 
  BarChart3, 
  Camera, 
  Gavel, 
  AlertCircle, 
  Calendar, 
  LineChart, 
  Globe, 
  Store,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { Button } from './ui/button';

const features = [
  {
    icon: Database,
    title: 'Dealer Management System',
    shortDesc: 'Unified dashboard for inventory, staff, and transactions',
    color: 'from-blue-500 to-blue-700',
    bgColor: 'from-blue-500/10 to-blue-700/10',
    iconBg: 'bg-blue-500/20',
    iconColor: 'text-blue-500'
  },
  {
    icon: ClipboardCheck,
    title: 'Vehicle Inspection Suite',
    shortDesc: 'Digital assessment with 120-point inspection workflow',
    color: 'from-emerald-500 to-emerald-700',
    bgColor: 'from-emerald-500/10 to-emerald-700/10',
    iconBg: 'bg-emerald-500/20',
    iconColor: 'text-emerald-500'
  },
  {
    icon: BarChart3,
    title: 'AI Car Valuation Engine',
    shortDesc: 'Real-time market data for accurate pricing',
    color: 'from-purple-500 to-purple-700',
    bgColor: 'from-purple-500/10 to-purple-700/10',
    iconBg: 'bg-purple-500/20',
    iconColor: 'text-purple-500'
  },
  {
    icon: Camera,
    title: 'Photo & 360 Capture Studio',
    shortDesc: 'Studio-grade photos from your mobile device',
    color: 'from-amber-500 to-amber-700',
    bgColor: 'from-amber-500/10 to-amber-700/10',
    iconBg: 'bg-amber-500/20',
    iconColor: 'text-amber-500'
  },
  {
    icon: Gavel,
    title: 'Auction Platform',
    shortDesc: 'Run your own dealer auctions anytime, anywhere',
    color: 'from-red-500 to-red-700',
    bgColor: 'from-red-500/10 to-red-700/10',
    iconBg: 'bg-red-500/20',
    iconColor: 'text-red-500'
  },
  {
    icon: AlertCircle,
    title: 'AI Damage Detection',
    shortDesc: 'Automatically detect scratches, dents, and anomalies',
    color: 'from-cyan-500 to-cyan-700',
    bgColor: 'from-cyan-500/10 to-cyan-700/10',
    iconBg: 'bg-cyan-500/20',
    iconColor: 'text-cyan-500'
  },
  {
    icon: Calendar,
    title: 'Seller Lead Booking',
    shortDesc: 'Seamless scheduling for inspections and consultations',
    color: 'from-indigo-500 to-indigo-700',
    bgColor: 'from-indigo-500/10 to-indigo-700/10',
    iconBg: 'bg-indigo-500/20',
    iconColor: 'text-indigo-500'
  },
  {
    icon: LineChart,
    title: 'Analytics & Reports',
    shortDesc: 'Real-time metrics and performance tracking',
    color: 'from-green-500 to-green-700',
    bgColor: 'from-green-500/10 to-green-700/10',
    iconBg: 'bg-green-500/20',
    iconColor: 'text-green-500'
  },
  {
    icon: Globe,
    title: 'Website Enhancement',
    shortDesc: 'SEO-ready websites and digital ad campaigns',
    color: 'from-pink-500 to-pink-700',
    bgColor: 'from-pink-500/10 to-pink-700/10',
    iconBg: 'bg-pink-500/20',
    iconColor: 'text-pink-500'
  },
  {
    icon: Store,
    title: 'Self Listing Portal',
    shortDesc: 'Let users upload car details directly into your system',
    color: 'from-orange-500 to-orange-700',
    bgColor: 'from-orange-500/10 to-orange-700/10',
    iconBg: 'bg-orange-500/20',
    iconColor: 'text-orange-500'
  }
];

export const FeatureHighlightsSection = ({onSelectItem}: {onSelectItem: (index: number) => void}) => {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  
  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-800 rounded-full text-sm font-medium mb-4">
            <span>Enterprise-Grade Solutions</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">Explore Our Services</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Comprehensive tools designed to streamline every aspect of automotive business operations
          </p>
        </div>
        
        {/* Featured categories - desktop grid view */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer"
              onClick={() => {
                onSelectItem(index);
                document.getElementById("content")?.scrollIntoView({ behavior: "smooth" });
              }}
              onMouseEnter={() => setActiveCategory(index)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} opacity-100 group-hover:opacity-100 transition-opacity duration-300`}></div>
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 to-slate-900/90 opacity-0 group-hover:opacity-90 transition-opacity duration-300"></div>
              
              <div className="relative p-8 h-full flex flex-col justify-between z-10">
                <div>
                  <div className={`${feature.iconBg} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                    <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-white mb-2 transition-colors duration-300">{feature.title}</h3>
                  <p className="text-slate-600 group-hover:text-slate-200 transition-colors duration-300">{feature.shortDesc}</p>
                </div>
                
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <div className="flex items-center text-white font-medium">
                    <span>Learn more</span>
                    <ChevronRight className="h-5 w-5 ml-1" />
                  </div>
                </div>
              </div>
              
              {/* Highlight border on hover/active */}
              <div className={`absolute inset-0 border-2 border-transparent rounded-2xl group-hover:border-${feature.color.split(' ')[0]} transition-colors duration-300 ${activeCategory === index ? `border-${feature.color.split(' ')[0]}` : ''}`}></div>
            </div>
          ))}
        </div>
        
        {/* Mobile carousel view */}
        <div className="md:hidden relative mt-6">
          <div className="flex overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
            <div className="flex gap-4 px-4 md:px-0">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  onClick={() => {
                    onSelectItem(index);
                    document.getElementById("content")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="flex-none w-[280px] snap-center"
                >
                  <div className="bg-white rounded-xl p-6 h-full flex flex-col shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300">
                    <div className={`${feature.iconBg} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                      <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                    <p className="text-slate-600 text-sm flex-1">{feature.shortDesc}</p>
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <Button 
                        variant="ghost" 
                        className={`text-${feature.color.split(' ')[0]} p-0 h-auto hover:bg-transparent hover:text-${feature.color.split(' ')[1]}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectItem(index);
                          document.getElementById("content")?.scrollIntoView({ behavior: "smooth" });
                        }}
                      >
                        <span>View details</span>
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add custom CSS for hiding scrollbar */}
      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
      `}</style>
    </section>
  );
}
