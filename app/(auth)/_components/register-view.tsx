import { Metadata } from 'next';
import Link from 'next/link';
import UserAuthForm from './login-auth-form';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import RegisterForm from './register-auth-form';
import { useTranslations } from 'next-intl';
import LocaleSwitcher from '@/components/Controls/LocaleSwitcher';
export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.'
};
import Image from 'next/image';
export const getCurrentSeason = () => {
  const month = new Date().getMonth(); // Get current month (0-11)

  if (month >= 11 || month <= 1) return 'winter';
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  return 'fall';
};
export default function RegisterView() {
  const t = useTranslations('Controls.AUTH');
  const currentSeason = getCurrentSeason();
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900 opacity-50" />

        {/* Set Image as background */}
        <div className="absolute inset-0">
          <Image
            src={`/mainn.jpg  `} // Using the current season for dynamic background
            alt={currentSeason}
            layout="fill"
            objectFit="cover"
            className="brightness-75"
            priority
          />
        </div>

        <div className="relative z-20 flex items-center text-lg font-medium">
          <Image src={'/logo.png'} height={60} width={60} alt="jsc" />
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              Монголын Дата хабд бидний ажил өгөгдлийн бат бөх экосистемийг бий
              болгох амлалтаар удирдлага болдог. Доор бидний зорилгыг хөтлөгч
              үндсэн зарчмуудыг жагсаав, өгөгдлийн чанарыг хангахаас эхлээд
              хэрэглэгчдэд ил тод ойлголт хүргэх хүртэл.;
            </p>
            <footer className="text-sm">Монгол Дата Хаб</footer>
          </blockquote>
        </div>
      </div>
      <div className="flex h-full items-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex justify-end">{/* <LocaleSwitcher /> */}</div>
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              {t('register')}
            </h1>
          </div>

          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
