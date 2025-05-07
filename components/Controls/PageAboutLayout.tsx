import BackgroundImageForPage from '@/components/customui/BackgroundImageForPage';
import { Separator } from '@/components/ui/separator';
import Sidebar from './SidebarAbout';

export default function PageAboutLayout({
  title,
  subtitle,
  backgroundUrl,
  children,
  isCompany,
  isGovernance
}: {
  title: string;
  subtitle: string | null;
  backgroundUrl: string;
  children: React.ReactNode;
  isCompany?: boolean;
  isGovernance?: boolean;
}) {
  const menuItems = isCompany
    ? [
        { title: 'Гишүүнээр элсэх', link: '/companies' },
        { title: 'Түншүүд', link: '/companies/list' }
      ]
    : isGovernance
    ? [{ title: 'Засаглал', link: '/governance' }]
    : [
        { title: 'Дата Хабын танилцуулга', link: '/about' },
        { title: 'Алсын хараа, Эрхэм зорилго', link: '/vision' },
        { title: 'Үйл ажиллагаа', link: '/activities' },
        { title: 'Дүрэм', link: '/about/rules', download: true }
      ];

  return (
    <div className="w-full bg-white pb-2 sm:pb-6 md:pb-8">
      {/* Background Image Section */}
      <BackgroundImageForPage alt={title} title={title} url={backgroundUrl} />

      {/* Main Content */}
      <div className="mx-1 flex max-w-7xl lg:mx-auto">
        {/* Sidebar */}
        <Sidebar menuItems={menuItems} />

        <section className="w-full max-w-4xl py-2 sm:py-6 md:py-8 lg:w-3/4 lg:px-2">
          <div className="text-center">
            <h1 className="text-xl font-semibold sm:text-3xl">{title}</h1>
            {subtitle && (
              <p className="sm:text-md mt-1 text-sm text-gray-700 sm:mt-2 sm:px-20">
                {subtitle}
              </p>
            )}
            <Separator className="mt-4" />
          </div>

          {/* Main Contents */}
          <div className="mx-auto max-w-4xl pt-8 sm:pt-12">{children}</div>
        </section>
      </div>
    </div>
  );
}
