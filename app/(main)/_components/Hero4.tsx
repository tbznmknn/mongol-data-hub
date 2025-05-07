import { AssociateMember } from '@/app/dashboard/companies/_components/product-listing';
import { PaginationData } from '@/app/dashboard/users/_components/employee-listing-page';
import { MovingCompanies } from '@/components/ui/MovingCompanies';
import { notFound } from 'next/navigation';

export default async function Gishuud() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/company?`,

    {
      cache: 'no-cache',
      // next: { revalidate: 60 * 5, tags: ['companies'] },
      headers: {
        'Content-Type': 'application/json'
      }
    }
  ).catch((err) => notFound());
  const jsonData = await response.json();
  const data: AssociateMember[] = jsonData.data;
  if (!data) return <div></div>;
  const pagination: PaginationData = jsonData.pagination;
  return (
    // <div className="mx-auto flex max-w-7xl flex-col items-center justify-between space-x-4 space-y-4 px-6 py-6 text-center md:flex-row md:p-8 lg:flex-row lg:space-x-40 lg:p-20 ">
    <MovingCompanies data={data} />
  );
}
// import { Button } from '@/components/ui/button';
// import Image from 'next/image';
// import Link from 'next/link';

// export default function Gishuud() {
//   return (
//     <div className="mx-auto flex max-w-7xl flex-col items-center justify-between space-x-4 space-y-4 px-6 py-6 text-center md:flex-row md:p-8 lg:flex-row lg:space-x-40 lg:p-20 ">
//       <div className=" flex flex-col space-y-8  ">
//         <Link href="/companies">
//           <p className=" text-3xl font-semibold text-[#1476bf] md:text-start md:text-5xl lg:text-start">
//             Гишүүн компаниуд
//           </p>
//         </Link>
//         <p className=" max-w-[500px] text-start text-lg">
//           Гишүүнээр элссэнээр хөрөнгийн зах зээлийн шинэ мэдээ, мэдээллийг цаг
//           алдалгүй авах, салбарын арга хэмжээнд тэргүүн ээлжинд оролцох,
//           бизнесийн нэр хүндээ өсгөх зэрэг олон давуу талтай.
//         </p>
//         <div className="flex flex-col  space-y-4 sm:space-x-4 md:flex-row md:space-y-0 lg:flex-row">
//           <Link href="/companies">
//             <Button className=" rounded-sm bg-[#1476bf] text-lg">
//               {' '}
//               <p className="p-4">Гишүүнчлэл</p>
//             </Button>
//           </Link>
//           {/*
//           <Link href="/companies">
//             <Button className=" rounded-sm bg-[#1476bf] text-lg">
//               <p className="p-12">Элсэх</p>
//             </Button>
//           </Link>
//           */}
//         </div>
//       </div>
//       <div className="flex flex-col space-y-4 md:flex-row md:space-x-8 md:space-y-0 lg:flex-row">
//         <div>
//           <Link href="/companies">
//             <Image
//               src="/barilga.png"
//               alt="Barilga shd"
//               width={300}
//               height={500}
//               className=" h-auto w-full rounded-md object-cover"
//             />
//           </Link>
//         </div>
//         {/* <div>
//           <Link href="/companies">
//             <Image
//               src="/hums.jpg"
//               alt="Kumuus"
//               width={300}
//               height={500}
//               className="h-auto w-full rounded-md object-cover"
//             />
//           </Link>
//         </div>
//         */}
//       </div>
//     </div>
//   );
// }
