"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

// Car data from images in public/cars folder
// Function to parse car details from filename
const parseCarDetails = (filename: string) => {
  // Remove file extension
  const nameWithoutExtension = filename.replace(/\.jpeg$|\.jpg$/i, '');
  
  // Split by hyphens
  const parts = nameWithoutExtension.split('-');
  
  // Extract make, model and year
  const make = parts[0];
  const year = parts[parts.length - 1];
  
  // Extract model (everything between make and year)
  const model = parts.slice(1, parts.length - 1).join(' ');
  
  return {
    make,
    model,
    year,
    fullName: `${year} ${make} ${model}`
  };
};

// Car image filenames from the public/cars folder
const CAR_IMAGES = [
  "Dodge-Charger-SXT-2019.jpeg",
  "Genesis-G70-2023.jpeg",
  "Hyundai-Santa-Fe-2024.jpeg",
  "Isuzu-DMAX-2025.jpeg",
  "Mitsubishi-L200-2023.jpeg",
  "Nissan-Armada-2021.jpeg",
  "Nissan-Pathfinder-2015.jpeg",
  "Peugeot-3008-2023.jpeg",
  "Tesla-Mode-Y-2024.jpeg",
  "Toyota-Land-Cruiser-2025.jpeg",
  "Volkswagen-Atlas-2018.jpeg"
];

// Generate car data from images
const CARS = CAR_IMAGES.map((image, index) => {
  const carDetails = parseCarDetails(image);
  const basePrice = 70000 + Math.floor(Math.random() * 50000);
  const highestBid = basePrice + Math.floor(Math.random() * 5000);
  const lowestBid = basePrice - Math.floor(Math.random() * 3000);
  
  // Random hours for auction end time (between 12 and 48 hours)
  const hoursRemaining = 12 + Math.floor(Math.random() * 36);
  
  // Generate random bids
  const bidCount = 3;
  const bids = [];
  for (let i = 0; i < bidCount; i++) {
    const amount = i === 0 ? highestBid : (i === bidCount - 1 ? basePrice : basePrice + Math.floor(Math.random() * (highestBid - basePrice)));
    const hoursAgo = i === 0 ? Math.floor(Math.random() * 2) + 1 : Math.floor(Math.random() * 6) + 2;
    bids.push({
      id: i + 1,
      user: `User${Math.floor(Math.random() * 900) + 100}`,
      amount,
      time: `${hoursAgo} ${hoursAgo === 1 ? 'hour' : 'hours'} ago`
    });
  }
  
  // Sort bids by amount in descending order
  bids.sort((a, b) => b.amount - a.amount);
  
  return {
    id: index + 1,
    name: carDetails.fullName,
    image: `/cars/${image}`,
    currentPrice: basePrice,
    highestBid,
    lowestBid,
    endTime: new Date(Date.now() + 360000 * hoursRemaining),
    bids
  };
});

// Extract unique brands and years from car data
const extractBrands = () => {
  const brands = new Set<string>();
  CAR_IMAGES.forEach(image => {
    const details = parseCarDetails(image);
    brands.add(details.make);
  });
  return Array.from(brands);
};

const extractYears = () => {
  const years = new Set<string>();
  CAR_IMAGES.forEach(image => {
    const details = parseCarDetails(image);
    years.add(details.year);
  });
  return Array.from(years).sort((a, b) => parseInt(b) - parseInt(a)); // Sort descending
};

// Filter options
const FILTER_OPTIONS = {
  brands: extractBrands(),
  years: extractYears(),
  priceRange: [50000, 150000],
  bodyTypes: ["Sedan", "SUV", "Pickup", "Crossover"],
};

