import { Product } from '@/constants/data';
import { fakeProducts } from '@/constants/mock-api';
import { searchParamsCache } from '@/lib/searchparams';
import { DataTable as ProductTable } from '@/components/ui/table/data-table';
import { columns } from './product-tables/columns';
import getToken from '@/lib/GetTokenServer';
import { notFound } from 'next/navigation';
import { PaginationData } from '../../users/_components/employee-listing-page';

type ProductListingPage = {};
export interface EmployeeTypes {
  id: number;
  name: string;
  description: string;
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
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/affiliation?${queryString}`,
    {
      cache: 'no-cache',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      } //ene uuyes.copypaste budgiin ymutokenoos doosh pagination hurtel
    }
  ).catch((err) => notFound());

  const jsonData = await response.json();
  const data: EmployeeTypes[] = jsonData.data;
  console.log(data);
  const pagination: PaginationData = jsonData.pagination;

  return (
    <ProductTable columns={columns} data={data} totalItems={pagination.total} />
  );
}
