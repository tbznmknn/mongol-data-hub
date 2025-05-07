'use server';
import { notFound } from 'next/navigation';
import {
  ChevronRight,
  FacebookIcon,
  Linkedin,
  NewspaperIcon,
  User,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { mn } from 'date-fns/locale';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface NewsItem {
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

export default async function Medee() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts?categories=NEWS&limit=6`,
      {
        cache: 'no-cache',

        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).catch((err) => notFound());
    console.log('Data--', response);

    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }

    const jsonData = await response.json();
    const newsData: NewsItem[] = await jsonData.data;

    console.log('urt:', newsData.length);
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
      <div className="max-w-9xl mx-auto flex flex-col items-center px-6 py-12">
        <p className="mb-8 p-4 text-center text-3xl font-semibold text-[#1476bf]  md:text-4xl lg:text-5xl">
          Сүүлийн мэдээ
        </p>

        <div className="grid grid-cols-1 gap-8  md:grid-cols-2 lg:grid-cols-3">
          {newsData.map((news) => {
            const postUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/post/${news.id}`;
            const shareUrls = generateShareUrl(postUrl, news.name);

            return (
              <Card
                key={news.id}
                className=" block w-full max-w-sm overflow-hidden border-none bg-[#f5f5f5] shadow-none transition-all duration-500 hover:border-gray-100 hover:bg-white hover:shadow-sm hover:shadow-gray-200 "
              >
                <CardContent className="flex flex-col space-y-5 bg-transparent p-4">
                  {/* Title with a fixed min height to prevent overlap */}

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
                      className="h-52 w-full rounded-lg object-cover transition-transform duration-1000 ease-in-out hover:scale-105"
                    />
                  </Link>
                  {/* Date */}
                  <p className="text-sm text-gray-600">
                    {news.createdAt
                      ? format(new Date(news.createdAt), "yyyy 'оны' MMMM  d", {
                          locale: mn
                        })
                      : 'Огноо байхгүй'}
                  </p>
                  <Link href={`/post/${news.id}`}>
                    <p className="min-h-20 text-sm font-semibold md:text-sm ">
                      {news.name}
                    </p>
                  </Link>
                  <div className="flex flex-row space-x-4 text-gray-600">
                    <Link href={`/post/${news.id}`}>
                      <p>Дэлгэрэнгүй</p>
                    </Link>
                    <Link href={`/post/${news.id}`}>
                      <ArrowRight />
                    </Link>
                  </div>

                  {/*<div className="space-y-4 p-4 text-black">
                    <p className="h-32 overflow-hidden break-words leading-relaxed">
                      {news.summary}
                    </p>

                    <div className="h-[1px] w-full bg-[#1476bf]"></div>

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
                  </div>*/}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
