import * as z from 'zod';

const MAX_FILE_SIZE = 20000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

export function roomUpdateSchema(t?: (key: string) => string) {
  return z.object({
    roomNumber: z.string().min(1, {
      message: t ? t('room_number_required') : 'Room number is required.'
    }),
    roomTypeId: z.number().min(1, {
      message: t ? t('room_type_required') : 'Room type is required.'
    }),
    description: z.string().min(1, {
      message: t ? t('description_required') : 'Description is required.'
    }),
    description_en: z.string().min(1, {
      message: t
        ? t('description_en_required')
        : 'English description is required.'
    }),
    price: z.number().min(1, {
      message: t ? t('price_required') : 'Price is required.'
    }),
    capacity: z.number().min(1, {
      message: t ? t('capacity_required') : 'Capacity is required.'
    }),
    images: z
      .array(z.instanceof(File))
      .min(1, { message: 'At least one image is required.' })
      .max(10, { message: 'You can upload up to 10 images.' })
      .refine((files) => files.every((file) => file.size <= MAX_FILE_SIZE), {
        message: `Each image must be less than 20MB.`
      })
      .refine(
        (files) =>
          files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
        { message: 'Only .jpg, .jpeg, .png, and .webp files are allowed.' }
      )
  });
}

export type RoomUpdateValue = z.infer<
  Awaited<ReturnType<typeof roomUpdateSchema>>
>;
