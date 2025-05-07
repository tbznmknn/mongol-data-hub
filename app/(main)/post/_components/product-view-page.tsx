import { fakeProducts, Product } from '@/constants/mock-api';
import { notFound } from 'next/navigation';

import getToken from '@/lib/GetTokenServer';
import { Post } from '@/app/dashboard/posts/_components/product-listing';
import { getTranslations } from 'next-intl/server';
import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import Link from 'next/link';
import { Heading } from '@/components/ui/heading';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { IterationCcwIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import OrderSkeleton from './OrderSkeleton';
import DataFetchingRoom from './DataFetchingRoom';
import PostSkeleton from '../[id]/PostSkeleton';

type TProductViewPageProps = {
  productId: string;
};

export default async function ProductViewPage({
  productId
}: TProductViewPageProps) {
  console.log(productId);
  let product = null;
  const t = await getTranslations('dashboard');
  let pageTitle = 'Нийтлэл ';
  let isNew = true;
  isNew = false;
  const TOKEN = await getToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/${productId}`,
    {
      cache: 'no-cache',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      }
    }
  ).catch((err) => notFound());

  const jsonData = await response.json();
  const data: Post = jsonData.data;
  product = data;

  if (!product) {
    notFound();
  }

  return (
    <PageContainer scrollable={false}>
      <div className="">
        <Separator />
        <Suspense fallback={<PostSkeleton />}>
          <DataFetchingRoom data={data} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
