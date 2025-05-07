'use client';
import { Product } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { CellAction } from './cell-action';
import { EmployeeTypes } from '../product-listing';
import { useTranslations } from 'next-intl';
import { formatDate, formatDate8 } from '@/lib/utils';
interface ColumnWrapperProps {
  children: (t: any) => JSX.Element;
}
const ColumnWrapper = ({ children }: ColumnWrapperProps) => {
  const t = useTranslations('dashboard');
  return <>{children(t)}</>;
};

export const columns: ColumnDef<EmployeeTypes>[] = [
  // {
  //   accessorKey: 'photo_url',
  //   header: 'IMAGE',
  //   cell: ({ row }) => {
  //     return (
  //       <div className="relative aspect-square">
  //         <Image
  //           src={row.getValue('photo_url')}
  //           alt={row.getValue('name')}
  //           fill
  //           className="rounded-lg"
  //         />
  //       </div>
  //     );
  //   }
  // },
  {
    accessorKey: 'id',
    header: () => <ColumnWrapper>{(t) => <div>ID</div>}</ColumnWrapper>
  },
  {
    accessorKey: 'name',
    header: () => (
      <ColumnWrapper>{(t) => <div>{t('table.name')}</div>}</ColumnWrapper>
    )
  },
  // {
  //   accessorKey: 'category',
  //   header: 'CATEGORY'
  // },
  // {
  //   accessorKey: 'price',
  //   header: 'PRICE'
  // },
  {
    accessorKey: 'description',
    header: () => (
      <ColumnWrapper>
        {(t) => <div>{t('table.description')}</div>}
      </ColumnWrapper>
    )
  },
  {
    accessorKey: 'createdAt',
    header: () => (
      <ColumnWrapper>{(t) => <div>{t('table.createdAt')}</div>}</ColumnWrapper>
    ),
    cell: ({ row }) => {
      const createdAt = row.getValue('createdAt') as string;
      return <span>{formatDate8(createdAt)}</span>;
    }
  },
  {
    accessorKey: 'updatedAt',
    header: () => (
      <ColumnWrapper>{(t) => <div>{t('table.updatedAt')}</div>}</ColumnWrapper>
    ),
    cell: ({ row }) => {
      const updatedAt = row.getValue('updatedAt') as string;
      return <span>{formatDate8(updatedAt)}</span>;
    }
  },

  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
