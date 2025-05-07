import { fakeProducts, Product } from '@/constants/mock-api';
import { notFound } from 'next/navigation';
import ProductForm from './product-form';
import getToken from '@/lib/GetTokenServer';
import { AssociateMember } from './product-listing';
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
  let pageTitle = 'Компани нэмэх';
  let isNew = true;
  if (productId !== 'new') {
    isNew = false;
    const TOKEN = await getToken();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/company/${productId}`,
      {
        cache: 'reload',
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    ).catch((err) => notFound());

    const jsonData = await response.json();
    const data: AssociateMember = jsonData.data;
    product = data;

    if (!product) {
      notFound();
    }
    pageTitle = 'Компани засварлах';
  }
  //occupation keys
  const occupationResponseKeys = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/company/occupationKeys`,
    {
      cache: 'reload',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  ).catch((err) => notFound());

  const jsonoccupationKeys = await occupationResponseKeys.json();
  const occupationkeys: RoomKeys[] = jsonoccupationKeys.data;
  if (!occupationkeys) {
    notFound();
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts?categories=NEWS`,
    {
      cache: 'reload',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  ).catch((err) => notFound());

  const json = await response.json();
  const data: RoomKeys[] = json.data;
  if (!data) {
    notFound();
  }

  //affiliation keys
  const affilationResponseKeys = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/company/affiliationKeys`,
    {
      cache: 'reload',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  ).catch((err) => notFound());

  const jsonAffiliation = await affilationResponseKeys.json();
  const affiliationkeys: RoomKeys[] = jsonAffiliation.data;
  if (!affiliationkeys) {
    notFound();
  }
  return (
    <ProductForm
      initialData={product}
      pageTitle={pageTitle}
      isNew={isNew}
      affiliationkeys={affiliationkeys}
      occupationkeys={occupationkeys}
    />
  );
}
