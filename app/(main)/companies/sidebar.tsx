'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const menuItems: { title: string; link: string }[] = [
    { title: 'Гишүүнээр элсэх', link: '/companies' },
    { title: 'Гишүүд', link: '/companies/list' }
  ];

  const pathname = usePathname();

  return (
    <aside className="sticky top-20 hidden h-fit w-1/4 border-r pt-4 lg:block">
      <nav className="space-y-4">
        {menuItems.map((item, index) => {
          // Check if pathname is an exact match OR starts with "/management"
          const isActive =
            pathname === item.link ||
            (item.link === '/companies/list' &&
              pathname.startsWith('/companies/list'));

          return (
            <Link
              scroll={true}
              key={index}
              href={item.link}
              className={`block border-t bg-white px-4 py-2 hover:bg-gray-200 ${
                isActive ? 'font-bold text-primary' : ''
              }`}
            >
              {item.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
