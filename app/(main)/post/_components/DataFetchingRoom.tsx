import { Product } from '@/constants/data';
import { fakeProducts } from '@/constants/mock-api';
import { searchParamsCache } from '@/lib/searchparams';
import { DataTable as ProductTable } from '@/components/ui/table/data-table';
import getToken from '@/lib/GetTokenServer';
import { notFound } from 'next/navigation';
import { PaginationData } from '@/app/dashboard/users/_components/employee-listing-page';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { BathIcon, BedDoubleIcon, Users2 } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Copy } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import OrderRoomsList from './OrderRoomsList';
import { Post } from '@/app/dashboard/posts/_components/product-listing';
type ProductListingPage = {};

export default async function ProductListingPage({ data }: { data: Post }) {
  return <OrderRoomsList data={data} />;
}
