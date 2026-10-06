import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Field, FieldLabel } from "./ui/field";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export default function CustomPaginaton({
  perPage = "10",
  nextPageLink = "#",
  previousPageLink = "#",
  onPerPageChange = (() => {})
}: {
  perPage: string;
  nextPageLink: string;
  previousPageLink: string;
  onPerPageChange : ({ count } : { count : number; }) => void;
}) {
  
  return (
    <div className="px-4 py-2 flex items-center justify-between gap-4">
      <Field orientation="horizontal" className="w-fit">
        <FieldLabel htmlFor="select-rows-per-page">Rows per page</FieldLabel>
        <Select defaultValue={perPage} onValueChange={(value) =>  value && onPerPageChange({ count : Number(value)})}>
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
            <PaginationPrevious href={previousPageLink} />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href={nextPageLink} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
