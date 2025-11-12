'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Mail, Phone, Building2, MessageSquare, Earth, Calendar, CheckCircle2, ArrowRight, Shield, Clock } from 'lucide-react';

export default function EnquiryForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    country: '',
    businessType: 'dealership'
  });
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      
      const message = `Hi 👋 ! I would like to book my FREE Demo! How may we proceed?.\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCompany: ${formData.company || 'N/A'}\nCountry: ${formData.country || 'N/A'}\nBusiness Type: ${formData.businessType}\nMessage: ${formData.message || 'N/A'}`;
      
      const encodedMessage = encodeURIComponent(message);
      
      // Open WhatsApp with the provided number and message
      const whatsappURL = `https://wa.me/971585767459?text=${encodedMessage}`;
      window.open(whatsappURL, '_blank');
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const businessTypes = [
    { value: 'dealership', label: 'Car Dealership' },
    { value: 'auction', label: 'Auto Auction House' },
    { value: 'inspection', label: 'Inspection Service' },
    { value: 'rental', label: 'Car Rental' },
    { value: 'other', label: 'Other Automotive Business' }
  ];

  return (
    <section id="enquiry" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-800 text-white scroll-mt-16 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-10"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900/30 text-blue-300 rounded-full text-sm font-medium mb-6">
            <Calendar className="h-4 w-4" />
            <span>Schedule Your Personalized Demo</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">Get Started Today</h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Book your free demo and discover how our platform can transform your automotive business operations
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Left side - Benefits */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <span className="bg-blue-600/20 p-2 rounded-lg mr-3">
                  <CheckCircle2 className="h-6 w-6 text-blue-400" />
                </span>
                Why Choose AutoLab
              </h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center">
                      <Shield className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Enterprise-Grade Security</h4>
                    <p className="text-slate-300">Your data is protected with bank-level encryption and security protocols</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-purple-800 flex items-center justify-center">
                      <Clock className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Quick Implementation</h4>
                    <p className="text-slate-300">Be up and running in days, not months, with our streamlined onboarding</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-800 flex items-center justify-center">
                      <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Proven Results</h4>
                    <p className="text-slate-300">Our clients report an average 35% increase in operational efficiency</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-700/50">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className={`w-8 h-8 rounded-full border-2 border-slate-800 bg-gradient-to-br from-blue-${i*100} to-purple-${i*100}`}></div>
                    ))}
                  </div>
                  <div className="text-sm text-slate-300">
                    Trusted by <span className="font-semibold text-white">500+</span> automotive businesses
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map(i => (
                    <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-sm text-slate-300 ml-2">4.9/5 from 200+ reviews</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side - Form */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <Card className="bg-white/10 backdrop-blur-md border-slate-700/50 shadow-2xl overflow-hidden">
              <CardHeader className="border-b border-slate-700/50 bg-slate-800/50">
                <CardTitle className="text-2xl text-white">Request Your Free Demo</CardTitle>
                <CardDescription className="text-slate-300">
                  Complete the form below and our team will contact you within 24 hours
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-6">
                {submitted ? (
                  <div className="py-12 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-6">
                      <CheckCircle2 className="h-10 w-10 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Thank You!</h3>
                    <p className="text-slate-300 mb-4 max-w-md mx-auto">
                      Your request has been submitted successfully. You are being redirected to WhatsApp to continue the conversation with our team.
                    </p>
                    <div className="flex justify-center">
                      <Button 
                        onClick={() => setSubmitted(false)}
                        variant="outline"
                        className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
                      >
                        Submit Another Request
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    {step === 1 && (
                      <div className="space-y-6">
                        <div className="space-y-1">
                          <Label htmlFor="name" className="text-slate-200">Full Name *</Label>
                          <Input
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Smith"
                            className="h-12 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        
                        <div className="space-y-1">
                          <Label htmlFor="email" className="text-slate-200 flex items-center gap-2">
                            <Mail className="h-4 w-4 text-blue-400" /> Email Address *
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@company.com"
                            className="h-12 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        
                        <div className="space-y-1">
                          <Label htmlFor="phone" className="text-slate-200 flex items-center gap-2">
                            <Phone className="h-4 w-4 text-blue-400" /> Phone Number *
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+1 (555) 000-0000"
                            className="h-12 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        
                        <div className="pt-4">
                          <Button 
                            type="button" 
                            onClick={nextStep}
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white py-6 rounded-lg text-lg font-medium"
                          >
                            Continue
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Button>
                          <p className="text-xs text-slate-400 text-center mt-4 flex items-center justify-center">
                            <Shield className="h-3 w-3 mr-1" />
                            Your information is secure and will not be shared
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {step === 2 && (
                      <div className="space-y-6">
                        <div className="space-y-1">
                          <Label htmlFor="company" className="text-slate-200 flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-blue-400" /> Company Name
                          </Label>
                          <Input
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Your Company"
                            className="h-12 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        
                        <div className="space-y-1">
                          <Label htmlFor="country" className="text-slate-200 flex items-center gap-2">
                            <Earth className="h-4 w-4 text-blue-400" /> Country
                          </Label>
                          <Input
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            placeholder="Your Country"
                            className="h-12 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        
                        <div className="space-y-1">
                          <Label htmlFor="businessType" className="text-slate-200">Business Type</Label>
                          <select
                            id="businessType"
                            name="businessType"
                            value={formData.businessType}
                            onChange={handleChange}
                            className="w-full h-12 bg-slate-800/50 border-slate-700 text-white rounded-md focus:ring-blue-500 focus:border-blue-500"
                          >
                            {businessTypes.map((type) => (
                              <option key={type.value} value={type.value}>{type.label}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div className="space-y-1">
                          <Label htmlFor="message" className="text-slate-200">Tell Us About Your Needs</Label>
                          <Textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="What challenges are you looking to solve?"
                            rows={4}
                            className="resize-none bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        
                        <div className="flex gap-4 pt-4">
                          <Button 
                            type="button" 
                            onClick={prevStep}
                            variant="outline"
                            className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white py-6"
                          >
                            Back
                          </Button>
                          <Button 
                            type="submit" 
                            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white py-6 rounded-lg text-lg font-medium"
                            disabled={loading}
                          >
                            {loading ? (
                              <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                              </>
                            ) : (
                              <>Book Free Demo</>
                            )}
                          </Button>
                        </div>
                      </div>
                    )}
                  </form>
                )}
              </CardContent>
              
              <CardFooter className="border-t border-slate-700/50 bg-slate-800/30 flex justify-between items-center py-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm text-slate-300">24 people booked a demo today</span>
                </div>
                <div className="text-sm text-slate-300 flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-slate-400" />
                  <span>Response time: &lt;24hrs</span>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
