'use client';

import { FileUploader } from '@/components/file-uploader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
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
import { Member } from './product-listing';
import { useLocale, useTranslations } from 'next-intl';
import { memberSchema } from './room-form-schema';

import { MemberValue } from './room-form-schema';
import LoadingButton from '@/components/customui/LoadingButton';
import { useCallback, useRef, useTransition } from 'react';
import { getSession } from 'next-auth/react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { RoomKeys } from './product-tables/product-table-action';
import { Checkbox } from '@/components/ui/checkbox';
import { Editor } from '@tiptap/react';
import { cn } from '@/lib/utils';
import { MinimalTiptapEditor } from '@/components/minimal-tiptap/minimal-tiptap';
import MinimalTiptapThree from '@/components/custom/minimal-tiptap-three';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

export default function RoomCategoryForm({
  initialData,
  pageTitle,
  isNew,
  roomkeys
}: {
  initialData: Member | null;
  pageTitle: string;
  isNew: boolean;
  roomkeys: RoomKeys[];
}) {
  const t = useTranslations('dashboard');
  const [loading, startTransition] = useTransition();
  const router = useRouter();

  const defaultValues: MemberValue = {
    name: initialData?.name || '',
    memberTypeId: initialData?.memberTypeId || roomkeys[0]?.id || 0, // Default to 1 if no initial data is provided
    occupation: initialData?.occupation || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    content: initialData?.content || '',
    hideMail: initialData?.hideMail || false,
    hidePhone: initialData?.hidePhone || false,
    picture: [] // null is the default if no picture is provided
  };

  const form = useForm<MemberValue>({
    resolver: zodResolver(memberSchema(t, initialData)),
    defaultValues
  });

  function onSubmit(values: MemberValue) {
    console.log(values);
    startTransition(async () => {
      const session = await getSession();
      try {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('memberTypeId', String(values.memberTypeId));
        formData.append('occupation', values.occupation);
        formData.append('email', values.email);
        formData.append('phone', values.phone);
        formData.append('content', values.content);
        formData.append('hideMail', String(values.hideMail)); // Boolean field as a string
        formData.append('hidePhone', String(values.hidePhone)); // Boolean field as a string
        if (values.picture && values.picture[0]) {
          formData.append('picture', values.picture[0]);
        }
        // Convert FormData iterator to an array before logging
        console.log('FormData Entries:', Array.from(formData.entries()));

        const url = isNew
          ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/members/`
          : `${process.env.NEXT_PUBLIC_BACKEND_URL}/members/${initialData!.id}`;
        const method = isNew ? 'POST' : 'PUT';

        const response = await fetch(url, {
          method,
          headers: {
            Authorization: `Bearer ${session?.user.accessToken}`
            // No need to set 'Content-Type'
          },
          body: formData
        });
        console.log(response.status, 'code');
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
        toast.error(error instanceof Error ? error.message : t('errorOccured'));
      }
    });
  }
  const locale = useLocale();
  const editorRef = useRef<Editor | null>(null);

  const handleCreate = useCallback(
    ({ editor }: { editor: Editor }) => {
      if (form.getValues('content') && editor.isEmpty) {
        editor.commands.setContent(form.getValues('content'));
      }
      editorRef.current = editor;
    },
    [form]
  );
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
            {/* Images */}
            <FormField
              control={form.control}
              name="picture"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Зураг</FormLabel>
                  <FormControl>
                    <FileUploader
                      value={field.value}
                      onValueChange={field.onChange}
                      maxFiles={1}
                      maxSize={20 * 1024 * 1024}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Нэр</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Нэр оруулна уу"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {' '}
              {/* Occupation */}
              <FormField
                control={form.control}
                name="occupation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Мэргэжил</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Мэргэжил оруулна уу"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Room Type */}
              <FormField
                control={form.control}
                name="memberTypeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Албан тушаал</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={String(field.value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Албан тушаал сонгоно уу" />
                      </SelectTrigger>
                      <SelectContent>
                        {roomkeys.map((room) => (
                          <SelectItem key={room.id} value={room.id.toString()}>
                            {`${room.name}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {' '}
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>И-мэйл</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="И-мэйл оруулна уу"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Утасны дугаар</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Утасны дугаар оруулна уу"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {' '}
              {/* Hide Mail */}
              <FormField
                control={form.control}
                name="hideMail"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>И-мэйл нуух</FormLabel>
                      <FormDescription>
                        Нийтэд уг ажилчны и-мэйлийг харуулах контрол
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              {/* Hide Phone */}
              <FormField
                control={form.control}
                name="hidePhone"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Утасны дугаар нуух</FormLabel>
                      <FormDescription>
                        Нийтэд уг ажилчны и-мэйлийг харуулах утасны дугаар
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            {/* Content */}
            <ScrollArea className="w-[600px] max-w-4xl whitespace-nowrap  md:w-full">
              {' '}
              <div className=" w-full">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Гол хэсэг</FormLabel>

                      <FormControl>
                        <MinimalTiptapThree
                          {...field}
                          throttleDelay={0}
                          className={cn('max-w-4xl', {
                            'border-destructive focus-within:border-destructive':
                              form.formState.errors.content
                          })}
                          editorContentClassName="some-class"
                          output="html"
                          placeholder="Контентоо оруулна уу..."
                          onCreate={handleCreate}
                          autofocus={true}
                          immediatelyRender={false}
                          editable={true}
                          injectCSS={true}
                          editorClassName="focus:outline-none p-5"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <ScrollBar orientation="horizontal" />
              </div>
            </ScrollArea>

            {/* Submit Button */}
            <LoadingButton loading={loading} type="submit">
              {isNew ? 'Шинээр нэмэх' : 'Засварлах'}
            </LoadingButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
