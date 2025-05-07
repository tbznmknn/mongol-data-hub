import { Card, CardContent } from '@/components/ui/card';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { PaginationWithLinks } from '../paginationwithlinks';
import { searchParamsCache } from '@/lib/searchparams';
import { PaginationData } from '@/app/dashboard/users/_components/employee-listing-page';
import { FacebookIcon, LinkedinIcon } from 'lucide-react';
import { X } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { mn } from 'date-fns/locale';
import { Button } from '@/components/ui/button';

interface AdviceItem {
  id: number;
  category: string;
  name: string;
  picture: string;
  summary: string;
  createdAt: string;
  updatedAt: string | null;
  createdBy: number;
  updatedBy: number | null;
  creator: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string | null;
    role: string;
  };
  editor: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string | null;
    role: string;
  } | null;
}

export default async function Advice1() {
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('search');
  const pageLimit = searchParamsCache.get('limit');
  const filters = {
    categories: 'ADVICE',
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
  ).catch((err) => notFound());

  if (!response.ok) {
    notFound();
  }

  const jsonData = await response.json();
  const adviceData: AdviceItem[] = await jsonData.data;
  const pagination: PaginationData = jsonData.pagination;

  const generateShareUrl = (postUrl: string, text: string) => {
    return {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        postUrl
      )}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        postUrl
      )}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        postUrl
      )}&text=${encodeURIComponent(text)}`
    };
  };

  return (
    <div>
      <div className="flex flex-col items-center gap-y-2 px-8 py-8">
        {adviceData.map((advice) => {
          const postUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/post/${advice.id}`;
          const shareUrls = generateShareUrl(postUrl, advice.name);

          return (
            <Card
              key={advice.id}
              className="relative w-full max-w-5xl overflow-hidden rounded-lg bg-transparent transition-all hover:border-[#1476bf] hover:shadow-2xl hover:shadow-blue-200"
            >
              <CardContent className="flex flex-col items-center gap-4 bg-transparent p-4 md:flex-row lg:flex-row">
                <Link href={`/post/${advice.id}`}>
                  <Image
                    src={
                      advice.picture
                        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${advice.picture}`
                        : '/erhii.jpg'
                    }
                    alt={advice.name}
                    width={500}
                    height={300}
                    className=" aspect-[16/9] h-60 w-full object-cover"
                  />
                </Link>
                <div className=" max-w-80 space-y-4 p-4 text-black">
                  <div className="flex flex-col justify-between ">
                    <Link href={`/post/${advice.id}`}>
                      <p className="text-lg font-semibold md:text-xl lg:text-xl">
                        {advice.name}
                      </p>
                    </Link>
                    <p className="text-sm text-gray-500">
                      {advice.createdAt
                        ? format(
                            new Date(advice.createdAt),
                            "yyyy 'оны' MMMM d",
                            { locale: mn }
                          )
                        : 'Огноо байхгүй'}
                    </p>
                  </div>
                  <p className=" break-words">{advice.summary}</p>
                  <div className="h-[1px] w-full bg-[#1476bf]"></div>
                  <div className="flex flex-row space-x-8 text-[#1476bf]">
                    <Link href={shareUrls.facebook} target="_blank">
                      <FacebookIcon />
                    </Link>
                    <Link href={shareUrls.linkedin} target="_blank">
                      <LinkedinIcon />
                    </Link>
                    <Link href={shareUrls.twitter} target="_blank">
                      <X />
                    </Link>
                    <Link href={`/post/${advice.id}`}>
                      <Button className="border-[1px] border-[#1476bf] bg-transparent text-black hover:text-white">
                        Унших
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div className="items-center p-8">
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
