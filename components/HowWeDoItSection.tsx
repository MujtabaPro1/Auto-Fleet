import { CircleCheck as CheckCircle2 } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'API-First Integration',
    description: 'Our Platform integrates seamlessly with your existing systems, ensuring a smooth transition without disruption, only enhancement.',
  },
  {
    number: '02',
    title: 'AI-Powered Intelligence',
    description: 'Machine learning algorithms analyze market trends, vehicle conditions, and pricing data to provide accurate evaluations and insights.',
  },
  {
    number: '03',
    title: 'Real-Time Automation',
    description: 'Automated workflows handle Inventory Updates, Appointment Scheduling & Auction Management - saving you valuable time.',
  },
  {
    number: '04',
    title: 'Scalable Infrastructure',
    description: 'Cloud-based architecture that grows with your business, handling everything from small dealerships to large fleet operations.',
  },
];

export default function HowWeDoItSection() {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 scroll-mt-16">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">How We Do It</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Our proven methodology ensures success at every step
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-6 bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-slate-900 text-white rounded-lg flex items-center justify-center text-2xl font-bold">
                  {step.number}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  {step.title}
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </h3>
                <p className="text-slate-600 text-lg leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
