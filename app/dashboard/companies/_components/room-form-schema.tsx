import * as z from 'zod';

const MAX_FILE_SIZE = 20000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

export function memberSchema(t?: (key: string) => string, initialData?: any) {
  return z.object({
    name: z.string().min(1, {
      message: t ? t('name_required') : 'Name is required.'
    }),
    link: z.string().min(1, {
      message: t ? t('link_required') : 'Link is required.'
    }),
    summary: z
      .string()
      .min(1, {
        message: t ? t('occupation_required') : 'Summary is required.'
      })
      .max(100, {
        message: t ? '100 тэмдэгтийн уртаас хэтрэхгүй' : 'Summary is required.'
      }),
    address: z.string().min(1, {
      message: t ? t('address_required') : 'Address is required.'
    }),
    email: z.string().email({
      message: t ? t('invalid_email') : 'Invalid email format.'
    }),
    phone: z.string().min(1, {
      message: t ? t('phone_required') : 'Phone number is required.'
    }),
    content: z.string().min(1, {
      message: t ? t('content_required') : 'Content is required.'
    }),
    occupationTypeId: z.number().min(1, {
      message: t ? t('member_type_required') : 'Member type is required.'
    }),
    affiliationTypeId: z.number().min(1, {
      message: t ? t('member_type_required') : 'Member type is required.'
    }),
    picture: initialData
      ? z.array(z.instanceof(File)) // images are optional if initialData exists
      : z
          .array(z.instanceof(File))
          .min(1, { message: 'At least one image is required.' }) // images are required if no initialData
          .max(10, { message: 'You can upload up to 10 images.' })
          .refine(
            (files) => files.every((file) => file.size <= MAX_FILE_SIZE),
            {
              message: `Each image must be less than 20MB.`
            }
          )
          .refine(
            (files) =>
              files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
            { message: 'Only .jpg, .jpeg, .png, and .webp files are allowed.' }
          )
  });
}

export type MemberValue = z.infer<Awaited<ReturnType<typeof memberSchema>>>;
