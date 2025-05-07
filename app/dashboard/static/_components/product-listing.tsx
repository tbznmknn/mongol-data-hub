'use server';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';

import { searchParamsCache } from '@/lib/searchparams';

import getToken from '@/lib/GetTokenServer';
import { notFound } from 'next/navigation';
import { PaginationData } from '../../users/_components/employee-listing-page';
import { formatDate8 } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import EditForm from './EditForm';
import { PaginationWithLinks } from '@/components/customui/paginationwithlinks';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

type ProductListingPage = {};
export type PostCategory =
  | 'ADVICE'
  | 'NEWS'
  | 'COURSES'
  | 'RULES'
  | 'VISIONS'
  | 'MEMBERPOST';

export const translatePostCategoryToMongolian = (
  category: PostCategory
): string => {
  const translations: Record<PostCategory, string> = {
    ADVICE: 'Зөвлөмж',
    NEWS: 'Мэдээ',
    COURSES: 'Хичээл',
    RULES: 'Засаглал',
    VISIONS: 'Алсын хараа',
    MEMBERPOST: 'Гишүүнчлэл'
  };

  return translations[category];
};

export interface Post {
  id: number;
  name: string;
  picture: string;
  summary: string;
  category: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  createdBy: number;
  updatedBy: number | null;
  creator: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    role: String;
  };
  editor: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    role: String;
  } | null;
}
export interface StaticData {
  id: number;
  purpose: string;
  title: string;
  name: string | null;
  description: string | null;
  picture: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export default async function ProductListingPage({}: ProductListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('search');
  const pageLimit = searchParamsCache.get('limit');
  const categories = searchParamsCache.get('categories');

  const filters = {
    page: String(page), // Convert number to string
    limit: String(pageLimit), // Convert number to string
    ...(search && { search }),
    ...(categories && { categories })
  };
  const TOKEN = await getToken();
  const queryString = new URLSearchParams(filters).toString();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/staticData?${queryString}`,
    {
      cache: 'reload',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      }
    }
  ).catch((err) => notFound());
  const jsonData = await response.json();
  const data: StaticData[] = jsonData.data;
  const pagination: PaginationData = jsonData.pagination;
  return (
    <div>
      <Table data={data} />
      <div className="flex items-center justify-end p-8">
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

    // <ProductTable columns={columns} data={data} totalItems={pagination.total} />
  );
}
const Table = async ({ data }: { data: StaticData[] }) => {
  if (!data) return <div>Дата алга</div>;
  const TOKEN = await getToken();

  return (
    <ScrollArea>
      <div className=" shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Зорилго
              </th>
              <th scope="col" className="px-6 py-3">
                Түлхүүр
              </th>
              <th scope="col" className="px-6 py-3">
                Төрөл
              </th>
              <th scope="col" className="px-6 py-3">
                Шинэчлэгдсэн
              </th>

              <th scope="col" className="px-6 py-3">
                Үйлдэл
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => {
              let fieldType;
              if (row.picture !== null) {
                fieldType = 'Зураг';
              } else if (row.name !== null) {
                fieldType = 'Гарчиг';
              } else if (row.description !== null) {
                fieldType = 'Тайлбар';
              }
              return (
                <tr
                  key={row.id}
                  className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  {' '}
                  <th
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                  >
                    {row.purpose}
                  </th>
                  <td className="px-6 py-4"> {row.title}</td>
                  <td className="px-6 py-4">
                    <Badge>{fieldType}</Badge>
                  </td>
                  <td className="px-6 py-4">{formatDate8(row.updatedAt)}</td>
                  <td className="px-6 py-4">
                    <Sheet>
                      <SheetTrigger className="text-primary">
                        Өөрчлөх
                      </SheetTrigger>
                      <SheetContent>
                        <SheetHeader>
                          <SheetTitle>Солих</SheetTitle>
                        </SheetHeader>
                        <EditForm
                          TOKEN={TOKEN!}
                          row={row}
                          fieldType={fieldType as any}
                        />
                      </SheetContent>
                    </Sheet>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
