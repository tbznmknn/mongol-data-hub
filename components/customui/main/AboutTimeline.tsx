'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import timeLine from '@/app/TimeLine.json';
import Image from 'next/image';

export default function Timeline() {
  const [isMobile, setIsMobile] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="mx-auto max-w-4xl p-8">
      <h1 className="mb-8 text-center text-3xl font-bold">
        Он цагийн дараалал
      </h1>
      <div
        className={`relative ${
          isMobile
            ? '-pl-1 border-l-4 border-gray-300'
            : 'flex flex-col items-center'
        }`}
      >
        {/* Gray vertical line */}
        <div className="absolute bottom-0 left-1/2 top-2 mb-6 mt-0 hidden w-1 -translate-x-1/2 transform bg-gray-300 md:block"></div>

        {timeLine.map((item, index) => (
          <div
            key={index}
            className={`relative mb-6 flex w-full items-center ${
              isMobile
                ? 'flex-col'
                : index % 2 === 0
                ? 'flex-row-reverse'
                : 'flex-row'
            }`}
          >
            {/* Dot */}
            <span
              className={`bg-custom-teal absolute top-1 h-6 w-6 rounded-full ${
                isMobile
                  ? 'absolute -left-3.5'
                  : 'left-1/2 -translate-x-1/2 transform'
              }`}
            ></span>

            {/* Card content */}
            <div
              className={`w-full sm:w-2/3 md:w-1/2 ${
                isMobile
                  ? 'pl-4 pr-4'
                  : index % 2 === 0
                  ? 'pl-2 text-left'
                  : 'pr-2 text-right'
              }`}
            >
              <h2
                className={`text-lg font-semibold ${
                  index % 2 === 0 ? 'pl-3' : 'pr-3'
                } ${isMobile ? (index % 2 === 0 ? '' : 'pl-3') : ''}`}
              >
                {item.year} он
              </h2>
              <Card className="mx-2 mt-2">
                <CardContent className="p-4">
                  <p>{expanded === index ? item.fullInfo : item.shortInfo}</p>
                  {expanded === index && item.image && (
                    <Image
                      fill
                      src={item.image}
                      alt={item.year}
                      className="mt-4 h-60 w-full rounded-lg object-cover"
                    />
                  )}
                  <Button
                    variant="ghost"
                    className="text-custom-teal mt-2"
                    onClick={() =>
                      setExpanded(expanded === index ? null : index)
                    }
                  >
                    {expanded === index ? 'Хураах' : 'Дэлгэрэнгүй'}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
