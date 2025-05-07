import BackgroundTop from '@/components/customui/BackgroundTop';
import Course1 from '@/components/customui/main/Course1';
import PostSidebar from '@/components/customui/PostSidebar';
import { searchParamsCache, serialize } from '@/lib/searchparams';
import { SearchParams } from 'nuqs/parsers';

type pageProps = {
  searchParams: SearchParams;
};
export const metadata = {
  title: 'Сургалт'
};

export default function Courses({ searchParams }: pageProps) {
  searchParamsCache.parse(searchParams);
  const key = serialize({ ...searchParams });
  return (
    <div>
      <div className=" flex min-h-screen flex-col ">
        <BackgroundTop title="Сургалт" />
        <div className="mx-auto flex w-full max-w-7xl grow gap-5 lg:p-5">
          <main className="flex w-full min-w-0 gap-5">
            <div className="w-full min-w-0 space-y-5">
              <Course1 />
            </div>
            <PostSidebar />
          </main>
        </div>
      </div>
    </div>
  );
}
