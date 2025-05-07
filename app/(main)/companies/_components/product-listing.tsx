import { Product } from '@/constants/data';
import { fakeProducts } from '@/constants/mock-api';
import { searchParamsCache } from '@/lib/searchparams';
import { DataTable as ProductTable } from '@/components/ui/table/data-table';
import { columns } from './product-tables/columns';
import getToken from '@/lib/GetTokenServer';
import { notFound } from 'next/navigation';
import { PaginationData } from '@/app/dashboard/users/_components/employee-listing-page';
import { AssociateMember } from '@/app/dashboard/companies/_components/product-listing';
import { RoomKeys } from './product-tables/product-table-action';
import ProductTableAction from '@/app/dashboard/companies/_components/product-tables/product-table-action';
import { Separator } from '@/components/ui/separator';

type ProductListingPage = {};

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
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/company?${queryString}`,
    {
      // next: { revalidate: 60 * 5, tags: ['companies'] },
      headers: {
        cache: 'no-cache',
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      }
    }
  ).catch((err) => notFound());
  const jsonData = await response.json();
  const data: AssociateMember[] = jsonData.data;
  const pagination: PaginationData = jsonData.pagination;
  console.log(data);

  return (
    <div className="">
      <ProductTable
        columns={columns}
        data={data}
        totalItems={pagination.total}
      />
    </div>
  );
}
export async function CompanyFilterAction() {
  //keys
  const responseKeys = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/company/affiliationKeys`,
    {
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  ).catch((err) => notFound());

  const jsonDataKeys = await responseKeys.json();
  const dataKeys: RoomKeys[] = jsonDataKeys.data;
  return <ProductTableAction data={dataKeys} />;
}
