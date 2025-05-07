import { User, Users } from 'lucide-react';
import { Landmark } from 'lucide-react';
import { Building } from 'lucide-react';

export default function Zorilgo() {
  return (
    <div className="bg-blue-200 ">
      <div className=" mx-auto flex h-full max-w-7xl flex-col items-center  justify-between md:flex-row lg:flex-row">
        <div className=" px-6 py-6 md:py-16 lg:py-20">
          <p className="py-6 text-3xl font-semibold md:text-4xl lg:text-5xl">
            Бидний зорилго
          </p>
          <div className="flex flex-col space-y-6 pt-16 md:flex-row md:space-x-20 md:space-y-0 lg:flex-row lg:space-x-20 lg:space-y-0">
            <div className="flex transform flex-col space-y-5 rounded-md p-6 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-blue-100 hover:shadow-xl">
              <User size={30} />
              <div className="h-[2px] w-full rounded-full bg-black"></div>
              <p className="text-2xl">Гишүүдийн эрх ашгийг хамгаалах</p>
              <p className="max-w-[250px] text-sm">
                Хувьцаат компаниудын нийтлэг эрх ашгийг төлөөлөн төр, засаг
                болон зохицуулах байгууллагад хүргэх
              </p>
            </div>
            <div className="flex transform flex-col space-y-5 rounded-md p-6 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-blue-100 hover:shadow-xl">
              <Building size={30} />
              <div className="h-[2px] w-full rounded-full bg-black"></div>
              <p className="text-2xl">Засаглалыг сайжруулж, хөгжлийг дэмжих</p>
              <p className="max-w-[250px] text-sm">
                Гишүүдийн компанийн засаглалыг сайжруулах, олон улсын туршлагыг
                нэвтрүүлэх
              </p>
            </div>
            <div className="flex transform flex-col space-y-5 rounded-md p-6 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-blue-100 hover:shadow-xl">
              <Landmark size={30} />
              <div className="h-[2px] w-full rounded-full bg-black"></div>
              <p className="text-2xl">Хамтын ажиллагааг өргөжүүлэх</p>
              <p className="max-w-[250px] text-sm">
                Гишүүд, хөрөнгө оруулагчид, төрийн болон хувийн хэвшлийн
                байгууллагуудтай хамтран ажиллах
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
