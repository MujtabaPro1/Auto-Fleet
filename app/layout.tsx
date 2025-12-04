import './globals.css';
import '../styles/animations.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster'


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AutoLab - Complete Car Automation Services | Inventory, Auctions & AI Evaluation',
  description: 'Professional car automation platform offering inventory management, AI-based evaluation, auction services, and appointment booking. Streamline your automotive business with our comprehensive CMS and reporting tools.',
  keywords: 'car inventory management, automotive CMS, car auction platform, AI car evaluation, vehicle appraisal, seller listing platform, car dealership software, automotive automation',
  openGraph: {
    title: 'AutoLab - Complete Car Automation Services',
    description: 'Professional car automation platform offering inventory management, AI-based evaluation, auction services, and appointment booking.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}
              <Toaster />
      </body>
    </html>
  );
}
