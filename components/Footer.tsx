import { Car } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-start flex-col space-x-2 mb-4 md:mb-0">
            <div className="flex items-center space-x-2">
              <Car className="h-8 w-8" />
              <span className="text-xl font-bold">AutoLab</span>
            </div>
            <p className="text-slate-400">
            Autolab is a global SaaS platform operated by CarsAreUs (Pty) Ltd, South Africa.
            </p>
          </div>
          <p className="text-slate-400">
            © {new Date().getFullYear()} AutoLab. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
