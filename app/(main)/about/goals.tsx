'use client';
import { useState } from 'react';
import { Car, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

export default function Goals() {
  const data = [
    {
      title: '1',
      context:
        'Гишүүдийн нийтлэг эрх ашгийг хөндсөн хууль, тогтоомж, журам, бусад зохицуулалтын баримт бичигт санал өгөх, хэрэгжүүлэх үйл ажиллагаанд оролцох'
    },
    {
      title: '2',
      context:
        'Гишүүд болон жижиг хувьцаа эзэмшигчид, хөрөнгө оруулагчдын хоорондох ойлголцлыг сайжруулах'
    },
    {
      title: '3',
      context:
        'Гишүүдийн удирдлага, боловсон хүчнийг мэргэшүүлэхэд дангаар болон бусад сургалтын байгууллагуудтай хамтран сургалт, семинар зохион байгуулах'
    }
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      {/* Title */}
      <h1 className="mb-8 text-center text-2xl font-bold text-gray-900 sm:text-3xl">
        Үйл ажиллагаа
      </h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((item, index) => (
          <Card key={index} className="shadow-lg transition hover:shadow-xl">
            <CardContent className=" space-y-8 p-4">
              <h2 className="mr-4 text-end text-xl font-semibold">
                {item.title}
              </h2>
              <div className="h-[1px] w-full bg-gray-600"></div>
              <p className="mt-2 text-gray-600">{item.context}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Cards 
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {data.slice(0, showAll ? data.length : 3).map((goal, index) => (
          <div
            key={index}
            className="cursor-pointer rounded-lg border border-gray-200 bg-white p-4 shadow-lg transition hover:shadow-xl"
            onClick={() => setSelectedGoal(goal)}
          >
            <img
              src={goal.image}
              alt={goal.title}
              className="h-40 w-full rounded-md object-cover"
            />
            <h2 className="mt-3 text-lg font-semibold">{goal.title}</h2>
            <p className="mt-1 text-gray-600">{goal.shortDesc}</p>
          </div>
        ))}
      </div>
      */}

      {/* 
      {!showAll && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowAll(true)}
            className="rounded-md bg-blue-600 px-5 py-2 text-white shadow transition hover:bg-blue-700"
          >
            Дэлгэрэнгүй
          </button>
        </div>
      )}
        */}

      {/* Full Description Modal 
      {selectedGoal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
            <button
              className="absolute right-2 top-2 text-gray-600 hover:text-gray-900"
              onClick={() => setSelectedGoal(null)}
            >
              <X className="h-6 w-6" />
            </button>
            <img
              src={selectedGoal.image}
              alt={selectedGoal.title}
              className="mb-4 h-48 w-full rounded-md object-cover"
            />
            <h2 className="mb-4 text-xl font-bold">{selectedGoal.title}</h2>
            <p className="text-gray-700">{selectedGoal.fullDesc}</p>
          </div>
        </div>
      )}
        */}
      <div className="py-6 text-center">
        <Link href="/activities">
          <Button> Дэлгэрэнгүй</Button>
        </Link>
      </div>
    </div>
  );
}
