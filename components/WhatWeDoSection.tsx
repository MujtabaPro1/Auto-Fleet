import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Database, FileText, BrainCircuit, CalendarCheck, Store, Gavel } from 'lucide-react';

const services = [
  {
    icon: Database,
    title: 'CMS for Inventory Management',
    description: 'Powerful content management system to track, organize, and manage your entire vehicle inventory in real-time.',
  },
  {
    icon: FileText,
    title: 'Car Reporting System',
    description: 'Comprehensive reporting tools with analytics and insights to make data-driven decisions for your business.',
  },
  {
    icon: BrainCircuit,
    title: 'AI-Based Car Evaluation',
    description: 'Advanced AI algorithms that accurately assess vehicle conditions, market value, and provide instant appraisals.',
  },
  {
    icon: CalendarCheck,
    title: 'Appointment Booking Flow',
    description: 'Streamlined scheduling system that makes it easy for customers to book inspections, test drives, and consultations.',
  },
  {
    icon: Store,
    title: 'Seller Listing Platform',
    description: 'Intuitive platform for sellers to list their vehicles with detailed information, photos, and pricing.',
  },
  {
    icon: Gavel,
    title: 'Auction Platform',
    description: 'Dynamic auction system enabling competitive bidding and transparent transactions for buyers and sellers.',
  },
];

export default function WhatWeDoSection() {
  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-white scroll-mt-16">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">What We Do</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            A comprehensive suite of tools designed to transform your automotive operations
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="border-2 hover:border-slate-300 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <service.icon className="h-12 w-12 text-slate-900 mb-4" />
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
