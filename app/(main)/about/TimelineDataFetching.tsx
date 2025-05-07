import { notFound } from 'next/navigation';

import { Timeline } from '@/app/dashboard/timeline/_components/product-listing';
import PageContainer from '@/components/layout/page-container';
import { Separator } from '@/components/ui/separator';
import getToken from '@/lib/GetTokenServer';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import TimelineComp from './timeline';
import TimelineSkeleton from './TimelineSkeleton';

export default async function TimelineDataFetching() {
  let product = null;
  const t = await getTranslations('dashboard');
  let pageTitle = 'Нийтлэл ';
  let isNew = true;
  isNew = false;
  const TOKEN = await getToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/timeline?data=get`,
    {
      headers: {
        cache: 'no-cache',
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      }
    }
  ).catch((err) => notFound());

  const jsonData = await response.json();
  const data: Timeline[] = jsonData.data;
  product = data;

  if (!product) {
    notFound();
  }

  return (
    <Suspense fallback={<TimelineSkeleton />}>
      <TimelineComp data={data} />
    </Suspense>
  );
}
