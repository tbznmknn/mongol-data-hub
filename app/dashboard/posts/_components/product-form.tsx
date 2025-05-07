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
import {
  Post,
  PostCategory,
  translatePostCategoryToMongolian
} from './product-listing';
import { useLocale, useTranslations } from 'next-intl';
import { postSchema } from './room-form-schema';

import { PostValue } from './room-form-schema';
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
const PostCategoryObject = {
  ADVICE: 'ADVICE',
  NEWS: 'NEWS',
  COURSES: 'COURSES',
  RULES: 'RULES',
  VISIONS: 'VISIONS'
} as const; // `as const` ensures values remain string literals
export default function RoomCategoryForm({
  initialData,
  pageTitle,
  isNew // roomkeys
}: {
  initialData: Post | null;
  pageTitle: string;
  isNew: boolean;
  // roomkeys: RoomKeys[];
}) {
  const t = useTranslations('dashboard');
  const [loading, startTransition] = useTransition();
  const router = useRouter();

  const defaultValues: PostValue = {
    name: initialData?.name || '',
    category: initialData?.category || 'ADVICE',
    content: initialData?.content || '',
    summary: initialData?.summary || '',
    picture: [] // null is the default if no picture is provided
  };

  const form = useForm<PostValue>({
    resolver: zodResolver(postSchema(t, initialData)),
    defaultValues
  });

  function onSubmit(values: PostValue) {
    startTransition(async () => {
      const session = await getSession();
      try {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('category', String(values.category));
        formData.append('summary', values.summary);
        formData.append('content', values.content);
        if (values.picture && values.picture[0]) {
          formData.append('picture', values.picture[0]);
        }
        // Convert FormData iterator to an array before logging
        console.log('FormData Entries:', Array.from(formData.entries()));

        const url = isNew
          ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/`
          : `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/${initialData!.id}`;
        const method = isNew ? 'POST' : 'PUT';

        const response = await fetch(url, {
          method,
          headers: {
            Authorization: `Bearer ${session?.user.accessToken}`
            // No need to set 'Content-Type'
          },
          body: formData
        });
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
              {/* Summary */}
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
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Нийтлэлийн төрөл</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={String(field.value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Албан тушаал сонгоно уу" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(PostCategoryObject).map((category) => {
                          // Conditionally exclude VISIONS and RULES if isNew is true
                          if (
                            isNew &&
                            (category === PostCategoryObject.VISIONS ||
                              category === PostCategoryObject.RULES)
                          ) {
                            return null;
                          }

                          // Show only VISIONS if initialData is VISIONS
                          if (
                            initialData?.category ===
                              PostCategoryObject.VISIONS &&
                            category !== PostCategoryObject.VISIONS
                          ) {
                            return null;
                          }

                          // Show only RULES if initialData is RULES
                          if (
                            initialData?.category ===
                              PostCategoryObject.RULES &&
                            category !== PostCategoryObject.RULES
                          ) {
                            return null;
                          }

                          return (
                            <SelectItem key={category} value={category}>
                              {translatePostCategoryToMongolian(category)}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
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
