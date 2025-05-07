'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
  ArrowLeftIcon,
  BathIcon,
  BedDoubleIcon,
  BookOpenTextIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  MessageSquareTextIcon,
  NewspaperIcon,
  Trash2Icon,
  Users2,
  X
} from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

import { ReactNode, useState } from 'react';
import { Separator } from '@/components/ui/separator';
import {
  Post,
  PostCategory,
  translatePostCategoryToMongolian
} from '@/app/dashboard/posts/_components/product-listing';
import MinimalTipTapViewer from '@/components/minimal-tiptap/minimal-tip-viewer';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { mn } from 'date-fns/locale';
import PostSidebar from '@/components/customui/PostSidebar';
import BackgroundTop from '@/components/customui/BackgroundTop';
const sideNavs: { name: string; link: string; icon: ReactNode }[] = [
  {
    name: 'Мэдээ',
    link: '/news',
    icon: <NewspaperIcon className="size-4 text-muted-foreground" />
  },
  {
    name: 'Сургалт',
    link: '/courses',
    icon: <BookOpenTextIcon className="size-4 text-muted-foreground" />
  },
  {
    name: 'Зөвлөмж',
    link: '/advice', // Assuming this should be different from '/news'
    icon: <MessageSquareTextIcon className="size-4 text-muted-foreground" />
  }
];
export default function OrderRoomsList({ data }: { data: Post }) {
  // Calculate the difference in milliseconds

  // Convert milliseconds to days

  const [selected, setSelected] = useState<number[]>([]);
  const handleSelect = (roomId: number) => {
    setSelected((prevSelected) => [...prevSelected, roomId]);
    console.log(selected);
  };
  const shareUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/post/${data.id}`; // Change to your actual URL
  const text = encodeURIComponent('Монгол Дата Хаб');
  const shareToFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      '_blank'
    );
  };

  const shareToTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${shareUrl}&text=${text}`,
      '_blank'
    );
  };

  const shareToLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    window.open(linkedInShareUrl, '_blank');
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="mx-auto flex w-full max-w-7xl grow gap-5 lg:p-5">
        <main className="flex w-full min-w-0 gap-5">
          <div className="w-full min-w-0 space-y-5">
            <div className="space-y-5">
              <article className="space-y-3  rounded-2xl bg-card p-2 shadow-md lg:p-5">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <h5 className="font-semibold text-sky-500">
                      {translatePostCategoryToMongolian(
                        data.category as PostCategory
                      )}
                    </h5>
                    <div>
                      {data.createdAt
                        ? format(
                            new Date(data.createdAt),
                            "yyyy 'оны' MMMM d",
                            { locale: mn }
                          )
                        : 'Огноо байхгүй'}
                    </div>
                  </div>

                  <div>
                    <h2 className="font-extrabold">{data.name}</h2>
                  </div>
                  <div className="flex flex-row items-center justify-end gap-3">
                    <button
                      onClick={shareToFacebook}
                      className="rounded-full border border-gray-300 p-2 transition hover:bg-gray-200"
                    >
                      <FacebookIcon size={20} />
                    </button>
                    <button
                      onClick={shareToLinkedIn}
                      className="rounded-full border border-gray-300 p-2 transition hover:bg-gray-200"
                    >
                      <LinkedinIcon size={20} />
                    </button>
                    <button
                      onClick={shareToTwitter}
                      className="rounded-full border border-gray-300 p-2 transition hover:bg-gray-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M16.07 4.22H23.14L14.49 12.58L24 22.49H16.64L10.44 15.74L3.18 22.49H0L9.22 13.87L0 2.99H7.58L13.23 9.14L19.86 2.99H24L16.07 10.26L16.07 4.22Z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <Separator className="h-2 rounded-2xl" />
                <div className="flex w-full justify-center">
                  <Link className="cursor-default" href={`#`}>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${data.picture}`}
                      alt="Room Image"
                      width={1200} // You can set a large width for better quality
                      height={600} // Set a height to maintain aspect ratio
                      className="h-auto w-full rounded-lg object-cover shadow-lg"
                    />
                  </Link>
                </div>
                {/* If needed, add another section for additional content */}
                <div className="whitespace-pre-line break-words text-xs text-muted-foreground"></div>
                <MinimalTipTapViewer
                  content={data.content}
                  throttleDelay={0}
                  className={cn(
                    'w-full border-none'
                    // 'border-destructive focus-within:border-destructive'
                  )}
                  editorContentClassName=" cursor-default" //text-tei cursoriig boliulah
                  autofocus={true}
                  immediatelyRender={true}
                  editable={false}
                  injectCSS={true}
                  editorClassName="focus:outline-none p-5"
                />
              </article>
            </div>
          </div>
          <PostSidebar />
        </main>
      </div>
    </div>
  );
}
