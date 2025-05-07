import { Product } from '@/constants/data';
import { fakeProducts } from '@/constants/mock-api';
import { searchParamsCache } from '@/lib/searchparams';
import { DataTable as ProductTable } from '@/components/ui/table/data-table';
import { columns } from './product-tables/columns';
import getToken from '@/lib/GetTokenServer';
import { notFound } from 'next/navigation';
import { PaginationData } from '../../users/_components/employee-listing-page';

type ProductListingPage = {};
export interface Member {
  id: number;
  name: string;
  memberTypeId: number;
  occupation: string;
  picture: string;
  email: string;
  phone: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  hideMail: boolean;
  hidePhone: boolean;
  memberType: {
    id: number;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  };
}

export default async function ProductListingPage({}: ProductListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('search');
  const pageLimit = searchParamsCache.get('limit');
  const categories = searchParamsCache.get('categories');
  const TOKEN = await getToken();

  const filters = {
    page: String(page), // Convert number to string
    limit: String(pageLimit), // Convert number to string
    ...(search && { search }),
    ...(categories && { categories })
  };
  const queryString = new URLSearchParams(filters).toString();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/members?${queryString}`,
    {
      cache: 'reload',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      }
    }
  ).catch((err) => notFound());
  const jsonData = await response.json();
  const data: Member[] = jsonData.data;
  const pagination: PaginationData = jsonData.pagination;
  return (
    <ProductTable columns={columns} data={data} totalItems={pagination.total} />
  );
}
