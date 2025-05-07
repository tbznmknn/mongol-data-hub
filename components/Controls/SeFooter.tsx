import { FacebookIcon } from 'lucide-react';
import { LinkedinIcon } from 'lucide-react';
import { X } from 'lucide-react';
import Link from 'next/link';

export default function MyFoot() {
  return (
    <div className=" bg-gray-200 ">
      <div className=" mx-auto flex max-w-7xl flex-col pl-8 md:flex-row md:p-8 lg:flex-row lg:items-start lg:justify-between lg:p-12">
        <div className="flex flex-col space-x-8 space-y-4 p-4 md:flex-row lg:flex-row">
          <div className="text-start md:text-start lg:text-start">
            <Link href="/">
              <h2 className="max-w-xs font-semibold">Монгол Дата Хаб</h2>
            </Link>
          </div>
          <div className=" flex flex-row  justify-between  text-[#1476bf] md:flex-col md:space-y-4 lg:flex-col lg:space-y-4">
            <Link href="https://www.facebook.com/mongolian.jsc" target="_blank">
              <FacebookIcon />
            </Link>
            <LinkedinIcon />
            <X />
          </div>
        </div>

        <div className="flex flex-col  md:flex-row lg:flex-row lg:space-x-16">
          <div className="flex flex-col items-start space-y-4 p-4 ">
            <Link href="/about">
              <p className="text-xl font-bold">Дата Хабын танилцуулга</p>
            </Link>
            <Link href="/vision">
              <p>Үнэт зүйлс</p>
            </Link>

            <Link href="/management">
              <p>Удирдлага</p>
            </Link>
          </div>

          <div className="flex flex-col items-start  space-y-4 p-4">
            <Link href="/companies">
              <p className="text-xl font-bold">Гишүүнчлэл</p>
            </Link>
            <Link href="/companies/list">
              <p>Гишүүн компаниуд</p>
            </Link>
          </div>

          <div className="flex flex-col items-start space-y-4  p-4 text-lg ">
            <Link href="/governance">
              <p className="text-xl font-bold">Засаглал</p>
            </Link>
            <Link href="/news">
              <p>Мэдээ</p>
            </Link>
            <Link href="/courses">
              <p>Сургалт</p>
            </Link>
            <Link href="/advice">
              <p>Зөвлөмж</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
