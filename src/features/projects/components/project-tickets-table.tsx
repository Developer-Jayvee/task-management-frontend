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
import type { TicketResponseData } from "@/features/tickets/types/ticket-types";

export function ProjectTicketsTable({
  data,
  viewTicketDetails
}: {
  data: Array<TicketResponseData>|[];
    viewTicketDetails: (id: string) => void;
}) {
  return (
    <div className="w-full overflow-x-auto rounded-md border">
      <Table>
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
          {typeof data === "object" &&
            data.map((value, index) => {
              return (
                <>
                  <TableRow className="hover:bg-muted/40">
                    <TableCell className="text-center text-muted-foreground">
                      {++index}
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
                </>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
}
