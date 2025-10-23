'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function VideoSection() {
  const demoVideos = [
    {
      video: '/masking-tech-demo.mp4',
      thumbnail: 'https://placehold.co/600x400',
      title: 'Masking Technology',
      description: 'See how our advanced masking technology works to enhance vehicle images'
    },
    {
      video: '/ai-valuation-demo.mp4',
      thumbnail: 'https://placehold.co/600x400',
      title: 'AI Valuation',
      description: 'Watch our AI valuation system provide instant, accurate pricing'
    },
    {
      video: '/inspection-module-demo.mp4',
      thumbnail: 'https://placehold.co/600x400',
      title: 'Inspection Module',
      description: 'Explore our comprehensive vehicle inspection process'
    },
    {
      video: '/dashboard-demo.mp4',
      thumbnail: 'https://placehold.co/600x400',
      title: 'Dashboard Overview',
      description: 'Tour our intuitive management dashboard'
    },
    {
      video: '/mobile-app-demo.mp4',
      thumbnail: 'https://placehold.co/600x400',
      title: 'Mobile Application',
      description: 'See how our mobile app streamlines operations on the go'
    }
  ];
  
  const scrollToFeatures = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="demo" className="py-20 px-4 sm:px-6 lg:px-8 bg-white scroll-mt-16">
      <div className="container mx-auto max-w-8xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">Our Services in Action</h2>
          <p className="text-xl text-slate-600">
            See how our premium automotive management solutions work in real-world scenarios
          </p>
        </div>
        
        <div className="mb-12 mx-auto">
          {/* Scrollable video carousel */}
          <div className="relative">
            <div className="flex overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
              <div className="flex gap-6 px-4 md:px-0">
                {demoVideos.map((demo, index) => (
                  <div 
                    key={index} 
                    className="flex-none w-[300px] md:w-[400px] snap-center cursor-pointer"
                  >
                    <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all h-[350px] md:h-[400px] flex flex-col">
                      {/* Video thumbnail with play button overlay - fixed height */}
                      <div className="relative h-[180px] md:h-[220px] bg-slate-100">
                        <img 
                          src={demo.thumbnail} 
                          alt={`${demo.title} preview`}
                          className="w-full h-full object-cover" 
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-20 transition-all">
                          <div className="w-16 h-16 rounded-full bg-white bg-opacity-80 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-900" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-white flex-1 flex flex-col">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{demo.title}</h3>
                        <p className="text-slate-600 text-sm flex-1">{demo.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <Button onClick={scrollToFeatures} className="bg-slate-900 hover:bg-slate-800 text-lg px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
            Back to Top
          </Button>
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
