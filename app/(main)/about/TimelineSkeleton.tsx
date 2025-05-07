import { Skeleton } from '@/components/ui/skeleton';

export default function TimelineSkeleton() {
  return (
    <div className="relative mx-auto max-w-6xl px-6 py-10">
      {/* Navigation Buttons Skeleton */}
      <div className="absolute left-0 top-1/2 z-10 -translate-y-1/2">
        <Skeleton className="h-6 w-6" />
      </div>

      <div className="relative h-96">
        {/* Blue Line Skeleton */}
        <Skeleton className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2" />

        <div className="flex space-x-6 overflow-hidden">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="relative w-64">
              <div className="relative flex h-full flex-col items-start justify-center">
                {/* Timeline Dot Skeleton */}
                <Skeleton className="absolute top-1/2 z-10 h-4 w-4 -translate-y-1/2 rounded-full" />
                {/* Content Card Skeleton */}
                <div className="relative ml-2 w-auto border-l-2 bg-white pl-4">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="mt-2 h-5 w-24" />
                  <Skeleton className="mt-2 h-4 w-40" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute right-0 top-1/2 z-10 -translate-y-1/2">
        <Skeleton className="h-6 w-6" />
      </div>
    </div>
  );
}
