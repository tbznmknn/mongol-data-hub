import { notFound } from 'next/navigation';
import getToken from '@/lib/GetTokenServer';
import Image from 'next/image';
import { Member } from '@/app/dashboard/employees/_components/product-listing';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, MailIcon, PhoneIcon } from 'lucide-react';

export default async function LeaderContent() {
  const TOKEN = await getToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/members?customSort=true`,
    {
      cache: 'no-cache',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      }
    }
  ).catch((err) => notFound());

  if (!response.ok) {
    notFound();
  }

  const jsonData = await response.json();
  const data: Member[] = jsonData.data;

  return (
    <div className="relative bg-blue-50 px-4 py-10">
      <h1 className="my-8 text-center text-2xl font-bold text-gray-900 sm:text-3xl">
        Удирдлага
      </h1>
      <div className="mx-5 flex justify-end">
        <Link href={'/management'} className="text-sky-400">
          Бүгдийг үзэх
        </Link>
      </div>

      {/* Card Grid */}
      <div className="relative mx-auto my-4 grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 sm:gap-6 sm:px-10 md:grid-cols-3 md:gap-8">
        {/* Limit to the first 3 people */}
        {data.slice(0, 3).map((person, index) => (
          <div key={index} className="relative mx-auto w-full max-w-xs">
            <Link href={`/management/${person.id}`}>
              <div className="absolute inset-0 translate-x-2 translate-y-2 transform rounded-lg bg-blue-500 shadow-lg"></div>
              <Card className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-md border-2 shadow-lg">
                {/* Image Section */}
                <div className="relative h-64 w-full">
                  <Image
                    height={500}
                    width={300}
                    className="absolute inset-0 h-full w-full rounded-t-md object-cover"
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${person.picture}`}
                    alt={person.name}
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-black/40 py-2 text-white">
                    <h2 className="pl-2 text-lg font-semibold">
                      {person.name}
                    </h2>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex min-h-[4rem] w-full flex-grow flex-col px-4 py-2">
                  {!person.hideMail && (
                    <div className="ml-2 flex items-center gap-1 text-sm text-muted-foreground">
                      <MailIcon className="size-3" />
                      {person.email}
                    </div>
                  )}
                  {!person.hidePhone && (
                    <div className="ml-2 flex items-center gap-1 text-sm text-muted-foreground">
                      <PhoneIcon className="size-3" />
                      {person.phone}
                    </div>
                  )}
                </div>

                {/* Footer Section */}
                <CardContent className="flex items-center justify-between bg-white px-4 py-2">
                  <h3 className="text-lg text-gray-700">
                    {person.memberType.name}
                  </h3>
                  <button className="rounded-full p-2 transition hover:bg-gray-200">
                    <ArrowRight className="h-6 w-6 text-gray-700" />
                  </button>
                </CardContent>
              </Card>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
