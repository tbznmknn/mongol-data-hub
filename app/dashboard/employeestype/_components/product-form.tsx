'use client';

import { FileUploader } from '@/components/file-uploader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { EmployeeTypes } from './product-listing';
import { useTranslations } from 'next-intl';
import { roomCategorySchema } from './roomcategory-form-schema';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

import { roomCategoryValue } from './roomcategory-form-schema';
import LoadingButton from '@/components/customui/LoadingButton';
import { useTransition } from 'react';
import { getSession } from 'next-auth/react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
export default function RoomCategoryForm({
  initialData,
  pageTitle,
  isNew
}: {
  initialData: EmployeeTypes | null;
  pageTitle: string;
  isNew: boolean;
}) {
  const t = useTranslations('dashboard');
  const [loading, startTransition] = useTransition();
  const router = useRouter();

  const defaultValues = {
    name: initialData?.name || '',
    description: initialData?.description || ''
  };

  const form = useForm<roomCategoryValue>({
    resolver: zodResolver(roomCategorySchema(t)),

    values: defaultValues
  });

  function onSubmit(values: roomCategoryValue) {
    console.log(values);
    if (isNew) {
      startTransition(async () => {
        const session = await getSession();
        try {
          const body = {
            name: values.name,
            description: values.description
          };
          console.log(session?.user.accessToken);
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/membertype`,
            {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(body)
            }
          );

          if (response.ok) {
            const data = await response.json();
            toast.success(data.message || t('successful'));
            router.refresh();
          } else {
            const data = await response.json();
            throw new Error(data.message || t('unsuccessful'));
          }
        } catch (error) {
          console.error('Error submitting form:', error);
          const errorMessage =
            error instanceof Error ? error : t('errorOccured');
          toast.error(errorMessage.toString());
        }
      });
    } else {
      startTransition(async () => {
        const session = await getSession();
        try {
          const body = {
            name: values.name,
            description: values.description
          };
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/membertype/${
              initialData!.id
            }`,
            {
              method: 'PUT',
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(body)
            }
          );

          if (response.ok) {
            const data = await response.json();
            toast.success(data.message || t('successful'));

            router.refresh();
          } else {
            const data = await response.json();
            throw new Error(data.message || t('unsuccessful'));
          }
        } catch (error) {
          console.error('Error submitting form:', error);
          const errorMessage =
            error instanceof Error ? error : t('errorOccured');

          toast.error(errorMessage.toString());
        }
      });
    }
  }

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">
          {pageTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {/* {t('roomcategory.roomCategoryNameMongolia')} */}
                      Албан тушаалын нэр
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={'Албан тушаалын нэр оруулна уу'}
                        // placeholder={t('roomcategory.enterRoomCategoryName')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('roomcategory.descriptionMongolia')}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={'Тайлбар оруулна уу'}
                      // placeholder={t(
                      //   'roomcategory.enterRoomCategoryDescription'
                      // )}
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <LoadingButton loading={loading} type="submit">
              {isNew ? t('addnew') : t('update')}
            </LoadingButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
