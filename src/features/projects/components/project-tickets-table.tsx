import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CircleCheck, CircleDashed, CircleDot, Ticket } from "lucide-react";
import type { ProjectDataI } from "../types/projectTypes";
import type { TicketStatus } from "@/features/tickets/types/ticket-types";

const emptyStateCopy: Record<"all" | TicketStatus, { title: string; description: string }> = {
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

const emptyStateIcons = {
  all: Ticket,
  "to-do": CircleDashed,
  "in-progress": CircleDot,
  completed: CircleCheck,
};

export function ProjectTicketsTable({
  data,
  viewTicketDetails,
  activeStatus,
  isLoading,
}: {
  data: ProjectDataI;
  viewTicketDetails: (id: string) => void;
  activeStatus: "all" | TicketStatus;
  isLoading: boolean;
}) {
  const tickets = Array.isArray(data?.tickets) ? data.tickets : [];
  const EmptyIcon = emptyStateIcons[activeStatus];
  const emptyCopy = emptyStateCopy[activeStatus];

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
              <TableCell colSpan={6} className="h-40 text-center text-muted-foreground">
                Loading tickets…
              </TableCell>
            </TableRow>
          ) : tickets.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-56 whitespace-normal text-center">
                <div className="mx-auto flex max-w-sm flex-col items-center gap-2 py-5">
                  <div className="mb-1 flex size-11 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                    <EmptyIcon className="size-5" aria-hidden="true" />
                  </div>
                  <p className="font-medium text-foreground">{emptyCopy.title}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {emptyCopy.description}
                  </p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            tickets.map((value, index) => {
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
                    <Button variant="ghost" size="sm" onClick={() => viewTicketDetails(value.id)}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
