import { Card, CardContent } from '@/components/ui/card';

import { Separator } from '@/components/ui/separator';
import { Suspense } from 'react';
import Image from 'next/image';
import BackgroundImageForPage from '@/components/customui/BackgroundImageForPage';
import Sidebar from '../sidebar';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import ProductListingPage, {
  CompanyFilterAction
} from '../_components/product-listing';
import { SearchParams } from 'nuqs/parsers';
import { searchParamsCache, serialize } from '@/lib/searchparams';
type pageProps = {
  searchParams: SearchParams;
};
export default async function AboutPage({ searchParams }: pageProps) {
  searchParamsCache.parse(searchParams);

  const key = serialize({ ...searchParams });

  return (
    <div className="w-full bg-white pb-2 sm:pb-6 md:pb-8">
      {/* Background Image Section */}
      <BackgroundImageForPage
        alt="Skyscraper"
        title="About Us"
        url="https://cdn.pixabay.com/photo/2017/06/28/22/42/downtown-new-york-2452459_1280.jpg"
      />

      {/* Main Content */}
      <div className=" flex  lg:mx-6">
        {/* Sidebar */}
        {/* <Sidebar /> */}

        <section className="mx-auto w-full max-w-7xl px-2 py-2 sm:px-12 sm:py-6 md:py-8">
          <div className="text-center">
            <h1 className="px-12 text-xl font-semibold sm:text-3xl">Түншүүд</h1>

            <Separator className="mx-6 mt-4" />
          </div>

          <section className="mt-3 space-y-3">
            {' '}
            <Suspense>
              <CompanyFilterAction />
            </Suspense>
            <Suspense
              key={key}
              fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
            >
              <ProductListingPage />
            </Suspense>
          </section>
          <section>
            <Suspense fallback={<div>...Loading</div>}></Suspense>
          </section>
          <section></section>
          <section></section>
        </section>
      </div>
    </div>
  );
}
export const metadata = {
  title: 'Түншүүд'
};
