// Edit Form Component (Client Component)
'use client'; // Mark this as a client component since it uses hooks

import { useState } from 'react';
import { StaticData } from './product-listing';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import LoadingButton from '@/components/customui/LoadingButton';

const EditForm = ({
  row,
  TOKEN,
  fieldType
}: {
  row: StaticData;
  fieldType: string;
  TOKEN: string;
}) => {
  const [value, setValue] = useState<string>(
    row.picture || row.name || row.description || ''
  );
  const [loading, setLoading] = useState(false);

  // Server Action for PUT request
  async function handleSubmit(formData: FormData) {
    const updatedData: Partial<StaticData> = {
      purpose: row.purpose,
      title: row.title,
      picture:
        fieldType === 'Зураг'
          ? formData.get('value')?.toString() ?? null
          : null,
      name:
        fieldType === 'Гарчиг'
          ? formData.get('value')?.toString() ?? null
          : null,
      description:
        fieldType === 'Тайлбар'
          ? formData.get('value')?.toString() ?? null
          : null
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/staticData/${row.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Add your authorization token here if required
          Authorization: `Bearer ${TOKEN}`
        },
        body: JSON.stringify(updatedData)
      }
    );

    return response.ok;
  }

  const onSubmit = async (formData: FormData) => {
    setLoading(true);
    const success = await handleSubmit(formData);
    setLoading(false);

    if (success) {
      toast('Амжилттай шинэчлэгдлээ');
    } else {
      toast('Алдаа гарлаа');
    }
  };

  return (
    <form action={onSubmit} className="mt-4 space-y-4">
      {fieldType === 'Зураг' && (
        <div>
          <label htmlFor="picture" className="block text-sm font-medium">
            Зураг (URL)
          </label>
          <Input
            id="picture"
            name="value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Зургийн URL оруулна уу"
            disabled={loading}
          />
        </div>
      )}
      {fieldType === 'Гарчиг' && (
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Гарчиг
          </label>
          <Input
            id="name"
            name="value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Гарчиг оруулна уу"
            disabled={loading}
          />
        </div>
      )}
      {fieldType === 'Тайлбар' && (
        <div>
          <label htmlFor="description" className="block text-sm font-medium">
            Тайлбар
          </label>
          <Textarea
            id="description"
            name="value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Тайлбар оруулна уу"
            disabled={loading}
          />
        </div>
      )}
      <LoadingButton loading={loading} type="submit">
        {loading ? 'Шинэчилж байна...' : 'Хадгалах'}
      </LoadingButton>
    </form>
  );
};

export default EditForm;
