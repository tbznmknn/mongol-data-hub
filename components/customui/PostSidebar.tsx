'use client';
import {
  BookOpenTextIcon,
  MessageSquareTextIcon,
  NewspaperIcon
} from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';
import { Separator } from '../ui/separator';
import { usePathname } from 'next/navigation';

const sideNavs: { name: string; link: string; icon: ReactNode }[] = [
  {
    name: 'Мэдээ',
    link: '/news',
    icon: <NewspaperIcon className="size-4 text-muted-foreground" />
  },
  {
    name: 'Сургалт',
    link: '/courses',
    icon: <BookOpenTextIcon className="size-4 text-muted-foreground" />
  },
  {
    name: 'Зөвлөмж',
    link: '/advice', // Assuming this should be different from '/news'
    icon: <MessageSquareTextIcon className="size-4 text-muted-foreground" />
  }
];
export default function PostSidebar() {
  const pathname = usePathname();
  return (
    <div className="sticky top-[7rem] hidden h-fit w-72 flex-none space-y-5 md:block lg:w-80">
      <div className=" space-y-5 rounded-2xl bg-card p-5 shadow-md ">
        <p className="text-sm text-muted-foreground">Мэдээ мэдээлэл</p>
        {sideNavs.map((nav) => {
          return (
            <div key={nav.name}>
              <div
                className={`flex items-center justify-center ${
                  pathname === nav.link && `font-bold text-primary`
                }`}
              >
                <Link href={nav.link}>
                  <div className="flex items-center justify-center gap-2">
                    <span className="size-4">{nav.icon}</span> {nav.name}
                  </div>
                </Link>
              </div>
              <Separator />
            </div>
          );
        })}
      </div>
      {/* <div className="flex items-center space-x-2 shadow-xl">
        <div className="w-full space-y-5 rounded-2xl bg-primary p-5 text-center text-primary-foreground shadow-sm">
          <div className="text-xl font-bold">
            Монгол Дата Хаб
          </div>
        </div>
      </div> */}
    </div>
  );
}
