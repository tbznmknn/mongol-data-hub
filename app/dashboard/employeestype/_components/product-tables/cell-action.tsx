'use client';
import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Product } from '@/constants/data';
import { BookImage, Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { EmployeeTypes } from '../product-listing';
import GetTokenClient, { GetSession } from '@/lib/GetTokenClient';
import { toast } from 'sonner';
import getToken from '@/lib/GetTokenServer';
import { auth } from '@/auth';
import { getSession, useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
interface CellActionProps {
  data: EmployeeTypes;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onConfirm = async () => {
    setLoading(true);
    const session = await getSession();
    try {
      const id = data.id;
      console.log('bbb');
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/membertype/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${session?.user.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.ok) {
        // console.log(response);
        const data = await response.json();
        toast.success(data.message || 'Амжилттай');
        router.refresh();
      } else {
        const data = await response.json();
        throw new Error(data.message || 'Амжилтгүй');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      const errorMessage = error instanceof Error ? error : 'Error occurred';
      toast.error(errorMessage.toString());
      setLoading(false);
    }
    setLoading(false);
  };
  const t = useTranslations('dashboard');
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{t('actions')}</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() =>
              router.push(`/dashboard/employees?categories=${data.id}`)
            }
          >
            <BookImage className="mr-2 h-4 w-4" /> {t('seemore')}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/employeestype/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> {t('update')}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> {t('delete')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
