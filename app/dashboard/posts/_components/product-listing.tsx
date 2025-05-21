import { Product } from '@/constants/data';
import { fakeProducts } from '@/constants/mock-api';
import { searchParamsCache } from '@/lib/searchparams';
import { DataTable as ProductTable } from '@/components/ui/table/data-table';
import { columns } from './product-tables/columns';
import getToken from '@/lib/GetTokenServer';
import { notFound } from 'next/navigation';
import { PaginationData } from '../../users/_components/employee-listing-page';

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
  console.log(queryString);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts?${queryString}`,
    {
      cache: 'reload',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      }
    }
  ).catch((err) => notFound());
  const jsonData = await response.json();
  const data: Post[] = jsonData.data;

  const pagination: PaginationData = jsonData.pagination;
  return (
    <ProductTable columns={columns} data={data} totalItems={pagination.total} />
  );
}
