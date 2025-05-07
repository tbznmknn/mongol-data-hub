'use client';

import { Download, LinkIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface SidebarAbout {
  title: string;
  link: string;
  download?: boolean | null;
}

const Sidebar = ({ menuItems }: { menuItems: SidebarAbout[] }) => {
  const pathname = usePathname();

  return (
    <aside className="sticky top-20 hidden h-fit w-1/4 border-r pt-4 lg:block">
      <nav className="space-y-4">
        {menuItems.map((item, index) => {
          const isActive =
            pathname === item.link ||
            (item.link === '/management' && pathname.startsWith('/management'));

          return (
            <Link
              key={index}
              href={item.link}
              scroll={true}
              className={`flex items-center gap-2 border-t bg-white px-4 py-2 hover:bg-gray-200 ${
                isActive ? 'font-bold text-primary' : ''
              }`}
            >
              {item.title}{' '}
              {item.download ? <LinkIcon className="size-4" /> : null}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
