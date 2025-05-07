import { notFound } from 'next/navigation';

import getToken from '@/lib/GetTokenServer';
import { Post } from '@/app/dashboard/posts/_components/product-listing';
import { getTranslations } from 'next-intl/server';
import PageContainer from '@/components/layout/page-container';

import { cn } from '@/lib/utils';

import MinimalTipTapViewer from '@/components/minimal-tiptap/minimal-tip-viewer';
import Image from 'next/image';
import { Member } from '@/app/dashboard/employees/_components/product-listing';
export default async function LeaderContent({ id }: { id: number }) {
  let product = null;
  const t = await getTranslations('dashboard');

  let isNew = true;
  isNew = false;
  const TOKEN = await getToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/members/${id}`,
    {
      cache: 'no-cache',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      }
    }
  ).catch((err) => notFound());

  const jsonData = await response.json();
  const data: Member = jsonData.data;
  product = data;
  console.log(data);

  if (!product) {
    notFound();
  }

  return (
    <PageContainer scrollable={false}>
      <div className="">
        <div className="mx-3 mt-4 flex w-full max-w-md flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-md sm:max-w-lg sm:flex-row">
          {/* Image Section */}
          <Image
            height={300}
            width={300}
            className="h-28 w-28 rounded-md border border-gray-300 object-cover shadow-sm sm:h-32 sm:w-32"
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${data.picture}`}
            alt={data.name}
          />

          {/* Info Section */}
          <div className="ml-4 flex flex-col justify-center">
            <h2 className="text-lg font-semibold text-gray-800">{data.name}</h2>
            <p className="text-sm text-gray-600">{data.memberType.name}</p>
            {!data.hideMail && (
              <p className="text-sm text-gray-600">И-мэйл: {data.email}</p>
            )}
            {!data.hidePhone && (
              <p className="text-sm text-gray-600">
                Утасны дугаар: {data.phone}
              </p>
            )}
            <p className="text-sm text-gray-600">Мэргэжил: {data.occupation}</p>
          </div>
        </div>

        <Content data={data} />
      </div>
    </PageContainer>
  );
}
async function Content({ data }: { data: Member }) {
  return (
    <MinimalTipTapViewer
      content={data.content}
      throttleDelay={0}
      className={cn(
        'w-full border-none'
        // 'border-destructive focus-within:border-destructive'
      )}
      editorContentClassName=" cursor-default" //text-tei cursoriig boliulah
      autofocus={true}
      immediatelyRender={false}
      editable={false}
      injectCSS={true}
      editorClassName="focus:outline-none p-5"
    />
  );
}
