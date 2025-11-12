'use client';

import React, { useEffect, useRef } from 'react';

interface AnimateOnScrollProps {
  children: React.ReactNode;
  animation: 'fade-in' | 'slide-in-left' | 'slide-in-right' | 'scale-up';
  delay?: number;
  threshold?: number;
  className?: string;
}

export default function AnimateOnScroll({
  children,
  animation,
  delay = 0,
  threshold = 0.1,
  className = '',
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-' + animation);
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -100px 0px',
      }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [animation, delay, threshold]);
  
  return (
    <div 
      ref={ref} 
      className={`opacity-0 ${className}`}
      style={{ willChange: 'opacity, transform' }}
    >
      {children}
    </div>
  );
}
