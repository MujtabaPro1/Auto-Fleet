'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function VideoSection() {
  const serviceItems = [
    {
      image: '/image-1-full.png',
      title: 'Instant Car Valuation',
      subtitle: 'Instant online valuations on each unique car, powered by AI & Live Market Data',
      ctaText: 'Get a Quote'
    },
    {
      image: '/image-9.png',
      title: 'Full Inspection Reports',
      subtitle: 'Create, edit & maintain full Inspection Reports of any car',
      ctaText: 'View Services'
    },
    // {
    //   image: '/image-3.png',
    //   title: 'Buy, Sell or Trade-In',
    //   subtitle: 'Maintain optionality. All under one roof',
    //   ctaText: 'Explore Options'
    // },
    {
      image: '/image-7.png',
      title: 'AI Car Studio',
      subtitle: 'AI Powered Car Studio',
      ctaText: 'Explore Options'
    },
  ];
  
  const scrollToDemo = () => {
    document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="demo" className="py-20 px-4 sm:px-6 lg:px-8 bg-white scroll-mt-16">
      <div className="container mx-auto max-w-8xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">Our Services in Action</h2>
          <p className="text-xl text-slate-600">
            See how our premium car services transform your driving experience
          </p>
        </div>
        <div className="mb-12 mx-auto">
          {/* Service cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {serviceItems.map((item, index) => (
              <div key={index} className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all flex flex-col">
                {/* Image container with fixed height */}
                <div className="relative h-[20rem]">
                  <img 
                    src={item.image} 
                    alt={`${item.title} showcase`} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                {/* Content container */}
                <div className="p-6 flex flex-col flex-grow bg-white">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 mb-4 flex-grow">{item.subtitle}</p>
                  <Button 
                    onClick={scrollToDemo} 
                    variant="outline" 
                    className="border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white transition-colors"
                  >
                    {item.ctaText}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center">
          <Button onClick={scrollToDemo} size="lg" className="bg-slate-900 hover:bg-slate-800 text-lg px-8 py-6">
            Book Your Free Demo
          </Button>
        </div>
      </div>
    </section>
  );
}
