import { useProjectViewContext } from "@/contexts/ProjectViewContext";
import { useTicketViewContext } from "@/contexts/TicketViewContext";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { EllipsisVertical, Pencil, Trash2, X } from "lucide-react";
import { useState } from "react";

export default function TicketViewFooter() {
  const [actionsOpen, setActionsOpen] = useState(false);
  const { setSelectedTicket,deleteTicketConfirm } = useTicketViewContext();
  const {
    modal_config,
    form_config: { ticketForm: form },
  } = useProjectViewContext();
  const { data } = useTicketViewContext();

  const onUpdate = () => {
    modal_config.setOpen(!modal_config.open);
    form?.setValues({
      title: data?.title,
      description: data?.description ?? "",
      status: data?.status,
      priority: data?.priority,
      assignee_id: Number(data?.assignee_id),
      due_date: data?.due_date,
    });
  };

  
  return (
    <div className="mb-2 flex justify-end">
      <Popover open={actionsOpen} onOpenChange={setActionsOpen}>
        <PopoverTrigger
          render={
            <Button variant="ghost" size="icon" aria-label="Ticket actions" className="rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900">
              <EllipsisVertical className="size-4" />
            </Button>
          }
        />
        <PopoverContent align="end" side="top" className="w-44 gap-1 rounded-xl p-1.5">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => {
              setActionsOpen(false);
              setSelectedTicket?.(undefined);
            }}
          >
            <X className="mr-2 size-4" />
            Close
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => {
              setActionsOpen(false);
              onUpdate();
            }}
          >
            <Pencil className="mr-2 size-4" />
            Update
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-destructive hover:text-destructive"
            onClick={() => {
              setActionsOpen(false);
              deleteTicketConfirm?.();
            }}
          >
            <Trash2 className="mr-2 size-4" />
            Delete
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}
