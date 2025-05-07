'use client';
import { cn } from '@/lib/utils';
import React from 'react';
import { BentoGrid, BentoGridItem } from './BentoGrid';
import {
  IconBoxAlignRightFilled,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn
} from '@tabler/icons-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { DownloadIcon } from '@radix-ui/react-icons';
import { Goal, Users2 } from 'lucide-react';
import { rulesPdf } from '@/constants/data';

export function GridAbout() {
  return (
    <BentoGrid className="mx-auto max-w-4xl md:auto-rows-[20rem]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={cn('[&>p:text-lg]', item.className)}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
  );
}

const SkeletonOne = () => {
  const variants = {
    initial: {
      x: 0
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2
      }
    }
  };
  const variantsSecond = {
    initial: {
      x: 0
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2
      }
    }
  };
  const fileLink = rulesPdf;
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = fileLink;
    link.download = 'rules.pdf'; // Default filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <motion.div
      onClick={handleDownload}
      initial="initial"
      whileHover="animate"
      className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex h-full min-h-[6rem] w-full flex-1 cursor-pointer flex-col space-y-2"
    >
      <motion.div
        variants={variants}
        className="flex flex-row items-center space-x-2 rounded-full border border-neutral-600  bg-white p-2 dark:border-white/[0.2] dark:bg-black"
      >
        <div className="h-6 w-6 shrink-0 rounded-full bg-gradient-to-r from-pink-500 to-violet-500" />
        <div className="h-4 w-full rounded-full bg-gray-100 dark:bg-neutral-900" />
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="ml-auto flex w-3/4 flex-row items-center space-x-2 rounded-full border border-neutral-600 bg-white p-2 dark:border-white/[0.2] dark:bg-black"
      >
        <div className="h-4 w-full rounded-full bg-gray-100 dark:bg-neutral-900" />
        <div className="h-6 w-6 shrink-0 rounded-full bg-gradient-to-r from-pink-500 to-violet-500" />
      </motion.div>
      <motion.div
        variants={variants}
        className="flex flex-row items-center space-x-2 rounded-full border border-neutral-600 bg-white p-2 dark:border-white/[0.2] dark:bg-black"
      >
        <div className="h-6 w-6 shrink-0 rounded-full bg-gradient-to-r from-pink-500 to-violet-500" />
        <div className="h-4 w-full rounded-full bg-gray-100 dark:bg-neutral-900" />
      </motion.div>
    </motion.div>
  );
};

