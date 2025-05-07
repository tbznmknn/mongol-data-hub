import PageAboutLayout from '@/components/Controls/PageAboutLayout';
import { Button } from '@/components/ui/button';
import { ListIcon } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import OrderSkeleton from '../post/_components/OrderSkeleton';
import VisionContent from './MemberContent';
export default async function AboutPage() {
  return (
    <PageAboutLayout
      isCompany
      backgroundUrl="https://cdn.pixabay.com/photo/2017/06/28/22/42/downtown-new-york-2452459_1280.jpg"
      title="Хэрхэн гишүүнээр элсэх вэ?"
      subtitle=""
    >
      <div className="mt-3 flex justify-end lg:hidden">
        <Link href={`/companies/list`}>
          <Button className="flex items-center gap-3">
            <ListIcon className="size-4" />
            Гишүүд
          </Button>
        </Link>
      </div>
      <section>
        <Suspense fallback={<OrderSkeleton />}>
          <VisionContent />
        </Suspense>
      </section>
      <section>
        {' '}
        <div className="mt-3 flex justify-end ">
          <Link href={`/companies/list`}>
            <Button className="flex items-center gap-3">
              <ListIcon className="size-4" />
              Гишүүд
            </Button>
          </Link>
        </div>
      </section>
    </PageAboutLayout>
  );
}
export const metadata = {
  title: 'Гишүүнчлэл'
};
