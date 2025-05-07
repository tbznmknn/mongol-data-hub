import { fakeProducts, Product } from '@/constants/mock-api';
import { notFound } from 'next/navigation';

import getToken from '@/lib/GetTokenServer';
import { Post } from '@/app/dashboard/posts/_components/product-listing';
import { getTranslations } from 'next-intl/server';
import PageContainer from '@/components/layout/page-container';
import { cn } from '@/lib/utils';

import MinimalTipTapViewer from '@/components/minimal-tiptap/minimal-tip-viewer';

export default async function VisionContent() {
  let product = null;
  const t = await getTranslations('dashboard');
  let pageTitle = 'Нийтлэл ';
  let isNew = true;
  isNew = false;
  const TOKEN = await getToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/unique/MEMBERPOST`,
    {
      cache: 'no-cache',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      }
    }
  ).catch((err) => notFound());

  const jsonData = await response.json();
  const data: Post = jsonData.data;
  product = data;
  console.log(data);

  if (!product) {
    notFound();
  }

  return (
    <PageContainer scrollable={false}>
      <div className="">
        <Content data={data} />
      </div>
    </PageContainer>
  );
}
async function Content({ data }: { data: Post }) {
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
