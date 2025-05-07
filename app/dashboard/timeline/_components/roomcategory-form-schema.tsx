import * as z from 'zod';

export function roomCategorySchema(t?: (key: string) => string) {
  return z.object({
    name: z.string().min(1, {
      message: t ? t('name_required') : 'Name is required.'
    }),

    year: z
      .string()
      .min(1, {
        message: t ? 'Жилээ оруулна уу' : 'Name is required.'
      })
      .refine((val) => !Number.isNaN(parseInt(val, 10)), {
        message: 'Expected number, received a string'
      }),

    description: z.string().min(1, {
      message: t ? t('description_required') : 'Description is required.'
    })
  });
}

export type roomCategoryValue = z.infer<
  Awaited<ReturnType<typeof roomCategorySchema>>
>;
