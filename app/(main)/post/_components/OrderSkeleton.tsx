'use client';

import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { BathIcon, BedDoubleIcon, Users2 } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

import { useState } from 'react';

// Skeleton for the Room Card component
const RoomCardSkeleton = () => (
  <article className="space-y-3 rounded-2xl bg-card p-5 shadow-sm">
    <div className="flex flex-col gap-3 lg:flex-row">
      <div className="w-full">
        <Skeleton className="h-40 w-64 rounded-sm object-cover shadow-sm" />
      </div>
      <div className="block flex-1 font-medium">
        <Skeleton className="h-5 w-48" />
        <div className="flex items-center justify-start gap-3 text-xs">
          <Skeleton className="h-4 w-12" />
        </div>
        <div className="flex items-center justify-start gap-3 text-xs">
          <Skeleton className="h-4 w-12" />
        </div>
        <div className="flex items-center justify-start gap-3 text-xs">
          <Skeleton className="h-4 w-12" />
        </div>
        <div className="mt-2 max-h-24 overflow-hidden text-ellipsis text-xs text-muted-foreground">
          <Skeleton className="h-4 w-60" />
        </div>
        <Skeleton className="mt-2 h-4 w-24" />
      </div>
      <div>
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  </article>
);

export default async function OrderSkeleton() {
  const [selected, setSelected] = useState<number[]>([]);
  const handleSelect = (roomId: number) => {
    setSelected((prevSelected) => [...prevSelected, roomId]);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="mx-auto flex w-full max-w-7xl grow gap-5 p-5">
        <main className="flex w-full min-w-0 gap-5">
          <div className="w-full min-w-0 space-y-5">
            <div className="space-y-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <RoomCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
