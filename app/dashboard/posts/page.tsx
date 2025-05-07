import PageContainer from '@/components/layout/page-container';
import { Button, buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { searchParamsCache, serialize } from '@/lib/searchparams';
import { cn } from '@/lib/utils';
import { InfoIcon, Plus } from 'lucide-react';
import Link from 'next/link';
import { SearchParams } from 'nuqs/parsers';
import { Suspense } from 'react';
import ProductListingPage, {
  PostCategory,
  translatePostCategoryToMongolian
} from './_components/product-listing';
import ProductTableAction, {
  RoomKeys
} from './_components/product-tables/product-table-action';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
export const metadata = {
  title: 'Dashboard: Posts'
};
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
type pageProps = {
  searchParams: SearchParams;
};

export default async function Page({ searchParams }: pageProps) {
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams);

  // This key is used for invoke suspense if any of the search params changed (used for filters).
  const key = serialize({ ...searchParams });
  const t = await getTranslations('dashboard');

  return (
    <PageContainer>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            // title={t('roomcategory.title')}
            title="Мэдээнүүд"
            description="Rich-Text-тэй мэдээнүүд. Олон: (Мэдээ, Зөвлөмж, Сургалт). Нэгээр: (Гишүүнчлэл, Зорилго, Засаглал)"
          />
          <Link
            href="/dashboard/posts/new"
            className={cn(buttonVariants(), 'text-xs md:text-sm')}
          >
            <Plus className="mr-2 h-4 w-4" /> {t('addnew')}
          </Link>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">
              <div className="flex items-center justify-center gap-2">
                <InfoIcon className="size-4" />
                Тайлбар
              </div>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle> Нийтлэлийн тайлбар</SheetTitle>
              <SheetDescription>
                Эдгээр нь нийтлэлтэй холбоотой үйлдлүүдийг тайлбарлах болно.
              </SheetDescription>
            </SheetHeader>
            <div className="text-md grid gap-4 py-4">
              <div className="max-w-sm">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Төрлүүд</AccordionTrigger>
                    <AccordionContent>
                      Тайлбар: Нийтлэл дотор мэдээ, хичээл, зөвлөмж, дүрэм,
                      алсын хараа гэсэн 5 төрөл байна{' '}
                      <ol className="list-inside list-decimal pl-2">
                        <li>
                          <Link href="#" className="text-blue-600">
                            Мэдээ
                          </Link>{' '}
                          - Холбооны мэдээнүүд
                        </li>
                        <li>
                          <Link href="#" className="text-blue-600">
                            Хичээл{' '}
                          </Link>
                          - Холбооны хичээлүүд
                        </li>
                        <li>
                          <Link href="#" className="text-blue-600">
                            Зөвлөмж
                          </Link>{' '}
                          - Холбооны зөвлөмжүүд
                        </li>
                        <li>
                          <Link href="#" className="text-blue-600">
                            Дүрэм{' '}
                          </Link>{' '}
                          - Дүрэм (1ширхэг дата)
                        </li>
                        <li>
                          <Link href="#" className="text-blue-600">
                            Алсын хараа{' '}
                          </Link>{' '}
                          - Холбооны алсын хараа (1ширхэг дата)
                        </li>
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      Нийтлэл устгаж болох уу?
                    </AccordionTrigger>
                    <AccordionContent>
                      Тийм ээ. Гэхдээ зөвхөн алсын хараа болон дүрмийг устгах
                      боломжгүй. Эдгээр нь зөвхөн 1 ширхэг өгөгдөлтэй учир
                      устгаж болохгүй. Харин засварлах л боломжтой
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <Separator />
        <ProductTableAction />
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
