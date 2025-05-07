import { Card, CardContent } from '@/components/ui/card';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

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

export default async function Members1() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/members`,
      {
        method: 'GET',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).catch((err) => notFound());

    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }

    const jsonData = await response.json();
    const memberData: Members[] = await jsonData.data;

    return (
      <div>
        <div className="md:grid-cols2 grid grid-cols-1  gap-16 p-8 lg:grid-cols-2 ">
          {memberData.map((member) => (
            <Card
              key={member.id}
              className=" relative w-full  overflow-hidden rounded-none bg-transparent transition-all hover:border-[#1476bf]   hover:shadow-2xl hover:shadow-blue-200"
            >
              <CardContent className=" flex flex-col gap-4 bg-transparent p-4 md:flex-row md:p-8 lg:flex-row">
                <Link href={`/management/${member.id}`}>
                  <Image
                    src={
                      member.picture
                        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${member.picture}`
                        : '/erhii.jpg'
                    }
                    alt={member.name}
                    width={200}
                    height={100}
                    className="h-[150px] w-full object-cover"
                  />
                </Link>
                <div className="space-y-2 p-4 text-black">
                  <p className="text-lg font-semibold md:text-xl lg:text-xl">
                    {member.name}
                  </p>

                  {/*<p>
                    {new Date(advice.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>*/}
                  <p className="font-semibold">
                    {' '}
                    Албан тушаал:{member.memberType.name}
                  </p>
                  <p>
                    {' '}
                    Мэргэжил:
                    {member.occupation}
                  </p>
                  <div className=" flex flex-row space-x-4 text-sm">
                    <p>{member.email}</p> <p>|</p>
                    <p>{member.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
