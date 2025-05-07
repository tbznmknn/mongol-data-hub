'use client';

import { FileUploader } from '@/components/file-uploader';
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
import { useLocale, useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { AssociateMember } from './product-listing';
import { memberSchema } from './room-form-schema';

import MinimalTiptapThree from '@/components/custom/minimal-tiptap-three';
import LoadingButton from '@/components/customui/LoadingButton';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Editor } from '@tiptap/react';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback, useRef, useTransition } from 'react';
import { toast } from 'sonner';
import { RoomKeys } from './product-tables/product-table-action';
import { MemberValue } from './room-form-schema';

export default function RoomCategoryForm({
  initialData,
  pageTitle,
  isNew, // roomkeys,
  occupationkeys,
  affiliationkeys
}: {
  initialData: AssociateMember | null;
  pageTitle: string;
  isNew: boolean;
  occupationkeys: RoomKeys[];
  affiliationkeys: RoomKeys[];
}) {
  const t = useTranslations('dashboard');
  const [loading, startTransition] = useTransition();
  const router = useRouter();

  const defaultValues: MemberValue = {
    name: initialData?.name || '',
    link: initialData?.link || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    content: initialData?.content || '',
    summary: initialData?.summary || '',
    address: initialData?.address || '',
    occupationTypeId: initialData?.occupationTypeId || occupationkeys[0]?.id, // Default to 1 if no initial data is provided

    affiliationTypeId: initialData?.affiliationTypeId || affiliationkeys[0]?.id, // Default to 1 if no initial data is provided

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
        formData.append('address', String(values.address));
        formData.append('summary', values.summary);
        formData.append('email', values.email);
        formData.append('phone', values.phone);
        formData.append('content', values.content);
        formData.append('link', String(values.link));
        formData.append('occupationTypeId', String(values.occupationTypeId));
        formData.append('affiliationTypeId', String(values.affiliationTypeId));

        if (values.picture && values.picture[0]) {
          formData.append('picture', values.picture[0]);
        }
        // Convert FormData iterator to an array before logging
        console.log('FormData Entries:', Array.from(formData.entries()));

        const url = isNew
          ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/company/`
          : `${process.env.NEXT_PUBLIC_BACKEND_URL}/company/${initialData!.id}`;
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
              <FormField
                control={form.control}
                name="occupationTypeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Бизнесийн үйл ажиллагаа</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={String(field.value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Бизнесийн үйл ажиллагааын чиглэлийг сонгоно уу" />
                      </SelectTrigger>
                      <SelectContent>
                        {occupationkeys.map((occupation) => (
                          <SelectItem
                            key={occupation.id}
                            value={occupation.id.toString()}
                          >
                            {`${occupation.name}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="affiliationTypeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Гишүүний төрөл</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={String(field.value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Гишүүний төрөл сонгоно уу" />
                      </SelectTrigger>
                      <SelectContent>
                        {affiliationkeys.map((affiliation) => (
                          <SelectItem
                            key={affiliation.id}
                            value={affiliation.id.toString()}
                          >
                            {`${affiliation.name}`}
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
              {/* Occupation */}
              <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Линк</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Lинк оруулна уу"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Хаяг</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Хаяг оруулна уу"
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
              {/* Phone */}
              <FormField
                control={form.control}
                name="summary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Товч танилцуулга{' '}
                      <span className="text-xs italic text-muted-foreground">
                        {' '}
                        (100 тэмдэгт)
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        rows={4}
                        placeholder="Товч танилцуулга оруулна уу"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
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
