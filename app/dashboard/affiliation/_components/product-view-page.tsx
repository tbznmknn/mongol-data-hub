import { fakeProducts, Product } from '@/constants/mock-api';
import { notFound } from 'next/navigation';
import ProductForm from './product-form';
import getToken from '@/lib/GetTokenServer';
import { EmployeeTypes } from './product-listing';
import { getTranslations } from 'next-intl/server';

type TProductViewPageProps = {
  productId: string;
};

export default async function ProductViewPage({
  productId
}: TProductViewPageProps) {
  let product = null;
  const t = await getTranslations('dashboard');
  let pageTitle = 'Шинэ гишүүний ангилал нэмэх';
  let isNew = true;
  if (productId !== 'new') {
    isNew = false;
    const TOKEN = await getToken();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/affiliation/${productId}`,
      {
        cache: 'no-cache',
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    ).catch((err) => notFound());

    const jsonData = await response.json();
    const data: EmployeeTypes = jsonData.data;
    product = data;
    if (!product) {
      notFound();
    }
    let pageTitle = 'Гишүүний ангилал засах';
  }

  return (
    <ProductForm initialData={product} pageTitle={pageTitle} isNew={isNew} />
  );
}
