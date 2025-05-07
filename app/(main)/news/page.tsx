import BackgroundTop from '@/components/customui/BackgroundTop';
import News1 from '@/components/customui/main/News1';
import PostSidebar from '@/components/customui/PostSidebar';
import { searchParamsCache, serialize } from '@/lib/searchparams';
import { SearchParams } from 'nuqs/parsers';
type pageProps = {
  searchParams: SearchParams;
};
export default function News({ searchParams }: pageProps) {
  searchParamsCache.parse(searchParams);
  const key = serialize({ ...searchParams });
  return (
    <div className="flex min-h-screen flex-col">
      <BackgroundTop title="Мэдээ" />
      <div className="mx-auto flex w-full max-w-7xl grow gap-5  lg:p-5">
        <main className="flex w-full min-w-0 gap-5">
          <div className="w-full min-w-0 space-y-5">
            <News1 />
          </div>
          <PostSidebar />
        </main>
      </div>
    </div>
  );
}
export const metadata = {
  title: 'Мэдээ'
};
