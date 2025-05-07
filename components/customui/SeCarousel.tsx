'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  images: string[];
}

export default function SeCarousel({ images }: CarouselProps) {
  const [selectedTab, setSelectedTab] = React.useState(0);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setSelectedTab((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [images.length]);

  const handleDotClick = (index: number) => {
    setSelectedTab(index);
  };

  const handleNext = () => {
    setSelectedTab((prev) => (prev + 1) % images.length);
  };

  const handlePrevious = () => {
    setSelectedTab((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="relative h-full w-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
              selectedTab === index ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
      </div>

      {/* Left Button */}
      <button
        onClick={handlePrevious}
        className="absolute left-4 top-1/2 z-50 -translate-y-1/2 transform rounded-full bg-black bg-opacity-50 p-2 text-white hover:bg-opacity-75"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      {/* Right Button */}
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 z-50 -translate-y-1/2 transform rounded-full bg-black bg-opacity-50 p-2 text-white hover:bg-opacity-75"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-3 w-3 rounded-full transition duration-300 ${
              selectedTab === index ? 'bg-custom-teal' : 'bg-gray-300'
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
