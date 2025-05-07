import NextAuth from 'next-auth';
import authConfig from '@/auth.config';
import {
  DEFAULT_LOGIN_REDIRECT,
  adminRoutes,
  authRoutes,
  apiAuthPrefix,
  superAdminRoutes,
  PROHIBITED_PAGE_REDIRECT,
  DEFAULT_LOGIN_PAGE,
  dashboardPrefix
} from '@/routes';
const { auth } = NextAuth(authConfig);
import { NextRequest } from 'next/server';
import { getSession } from './lib/GetTokenServer';
// const handleI18nRouting = createMiddleware(routing);
const publicPages = ['/', '/login'];

export default function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const updatedUrl = nextUrl.pathname;
  const isApiAuthRoute = updatedUrl.startsWith(apiAuthPrefix);
  if (isApiAuthRoute) return null;
  return (authMiddleware as any)(req);
}
const authMiddleware = auth(
  async (req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const updatedUrl = nextUrl.pathname;

    // Determine the route type
    const isAuthRoute = authRoutes.includes(updatedUrl);
    // const isAdminRoute = adminRoutes.includes(updatedUrl);
    // const isSuperAdminRoute = superAdminRoutes.includes(updatedUrl);
    const isDashboardRoute = updatedUrl.startsWith(dashboardPrefix);

    // Login routes
    if (isAuthRoute) {
      if (isLoggedIn) {
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
      }
      return;
    }
    // Protect Routes
    if (isDashboardRoute) {
      if (!isLoggedIn) {
        return Response.redirect(new URL(DEFAULT_LOGIN_PAGE, nextUrl));
      }
      const session = await getSession();
      const userRole = session?.user?.role;
      // console.log('description', userRole, isAdminRoute, isSuperAdminRoute);
      if (userRole == 'ADMIN') {
        return;
      } else if (userRole == 'SUPERADMIN') {
        return;
      } else {
        return Response.redirect(new URL(PROHIBITED_PAGE_REDIRECT, nextUrl));
      }
    }
    // if (isAdminRoute || isSuperAdminRoute) {
    //   if (!isLoggedIn) {
    //     return Response.redirect(new URL(DEFAULT_LOGIN_PAGE, nextUrl));
    //   }
    //   const session = await getSession();
    //   const userRole = session?.user?.role;
    //   // console.log('description', userRole, isAdminRoute, isSuperAdminRoute);
    //   if (userRole == 'ADMIN' && isAdminRoute) {
    //     return;
    //   } else if (userRole == 'SUPERADMIN' && isSuperAdminRoute) {
    //     return;
    //   } else {
    //     return Response.redirect(new URL(PROHIBITED_PAGE_REDIRECT, nextUrl));
    //   }
    // }

    // Authorized users proceed
    return;
  }

  // Default fallback for other routes
);
export const config = {
  // Match only internationalized pathnames
  matcher: [
    '/',
    '/(mn|en)/:path*',
    '/((?!.+\\.[\\w]+$|_next).*)',
    '/(api|trpc)(.*)'
  ]
};
