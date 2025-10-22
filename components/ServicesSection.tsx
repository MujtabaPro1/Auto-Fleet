import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Calculator, 
  Database, 
  CalendarCheck, 
  Store, 
  ClipboardCheck, 
  FileText, 
  Image, 
  MessageSquare 
} from 'lucide-react';

const services = [
  {
    icon: Calculator,
    title: 'AI Car Valuation',
    description: 'Advanced algorithms that provide accurate and market-competitive vehicle valuations in real-time.',
  },
  {
    icon: Database,
    title: 'CMS',
    description: 'Comprehensive content management system for efficient inventory and business operations.',
  },
  {
    icon: CalendarCheck,
    title: 'Appointment Management System',
    description: 'Streamlined scheduling solution for managing customer appointments and service bookings.',
  },
  {
    icon: Store,
    title: 'Direct Listing | Seller Platform',
    description: 'User-friendly platform enabling sellers to list and market their vehicles directly to potential buyers.',
  },
  {
    icon: ClipboardCheck,
    title: 'Inspection Reporting',
    description: 'Detailed vehicle inspection tools that document condition, features, and maintenance requirements.',
  },
  {
    icon: FileText,
    title: 'Valuation Reporting',
    description: 'Comprehensive reports that break down vehicle valuations with market comparisons and data insights.',
  },
  {
    icon: Image,
    title: 'Image Masking',
    description: 'Advanced image processing technology to enhance vehicle photos and highlight key features.',
  },
  {
    icon: MessageSquare,
    title: 'Query Management',
    description: 'Efficient system for tracking, prioritizing, and resolving customer inquiries and support requests.',
  },
];

export default function ServicesSection() {
  return (
    <section id="client-services" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 scroll-mt-16">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">Our Services</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Comprehensive solutions we offer to transform your automotive business
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="border hover:border-slate-300 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-slate-100 mb-4">
                  <service.icon className="h-6 w-6 text-slate-900" />
                </div>
                <CardTitle className="text-lg">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
