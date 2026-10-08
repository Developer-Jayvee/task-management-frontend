import { Badge } from "@/components/ui/badge";
import {
  emptyStateCopy,
  emptyStateIcons,
  useDataTableTicket,
} from "../../data/table-data";
import type {
  TicketDataTableData,
  TicketStatus,
} from "../../types/ticket-types";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DefaultDataTableValues } from "../../data/defaultValues";
import type { PaginationMetaData } from "@/features/common/types/paginationTypes";
import ServerSidePagination from "@/components/server-side-pagination";
import { useTicketViewContext } from "@/contexts/TicketViewContext";

export default function TicketDataTableComponent({
  data,
  isLoading,
  activeStatus,
  updatePage,
  pageIndex = 0,
  pageSize = 10,
  total = 0,
  meta,
}: {
  data: TicketDataTableData[];
  meta ?: PaginationMetaData;
  pageIndex ?: number;
  pageSize ?: number;
  isLoading: boolean;
  activeStatus: "all" | TicketStatus;
  updatePage: (perPage ?: number , pageIndex ?: number) => void;
  total: number;
}) {
  const datatable = useDataTableTicket({
    data: data ?? [DefaultDataTableValues],
    pageIndex,
    pageSize,
    rowCount: total
  });
  const { setSelectedTicket } = useTicketViewContext()
  const table = datatable.getRowModel();
  const list = table.rows.map((row) => row?.original);

  const EmptyIcon = emptyStateIcons[activeStatus];
  const emptyCopy = emptyStateCopy[activeStatus];
  const setPerPageCount = ({ perPage , pageIndex} :  { perPage ?: number; pageIndex ?: number; }) => {
    updatePage(perPage,pageIndex);
  };
  return (
    <div className="w-full overflow-x-auto rounded-md border">
      <Table className="min-w-160">
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="w-12 text-center">#</TableHead>
            <TableHead className="w-28">Title</TableHead>
            <TableHead>Deadline</TableHead>
            <TableHead className="w-24">Prio</TableHead>
            <TableHead className="w-28">Status</TableHead>
            <TableHead className="w-28 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="h-40 text-center text-muted-foreground"
              >
                Loading tickets…
              </TableCell>
            </TableRow>
          ) : list && list.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="h-56 whitespace-normal text-center"
              >
                <div className="mx-auto flex max-w-sm flex-col items-center gap-2 py-5">
                  <div className="mb-1 flex size-11 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                    <EmptyIcon className="size-5" aria-hidden="true" />
                  </div>
                  <p className="font-medium text-foreground">
                    {emptyCopy.title}
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {emptyCopy.description}
                  </p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            list.map((value, index) => {
              return (
                <TableRow key={value.id} className="hover:bg-muted/40">
                  <TableCell className="text-center text-muted-foreground">
                    {index + 1}
                  </TableCell>

                  <TableCell className="font-medium">{value.title}</TableCell>

                  <TableCell>{value.due_date}</TableCell>

                  <TableCell>
                    <Badge variant="destructive">{value.priority}</Badge>
                  </TableCell>

                  <TableCell>
                    <Badge variant="secondary">{value.status}</Badge>
                  </TableCell>

                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => setSelectedTicket?.(value.id)}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
      {
        meta && (<ServerSidePagination meta={meta} onPerPageChange={({pageIndex , perPage }) => setPerPageCount({ pageIndex , perPage})}/>)
      }
    </div>
  );
}
