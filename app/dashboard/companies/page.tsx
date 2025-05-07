import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { searchParamsCache, serialize } from '@/lib/searchparams';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { SearchParams } from 'nuqs/parsers';
import { Suspense } from 'react';
import ProductListingPage from './_components/product-listing';
import ProductTableAction, {
  RoomKeys
} from './_components/product-tables/product-table-action';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Dashboard: Companies'
};

type pageProps = {
  searchParams: SearchParams;
};

export default async function Page({ searchParams }: pageProps) {
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams);

  // This key is used for invoke suspense if any of the search params changed (used for filters).
  const key = serialize({ ...searchParams });
  const t = await getTranslations('dashboard');
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/company/affiliationKeys`,
    {
      cache: 'reload',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  ).catch((err) => notFound());

  const jsonData = await response.json();
  const data: RoomKeys[] = jsonData.data;
  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            // title={t('roomcategory.title')}
            title="МХКТүншүүд"
            description="Гишүүд (бүртгэх, унших, засварлах, устгах)"
          />
          <Link
            href="/dashboard/companies/new"
            className={cn(buttonVariants(), 'text-xs md:text-sm')}
          >
            <Plus className="mr-2 h-4 w-4" /> {t('addnew')}
          </Link>
        </div>
        <Separator />
        <ProductTableAction data={data} />
        <Suspense
          key={key}
          fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
        >
          <ProductListingPage />
        </Suspense>
      </div>
    </PageContainer>
  );
}
