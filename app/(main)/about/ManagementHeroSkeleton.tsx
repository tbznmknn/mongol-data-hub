import { Skeleton } from '@/components/ui/skeleton';

export default function ManagementSkeleton() {
  return (
    <div className="relative bg-blue-50 px-4 py-10 max-w-7xl mx-auto ">
      <h1 className="my-8 text-center text-2xl font-bold text-gray-900 sm:text-3xl">
        Удирдлага
      </h1>

      <div className=" mx-auto my-4 grid grid-cols-1 place-items-center gap-6 px-4 sm:gap-8 sm:px-10 md:grid-cols-2 md:gap-12 xl:grid-cols-3">
        {/* Skeleton Loader for Cards */}
        {[...Array(3)].map((_, index) => (
          <div key={index} className="relative w-full">
            <div className="absolute inset-0 translate-x-2 translate-y-2 transform rounded-lg bg-blue-500 shadow-lg"></div>
            <div className="relative flex h-96 w-full flex-col justify-between rounded-md border-2 shadow-lg">
              <div className="2/3 relative">
                <Skeleton className="h-64 w-full rounded-t-md" />
                <div className="absolute bottom-0 left-0 w-full bg-black/10 py-2 text-white">
                  <Skeleton className="h-6 w-1/3 pl-2" />
                </div>
              </div>

              <div className="flex flex-col items-center justify-end">
                <div className="ml-2 flex items-center gap-1 text-sm text-muted-foreground">
                  <Skeleton className="h-4 w-1/2" />
                </div>
                <div className="ml-2 flex items-center gap-1 text-sm text-muted-foreground">
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>

              <div className="1/3 flex items-center justify-between">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-6 w-6 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
