'use client';

import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { CellAction } from './cell-action';
import {
  Post,
  PostCategory,
  translatePostCategoryToMongolian
} from '../product-listing';
import { useTranslations } from 'next-intl';
import { formatDate8 } from '@/lib/utils';
import { SearchIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

interface ColumnWrapperProps {
  children: (t: any) => JSX.Element;
}
const ColumnWrapper = ({ children }: ColumnWrapperProps) => {
  const t = useTranslations('dashboard');
  return <>{children(t)}</>;
};

export const columns: ColumnDef<Post>[] = [
  {
    accessorKey: 'picture',
    header: 'IMAGE',
    cell: ({ row }) => {
      const picture =
        (row.getValue('picture') as string) || '/placeholder-image.jpg';

      const [isModalOpen, setIsModalOpen] = useState(false);

      const handleImageClick = () => {
        setIsModalOpen(true);
      };

      return (
        <>
          <div
            onClick={handleImageClick}
            className="group relative aspect-square h-16 w-16 cursor-pointer"
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${picture}`}
              alt={row.getValue('name') || 'Member Image'}
              fill
              className="rounded-lg object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <SearchIcon className="text-white" />
            </div>
          </div>

          <Dialog open={isModalOpen} onOpenChange={() => setIsModalOpen(false)}>
            <DialogContent className="w-full max-w-2xl rounded-lg bg-white p-6">
              <DialogTitle className="mb-4 text-xl font-bold">
                {row.getValue('name') || 'Member Image'}
              </DialogTitle>
              <div className="relative mx-auto w-full">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${picture}`}
                  width={600}
                  height={600}
                  alt="Full-size"
                  className="h-auto w-full rounded-lg"
                />
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute right-2 top-2 rounded-full bg-gray-800 p-1 text-white"
                >
                  X
                </button>
              </div>
            </DialogContent>
          </Dialog>
        </>
      );
    }
  },
  {
    accessorKey: 'name',
    header: () => (
      <ColumnWrapper>{(t) => <div>{t('table.name')}</div>}</ColumnWrapper>
    )
  },

  {
    accessorKey: 'category',
    header: () => <ColumnWrapper>{(t) => <div>Төрөл</div>}</ColumnWrapper>,
    cell: ({ row }) => {
      const category: PostCategory = row.getValue('category');
      const tl = translatePostCategoryToMongolian(category);
      let unique = false;
      if (
        category === 'RULES' ||
        category === 'VISIONS' ||
        category === 'MEMBERPOST'
      )
        unique = true;
      return <Badge variant={unique ? 'destructive' : 'default'}>{tl}</Badge>;
    }
  },
  {
    accessorKey: 'summary',
    header: () => <ColumnWrapper>{(t) => <div>Товч</div>}</ColumnWrapper>,
    cell: ({ row }) => {
      const summary: string = row.getValue('summary');
      const [isExpanded, setIsExpanded] = useState(false);

      const handleToggle = () => setIsExpanded((prev) => !prev);
      const truncatedSummary =
        summary.length > 30 ? summary.slice(0, 30) + '...' : summary;
      return (
        <div className="w-60 overflow-hidden text-ellipsis">
          <span>{isExpanded ? summary : truncatedSummary}</span>
          {summary.length > 30 && (
            <button
              className="ml-2 text-xs text-blue-500"
              onClick={handleToggle}
            >
              {isExpanded ? 'Хураах' : 'Дэлгэх'}
            </button>
          )}
        </div>
      );
    }
  },
  {
    accessorKey: 'createdAt',
    header: () => (
      <ColumnWrapper>{(t) => <div>{t('table.createdAt')}</div>}</ColumnWrapper>
    ),
    cell: ({ row }) => {
      const createdAt = row.getValue('createdAt') as string;
      const formattedDate = formatDate8(createdAt);
      return <span>{formattedDate}</span>;
    }
  },
  {
    accessorKey: 'updatedAt',
    header: () => (
      <ColumnWrapper>{(t) => <div>{t('table.updatedAt')}</div>}</ColumnWrapper>
    ),
    cell: ({ row }) => {
      const updatedAt = row.getValue('updatedAt') as string;
      const formattedDate = formatDate8(updatedAt);
      return <span>{formattedDate}</span>;
    }
  },

  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