const SkeletonTwo = () => {
  const variants = {
    initial: {
      width: 0
    },
    animate: {
      width: '100%',
      transition: {
        duration: 0.2
      }
    },
    hover: {
      width: ['0%', '100%'],
      transition: {
        duration: 2
      }
    }
  };
  const arr = new Array(6).fill(0);
  return (
    <Link href={'/vision'}>
      <motion.div
        initial="initial"
        animate="animate"
        whileHover="hover"
        className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex h-full min-h-[6rem] w-full flex-1 flex-col space-y-2"
      >
        {arr.map((_, i) => (
          <motion.div
            key={'skelenton-two' + i}
            variants={variants}
            style={{
              maxWidth: Math.random() * (100 - 40) + 40 + '%'
            }}
            className="flex h-4 w-full flex-row items-center space-x-2 rounded-full  border border-neutral-600 bg-neutral-100 p-2 dark:border-white/[0.2] dark:bg-black"
          ></motion.div>
        ))}
      </motion.div>
    </Link>
  );
};
const SkeletonThree = () => {
  const variants = {
    initial: {
      backgroundPosition: '0 50%'
    },
    animate: {
      backgroundPosition: ['0, 50%', '100% 50%', '0 50%']
    }
  };
  return (
    <Link className="h-full w-full" href={'/companies/list'}>
      <motion.div
        initial="initial"
        animate="animate"
        variants={variants}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: 'reverse'
        }}
        className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex h-full min-h-[6rem] w-full flex-1 flex-col space-y-2 rounded-lg"
        style={{
          background:
            'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
          backgroundSize: '400% 400%'
        }}
      >
        <motion.div className="h-full w-full rounded-lg"></motion.div>
      </motion.div>
    </Link>
  );
};
const SkeletonFour = () => {
  const first = {
    initial: {
      x: 20,
      rotate: -5
    },
    hover: {
      x: 0,
      rotate: 0
    }
  };
  const second = {
    initial: {
      x: -20,
      rotate: 5
    },
    hover: {
      x: 0,
      rotate: 0
    }
  };
  return (
    <Link href="/activities">
      <motion.div
        initial="initial"
        animate="animate"
        whileHover="hover"
        className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex h-full min-h-[6rem] w-full flex-1 flex-row space-x-2"
      >
        <motion.div
          variants={first}
          className="flex h-full w-1/3 flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white p-4 dark:border-white/[0.1] dark:bg-black"
        >
          <div className="h-10 w-10 rounded-full text-3xl font-semibold">1</div>
          <p className="mt-4 text-center text-xs font-semibold text-neutral-500 sm:text-sm">
            Гадаад дотоодын байгууллагуудын хамтарсан төсөл хэрэгжүүлэх
          </p>
          <p className="mt-4 rounded-full border border-red-500 bg-red-100 px-2 py-0.5 text-xs text-red-600 dark:bg-red-900/20">
            Шинэ төсөл
          </p>
        </motion.div>
        <motion.div className="relative z-20 flex h-full w-1/3 flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white p-4 dark:border-white/[0.1] dark:bg-black">
          <div className="h-10 w-10 rounded-full text-3xl font-semibold">2</div>
          <p className="mt-4 text-center text-xs font-semibold text-neutral-500 sm:text-sm">
            Гишүүдын хоорондох ойлголцлыг сайжруулах
          </p>
          <p className="mt-4 rounded-full border border-green-500 bg-green-100 px-2 py-0.5 text-xs text-green-600 dark:bg-green-900/20">
            Хамтын ажиллагаа
          </p>
        </motion.div>
        <motion.div
          variants={second}
          className="flex h-full w-1/3 flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white p-4 dark:border-white/[0.1] dark:bg-black"
        >
          <div className="h-10 w-10 rounded-full text-3xl font-semibold">3</div>
          <p className="mt-4 text-center text-xs font-semibold text-neutral-500 sm:text-sm">
            Сургалт, семинар зохион байгуулах
          </p>
          <p className="mt-4 rounded-full border border-orange-500 bg-orange-100 px-2 py-0.5 text-xs text-orange-600 dark:bg-orange-900/20">
            Мэдлэг олгох
          </p>
        </motion.div>
      </motion.div>
    </Link>
  );
};

const items = [
  // {
  //   title: 'Холбооны үйл ажиллагаа',
  //   description: (
  //     <span className="text-sm">Холбооны бүх үйл ажиллагааг харах</span>
  //   ),
  //   header: <SkeletonFour />,
  //   className: 'md:col-span-2',
  //   icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />
  // },

  {
    title: 'Дүрэм',
    description: <span className="text-sm">Холбооны дүрмийг татах</span>,
    header: <SkeletonOne />,
    className: 'md:col-span-1',
    icon: <DownloadIcon className="h-4 w-4 text-neutral-500" />
  }
  // {
  //   title: 'Алсын хараа, эрхэм зорилго',
  //   description: (
  //     <span className="text-sm">
  //       Холбооны алсын хараа, эрхэм зорилгыг дэлгэрэнгүй харах
  //     </span>
  //   ),
  //   header: <SkeletonTwo />,
  //   className: 'md:col-span-1',
  //   icon: <Goal className="h-4 w-4 text-neutral-500" />
  // },
  // {
  //   title: 'Түншүүд',
  //   description: (
  //     <span className="text-sm">
  //       Монгол Дата Хабны бүх гишүүдийг харах
  //     </span>
  //   ),
  //   header: <SkeletonThree />,
  //   className: 'md:col-span-1',
  //   icon: <Users2 className="h-4 w-4 text-neutral-500" />
  // }
];
