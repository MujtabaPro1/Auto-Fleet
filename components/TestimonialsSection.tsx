'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { Button } from './ui/button';

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  image: string;
  quote: string;
  rating: number;
  logo?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "Operations Director",
    company: "Premier Auto Group",
    image: "/testimonial-1.jpg",
    logo: "/logos/premier-auto.svg",
    quote: "AutoLab's platform has completely transformed how we manage our dealership operations. The AI valuation tool alone has increased our trade-in conversion rate by 40% and saved countless hours of manual appraisals.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "CEO",
    company: "EastWest Motors",
    image: "/testimonial-2.jpg",
    logo: "/logos/eastwest-motors.svg",
    quote: "The inspection module has standardized our entire process across multiple locations. Our customers appreciate the transparency, and we've seen a significant reduction in post-sale disputes.",
    rating: 5
  },
  {
    id: 3,
    name: "David Rodriguez",
    position: "Technology Officer",
    company: "AutoNation Plus",
    image: "/testimonial-3.jpg",
    logo: "/logos/autonation-plus.svg",
    quote: "We evaluated several automotive management platforms before choosing AutoLab. Their integration capabilities and intuitive interface made implementation across our 12 locations seamless.",
    rating: 4
  }
];

const clientLogos = [
  { name: "Premier Auto Group", logo: "/logos/premier-auto.svg" },
  { name: "EastWest Motors", logo: "/logos/eastwest-motors.svg" },
  { name: "AutoNation Plus", logo: "/logos/autonation-plus.svg" },
  { name: "CarMax Enterprise", logo: "/logos/carmax-enterprise.svg" },
  { name: "Global Motors", logo: "/logos/global-motors.svg" },
  { name: "Velocity Automotive", logo: "/logos/velocity-auto.svg" },
  { name: "DriveTime Solutions", logo: "/logos/drivetime.svg" },
  { name: "AutoEdge Systems", logo: "/logos/autoedge.svg" }
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-30"></div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-800 rounded-full text-sm font-medium mb-6">
            <Quote className="h-4 w-4" />
            <span>Customer Success Stories</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">Trusted by Industry Leaders</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            See what automotive businesses around the world are saying about our platform
          </p>
        </div>
        
        {/* Testimonials Carousel */}
        <div className="mb-20">
          <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left side - Testimonial content */}
              <div className="p-8 md:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-5 w-5 ${i < testimonials[activeIndex].rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'}`} 
                      />
                    ))}
                  </div>
                  
                  <blockquote className="text-xl md:text-2xl text-slate-700 font-light italic mb-8 relative">
                    <Quote className="absolute -top-4 -left-4 h-8 w-8 text-blue-100" />
                    "{testimonials[activeIndex].quote}"
                  </blockquote>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200">
                      <img 
                        src={testimonials[activeIndex].image || "https://via.placeholder.com/48"} 
                        alt={testimonials[activeIndex].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">{testimonials[activeIndex].name}</h4>
                      <p className="text-sm text-slate-600">
                        {testimonials[activeIndex].position}, {testimonials[activeIndex].company}
                      </p>
                    </div>
                  </div>
                  
                  {testimonials[activeIndex].logo && (
                    <div className="hidden md:block h-10 w-auto">
                      <img 
                        src={testimonials[activeIndex].logo} 
                        alt={`${testimonials[activeIndex].company} logo`}
                        className="h-full w-auto object-contain opacity-80"
                      />
                    </div>
                  )}
                </div>
              </div>
              
              {/* Right side - Image and navigation */}
              <div className="relative bg-slate-100 h-full min-h-[300px] lg:min-h-[400px]">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
                
                {/* Navigation controls */}
                <div className="absolute bottom-6 right-6 flex gap-2 z-10">
                  <Button 
                    onClick={prevTestimonial} 
                    variant="outline"
                    size="icon"
                    className="bg-white/80 backdrop-blur-sm border-slate-200 hover:bg-white hover:border-slate-300 h-10 w-10 rounded-full"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button 
                    onClick={nextTestimonial} 
                    variant="outline"
                    size="icon"
                    className="bg-white/80 backdrop-blur-sm border-slate-200 hover:bg-white hover:border-slate-300 h-10 w-10 rounded-full"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
                
                {/* Pagination indicator */}
                <div className="absolute top-6 right-6 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-slate-700">
                  {activeIndex + 1} / {testimonials.length}
                </div>
                
                {/* Image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src="/dashboard-preview.jpg" 
                    alt="AutoLab Platform Preview" 
                    className="w-full h-full object-cover opacity-90"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Client Logos */}
        <div>
          <h3 className="text-center text-lg font-medium text-slate-700 mb-8">Trusted by automotive businesses worldwide</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {clientLogos.map((client, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg p-6 flex items-center justify-center h-24 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <img 
                  src={client.logo || `https://via.placeholder.com/120x40?text=${client.name}`} 
                  alt={`${client.name} logo`}
                  className="max-h-10 max-w-full object-contain opacity-80 grayscale hover:grayscale-0 hover:opacity-100 transition-all"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
