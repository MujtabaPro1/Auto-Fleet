'use client';
import React from "react";
import { ArrowRight, Check } from 'lucide-react';
import { Button } from './ui/button';

interface ContentSectionProps {
  title: string;
  description: string;
  buttonText?: string;
  imageUrl: string;
  onButtonClick?: () => void;
}

const ContentSection: React.FC<ContentSectionProps> = ({
  title,
  description,
  buttonText,
  imageUrl,
  onButtonClick,
}) => {
  // Function to bold key phrases in the description
  const formatDescription = (text: string) => {
    // Common terms that should be bolded in automotive management platform descriptions
    const termsToHighlight: string[] = [
      'AI', 'valuation', 'inspection', 'auction', 'inventory', 'management', 'analytics',
      'digital', 'platform', 'dashboard', 'real-time', 'seamless', 'integration'
    ];
    
    // Create a regex pattern that matches whole words only
    const pattern = new RegExp(`\\b(${termsToHighlight.join('|')})\\b`, 'gi');
    
    // Split by the pattern and map to JSX with bold elements
    const parts = text.split(pattern);
    const matches = text.match(pattern) || [];
    
    return parts.reduce((result: React.ReactNode[], part, i) => {
      result.push(part);
      if (i < matches.length) {
        result.push(<strong key={i} className="font-semibold text-slate-900">{matches[i]}</strong>);
      }
      return result;
    }, []);
  };

  // Extract key benefits from description
  const extractKeyPoints = (text: string): string[] => {
    const sentences = text.split('.');
    return sentences
      .filter(sentence => sentence.trim().length > 20 && sentence.trim().length < 100)
      .map(sentence => sentence.trim())
      .slice(0, 3);
  };

  const keyPoints = extractKeyPoints(description);

  return (
    <section className="w-full bg-gradient-to-b from-slate-50 to-white py-24 px-4 sm:px-6 lg:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Title with animated gradient underline */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 relative inline-block">
            {title}
            <div className="absolute -bottom-3 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full bg-[length:200%_auto] animate-gradient"></div>
          </h2>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left - Image with 3D effect and decorative elements */}
          <div className="w-full lg:w-1/2 flex justify-center items-center order-1 lg:order-1">
            <div className="relative w-full max-w-lg">
              {/* Decorative elements */}
              <div className="absolute -top-10 -left-10 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"></div>
              
              {/* Main image with 3D effect */}
              <div className="relative">
                {/* Shadow and glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur-md opacity-20"></div>
                
                {/* Image container with perspective */}
                <div className="relative bg-white p-3 rounded-xl shadow-2xl transform hover:scale-[1.02] hover:-rotate-1 transition-all duration-300 ease-out">
                  <div className="aspect-[4/3] overflow-hidden rounded-lg">
                    <img
                      src={imageUrl}
                      alt={title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
                    />
                  </div>
                  
                  {/* Feature badge */}
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    PREMIUM FEATURE
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content with enhanced typography and layout */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center order-2 lg:order-2">
            {/* Main description */}
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-slate-700 text-lg leading-relaxed mb-6">
                {formatDescription(description)}
              </p>
              
              {/* Key benefits with icons */}
              <div className="space-y-4 mb-8">
                {keyPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                    </div>
                    <p className="text-slate-700">{point}.</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* CTA button with enhanced styling */}
            {buttonText && (
              <div className="mt-4">
                <Button
                  onClick={onButtonClick}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 rounded-lg text-lg font-medium shadow-lg hover:shadow-blue-500/20 transition-all"
                >
                  {buttonText}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                {/* Trust indicator */}
                <p className="text-sm text-slate-500 mt-4 flex items-center">
                  <svg className="h-4 w-4 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Trusted by 500+ automotive businesses worldwide
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Add custom animation for gradient */}
      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default ContentSection;