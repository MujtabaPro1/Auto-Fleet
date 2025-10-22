'use client';
import React from "react";

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
  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-12 overflow-hidden">
      {/* Title at top - centered on mobile, left-aligned on desktop */}
      <div className="max-w-7xl mx-auto mb-10 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-2 relative">
          <span className="relative inline-block">
            {title}
            <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-blue-500 rounded-full"></span>
          </span>
        </h2>
      </div>
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16">
        {/* Left - Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center order-2 md:order-1 mt-8 md:mt-0">
          <p className="text-gray-700 text-lg mb-8 leading-relaxed">{description}</p>
          {buttonText && (
            <div className="mt-2">
              <button
                onClick={onButtonClick}
                className="inline-flex items-center px-6 py-3 bg-slate-900 text-white font-medium rounded-lg shadow-lg hover:bg-slate-800 hover:scale-105 transform transition-all duration-300 ease-in-out"
              >
                {buttonText}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Right - Image with animation */}
        <div className="w-full md:w-1/2 flex justify-center items-center order-1 md:order-2">
          <div className="relative w-full max-w-md transform hover:scale-105 transition-transform duration-500 ease-in-out">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg blur opacity-30"></div>
            <div className="relative bg-white p-2 rounded-lg shadow-xl">
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-auto object-cover rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentSection;