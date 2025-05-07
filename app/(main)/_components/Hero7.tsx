'use server';
import { notFound } from 'next/navigation';
import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

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

export default async function Zuvlumj() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts?categories=ADVICE`,
      {
        cache: 'no-cache',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch advice');
    }

    const jsonData = await response.json();
    const adviceData: AdviceItem[] = jsonData.data.slice(0, 4);

    return (
      <div className="items-center bg-blue-200 px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <p className="mb-8 p-4 text-center text-3xl font-semibold text-[#1476bf] md:text-4xl lg:text-5xl">
            Зөвлөмж
          </p>
          <div className="grid grid-cols-1 gap-8  md:grid-cols-2 xl:grid-cols-4">
            {adviceData.map((advice) => {
              return (
                <Card
                  key={advice.id}
                  className="block w-full max-w-sm overflow-hidden border-none bg-blue-200 shadow-none  "
                >
                  <CardContent className="flex flex-col space-y-7 bg-transparent p-4">
                    <Link href={`/post/${advice.id}`}>
                      <Image
                        src={
                          advice.picture
                            ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${advice.picture}`
                            : '/erhii.jpg'
                        }
                        alt={advice.name}
                        width={400}
                        height={300}
                        className="h-52 w-full rounded-lg border-[1px] border-[#1476bf] object-cover transition-transform duration-1000 ease-in-out hover:scale-105"
                      />
                    </Link>
                    <Link href={`/post/${advice.id}`}>
                      <p className="text-lg font-semibold md:text-xl lg:text-xl ">
                        {advice.name}
                      </p>
                    </Link>
                    <div className="h-[1px] w-full bg-[#1476bf]"></div>
                    <p>{advice.summary}</p>
                    {/*} <div className="flex flex-row justify-between text-gray-500">
                      <Link href={`/post/${advice.id}`}>
                        <p>Дэлгэрэнгүй</p>
                      </Link>
                      <Link href={`/post/${advice.id}`}>
                        <ArrowRight />
                      </Link>
                    </div>*/}
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <div className="mt-4 flex justify-center ">
            <Link href="/advice">
              <Button className="relative w-fit overflow-hidden rounded-full border-[1px] border-[#1476bf] bg-transparent text-black transition-all duration-500 before:absolute before:inset-0 before:scale-0 before:bg-[#1476bf] before:transition-transform before:duration-300 hover:border-[#1476bf] hover:text-white hover:shadow-lg hover:shadow-[#1476bf]/50 hover:before:scale-100 active:scale-95">
                <p className="relative z-10 p-4 text-lg">
                  Бүх зөвлөмжийг харах
                </p>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching advice:', error);
    return notFound();
  }
}
