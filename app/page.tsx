import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import WhatWeDoSection from '@/components/WhatWeDoSection';
import HowWeDoItSection from '@/components/HowWeDoItSection';
import VideoSection from '@/components/VideoSection';
import EnquiryForm from '@/components/EnquiryForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <WhatWeDoSection />
        <HowWeDoItSection />
        <VideoSection />
        <EnquiryForm />
      </main>
      <Footer />
    </div>
  );
}
