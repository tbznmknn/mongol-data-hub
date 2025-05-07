import * as z from 'zod';

export function roomCategorySchema(t?: (key: string) => string) {
  return z.object({
    name: z.string().min(1, {
      message: t ? t('name_required') : 'Name is required.'
    })
  });
}

export type roomCategoryValue = z.infer<
  Awaited<ReturnType<typeof roomCategorySchema>>
>;
