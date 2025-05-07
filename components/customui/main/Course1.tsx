'use server';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { FacebookIcon, X, LinkedinIcon, ShareIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PaginationWithLinks } from '../paginationwithlinks';
import { searchParamsCache } from '@/lib/searchparams';
import { PaginationData } from '@/app/dashboard/users/_components/employee-listing-page';
import { format } from 'date-fns';
import { mn } from 'date-fns/locale';

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

export default async function Course1() {
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('search');
  const pageLimit = searchParamsCache.get('limit');
  const filters = {
    categories: 'COURSES',
    page: String(page), // Convert number to string
    limit: String(pageLimit), // Convert number to string
    ...(search && { search })
  };
  const queryString = new URLSearchParams(filters).toString();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts?${queryString}`,
      {
        method: 'GET',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch course data');
    }

    const jsonData = await response.json();
    const courseData: CourseItem[] = jsonData.data;
    const pagination: PaginationData = jsonData.pagination;

    const getShareableUrl = (courseId: number) => {
      return `${process.env.NEXT_PUBLIC_FRONTEND_URL}/post/${courseId}`; // Generates the post URL
    };

    return (
      <div>
        <div className="mt-8 flex w-full flex-col ">
          {courseData.length > 0 ? (
            courseData.map((course) => {
              const postUrl = getShareableUrl(course.id);
              const shareUrls = generateShareUrl(postUrl, course.name);

              return (
                <div
                  key={course.id}
                  className="flex w-full flex-col border-b p-4 md:flex-row"
                >
                  {/* Image - Takes full row on small screens, fixed larger size on bigger screens */}
                  <Link
                    href={`/post/${course.id}`}
                    className="w-full md:w-auto md:flex-shrink-0"
                  >
                    <Image
                      src={
                        course.picture
                          ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${course.picture}`
                          : '/erhii.jpg'
                      }
                      alt={course.name}
                      width={600} // Increased width
                      height={400} // Increased height
                      className="h-auto w-full object-cover transition-all duration-300 ease-in-out hover:brightness-50 md:h-[180px] md:w-[250px] lg:h-[200px] lg:w-[300px]"
                    />
                  </Link>

                  {/* Right Side (Course Details) */}
                  <div className="flex flex-1 flex-col space-y-4 px-8">
                    <div className="mt-4 flex flex-row space-x-1">
                      <div className="flex flex-col">
                        <p className="text-xl">
                          {course.creator.firstName} {course.creator.lastName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {course.createdAt
                            ? format(
                                new Date(course.createdAt),
                                "yyyy 'оны' MMMM d",
                                { locale: mn }
                              )
                            : 'Огноо байхгүй'}
                        </p>
                      </div>
                    </div>
                    <Link href={`/post/${course.id}`}>
                      <p className="text-xl font-bold">{course.name}</p>
                    </Link>
                    <p className="break-words text-gray-700">
                      {course.summary}
                    </p>

                    {/* Read More Button */}
                    <div className="flex justify-end">
                      <Link href={`/post/${course.id}`}>
                        <Button className="w-fit rounded-full border-[1px] border-[#1476bf] bg-transparent text-black hover:bg-[#1476bf] hover:text-white">
                          <p className="p-4">Унших</p>
                        </Button>
                      </Link>
                    </div>

                    <div className="h-[1px] w-full bg-[#1476bf]"></div>

                    {/* Share Icons */}
                    <div className="flex flex-row space-x-8 text-[#1476bf]">
                      <Link href={shareUrls.facebook}>
                        <FacebookIcon />
                      </Link>
                      <Link href={shareUrls.twitter}>
                        <X />
                      </Link>
                      <Link href={shareUrls.linkedin}>
                        <LinkedinIcon />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No courses available.</p>
          )}
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
  } catch (error) {
    return notFound();
  }
}
