import { PaginationData } from '@/app/dashboard/users/_components/employee-listing-page';
import { Card, CardContent } from '@/components/ui/card';
import { searchParamsCache } from '@/lib/searchparams';
import { format } from 'date-fns';
import { mn } from 'date-fns/locale';
import { FacebookIcon, Linkedin, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PaginationWithLinks } from '../paginationwithlinks';

export interface NewsItem {
  id: number;
  category: string;
  name: string;
  picture: string;
  summary: string;
  createdAt: string;
  updatedAt: string | null;
  creator: {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
}

export default async function News1() {
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('search');
  const pageLimit = searchParamsCache.get('limit');
  const filters = {
    categories: 'NEWS',
    page: String(page), // Convert number to string
    limit: String(pageLimit), // Convert number to string
    ...(search && { search })
  };
  const queryString = new URLSearchParams(filters).toString();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts?${queryString}`,
    {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  ).catch(() => notFound());

  if (!response.ok) {
    notFound();
  }

  const jsonData = await response.json();
  const newsData: NewsItem[] = await jsonData.data;
  const pagination: PaginationData = jsonData.pagination;

  const generateShareUrl = (postUrl: string, text: string) => {
    return {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        postUrl
      )}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        postUrl
      )}&text=${encodeURIComponent(text)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        postUrl
      )}`
    };
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-8 px-8 py-8 md:grid-cols-1 lg:grid-cols-2">
        {newsData.map((news) => {
          const postUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/post/${news.id}`;
          const shareUrls = generateShareUrl(postUrl, news.name);

          return (
            <Card
              key={news.id}
              className="block w-full max-w-xl overflow-hidden rounded-lg bg-[transparent] transition-all hover:border-[#1476bf] hover:shadow-2xl hover:shadow-blue-200"
            >
              <CardContent className="flex flex-col bg-transparent p-8">
                {/* Title with a fixed min height to prevent overlap */}
                <Link href={`/post/${news.id}`}>
                  <p className="mb-4  text-lg font-semibold md:text-xl ">
                    {news.name}
                  </p>
                </Link>

                {/* Image Section */}
                <Link href={`/post/${news.id}`}>
                  <Image
                    src={
                      news.picture
                        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${news.picture}`
                        : '/erhii.jpg'
                    }
                    alt={news.name}
                    width={400}
                    height={300}
                    className="h-60 w-full object-cover"
                  />
                </Link>

                {/* Summary & Meta Information */}
                <div className="space-y-4 p-4 text-black">
                  <p className="h-32 overflow-hidden break-words leading-relaxed">
                    {news.summary}
                  </p>

                  <div className="h-[1px] w-full bg-[#1476bf]"></div>

                  {/* Social Share Links */}
                  <div className="flex flex-row space-x-8">
                    <Link href={shareUrls.facebook} target="_blank">
                      <FacebookIcon className="text-[#1476bf]" />
                    </Link>
                    <Link href={shareUrls.twitter} target="_blank">
                      <X className="text-[#1476bf]" />
                    </Link>
                    <Link href={shareUrls.linkedin} target="_blank">
                      <Linkedin className="text-[#1476bf]" />
                    </Link>
                  </div>

                  <div className="h-[1px] w-full bg-[#1476bf]"></div>

                  {/* Date */}
                  <p className="text-sm text-gray-600">
                    {news.createdAt
                      ? format(new Date(news.createdAt), "yyyy 'оны' MMMM d", {
                          locale: mn
                        })
                      : 'Огноо байхгүй'}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div className="block items-center p-8">
        <PaginationWithLinks
          page={pagination.currentPage}
          pageSize={pagination.limit}
          totalCount={pagination.totalPages}
          pageSearchParam="page"
          // pageSizeSelectOptions={{
          //   pageSizeSearchParam: 'limit',
          //   pageSizeOptions: [10, 20, 50]
          // }}
        />
      </div>
    </div>
  );
}
