import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDate8 } from '@/lib/utils';

interface User {
  email: string;
  phone: string;
  createdAt: string;
  firstName: string;
  role: string;
}

interface UsersProps {
  latestUsers: User[];
}

export function RecentUsers({ latestUsers }: UsersProps) {
  return (
    <div className="space-y-8">
      {latestUsers.map((user, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`/avatars/${index + 1}.png`} alt="Avatar" />
            <AvatarFallback>
              {user.email.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 flex w-full items-center justify-between space-y-1">
            <div>
              <p className="text-sm font-medium leading-none">
                {user.firstName}
              </p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <p className="text-xs text-muted-foreground">{user.phone}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">{user.role}</p>
              <p className="text-xs text-muted-foreground">
                Бүртгүүлсэн: {formatDate8(new Date(user.createdAt))}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
