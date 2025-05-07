import { fakeProducts, Product } from '@/constants/mock-api';
import { notFound } from 'next/navigation';
import ProductForm from './product-form';
import getToken from '@/lib/GetTokenServer';
import { Post } from './product-listing';
import { getTranslations } from 'next-intl/server';
import { RoomKeys } from './product-tables/product-table-action';

type TProductViewPageProps = {
  productId: string;
};

export default async function ProductViewPage({
  productId
}: TProductViewPageProps) {
  let product = null;
  const t = await getTranslations('dashboard');
  let pageTitle = 'Нийтлэл нэмэх';
  let isNew = true;
  if (productId !== 'new') {
    isNew = false;
    const TOKEN = await getToken();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/${productId}`,
      {
        cache: 'reload',
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    ).catch((err) => notFound());

    const jsonData = await response.json();
    const data: Post = jsonData.data;
    product = data;

    if (!product) {
      notFound();
    }
    pageTitle = 'Нийтлэл засварлах';
  }
  // const responsekeys = await fetch(
  //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/members/keys`,
  //   {
  //     cache: 'reload',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   }
  // ).catch((err) => notFound());

  // const jsonKeys = await responsekeys.json();
  // const dataKeys: RoomKeys[] = jsonKeys.data;
  // if (!dataKeys) {
  //   notFound();
  // }
  return (
    <ProductForm
      initialData={product}
      pageTitle={pageTitle}
      isNew={isNew}
      // roomkeys={dataKeys}
    />
  );
}
