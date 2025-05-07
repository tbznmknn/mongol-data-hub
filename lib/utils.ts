import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Active, DataRef, Over } from '@dnd-kit/core';
import { ColumnDragData } from '@/app/dashboard/kanban/_components/board-column';
import { TaskDragData } from '@/app/dashboard/kanban/_components/task-card';
import { getLocale } from 'next-intl/server';
import { useLocale } from 'next-intl';
import { addHours, format } from 'date-fns';

type DraggableData = ColumnDragData | TaskDragData;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hasDraggableData<T extends Active | Over>(
  entry: T | null | undefined
): entry is T & {
  data: DataRef<DraggableData>;
} {
  if (!entry) {
    return false;
  }

  const data = entry.data.current;

  if (data?.type === 'Column' || data?.type === 'Task') {
    return true;
  }

  return false;
}

export function formatBytes(
  bytes: number,
  opts: {
    decimals?: number;
    sizeType?: 'accurate' | 'normal';
  } = {}
) {
  const { decimals = 0, sizeType = 'normal' } = opts;

  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const accurateSizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB'];
  if (bytes === 0) return '0 Byte';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === 'accurate' ? accurateSizes[i] ?? 'Bytest' : sizes[i] ?? 'Bytes'
  }`;
}
// utils/formatDate.ts

export const formatDate = (date: string | Date) => {
  const d = new Date(date);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0'); // Get month and pad with leading zero if needed
  const day = String(d.getDate()).padStart(2, '0'); // Get day and pad with leading zero if needed
  const hours = String(d.getHours()).padStart(2, '0'); // Get hours and pad with leading zero if needed
  const minutes = String(d.getMinutes()).padStart(2, '0'); // Get minutes and pad with leading zero if needed
  const seconds = String(d.getSeconds()).padStart(2, '0'); // Get seconds and pad with leading zero if needed

  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
};
export const formatDate8 = (date: string | Date) => {
  const d = new Date(date);

  // Add 8 hours to the date
  const newDate = addHours(d, 8);

  // Format the date
  return format(newDate, 'yyyy-MM-dd HH:mm:ss');
};
