import { FaceIcon } from '@radix-ui/react-icons';
import { FacebookIcon } from 'lucide-react';
import { LinkedinIcon } from 'lucide-react';
import { X } from 'lucide-react';
import Link from 'next/link';
import { Phone } from 'lucide-react';
import { Mail } from 'lucide-react';
import { MapPin } from 'lucide-react';

export default function NewFoot() {
  return (
    <div className=" bg-[#1476bf] ">
      <div className=" mx-auto flex max-w-7xl flex-col pl-8 text-gray-100 md:flex-row md:p-8 lg:flex-row lg:items-start lg:justify-between lg:p-12">
        <div className="flex flex-col space-x-8 space-y-4 p-4 md:flex-row lg:flex-row">
          <div className="max-w-xs space-y-5 text-start md:text-start lg:text-start">
            <div className="flex flex-row space-x-2">
              {/*<h5 className="font-semibold">Хаяг:</h5>*/}
              <MapPin className="size-10" />
              <p>Монгол Улс, Улаанбаатар 0101010, Сүхбаатар дүүрэг</p>
            </div>
            <div className="flex flex-row space-x-2">
              <Phone className="size-6" />
              <p>99203430</p>
            </div>
            <div className="flex flex-row space-x-2">
              <Link href="mailto:mongolian.jsc@gmail.com">
                <Mail className="size-6" />
              </Link>
              <Link href="mailto:mongolian.jsc@gmail.com">
                <p>mongolian.jsc@gmail.com</p>
              </Link>
            </div>
            <div className=" flex flex-row  space-x-6  text-[#D0F0FF]">
              <Link
                href="https://www.facebook.com/mongolian.jsc"
                target="_blank"
              >
                <FacebookIcon />
              </Link>
              <LinkedinIcon />
              <X />
            </div>
          </div>
        </div>

        <div className="flex flex-col  md:flex-row lg:flex-row lg:space-x-16">
          <div className="flex flex-col items-start space-y-4 p-4 ">
            <Link href="/about">
              <p className="text-xl font-semibold">Дата Хабын танилцуулга</p>
            </Link>
            <Link href="/vision">
              <p>Үнэт зүйлс</p>
            </Link>

            <Link href="/management">
              <p>Удирдлага</p>
            </Link>
            <Link href="/activities">
              <p>Үйл ажиллагаа</p>
            </Link>
            <Link href="/about/rules">
              <p>Дүрэм</p>
            </Link>
          </div>

          <div className="flex flex-col items-start  space-y-4 p-4">
            <Link href="/companies">
              <p className="text-xl font-semibold">Гишүүнчлэл</p>
            </Link>
            <Link href="/companies/list">
              <p>Гишүүн компаниуд</p>
            </Link>
          </div>

          <div className="flex flex-col items-start space-y-4  p-4 text-lg ">
            <Link href="/governance">
              <p className="text-xl font-semibold">Засаглал</p>
            </Link>
            <Link href="/news">
              <p className="text-xl font-semibold">Мэдээ</p>
            </Link>
            <Link href="/courses">
              <p className="text-xl font-semibold">Сургалт</p>
            </Link>
            <Link href="/advice">
              <p className="text-xl font-semibold">Зөвлөмж</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
