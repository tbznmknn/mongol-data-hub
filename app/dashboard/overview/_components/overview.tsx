import { PieGraph } from './PieGalleries';
import PageContainer from '@/components/layout/page-container';
import { RecentUsers } from './recent-sales';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { auth } from '@/auth';
import { notFound } from 'next/navigation';
interface DashboardData {
  counts: {
    members: number;
    companies: number;
    posts: number;
    users: number;
  };

  pie: {
    postType: string;
    posts: number;
    fill: string;
  }[];

  latestUsers: {
    email: string;
    phone: string;
    createdAt: string;
    firstName: string;
    role: string;
  }[];
}
export default async function OverViewPage() {
  const SESSION = await auth();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/company/overviewAdmin`,
    {
      cache: 'reload',
      headers: {
        Authorization: `Bearer ${SESSION?.user.accessToken}`,
        'Content-Type': 'application/json'
      }
    }
  ).catch(() => notFound());
  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    notFound;
  }
  const data = await response.json();
  const overviewData: DashboardData = data.data;
  if (!overviewData) {
    notFound();
  }
  return (
    <PageContainer scrollable>
      <div className="space-y-2">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Монгол Дата Хаб, 👋{' '}
          </h2>
        </div>
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Нийт гишүүн
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {overviewData.counts.companies}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Нийт удирдлага
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {overviewData.counts.members}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Нийт хэрэглэгч
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {overviewData.counts.users}
                </div>
                {/* <p className="text-xs text-muted-foreground">
                  +19% from last month
                </p> */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Нийтлэлүүд
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {overviewData.counts.posts}
                </div>
                {/* <p className="text-xs text-muted-foreground">
                  +201 since last hour
                </p> */}
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
            <div className="col-span-4">
              {/* <BarGraph /> */}
              <PieGraph chartData={overviewData.pie} />
            </div>
            <Card className="col-span-4 md:col-span-3">
              <CardHeader>
                <CardTitle>Шинэ хэрэглэгчид</CardTitle>
                <CardDescription>
                  Хамгийн сүүд үүссэн шинээр үүссэн хэрэглэгчид
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentUsers latestUsers={overviewData.latestUsers} />
              </CardContent>
            </Card>
            {/* <div className="col-span-4">
              <AreaGraph />
            </div>
            <div className="col-span-4 md:col-span-3">
              <PieGraph />
            </div> */}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
