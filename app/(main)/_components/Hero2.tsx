import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Building2,
  Banknote,
  Landmark,
  Scale,
  HeartHandshake
} from 'lucide-react';

export default async function About() {
  const urls = [
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/staticData/title/hero1-title`,
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/staticData/title/hero1-desc`
  ];

  const [title, body] = await Promise.all(
    urls.map(async (url) => {
      const response = await fetch(url, {
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' }
      });
      const jsonData = await response.json();
      return jsonData.data;
    })
  );

  return (
    <div>
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center space-y-4 px-6 py-6 text-center md:flex-row md:p-8 md:pb-20 md:pt-20 md:text-start lg:flex-row lg:space-x-40 lg:text-start">
        <div className="flex flex-col space-y-8">
          <h1 className="text-3xl font-semibold text-[#1476bf] md:text-4xl lg:text-5xl">
            {title.name}
          </h1>
          <p className="max-w-[500px] text-lg md:text-xl">{body.description}</p>
          {/*<Link href="/about">
            <Button className="relative w-fit overflow-hidden rounded-none border-[1px] border-black bg-transparent text-center text-black transition-all duration-300 before:absolute before:inset-0 before:scale-0 before:bg-[#1476bf] before:transition-transform before:duration-300 hover:border-[#1476bf] hover:text-white hover:shadow-lg hover:shadow-[#1476bf]/50 hover:before:scale-100 active:scale-95">
              <p className="relative z-10 p-4 text-lg">Бидний тухай</p>
            </Button>
          </Link>*/}
        </div>
        <div className="space-y-8 text-xl font-semibold md:space-y-16 md:text-xl lg:space-y-16 lg:text-xl">
          {[
            {
              icon: <Building2 />,
              text: 'Монголын өгөгдлийн экосистемийг хөгжүүлэх'
            },
            {
              icon: <Banknote />,
              text: 'Өгөгдлийн хүртээмжтэй, таатай орчин бүрдүүлэх'
            },
            {
              icon: <Landmark />,
              text: 'Өгөгдлийн чанар, найдвартай байдлыг хангах'
            },
            {
              icon: <Scale />,
              text: 'Автоматжуулсан өгөгдөл цуглуулалт, боловсруулалтыг дэмжих'
            },
            {
              icon: <HeartHandshake />,
              text: 'Хэрэглэгчдэд ил тод, хэрэгцээтэй мэдээлэл хүргэх'
            }
          ].map((item, index) => (
            <div
              key={index}
              className="group flex flex-row items-center space-x-3 transition-all duration-300 hover:text-[#1476bf]"
            >
              <div className="transition-transform duration-300 group-hover:scale-110 group-hover:text-[#1476bf]">
                {item.icon}
              </div>
              <p className="relative transition-all duration-300 before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-[#1476bf] before:transition-all before:duration-300 group-hover:before:w-full">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
