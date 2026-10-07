import type { PaginationMetaData } from "@/features/common/types/paginationTypes";
import { Field, FieldLabel } from "./ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

export default function ServerSidePagination({
  meta,
  onPerPageChange,
}: {
  meta: PaginationMetaData;
  onPerPageChange: ({
    perPage,
    pageIndex,
  }: {
    perPage?: number;
    pageIndex?: number;
  }) => void;
}) {
  const prevPageMeta = meta.links?.[0];
  const nextPageMeta = meta?.links ? meta.links.at(-1) : null;

  return (
    <div className="px-4 py-2 flex items-center justify-between gap-4">
      <Field orientation="horizontal" className="w-fit">
        <FieldLabel htmlFor="select-rows-per-page">Rows per page</FieldLabel>
        <Select
          defaultValue={meta.per_page}
          onValueChange={(value) =>
            value && onPerPageChange({ perPage: Number(value) })
          }
        >
          <SelectTrigger className="w-20" id="select-rows-per-page">
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="start">
            <SelectGroup>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={`${!prevPageMeta?.url ? "pointer-events-none opacity-50" : ""}`}
              onClick={() => onPerPageChange({ pageIndex: prevPageMeta?.page })}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              className={`${!nextPageMeta?.url ? "pointer-events-none opacity-50" : ""}`}
              onClick={() => onPerPageChange({ pageIndex: nextPageMeta?.page })}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
