// utils/fetcher.ts
import { getLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
export interface FetcherOptions extends RequestInit {
  token?: string;
}

export const fetcher = async <T>(
  url: string,
  options: FetcherOptions = {}
): Promise<T> => {
  // console.log('aa'), url;
  const locale = await getLocale();
  try {
    console.log(`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`,
      {
        ...options,
        headers: {
          Authorization: `Bearer ${options.token || ''}`,
          'Accept-Language': locale,
          ...(options.headers || {})
        }
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'An error occurred');
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error('Fetcher error:', error);
    // throw error;
    notFound();
  }
};
