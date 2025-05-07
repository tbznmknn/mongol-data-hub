'use client';

import { DataTableFilterBox } from '@/components/ui/table/data-table-filter-box';
import { DataTableResetFilter } from '@/components/ui/table/data-table-reset-filter';
import { DataTableSearch } from '@/components/ui/table/data-table-search';
import {
  CATEGORY_OPTIONS,
  useProductTableFilters
} from './use-product-table-filters';
import { useLocale } from 'next-intl';

export interface RoomKeys {
  id: number;
  name: string;
}
interface ProductTableActionProps {
  data: RoomKeys[]; // Define the type of the prop
}
export default function ProductTableAction({ data }: ProductTableActionProps) {
  const locale = useLocale();
  console.log(locale);
  const CATEGORY_OPTIONSs = data.map((room) => ({
    value: String(room.id), // Use `id` as the value
    label: room.name // Use `name_en` as the label
  }));
  const {
    categoriesFilter,
    setCategoriesFilter,
    isAnyFilterActive,
    resetFilters,
    searchQuery,
    setPage,
    setSearchQuery
  } = useProductTableFilters();
  return (
    <div className="flex flex-wrap items-center gap-4">
      <DataTableSearch
        searchKey="Компаний нэр"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setPage={setPage}
      />
      <DataTableFilterBox
        filterKey="categories"
        title="Төрөл"
        options={CATEGORY_OPTIONSs}
        setFilterValue={setCategoriesFilter}
        filterValue={categoriesFilter}
      />
      <DataTableResetFilter
        isFilterActive={isAnyFilterActive}
        onReset={resetFilters}
      />
    </div>
  );
}
