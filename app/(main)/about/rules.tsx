'use client';
import { useState } from 'react';
import { NotebookText, Wallet, Scale, ThumbsUp, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Rules() {
  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 py-10 sm:grid-cols-2">
      {/* Left Side: Title */}
      <div className="flex items-start sm:items-center">
        <div className="items-center p-8">
          <Link href="/news">
            <Button className="relative w-fit overflow-hidden rounded-full border-[1px] border-[#1476bf] bg-transparent text-black transition-all duration-300 before:absolute before:inset-0 before:scale-0 before:bg-[#1476bf] before:transition-transform before:duration-300 hover:border-[#1476bf] hover:text-white hover:shadow-lg hover:shadow-[#1476bf]/50 hover:before:scale-100 active:scale-95">
              <p className="relative z-10 flex items-center justify-end gap-3 p-4 text-lg">
                <Download className="size-4" />
                Дүрэм
              </p>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
