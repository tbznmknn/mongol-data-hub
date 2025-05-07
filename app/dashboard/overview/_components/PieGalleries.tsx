'use client';

import * as React from 'react';
import { TrendingUp } from 'lucide-react';
import { Label, Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { formatDate8 } from '@/lib/utils';

const chartConfig = {
  posts: {
    label: 'Нийтлэлүүд'
  },
  courses: {
    label: 'Дүрэм',
    color: 'hsl(var(--chart-1))'
  },
  advice: {
    label: 'Алсын хараа',
    color: 'hsl(var(--chart-2))'
  },
  news: {
    label: 'Зөвлөмж',
    color: 'hsl(var(--chart-3))'
  },
  visions: {
    label: 'NEWS',
    color: 'hsl(var(--chart-4))'
  },
  rules: {
    label: 'Хичээл',
    color: 'hsl(var(--chart-5))'
  }
} satisfies ChartConfig;

interface PieData {
  postType: string;
  posts: number;
  fill: string;
}

interface OverviewAdminResponse {
  chartData: PieData[];
  // Other properties from the response can be added here if needed
}

export function PieGraph({ chartData }: OverviewAdminResponse) {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.posts, 0);
  }, []);
  let rowWithMostGalleries = null;
  if (chartData.length > 0) {
    rowWithMostGalleries = chartData.reduce((maxRow, currentRow) => {
      return currentRow.posts > maxRow.posts ? currentRow : maxRow;
    });
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Нийтлэл</CardTitle>
        <CardDescription>{formatDate8(new Date())}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[360px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="posts"
              nameKey="postType"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Нийтлэл
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          {rowWithMostGalleries
            ? `Хамгийн ихээр ${rowWithMostGalleries.postType} төрөлд нийт ${rowWithMostGalleries.posts} нийтлэл байна  `
            : 'Нийтлэл байхгүй байна'}{' '}
          <TrendingUp className="h-4 w-4" />
        </div>
        {/* <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div> */}
      </CardFooter>
    </Card>
  );
}
