'use client';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import HowWeDoItSection from '@/components/HowWeDoItSection';
import VideoSection from '@/components/VideoSection';
import EnquiryForm from '@/components/EnquiryForm';
import Footer from '@/components/Footer';
import ContentSection from '@/components/Content';
import { useState, useEffect } from 'react';
import { FeatureHighlightsSection } from '@/components/FeatureHighlightsSection';
import { Track } from '@radix-ui/react-slider';

const featuresData = [
  {
    title: "Dealer Management System",
    description:
      "Manage inventory, staff, leads, and transactions from one unified dashboard. AutoLab’s DMS simplifies day-to-day management so you can focus on scaling your business, not chasing spreadsheets. Track stock, sales, and performance in real time. Assign roles, permissions, and workflows for multi-branch control. Seamless integration with inspections, valuation, and auctions.",
    imageUrl: "./detail.jpeg"
  },
  {
    title: "Vehicle Inspection Suite",
    description:
      "Comprehensive Digital Vehicle Assessment. From minor details to major components, record every aspect of a vehicle's condition with precision. AutoLab's 120-point inspection workflow ensures transparency and speed, powered by photo tagging and automated reporting. Mobile and tablet-friendly interface for on-site inspections. Auto-generated inspection reports with integrated valuation. Easy sharing with sellers, dealers, or third-party clients.",
    imageUrl: "./detail.jpeg"
  },
  {
    title: "AI Car Valuation Engine",
    description:
      "Instant, Intelligent Market Valuations. AutoLab's proprietary AI valuation engine processes real-time market data, mileage, and condition reports to deliver accurate and transparent car pricing within seconds. Adaptive pricing that learns from your local market trends. Instant trade-in, wholesale, and retail value ranges. Seamless tie-in with inspection and auction modules.",
    imageUrl: "./detail.jpeg"
  },
  {
    title: "Photo & 360 Capture Studio",
    description:
      "Professional Imagery Made Effortless. Transform every listing with consistent, studio-grade photos and 360° vehicle views — all generated straight from your mobile device. AI background removal and auto-lighting correction. Guided capture ensures every photo meets your brand's standard. 360° spin and video exports ready for listings or social media.",
    imageUrl: "./detail.jpeg"
  },
  {
    title: "Auction Platform",
    description:
      "Run Your Own Dealer Auctions — Anytime, Anywhere. Empower your network with a branded auction space where verified dealers can bid, buy, and sell in real time. Create live or timed auctions with dynamic bidding. Automated notifications for bid updates and closing offers. Full transaction tracking, reporting, and buyer management.",
    imageUrl: "./detail.jpeg"
  },
  {
    title: "AI Damage Detection",
    description:
      "See What Others Miss. AutoLab's computer vision technology automatically detects scratches, dents, and anomalies in uploaded images, helping you price accurately and reduce disputes. AI highlights damage zones instantly after upload. Integrated with inspection and valuation workflows. Improves report accuracy and buyer confidence.",
    imageUrl: "./detail.jpeg"
  },
  {
    title: "Seller Lead Booking",
    description:
      "Simplify Seller Scheduling and Intake. Capture and manage inbound leads from sellers directly through your branded website or app. Schedule inspections, trade-ins, or consultations seamlessly. Easy-to-use booking interface for sellers. Automated confirmations and reminders. Direct sync with inspection and DMS systems.",
    imageUrl: "./detail.jpeg"
  },
  {
    title: "Analytics & Reports",
    description:
      "Turn Data Into Direction. Track performance metrics, pricing trends, and lead activity through a real-time analytics dashboard that puts your entire operation in focus. Visual charts for sales, inventory, and inspection KPIs. Export detailed reports in PDF or Excel. Customizable widgets for management or investor views.",
    imageUrl: "./detail.jpeg"
  },
  {
    title: "Website Enhancement & Digital Marketing",
    description:
      "Elevate Your Online Presence. AutoLab integrates your inventory and listings directly into SEO-ready websites and digital ad campaigns to attract high-intent buyers. Automated listing feeds to your website and social platforms. Built-in SEO and performance tracking. Ready-to-launch website templates optimized for conversion.",
    imageUrl: "./detail.jpeg"
  },
  {
    title: "Self-Listing Portal (Smart Vehicle Intake)",
    description:
      "Empower Sellers and Dealers to Upload Instantly. AutoLab's Smart Vehicle Intake lets users upload car details, photos, and inspection data directly into your system — keeping your stock fresh and consistent without manual effort. Guided upload process for accuracy and speed. Auto-syncs with valuation, inspection, and DMS modules. Optional approval workflow before listings go live.",
    imageUrl: "./detail.jpeg"
  }
];

export default function Home() {
  const [index, setIndex] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Add scroll event listener to show/hide back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const USP = () => {
    console.log(index,featuresData[index].title);
    return (
      <div id="content">
        <ContentSection
          title={featuresData[index].title}
          description={featuresData[index].description}
          buttonText="Book Your Free Demo"
          imageUrl={featuresData[index].imageUrl}
          onButtonClick={() => {
            const whatsappURL = `https://wa.me/971585767459?text=I%20am%20interested%20in%20your%20product%20and%20would%20like%20to%20book%20a%20demo.%20Please%20provide%20me%20with%20more%20information.`;
            window.open(whatsappURL, '_blank');
          }}
        />
        <div className="text-center py-4">
          <button 
            onClick={() => scrollToFeatures()}
            className="inline-flex items-center px-6 py-3 bg-slate-900 text-white font-medium rounded-lg shadow-lg hover:bg-slate-800 hover:scale-105 transform transition-all duration-300 ease-in-out"
          >
            Back to Top
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>
    );
  } 

  const scrollToFeatures = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeatureHighlightsSection onSelectItem={(index: any) => {
            setIndex(index);
            document.getElementById("content")?.scrollIntoView({ behavior: "smooth" });
        }}
        />
        {/* HowWeDoItSection is hidden as per requirements */}
        {USP()}
        <VideoSection />
        <EnquiryForm />

        {/* Back to top floating button */}
        {showBackToTop && (
          <button 
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 bg-slate-900 text-white rounded-full shadow-lg hover:bg-slate-800 transition-all z-50"
            aria-label="Back to top"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        )}
      </main>
      <Footer />
    </div>
  );
}
