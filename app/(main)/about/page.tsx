import TimelineDataFetching from './TimelineDataFetching';
import ManagementHero from '../_components/ManagementHero';
import ManagementSkeleton from './ManagementHeroSkeleton';
import Rules from './rules';
import Goals from './goals';
import { Suspense } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import PageAboutLayout from '@/components/Controls/PageAboutLayout';
import { GridAbout } from '@/components/ui/GridAbout';
import { DownloadIcon } from 'lucide-react';
import Durem from './Durem';
import Link from 'next/link';
import { AllManagementTeam } from '../management/page';

export default async function AboutPage() {
  const urls = [
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/staticData/title/about-desc`
  ];

  const [about] = await Promise.all(
    urls.map(async (url) => {
      const response = await fetch(url, {
        cache: 'no-store',
        headers: { 'Content-Type': 'application/json' }
      });
      const jsonData = await response.json();
      return jsonData.data;
    })
  );
  return (
    <PageAboutLayout
      title="Дата Хабын танилцуулга"
      subtitle={null}
      backgroundUrl="https://cdn.pixabay.com/photo/2017/06/28/22/42/downtown-new-york-2452459_1280.jpg"
    >
      <div className="space-y-10">
        {about.description}{' '}
        <Link
          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
          href={`/vision`}
        >
          Бидний алсын хараа, эрхэм зорилго
        </Link>
        {/* <div className="my-3 px-6 lg:px-2">
          <Link href={`/vision`}>Бидний алсын хараа</Link>
        </div> */}
        <div className="my-3 px-6 lg:px-2">
          <Durem />
        </div>
        {/* <GridAbout /> */}
        <section>
          {/* <TimelineDataFetching /> */}
          <Suspense fallback={<ManagementSkeleton />}>
            {/* <ManagementHero /> */}
            <AllManagementTeam />
          </Suspense>
        </section>
      </div>
      {/* <Goals /> */}
    </PageAboutLayout>
  );
}
