'use client';
import { useEffect, useState } from 'react';
import {
  Handshake,
  UserRoundPlus,
  NotebookPen,
  Plus,
  Newspaper,
  Menu,
  X
} from 'lucide-react';
import UserButton from './UserButton';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Skeleton } from '../ui/skeleton';

import Image from 'next/image';
import { Sheet, SheetContent } from '../ui/sheet';
import { Button } from '../ui/button';

import { usePathname } from 'next/navigation';
const pageWithBackImage: { url: string }[] = [
  { url: '/' },
  { url: '/courses' },
  { url: '/about' },
  { url: '/news' },
  { url: '/companies' },
  { url: '/vision' },
  { url: '/rules' },
  { url: '/advice' },
  { url: '/management' },
  { url: '/governance' },
  { url: '/activities' }
];
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const { data: session, status } = useSession();

  // Check if current page has a background image

  const [scrolling, setScrolling] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const hasBackImage =
    pageWithBackImage.some((page) => page.url === pathname) ||
    pathname.startsWith('/management') ||
    pathname.startsWith('/companies');

  return (
    <div className={` ${!hasBackImage && 'mb-12 lg:mb-24'}`}>
      <nav
        className={`  fixed left-0 top-0 z-30    w-full shadow-sm  transition-all duration-300 ${
          scrolling
            ? ' bg-white text-black'
            : `border-white bg-black   ${
                hasBackImage ? 'bg-opacity-5 text-white' : 'bg-white text-black'
              }  backdrop-blur-sm`
        }   flex h-12 w-full  items-center px-10 py-2 lg:h-24   
         `}
      >
        <div className="flex w-full items-center justify-between lg:hidden">
          {/* Logo on the left */}
          <Link href="/" className="flex flex-row items-center gap-2">
            <Image
              width={200}
              height={200}
              src="/logo.png"
              alt="Logo"
              className="lg:size-25 size-10"
            />
            <div className="text-[0.7rem]">Монгол Дата Хаб</div>
          </Link>
          {/* Hamburger menu button */}
          <Button
            onClick={toggleMenu}
            variant="ghost"
            className={`text-white hover:text-gray-300 focus:outline-none    ${
              scrolling
                ? '  text-black'
                : ` ${hasBackImage ? 'text-white' : 'text-black'}`
            }`}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </Button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden w-full items-center justify-between lg:flex">
          <div className="flex flex-grow justify-start">
            {/* Logo on the left */}
            {/* <Link href="/" className="flex flex-row items-center gap-2 ">
              <Image
                width={200}
                height={200}
                src="/logo.png"
                alt="Logo"
                className="size-10 lg:size-14"
              />
              <div className="text-[0.8rem]">
                Монгол <br />
                Дата Хаб
              </div>
            </Link> */}
            <Link href="/" className="flex flex-row items-center  gap-2 ">
              <Image
                width={200}
                height={200}
                src="/logo.png"
                alt="Logo"
                className="size-10 lg:size-16"
              />
              <div className="text-[0.8rem] font-semibold lg:text-[0.9rem]">
                Монгол Дата Хаб
              </div>
            </Link>
          </div>

          <ul className="flex justify-end space-x-10 p-6">
            <li>
              <Link
                href="/about"
                className={`text-lg hover:text-gray-300 ${
                  pathname === '/about' ? 'font-bold' : ''
                }`}
              >
                Бидний тухай
              </Link>
            </li>
            <li>
              <Link
                href="/companies"
                className={`text-lg hover:text-gray-300 ${
                  pathname === '/companies' ? 'font-bold' : ''
                }`}
              >
                Гишүүнчлэл
              </Link>
            </li>
            <li>
              <Link
                href="/news"
                className={`text-lg hover:text-gray-300 ${
                  pathname === '/news' ? 'font-bold' : ''
                }`}
              >
                Мэдээ
              </Link>
            </li>
            <li>
              <Link
                href="/courses"
                className={`text-lg hover:text-gray-300 ${
                  pathname === '/courses' ? 'font-bold' : ''
                }`}
              >
                Сургалт
              </Link>
            </li>
            <li>
              <Link
                href="/advice"
                className={`text-lg hover:text-gray-300 ${
                  pathname === '/advice' ? 'font-bold' : ''
                }`}
              >
                Зөвлөмж
              </Link>
            </li>
            <li>
              <Link
                href="/prices"
                className={`text-lg hover:text-gray-300 ${
                  pathname === '/governance' ? 'font-bold' : ''
                }`}
              >
                Үнийн мэдээлэл
              </Link>
            </li>
            {status === 'authenticated' && (
              <UserButton
                className="p-0"
                session={session}
                email={session!.user!.email}
              />
            )}
            <li>
              {status === 'loading' && (
                <Skeleton className="size-5 rounded-full"></Skeleton>
              )}

              {status === 'unauthenticated' && (
                <Link className="hover:text-custom-teal text-lg" href="/login">
                  Нэвтрэх
                </Link>
              )}
            </li>
          </ul>
        </div>

        {/* Mobile Menu (Shadcn Sheet) */}
        <Sheet open={isOpen} onOpenChange={toggleMenu}>
          <SheetContent className=" ">
            <ul className="mt-10 flex flex-col flex-wrap items-start space-y-4 px-6 py-4">
              <li>
                <Link
                  href="/about"
                  className="flex text-lg hover:text-gray-300"
                  onClick={toggleMenu}
                >
                  <Handshake className="h-6 w-6 text-muted-foreground" />
                  <span className="ml-2">Бидний тухай</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/companies"
                  className="flex text-lg hover:text-gray-300"
                  onClick={toggleMenu}
                >
                  <UserRoundPlus className="h-6 w-6 text-muted-foreground" />
                  <span className="ml-2">Гишүүнчлэл</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/courses"
                  className="flex text-lg hover:text-gray-300"
                  onClick={toggleMenu}
                >
                  <NotebookPen className="h-6 w-6 text-muted-foreground" />
                  <span className="ml-2">Сургалт</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/advice"
                  className="flex text-lg hover:text-gray-300"
                  onClick={toggleMenu}
                >
                  <Plus className="h-6 w-6 text-muted-foreground" />
                  <span className="ml-2">Зөвлөмж</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="flex text-lg hover:text-gray-300"
                  onClick={toggleMenu}
                >
                  <Newspaper className="h-6 w-6 text-muted-foreground" />
                  <span className="ml-2">Мэдээ</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/prices"
                  className="flex text-lg hover:text-gray-300"
                  onClick={toggleMenu}
                >
                  <Newspaper className="h-6 w-6 text-muted-foreground" />
                  <span className="ml-2">Үнийн мэдээлэл</span>
                </Link>
              </li>
            </ul>
            <div className="flex flex-grow items-center justify-center py-4">
              <Link
                href="/"
                className="mt-[5rem] flex flex-row items-center  gap-2 "
              >
                <Image
                  width={200}
                  height={200}
                  src="/logo.png"
                  alt="Logo"
                  className="size-10 lg:size-16"
                />
                <div className="text-[0.9rem] font-semibold lg:text-[1rem]">
                  Монгол Дата Хаб
                </div>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
}
