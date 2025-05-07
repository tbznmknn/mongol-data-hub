import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import PostSidebar from '@/components/customui/PostSidebar';

export default function PostSkeleton() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="mx-auto flex w-full max-w-7xl grow gap-5 lg:p-5">
        <main className="flex w-full min-w-0 gap-5">
          <div className="w-full min-w-0 space-y-5">
            <div className="space-y-5">
              <article className="space-y-3 rounded-2xl bg-card p-2 shadow-md lg:p-5">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-6 w-24" />
                  </div>

                  <Skeleton className="h-8 w-3/4" />

                  <div className="flex flex-row items-center justify-end gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="h-10 w-10 rounded-full" />
                  </div>
                </div>
                <Separator className="h-2 rounded-2xl" />
                <div className="flex w-full justify-center">
                  <Skeleton className="h-80 w-full rounded-lg" />
                </div>
                <div className="whitespace-pre-line break-words text-xs text-muted-foreground">
                  <Skeleton className="h-20 w-full" />
                </div>
              </article>
            </div>
          </div>
          <PostSidebar />
        </main>
      </div>
    </div>
  );
}
