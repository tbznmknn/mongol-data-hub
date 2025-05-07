import { Suspense } from 'react';
import Sidebar from '../../sidebar';
import VisionContent from './LeaderContent';
import OrderSkeleton from '@/app/(main)/post/_components/OrderSkeleton';
import LeaderContent from './LeaderContent';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import BackgroundImageForPage from '@/components/customui/BackgroundImageForPage';
import PageAboutLayout from '@/components/Controls/PageAboutLayout';
import { Metadata } from 'next';
import { AssociateMember } from '@/app/dashboard/companies/_components/product-listing';
type PageProps = {
  params: {
    id: number;
  };
};
export default function VisionPage({ params }: PageProps) {
  console.log(params);
  return (
    <PageAboutLayout
      isCompany
      backgroundUrl="https://cdn.pixabay.com/photo/2017/06/28/22/42/downtown-new-york-2452459_1280.jpg"
      title="Гишүүн компани"
      subtitle="Монгол Дата Хаб"
    >
      {' '}
      <section className="w-full  py-2  ">
        <Link href={'/companies/list'}>
          <Button variant={'ghost'}>
            <div className="flex items-center justify-center gap-2">
              <ArrowLeft />
              Гишүүд
            </div>
          </Button>
        </Link>

        <Suspense fallback={<OrderSkeleton />}>
          {' '}
          <LeaderContent id={params.id} />
        </Suspense>
      </section>
    </PageAboutLayout>
  );
}
export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/company/${params.id}`,
    {
      headers: {
        cache: 'no-cache',
        'Content-Type': 'application/json'
      }
    }
  );

  if (!response.ok) {
    return {
      title: 'Гишүүн',
      description: 'Монгол Дата Хаб'
    };
  }

  const jsonData = await response.json();
  const data: AssociateMember = jsonData.data;

  return {
    title: data.name,
    description: data.summary,
    openGraph: {
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${data.picture}`
        }
      ]
    }
  };
}
