import {
  createSortedRowModel,
  rowPaginationFeature,
  rowSortingFeature,
  sortFns,
  tableFeatures,
  useTable,
  type ColumnDef,
} from "@tanstack/react-table";

export const features = tableFeatures({
  rowSortingFeature,
  rowPaginationFeature,
  sortedRowModel: createSortedRowModel(),
  // paginatedRowModel: createPaginatedRowModel(),
  sortFns: sortFns,
  
});

export const useDataTable =  <T = any>({
  data,
  pageIndex = 0,
  pageSize = 10,
  rowCount,
  columns = [],
  key,
  isManualPagination = true
}: {
  data: Array<T>;
  pageIndex: number;
  pageSize : number;
  rowCount : number;
  columns: ColumnDef<typeof features,any>[],
  key : string;
  isManualPagination ?: boolean;
}) => {
  return useTable({
    key,
    features,
    columns,
    data,
    rowCount,
    manualPagination: isManualPagination,
    state: {
      pagination: {
        pageIndex,
        pageSize
      }
    }
  });
};