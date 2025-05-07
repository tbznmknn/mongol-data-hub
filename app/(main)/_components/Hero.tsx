'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function MyHero({
  zorilgo,
  alsiinharaa,
  title1,
  title2,
  sub1,
  sub2
}: {
  zorilgo: string;
  alsiinharaa: string;
  title1: string;
  title2: string;
  sub1: string;
  sub2: string;
}) {
  const myImage = '/mainn.jpg';
  const headings = [title1, title2];
  const subheadings = [sub1, sub2];
  const texts = [zorilgo, alsiinharaa];
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return; // Stop switching when hovered

    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % headings.length);
        setFade(false);
      }, 800);
    }, 8000);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div className="relative flex h-[100dvh] w-full items-center justify-center bg-black">
      {/* Background Image */}
      <Image
        src={myImage}
        alt="Background"
        fill
        priority
        className="z-500 absolute inset-0 object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div
        className="max-w-9xl relative z-10 flex flex-col justify-center px-4 text-center text-white md:flex-row lg:flex-row lg:space-x-28"
        onMouseEnter={() => setIsHovered(true)} // Stop switching
        onMouseLeave={() => setIsHovered(false)} // Resume switching
      >
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-4xl font-bold opacity-100 transition-opacity duration-1000 md:text-6xl">
            <span
              className={`block transition-opacity duration-1000 ${
                fade ? 'opacity-0' : 'opacity-100'
              }`}
            >
              {headings[index]}
            </span>
          </h1>
          <h2 className="mt-2 text-xl font-medium opacity-100 transition-opacity duration-1000 md:text-2xl">
            <span
              className={`block transition-opacity duration-1000 ${
                fade ? 'opacity-0' : 'opacity-100'
              }`}
            >
              {subheadings[index]}
            </span>
          </h2>
        </div>

        {/* Paragraph */}
        <div className="mt-4 flex flex-col items-center space-y-4 md:mt-0 md:items-start md:space-y-6">
          <p className="max-w-3xl text-center text-lg opacity-100 transition-opacity duration-1000 md:text-left md:text-xl">
            <span
              className={`block transition-opacity duration-1000 ${
                fade ? 'opacity-0' : 'opacity-100'
              }`}
            >
              {texts[index]}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
