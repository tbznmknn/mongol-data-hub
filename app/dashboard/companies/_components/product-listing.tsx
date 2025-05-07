import { Product } from '@/constants/data';
import { fakeProducts } from '@/constants/mock-api';
import { searchParamsCache } from '@/lib/searchparams';
import { DataTable as ProductTable } from '@/components/ui/table/data-table';
import { columns } from './product-tables/columns';
import getToken from '@/lib/GetTokenServer';
import { notFound } from 'next/navigation';
import { PaginationData } from '../../users/_components/employee-listing-page';
import ProductTableAction, {
  RoomKeys
} from '@/app/(main)/companies/_components/product-tables/product-table-action';

type ProductListingPage = {};
export interface AssociateMember {
  id: number;
  name: string;
  link: string;
  picture: string;
  summary: string;
  email: string;
  address: string;
  phone: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  createdBy: number;
  updatedBy: number | null;
  occupationTypeId: number;
  affiliationTypeId: number;
  AffiliationType: {
    name: string;
    id: number;
  };
  OccupationType: {
    name: string;
    id: number;
  };
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
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/company?${queryString}`,
    {
      cache: 'reload',
      headers: {
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
    <ProductTable columns={columns} data={data} totalItems={pagination.total} />
  );
}
