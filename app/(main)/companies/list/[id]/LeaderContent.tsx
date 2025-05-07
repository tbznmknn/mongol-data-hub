'use server';
import { notFound } from 'next/navigation';

import getToken from '@/lib/GetTokenServer';
import { Post } from '@/app/dashboard/posts/_components/product-listing';
import { getTranslations } from 'next-intl/server';
import PageContainer from '@/components/layout/page-container';

import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import MinimalTipTapViewer from '@/components/minimal-tiptap/minimal-tip-viewer';
import Image from 'next/image';
import { Member } from '@/app/dashboard/employees/_components/product-listing';
import { AssociateMember } from '@/app/dashboard/companies/_components/product-listing';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import Link from 'next/link';
import { ExternalLinkIcon } from 'lucide-react';
export default async function LeaderContent({ id }: { id: number }) {
  let product = null;
  const t = await getTranslations('dashboard');
  let pageTitle = 'Нийтлэл ';
  let isNew = true;
  isNew = false;
  const TOKEN = await getToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/company/${id}`,
    {
      cache: 'no-cache',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      }
    }
  ).catch((err) => notFound());

  const jsonData = await response.json();
  const data: AssociateMember = jsonData.data;
  product = data;
  console.log(data);

  if (!product) {
    notFound();
  }

  return (
    <PageContainer scrollable={false}>
      <div className="">
        <Card className="mx-auto mt-4 w-full md:w-fit">
          <CardHeader>
            <CardTitle>{data.name}</CardTitle>
            <CardDescription>
              <Link
                className="flex items-center gap-2 text-blue-600"
                href={
                  data.link.startsWith('http')
                    ? data.link
                    : `https://${data.link}`
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLinkIcon className="size-4" />
                {data.link}
              </Link>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col gap-10 md:flex-row">
              <Image
                height={300}
                width={500}
                className="h-auto max-h-[20rem] w-full rounded-md border border-primary object-cover shadow-sm md:w-1/2"
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${data.picture}`}
                alt={data.name}
              />

              {/* ShadCN Table */}
              <Table className="">
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">
                      Үйл ажиллагааны чиглэл
                    </TableCell>
                    <TableCell>{data.OccupationType.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Гишүүний төрөл
                    </TableCell>
                    <TableCell>{data.AffiliationType.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Утасны дугаар</TableCell>
                    <TableCell>{data.phone}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Хаяг</TableCell>
                    <TableCell>{data.address}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Content data={data} />
      </div>
    </PageContainer>
  );
}
async function Content({ data }: { data: AssociateMember }) {
  return (
    <MinimalTipTapViewer
      content={data.content}
      throttleDelay={0}
      className={cn(
        'w-full border-none'
        // 'border-destructive focus-within:border-destructive'
      )}
      editorContentClassName=" cursor-default" //text-tei cursoriig boliulah
      autofocus={true}
      immediatelyRender={false}
      editable={false}
      injectCSS={true}
      editorClassName="focus:outline-none p-5"
    />
  );
}
