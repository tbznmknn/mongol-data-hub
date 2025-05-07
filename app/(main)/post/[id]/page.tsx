import { Post } from '@/app/dashboard/posts/_components/product-listing';
import { NewsItem } from '@/components/customui/main/News1';
import PageContainer from '@/components/layout/page-container';
import { Metadata } from 'next';
import { Suspense } from 'react';
import ProductViewPage from '../_components/product-view-page';
import PostSkeleton from './PostSkeleton';

// Define the props type
type PageProps = { params: { id: string } };

// Generate metadata for SEO
export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/${params.id}`,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  if (!response.ok) {
    return {
      title: 'Post Not Found',
      description: 'The requested post could not be found.'
    };
  }

  const jsonData = await response.json();
  const data: Post = jsonData.data;

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

// Generate static params for dynamic routes
// export async function generateStaticParams(): Promise<{ id: string }[]> {
//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts?limit=200`,
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
//     const newsData: NewsItem[] = jsonData.data;

//     // Return the correct format: array of { id: string }
//     return newsData.map((item) => ({
//       id: item.id.toString() // Ensure id is a string
//     }));
//   } catch (error) {
//     console.error('Error in generateStaticParams:', error);
//     return []; // Fallback to empty array on error
//   }
// }

// Page component
export default function Page({ params }: PageProps) {
  return (
    <PageContainer scrollable={false}>
      <div className="">
        <Suspense fallback={<PostSkeleton />}>
          <ProductViewPage productId={params.id} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
