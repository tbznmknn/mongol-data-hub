import {
  createSearchParamsCache,
  createSerializer,
  parseAsInteger,
  parseAsString
} from 'nuqs/server';

export const searchParams = {
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(10),
  q: parseAsString,
  gender: parseAsString,
  categories: parseAsString,
  SYMBOL: parseAsString,
  role: parseAsString,
  search: parseAsString,
  checkInDate: parseAsString,
  checkOutDate: parseAsString,
  guestCount: parseAsString
  // categories:parseAsString
};

export const searchParamsCache = createSearchParamsCache(searchParams);
export const serialize = createSerializer(searchParams);
