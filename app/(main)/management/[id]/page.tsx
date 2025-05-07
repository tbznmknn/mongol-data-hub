import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import PageAboutLayout from '@/components/Controls/PageAboutLayout';
import LeaderContent from './LeaderContent';
import OrderSkeleton from '../../post/_components/OrderSkeleton';
import { Metadata } from 'next';

type PageProps = {
  params: {
    id: number;
  };
};

export default function VisionPage({ params }: PageProps) {
  return (
    <PageAboutLayout
      title="Удирдах зөвлөл"
      subtitle=""
      backgroundUrl="https://cdn.pixabay.com/photo/2017/06/28/22/42/downtown-new-york-2452459_1280.jpg"
    >
      <Link href={'/about'}>
        <Button variant={'ghost'}>
          <div className="flex items-center justify-center gap-2">
            <ArrowLeft />
            Удирдлагууд
          </div>
        </Button>
      </Link>

      <Suspense fallback={<OrderSkeleton />}>
        <LeaderContent id={params.id} />
      </Suspense>
    </PageAboutLayout>
  );
}
import { Member } from '@/app/dashboard/employees/_components/product-listing';

export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/members/${params.id}`,
    {
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  if (!response.ok) {
    return {
      title: 'Удирдлага',
      description: 'Илэрц олдсонгүй'
    };
  }

  const jsonData = await response.json();
  const data: Member = jsonData.data;

  return {
    title: data.name,
    description: `${data.name} - ${data.memberType.name} - ${data.occupation}`,
    openGraph: {
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${data.picture}`
        }
      ]
    }
  };
}
// export async function generateStaticParams(): Promise<{ id: string }[]> {
//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_BACKEND_URL}/members?limit=200`,
//       {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       }
//     );

//     if (!response.ok) {
//       console.error(
//         'Failed to fetch posts for static params:',
//         response.status
//       );
//       return []; // Return empty array if fetch fails
//     }

//     const jsonData = await response.json();
//     const newsData: Member[] = jsonData.data;

//     // Return the correct format: array of { id: string }
//     return newsData.map((item) => ({
//       id: item.id.toString() // Ensure id is a string
//     }));
//   } catch (error) {
//     console.error('Error in generateStaticParams:', error);
//     return []; // Fallback to empty array on error
//   }
// }
