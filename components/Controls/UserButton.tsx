'use client';

// import { useSession } from "@/app/(main)/SessionProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import UserAvatar from './UserAvatar';
import Link from 'next/link';
import { Check, LogOutIcon, Monitor, Moon, Sun, UserIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { signOutAction } from '@/app/(auth)/actions/logout';
import { signOut } from 'next-auth/react';
import { Session } from 'next-auth';
// import { useQueryClient } from "@tanstack/react-query";

interface UserButtonProps {
  className?: string;
  email: string | null | undefined;
  session: Session;
}
export default function UserButton({
  className,
  email,
  session
}: UserButtonProps) {
  // const { user } = useSession();
  const { theme, setTheme } = useTheme();
  // const queryClient = useQueryClient();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn('flex-none rounded-full', className)}>
          <UserAvatar avatarUrl={''} size={30} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Нэвтэрсэн: {email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {(session.user.role === 'SUPERADMIN' ||
          session.user.role === 'ADMIN') && (
          <Link href={`/dashboard/overview`}>
            <DropdownMenuItem>
              <UserIcon className="mr-2 size-4" />
              Дашборд
            </DropdownMenuItem>
          </Link>
        )}
        {/* <Link href={`/contact`}>
          <DropdownMenuItem>
            <UserIcon className="mr-2 size-4" />
            Zod/Translation
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Monitor className="mr-2 size-4" /> Theme
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                <Monitor className="mr-2 size-4" />
                System default
                {theme === 'system' && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('light')}>
                <Sun className="mr-2 size-4" />
                Light
                {theme === 'light' && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                <Moon className="mr-2 size-4" />
                Dark
                {theme === 'dark' && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            signOut({ callbackUrl: '/' });
          }}
        >
          <LogOutIcon className="mr-2 size-4" />
          Гарах
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
