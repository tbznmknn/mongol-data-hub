import { Button } from '@/components/ui/button';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import { DialogFormExample } from './dialog-form-example';

export function Hero() {
  const { setTheme: setMode, resolvedTheme: mode } = useTheme();

  return (
    <div className="text-center">
      <h1 className="mb-4 text-5xl font-extrabold tracking-tight">
        Редактор хэрэглээний жишээ
      </h1>
      <p className="mb-6 text-xl">
        Хялбар байдал, өргөтгөх боломжид төвлөрсөн минимал Tiptap редактор.
      </p>
      <div className="flex flex-col justify-center gap-x-2 space-y-4 sm:flex-row sm:space-y-0">
        {/* <Button
          className="bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200"
          onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
        >
          {mode === 'dark' ? 'Light' : 'Dark'} Mode
        </Button> */}
        <DialogFormExample />
        <a href="https://github.com/tbznmknn" target="_blank">
          <Button variant="outline">
            <GitHubLogoIcon className="mr-2 size-5" />
            Сайт хөгжүүлэгч
          </Button>
        </a>
      </div>
    </div>
  );
}
