import Providers from '@/components/layout/providers';
import { Toaster } from '@/components/ui/sonner';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale } from 'next-intl/server';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { getTranslations } from 'next-intl/server';
import { getUserLocale } from '@/lib/locale';
import { Montserrat } from 'next/font/google'; // Import Montserrat font
import { TooltipProvider } from '@/components/ui/tooltip';
type Props = {
  children: ReactNode;
};

export async function generateMetadata({}: Omit<Props, 'children'>) {
  const locale = await getUserLocale();
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: {
      default: 'Монгол Дата Хаб',
      template: `%s - Монгол Дата Хаб`
      // default: t('HomePage'),
      // template: `%s - ${t('HomePage')}`
    },
    description: 'Монгол Дата Хаб',
    twitter: {
      card: 'summary_large_image'
    }
  };
}

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'], // Support for Latin and Cyrillic characters
  weight: ['400', '500', '600', '700']
});

export default async function RootLayout({ children }: Props) {
  const messages = await getMessages();
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      className={`${montserrat.className}`} // Use Montserrat font
      suppressHydrationWarning={true}
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <NextTopLoader color="#2874BB" showSpinner={false} />
          <SessionProvider>
            <Providers>
              <Toaster />
              <TooltipProvider> {children}</TooltipProvider>
            </Providers>
          </SessionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
