'use client';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import { FeatureHighlightsSection } from '@/components/FeatureHighlightsSection';
import WhatWeDoSection from '@/components/WhatWeDoSection';
import HowWeDoItSection from '@/components/HowWeDoItSection';
import ServicesSection from '@/components/ServicesSection';
import VideoSection from '@/components/VideoSection';
import EnquiryForm from '@/components/EnquiryForm';
import Footer from '@/components/Footer';
import ContentSection from '@/components/Content';
import { useState } from 'react';
const featuresData = [
  {
    title: "Dealer Management System (DMS)",
    description:
      "Centralize Your Dealership Operations. Manage inventory, staff, leads, and transactions from one unified dashboard. AutoLab's DMS simplifies day-to-day management so you can focus on scaling your business, not chasing spreadsheets. Track stock, sales, and performance in real time. Assign roles, permissions, and workflows for multi-branch control. Seamless integration with inspections, valuation, and auctions.",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUwCJYSnbBLMEGWKfSnWRGC_34iCCKkxePpg&s"
  },
  {
    title: "Vehicle Inspection Suite",
    description:
      "Comprehensive Digital Vehicle Assessment. From minor details to major components, record every aspect of a vehicle's condition with precision. AutoLab's 120-point inspection workflow ensures transparency and speed, powered by photo tagging and automated reporting. Mobile and tablet-friendly interface for on-site inspections. Auto-generated inspection reports with integrated valuation. Easy sharing with sellers, dealers, or third-party clients.",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUwCJYSnbBLMEGWKfSnWRGC_34iCCKkxePpg&s"
  },
  {
    title: "AI Car Valuation Engine",
    description:
      "Instant, Intelligent Market Valuations. AutoLab's proprietary AI valuation engine processes real-time market data, mileage, and condition reports to deliver accurate and transparent car pricing within seconds. Adaptive pricing that learns from your local market trends. Instant trade-in, wholesale, and retail value ranges. Seamless tie-in with inspection and auction modules.",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUwCJYSnbBLMEGWKfSnWRGC_34iCCKkxePpg&s"
  },
  {
    title: "Photo & 360 Capture Studio",
    description:
      "Professional Imagery Made Effortless. Transform every listing with consistent, studio-grade photos and 360° vehicle views — all generated straight from your mobile device. AI background removal and auto-lighting correction. Guided capture ensures every photo meets your brand's standard. 360° spin and video exports ready for listings or social media.",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUwCJYSnbBLMEGWKfSnWRGC_34iCCKkxePpg&s"
  },
  {
    title: "Auction Platform",
    description:
      "Run Your Own Dealer Auctions — Anytime, Anywhere. Empower your network with a branded auction space where verified dealers can bid, buy, and sell in real time. Create live or timed auctions with dynamic bidding. Automated notifications for bid updates and closing offers. Full transaction tracking, reporting, and buyer management.",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUwCJYSnbBLMEGWKfSnWRGC_34iCCKkxePpg&s"
  },
  {
    title: "AI Damage Detection",
    description:
      "See What Others Miss. AutoLab's computer vision technology automatically detects scratches, dents, and anomalies in uploaded images, helping you price accurately and reduce disputes. AI highlights damage zones instantly after upload. Integrated with inspection and valuation workflows. Improves report accuracy and buyer confidence.",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUwCJYSnbBLMEGWKfSnWRGC_34iCCKkxePpg&s"
  },
  {
    title: "Seller Lead Booking",
    description:
      "Simplify Seller Scheduling and Intake. Capture and manage inbound leads from sellers directly through your branded website or app. Schedule inspections, trade-ins, or consultations seamlessly. Easy-to-use booking interface for sellers. Automated confirmations and reminders. Direct sync with inspection and DMS systems.",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUwCJYSnbBLMEGWKfSnWRGC_34iCCKkxePpg&s"
  },
  {
    title: "Analytics & Reports",
    description:
      "Turn Data Into Direction. Track performance metrics, pricing trends, and lead activity through a real-time analytics dashboard that puts your entire operation in focus. Visual charts for sales, inventory, and inspection KPIs. Export detailed reports in PDF or Excel. Customizable widgets for management or investor views.",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUwCJYSnbBLMEGWKfSnWRGC_34iCCKkxePpg&s"
  },
  {
    title: "Website Enhancement & Digital Marketing",
    description:
      "Elevate Your Online Presence. AutoLab integrates your inventory and listings directly into SEO-ready websites and digital ad campaigns to attract high-intent buyers. Automated listing feeds to your website and social platforms. Built-in SEO and performance tracking. Ready-to-launch website templates optimized for conversion.",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUwCJYSnbBLMEGWKfSnWRGC_34iCCKkxePpg&s"
  },
  {
    title: "Self-Listing Portal (Smart Vehicle Intake)",
    description:
      "Empower Sellers and Dealers to Upload Instantly. AutoLab's Smart Vehicle Intake lets users upload car details, photos, and inspection data directly into your system — keeping your stock fresh and consistent without manual effort. Guided upload process for accuracy and speed. Auto-syncs with valuation, inspection, and DMS modules. Optional approval workflow before listings go live.",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUwCJYSnbBLMEGWKfSnWRGC_34iCCKkxePpg&s"
  }
];

export default function Home() {
  const [index, setIndex] = useState(0);

  


  const USP = () => {
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
        
      </div>
    );
  } 

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeatureHighlightsSection  onSelectItem={(index: any) => {
            document.getElementById("content")?.scrollIntoView({ behavior: "smooth" });
            setIndex(index);
        }}
        />
        <WhatWeDoSection />
        <HowWeDoItSection />
        {USP()}
        {/* <ServicesSection /> */}
        <VideoSection />
        <EnquiryForm />

      </main>
      <Footer />
    </div>
  );
}
