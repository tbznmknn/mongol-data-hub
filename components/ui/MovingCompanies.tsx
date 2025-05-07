'use client';

import React, { useEffect, useState } from 'react';
import { InfiniteMovingCards } from './InfinityMovingCards';
import { AssociateMember } from '@/app/dashboard/companies/_components/product-listing';

export function MovingCompanies({ data }: { data: AssociateMember[] }) {
  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-md bg-white pb-20 antialiased md:pt-16 lg:pb-28  lg:pt-24 ">
      <p className="px-6 py-6 text-center text-2xl font-semibold text-[#1476bf] md:text-4xl lg:text-5xl">
        Түншүүд
      </p>
      <InfiniteMovingCards
        pauseOnHover={false}
        items={data}
        direction="right"
        speed="normal"
      />
    </div>
  );
}
