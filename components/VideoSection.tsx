'use client';

import { Button } from '@/components/ui/button';
import { Play, ChevronRight, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function VideoSection() {
  const [activeVideo, setActiveVideo] = useState(0);
  
  const demoVideos = [
    {
      video: '/masking-tech-demo.mp4',
      thumbnail: 'masking.jpeg',
      title: 'Masking Technology',
      description: 'See how our advanced masking technology works to enhance vehicle images',
      color: 'from-blue-500 to-blue-700',
      duration: '2:15'
    },
    {
      video: '/ai-valuation-demo.mp4',
      thumbnail: 'ai.jpeg',
      title: 'AI Valuation Engine',
      description: 'Watch our AI valuation system provide instant, accurate pricing based on market data',
      color: 'from-purple-500 to-purple-700',
      duration: '1:45'
    },
    {
      video: '/inspection-module-demo.mp4',
      thumbnail: 'inspection.png',
      title: 'Digital Inspection Suite',
      description: 'Explore our comprehensive 120-point vehicle inspection process with photo tagging',
      color: 'from-emerald-500 to-emerald-700',
      duration: '3:20'
    },
    {
      video: '/dashboard-demo.mp4',
      thumbnail: 'dashboard.png',
      title: 'Management Dashboard',
      description: 'Tour our intuitive dealer management dashboard with real-time analytics and reporting',
      color: 'from-amber-500 to-amber-700',
      duration: '2:30'
    },
    {
      video: '/mobile-app-demo.mp4',
      thumbnail: 'app.jpeg',
      title: 'Mobile Application',
      description: 'See how our mobile app streamlines operations for on-the-go inspections and valuations',
      color: 'from-red-500 to-red-700',
      duration: '2:05'
    }
  ];
  
  const scrollToFeatures = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="demo" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white scroll-mt-16 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-10"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900/30 text-blue-300 rounded-full text-sm font-medium mb-6">
            <span>Interactive Demonstrations</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">Our Solutions in Action</h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            See how our enterprise automotive management platform transforms dealership operations
          </p>
        </div>
        
        <div className="mb-20">
          {/* Featured video player */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Main video display */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-slate-800 border border-slate-700/50">
                {/* Video thumbnail with play button overlay */}
                <div className="relative aspect-video bg-slate-800 overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 to-slate-900/80 z-10"></div>
                  
                  <img 
                    src={demoVideos[activeVideo].thumbnail} 
                    alt={`${demoVideos[activeVideo].title} preview`}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out" 
                  />
                  
                  {/* Play button with ripple effect */}
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="relative">
                      <div className="absolute -inset-4 rounded-full bg-white/10 animate-ping opacity-75"></div>
                      <div className="absolute -inset-8 rounded-full bg-white/5 animate-ping opacity-50 animation-delay-300"></div>
                      <button className="relative w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Play className="h-8 w-8 text-white fill-white ml-1" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Video info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-900 to-transparent z-20">
                    <h3 className="text-2xl font-bold mb-2">{demoVideos[activeVideo].title}</h3>
                    <p className="text-slate-300 mb-3">{demoVideos[activeVideo].description}</p>
                    <div className="flex items-center text-sm text-slate-400">
                      <span className="flex items-center">
                        <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {demoVideos[activeVideo].duration}
                      </span>
                      <span className="mx-3">•</span>
                      <span>HD Quality</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Video selection sidebar */}
            <div className="lg:col-span-1 order-1 lg:order-2">
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                <h4 className="text-lg font-medium mb-4 px-2">Featured Demos</h4>
                <div className="space-y-3">
                  {demoVideos.map((demo, index) => (
                    <div 
                      key={index} 
                      className={`rounded-lg cursor-pointer transition-all duration-300 ${activeVideo === index ? 'bg-slate-700/50 ring-1 ring-blue-500' : 'hover:bg-slate-800'}`}
                      onClick={() => setActiveVideo(index)}
                    >
                      <div className="flex items-center p-3">
                        <div className="flex-shrink-0 relative">
                          <div className="w-16 h-16 rounded-md overflow-hidden">
                            <img 
                              src={demo.thumbnail} 
                              alt={demo.title}
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          {activeVideo === index && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                                <Play className="h-3 w-3 text-white fill-white ml-0.5" />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="ml-3 flex-1">
                          <h5 className="font-medium text-sm">{demo.title}</h5>
                          <p className="text-xs text-slate-400 line-clamp-1">{demo.description}</p>
                          <span className="text-xs text-slate-500">{demo.duration}</span>
                        </div>
                        {activeVideo === index && <ChevronRight className="h-4 w-4 text-blue-400" />}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-slate-700/50">
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white"
                    onClick={() => document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Request Full Demo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <Button 
            onClick={scrollToFeatures} 
            variant="outline"
            className="border-slate-700 text-black hover:bg-slate-800 hover:text-white px-6 py-2"
          >
            Back to Services
          </Button>
        </div>
      </div>
      
      {/* Add custom CSS for animation delay */}
      <style jsx global>{`
        .animation-delay-300 {
          animation-delay: 300ms;
        }
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
