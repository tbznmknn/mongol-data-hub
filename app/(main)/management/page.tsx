import { Suspense } from 'react';
import OrderSkeleton from '../post/_components/OrderSkeleton';
import getToken from '@/lib/GetTokenServer';
import { notFound, redirect } from 'next/navigation';
import ManagementTeam from './ManagementTeam';
import { Member } from '@/app/dashboard/employees/_components/product-listing';
import PageAboutLayout from '@/components/Controls/PageAboutLayout';

export default function VisionPage() {
  redirect('/about');
  return (
    <PageAboutLayout
      title="Удирдах зөвлөл"
      subtitle=""
      backgroundUrl="https://cdn.pixabay.com/photo/2017/06/28/22/42/downtown-new-york-2452459_1280.jpg"
    >
      <Suspense fallback={<OrderSkeleton />}>
        <AllManagementTeam />
      </Suspense>
    </PageAboutLayout>
  );
}

export async function AllManagementTeam() {
  const TOKEN = await getToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/members`,
    {
      headers: {
        cache: 'no-cache',
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      }
    }
  ).catch((err) => notFound());

  const jsonData = await response.json();
  const data: Member[] = jsonData.data;

  return <ManagementTeam data={data} />;
}
