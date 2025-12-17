"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

// Mock data for cars
const CARS = [
  {
    id: 1,
    name: "2023 Mercedes-Benz S-Class",
    image: "/no-image.png",
    currentPrice: 85000,
    highestBid: 87500,
    lowestBid: 82000,
    endTime: new Date(Date.now() + 3600000 * 24), // 24 hours from now
    bids: [
      { id: 1, user: "User123", amount: 87500, time: "2 hours ago" },
      { id: 2, user: "User456", amount: 86000, time: "3 hours ago" },
      { id: 3, user: "User789", amount: 85000, time: "5 hours ago" },
    ],
  },
  {
    id: 2,
    name: "2022 BMW 7 Series",
    image: "/no-image.png",
    currentPrice: 78000,
    highestBid: 80000,
    lowestBid: 76500,
    endTime: new Date(Date.now() + 3600000 * 48), // 48 hours from now
    bids: [
      { id: 1, user: "User234", amount: 80000, time: "1 hour ago" },
      { id: 2, user: "User567", amount: 79000, time: "4 hours ago" },
      { id: 3, user: "User890", amount: 78000, time: "6 hours ago" },
    ],
  },
  {
    id: 3,
    name: "2023 Audi A8",
    image: "/no-image.png",
    currentPrice: 82000,
    highestBid: 84000,
    lowestBid: 80000,
    endTime: new Date(Date.now() + 3600000 * 12), // 12 hours from now
    bids: [
      { id: 1, user: "User345", amount: 84000, time: "30 minutes ago" },
      { id: 2, user: "User678", amount: 83000, time: "2 hours ago" },
      { id: 3, user: "User901", amount: 82000, time: "5 hours ago" },
    ],
  },
  {
    id: 4,
    name: "2022 Lexus LS",
    image: "/no-image.png",
    currentPrice: 75000,
    highestBid: 77000,
    lowestBid: 73000,
    endTime: new Date(Date.now() + 3600000 * 36), // 36 hours from now
    bids: [
      { id: 1, user: "User456", amount: 77000, time: "1 hour ago" },
      { id: 2, user: "User789", amount: 76000, time: "3 hours ago" },
      { id: 3, user: "User012", amount: 75000, time: "7 hours ago" },
    ],
  },
  {
    id: 5,
    name: "2023 Porsche Panamera",
    image: "/no-image.png",
    currentPrice: 110000,
    highestBid: 115000,
    lowestBid: 108000,
    endTime: new Date(Date.now() + 3600000 * 18), // 18 hours from now
    bids: [
      { id: 1, user: "User567", amount: 115000, time: "45 minutes ago" },
      { id: 2, user: "User890", amount: 112000, time: "2 hours ago" },
      { id: 3, user: "User123", amount: 110000, time: "4 hours ago" },
    ],
  },
  {
    id: 6,
    name: "2022 Tesla Model S",
    image: "/no-image.png",
    currentPrice: 90000,
    highestBid: 92500,
    lowestBid: 88000,
    endTime: new Date(Date.now() + 3600000 * 30), // 30 hours from now
    bids: [
      { id: 1, user: "User678", amount: 92500, time: "2 hours ago" },
      { id: 2, user: "User901", amount: 91000, time: "5 hours ago" },
      { id: 3, user: "User234", amount: 90000, time: "8 hours ago" },
    ],
  },
];

// Filter options
const FILTER_OPTIONS = {
  brands: ["Mercedes-Benz", "BMW", "Audi", "Lexus", "Porsche", "Tesla"],
  years: ["2023", "2022", "2021", "2020", "2019"],
  priceRange: [50000, 150000],
  bodyTypes: ["Sedan", "SUV", "Coupe", "Convertible"],
};

export default function AuctionDemo() {
  const [selectedCar, setSelectedCar] = useState<typeof CARS[0] | null>(null);
  const [bidAmount, setBidAmount] = useState<number>(0);
  const [cars, setCars] = useState(CARS);
  const [priceRange, setPriceRange] = useState([50000, 120000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);

  // Function to format time remaining
  const formatTimeRemaining = (endTime: Date) => {
    const now = new Date();
    const diff = endTime.getTime() - now.getTime();
    
    if (diff <= 0) return "Auction ended";
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m remaining`;
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
                      <Badge variant="secondary" className="bg-red-500 text-white font-medium">
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
