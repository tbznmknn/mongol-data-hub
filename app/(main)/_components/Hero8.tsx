import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { format } from 'date-fns';
import { mn } from 'date-fns/locale';
import { Button } from '@/components/ui/button';

interface CourseItem {
  category: string;
  createdAt: string;
  createdBy: number;
  id: number;
  name: string;
  picture: string;
  summary: string;
  updatedAt: string;
  updatedBy: string | null;
  creator: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string | null;
    role: string;
  };
  editor: string | null;
}

export default async function Surgalt() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts?categories=COURSES`,
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
    const courseData: CourseItem[] = jsonData.data.slice(0, 3);

    return (
      <div>
        <section className=" px-6 py-12">
          <div>
            <div className="container mx-auto flex max-w-7xl flex-col items-center space-y-8 px-6">
              <p className="mb-8 p-4 text-3xl font-semibold text-[#1476bf] md:text-4xl lg:p-8 lg:text-5xl">
                Сургалт
              </p>
              <div className="grid grid-cols-1 items-center justify-center gap-20 md:grid-cols-2 lg:grid-cols-3">
                {courseData.map((course) => (
                  <Card
                    key={course.id}
                    className="shadow-xs relative flex flex-col overflow-hidden rounded-md shadow-gray-400 transition-all hover:shadow-2xl"
                  >
                    <CardContent className="flex flex-grow flex-col p-0">
                      <Link href={`/post/${course.id}`}>
                        <Image
                          src={
                            course.picture
                              ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${course.picture}`
                              : '/erhii.jpg'
                          }
                          alt={course.name}
                          width={500}
                          height={300}
                          className="h-60 w-full object-cover"
                        />
                      </Link>
                      <Link href={`/post/${course.id}`}>
                        <div className="flex flex-grow flex-col space-y-4 p-8 text-black">
                          <p className="text-xl font-semibold md:text-2xl ">
                            {course.name}
                          </p>
                          <p>
                            {course.createdAt
                              ? format(
                                  new Date(course.createdAt),
                                  "yyyy 'оны' MMMM d",
                                  { locale: mn }
                                )
                              : 'Огноо байхгүй'}
                          </p>
                          <p className="h-32 overflow-hidden break-words leading-relaxed">
                            {course.summary}
                          </p>

                          <div className="mt-auto">
                            {' '}
                            {/* Ensure the button stays at the bottom */}
                            <Link
                              href={`/post/${course.id}`}
                              className="flex justify-end"
                            >
                              <Button
                                variant={'outline'}
                                className="flex items-center gap-2 hover:border-[1px] hover:border-[#1476bf] hover:bg-transparent  "
                              >
                                Дэлгэрэнгүй
                                <ChevronRight />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div>
                <Link href="/courses">
                  <Button className="text-lg hover:border-[1px] hover:border-[#1476bf] hover:bg-transparent hover:text-black hover:shadow-xl hover:shadow-blue-200">
                    Бүх сургалтыг харах
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  } catch (error) {
    console.error('Error fetching advice:', error);
    return notFound();
  }
}
