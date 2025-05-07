import { Card, CardContent } from '@/components/ui/card';
import { ArrowBigRight } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface Members {
  id: number;
  name: string;
  memberTypeId: number;
  occupation: string;
  picture: string;
  email: string;
  phone: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  hideMainl: boolean;
  hidePhone: boolean;
  memberType: {
    id: number;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  };
}

export default async function Udirdlaga() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/members?limit=1&categories=1`,
      {
        cache: 'no-store',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch member data');
    }

    const jsonData = await response.json();
    const member = jsonData.data[0]; // Get the first member

    if (!member) {
      return notFound();
    }

    const urls = [
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/staticData/title/greetings-title`,
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/staticData/title/greetings-desc`
    ];

    const [title, body] = await Promise.all(
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
      <div>
        <section className="bg-[#1476bf] py-12 text-white">
          <div className="mx-auto max-w-7xl ">
            <div className="container mx-auto ">
              <p className="mb-8 p-4 text-center text-3xl font-semibold md:text-start md:text-4xl lg:text-5xl">
                {title.name}
              </p>
              <div className=" relative flex max-w-7xl flex-col-reverse items-center gap-12 pb-12 md:flex-row-reverse">
                {/* Greeting Content */}
                <div className="w-full rounded-lg bg-black bg-opacity-10 p-8 text-lg shadow-sm hover:shadow-md ">
                  <div className=" max-w-xl">
                    <h2 className="text-2xl font-bold">{member.name}</h2>
                    <p className="mt-2 text-gray-300">
                      {member.memberType.description}
                    </p>
                    <p className="mt-4 text-white">{member.content}</p>
                    <p>{body.description}</p>
                  </div>

                  {/* Member Type */}
                </div>
                {/* Image */}
                <div className="relative md:relative lg:relative xl:absolute xl:right-24">
                  <Link
                    href={`/management/${member.id}`}
                    className="relative block"
                  >
                    <Image
                      src={
                        member.picture
                          ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${member.picture}`
                          : '/erhii.jpg'
                      }
                      alt={member.name}
                      width={200}
                      height={200}
                      className="h-96 w-full rounded-lg object-cover shadow-xl transition-transform duration-1000 hover:scale-105"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  } catch (error) {
    return notFound();
  }
}
