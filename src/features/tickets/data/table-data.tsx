import {
  useTable,
  type ColumnDef,
} from "@tanstack/react-table";
import type { TicketDataTableData, TicketStatus } from "../types/ticket-types";
import { CircleCheck, CircleDashed, CircleDot, Ticket } from "lucide-react";
import { features } from "@/lib/tanstack-table";


export const columns: ColumnDef<typeof features, TicketDataTableData>[] = [
  {
    accessorKey: "id",
    header: "#",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "priority",
    header: "Prio",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];

export const useDataTableTicket = ({
  data,
  pageIndex = 0,
  pageSize = 10,
  rowCount
}: {
  data: Array<TicketDataTableData>;
  pageIndex: number;
  pageSize : number;
  rowCount : number;
}) => {
  return useTable({
    key: "ticket-table",
    features,
    columns,
    data,
    rowCount,
    manualPagination: true,
    
    state: {
      pagination: {
        pageIndex,
        pageSize
      }
    }
  });
};

export const emptyStateIcons = {
  all: Ticket,
  "to-do": CircleDashed,
  "in-progress": CircleDot,
  completed: CircleCheck,
};
export const emptyStateCopy: Record<
  "all" | TicketStatus,
  { title: string; description: string }
> = {
  all: {
    title: "No tickets yet",
    description: "Tickets created for this project will appear here.",
  },
  "to-do": {
    title: "No open tickets",
    description: "There are no tickets waiting to be started right now.",
  },
  "in-progress": {
    title: "Nothing in progress",
    description: "Tickets being worked on will appear here.",
  },
  completed: {
    title: "No completed tickets",
    description: "Completed tickets will appear here.",
  },
};
