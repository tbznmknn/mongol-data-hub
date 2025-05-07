'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { useEffect, useState } from 'react';
interface Timeline {
  id: number;
  name: string;
  description: string;
  year: number;
  createdAt: Date;
  updatedAt: Date;
}

export default function Timeline({ data }: { data: Timeline[] }) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative mx-auto max-w-6xl px-6 py-10">
      <div className="mb-16 text-center text-2xl font-bold text-gray-900 sm:text-3xl">
        Холбооны түүх
      </div>
      {/* Navigation Buttons */}
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute left-0 top-1/2 z-10 -translate-y-1/2"
      >
        <ChevronLeft className="h-6 w-6 text-gray-700" />
      </button>

      <div className="relative h-96">
        {' '}
        {/* Added fixed height container */}
        {/* Blue Line */}
        <div className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 transform bg-custom-navy" />
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          centeredSlides={true}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          className="h-full" // Make Swiper fill container height
        >
          {data.map((item, index) => (
            <SwiperSlide key={index} className="relative">
              <div className="relative flex h-full flex-col items-start justify-center">
                {' '}
                {/* Added height and centering */}
                {/* Timeline Dot */}
                <div className="absolute top-1/2 z-10 h-4 w-4 -translate-y-1/2 rounded-full bg-custom-navy" />
                {/* Content Card */}
                <div
                  className={`relative ml-2 h-auto  w-auto border-l-2 border-l-custom-navy  bg-white pl-4 
                  ${
                    isMobile
                      ? 'bottom-24'
                      : index % 2 === 0
                      ? 'bottom-24'
                      : 'top-24'
                  }`}
                >
                  <h3 className=" text-lg font-semibold md:text-xl ">
                    {item.year}
                  </h3>
                  <h4 className="text:md mt-2 text-custom-navy md:text-xl">
                    {item.name}
                  </h4>
                  <p className="text- md:text-md mt-2 text-gray-600">
                    {item.description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute right-0 top-1/2 z-10 -translate-y-1/2"
      >
        <ChevronRight className="h-6 w-6 text-gray-700" />
      </button>
    </div>
  );
}