export default function AuctionDemo() {
  const [selectedCar, setSelectedCar] = useState<typeof CARS[0] | null>(null);
  const [bidAmount, setBidAmount] = useState<number>(0);
  const [cars, setCars] = useState(CARS);
  const [priceRange, setPriceRange] = useState([50000, 120000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');

  // Update the current time every second for real-time countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Auto-hide success message after 5 seconds
  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);

  // Function to format time remaining with real-time updates
  const formatTimeRemaining = (endTime: Date) => {
    const diff = endTime.getTime() - currentTime.getTime();
    
    if (diff <= 0) return "Auction ended";
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    return `${hours}h ${minutes}m ${seconds}s remaining`;
  };

  // Function to handle placing a bid
  const handlePlaceBid = () => {
    if (!selectedCar || bidAmount <= selectedCar.currentPrice) return;
    
    const updatedCars = cars.map(car => {
      if (car.id === selectedCar.id) {
        const newBid = {
          id: car.bids.length + 1,
          user: "You",
          amount: bidAmount,
          time: "Just now"
        };
        
        return {
          ...car,
          currentPrice: bidAmount,
          highestBid: bidAmount > car.highestBid ? bidAmount : car.highestBid,
          bids: [newBid, ...car.bids]
        };
      }
      return car;
    });
    
    setCars(updatedCars);
    setSelectedCar(null);
    
    // Show success message
    setSuccessMessage(`Your bid of AED ${bidAmount.toLocaleString()} for ${selectedCar.name} was placed successfully!`);
    setShowSuccessMessage(true);
  };

  // Function to toggle brand filter
  const toggleBrandFilter = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand) 
        : [...prev, brand]
    );
  };

  // Function to toggle year filter
  const toggleYearFilter = (year: string) => {
    setSelectedYears(prev => 
      prev.includes(year) 
        ? prev.filter(y => y !== year) 
        : [...prev, year]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Message */}
      {showSuccessMessage && (
        <div 
          className="fixed top-4 right-4 z-50 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-md"
          style={{
            animation: 'fadeInOut 5s ease-in-out',
            opacity: showSuccessMessage ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out'
          }}
        >
          <div className="flex items-center">
            <div className="py-1">
              <svg className="w-6 h-6 mr-4 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="font-bold">Success!</p>
              <p>{successMessage}</p>
            </div>
            <button 
              onClick={() => setShowSuccessMessage(false)}
              className="ml-auto text-gray-400 hover:text-gray-800"
            >
              <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
      
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Car Auction Demo</h1>
          <div className="flex items-center space-x-4">
            <Button variant="outline">Sign In</Button>
            <Button>Register</Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Filters */}
          <aside className="w-full md:w-64 bg-white p-4 rounded-lg shadow-sm">
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-lg mb-3">Price Range</h3>
                <div className="px-2">
                  <Slider
                    defaultValue={[70000, 120000]}
                    max={150000}
                    min={50000}
                    step={1000}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-6"
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span>AED {priceRange[0].toLocaleString()}</span>
                    <span>AED {priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium text-lg mb-3">Brand</h3>
                <div className="space-y-2">
                  {FILTER_OPTIONS.brands.map(brand => (
                    <div key={brand} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`brand-${brand}`}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrandFilter(brand)}
                      />
                      <label htmlFor={`brand-${brand}`} className="ml-2 text-sm text-gray-700">
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium text-lg mb-3">Year</h3>
                <div className="space-y-2">
                  {FILTER_OPTIONS.years.map(year => (
                    <div key={year} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`year-${year}`}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        checked={selectedYears.includes(year)}
                        onChange={() => toggleYearFilter(year)}
                      />
                      <label htmlFor={`year-${year}`} className="ml-2 text-sm text-gray-700">
                        {year}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium text-lg mb-3">Body Type</h3>
                <div className="space-y-2">
                  {FILTER_OPTIONS.bodyTypes.map(type => (
                    <div key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`type-${type}`}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor={`type-${type}`} className="ml-2 text-sm text-gray-700">
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full mt-4">Apply Filters</Button>
            </div>
          </aside>

          {/* Car Listings */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map(car => (
                <Card key={car.id} className="overflow-hidden">
                  <div className="relative">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className={`${car.endTime.getTime() - currentTime.getTime() <= 3600000 ? 'bg-red-600' : 'bg-red-500'} text-white font-medium`}>
                        {formatTimeRemaining(car.endTime)}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{car.name}</h3>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-500">Current Bid</span>
                      <span className="font-medium">AED {car.currentPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mb-4">
                      <span>Highest: AED {car.highestBid.toLocaleString()}</span>
                      <span>Lowest: AED {car.lowestBid.toLocaleString()}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button 
                      className="w-full" 
                      onClick={() => {
                        setSelectedCar(car);
                        setBidAmount(car.currentPrice + 500);
                      }}
                    >
                      Place Bid
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Bid Dialog */}
      <Dialog open={!!selectedCar} onOpenChange={(open) => !open && setSelectedCar(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Place a Bid</DialogTitle>
          </DialogHeader>
          {selectedCar && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <img 
                  src={selectedCar.image} 
                  alt={selectedCar.name} 
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div>
                  <h3 className="font-medium">{selectedCar.name}</h3>
                  <p className="text-sm text-gray-500">
                    {formatTimeRemaining(selectedCar.endTime)}
                  </p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">Current Bid</p>
                <p className="font-medium text-lg">AED {selectedCar.currentPrice.toLocaleString()}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-2">Your Bid Amount</p>
                <Input
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(Number(e.target.value))}
                  min={selectedCar.currentPrice + 100}
                  step={100}
                  className="mb-1"
                />
                <p className="text-xs text-gray-500">
                  Minimum bid: AED {(selectedCar.currentPrice + 100).toLocaleString()}
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium mb-2">Recent Bids</h4>
                <ScrollArea className="h-32">
                  <div className="space-y-2">
                    {selectedCar.bids.map(bid => (
                      <div key={bid.id} className="flex justify-between text-sm">
                        <span className={cn(bid.user === "You" && "font-medium")}>{bid.user}</span>
                        <span>AED {bid.amount.toLocaleString()}</span>
                        <span className="text-gray-500">{bid.time}</span>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setSelectedCar(null)}>
                  Cancel
                </Button>
                <Button onClick={handlePlaceBid} disabled={bidAmount <= selectedCar.currentPrice}>
                  Place Bid
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
