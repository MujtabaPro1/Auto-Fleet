'use client';
import React from 'react';
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
  Car,
  Scan,
  Users,
  FileText
} from 'lucide-react';

const features = [
  {
    icon: Database,
    title: 'Dealer Management System',
    emoji: '1️⃣'
  },
  {
    icon: ClipboardCheck,
    title: 'Vehicle Inspection Suite',
    emoji: '2️⃣'
  },
  {
    icon: BarChart3,
    title: 'AI Car Valuation Engine',
    emoji: '3️⃣'
  },
  {
    icon: Camera,
    title: 'Photo & 360 Capture Studio',
    emoji: '4️⃣'
  },
  {
    icon: Gavel,
    title: 'Auction Platform',
    emoji: '5️⃣'
  },
  {
    icon: AlertCircle,
    title: 'AI Damage Detection',
    emoji: '6️⃣'
  },
  {
    icon: Calendar,
    title: 'Seller Lead Booking',
    emoji: '7️⃣'
  },
  {
    icon: LineChart,
    title: 'Analytics & Reports',
    emoji: '8️⃣'
  },
  {
    icon: Globe,
    title: 'Website Enhancement & Digital Marketing',
    emoji: '9️⃣'
  },
  {
    icon: Store,
    title: 'Self Listing Portal',
    emoji: '🔟'
  }
];

export const FeatureHighlightsSection = ({onSelectItem}: {onSelectItem: (index: number) => void}) => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-100">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8">
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Managing your dealership on the go doesn't get any easier or faster than our fully integrated mobile solution. Oversee your deals, upload inventory, run vehicle history reports, communicate with customers, and more, right from your phone.
          </p>
        </div>
        
        <div className="relative mt-10">
          <div className="flex overflow-x-auto pb-6 snap-x snap-mandatory hide-scrollbar">
            <div className="flex gap-4 px-4 md:px-0 mx-auto">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  onClick={()=>{
                    onSelectItem(index);
                  }}
                  className="flex-none w-[15rem] snap-center cursor-pointer"
                >
                  <div className="bg-slate-900 text-white rounded-lg px-6 py-5 h-full flex flex-col items-center justify-center text-center  transition-all duration-300 shadow-md hover:shadow-lg">
                    <div className="font-medium text-sm">{feature.title}</div>
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
