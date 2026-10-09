import { useProjectViewContext } from "@/contexts/ProjectViewContext";
import { useTicketViewContext } from "@/contexts/TicketViewContext";
import { Pencil, Trash2, X } from "lucide-react";

export default function TicketViewFooter() {
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
    <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
      {/* Delete */}
      <button
        onClick={() => deleteTicketConfirm?.()}
        type="button"
        className="
          inline-flex items-center gap-2
          px-3 py-2 sm:px-4 sm:py-2.5
          rounded-lg
          border border-red-200
          bg-white
          text-red-600
          text-sm font-medium
          hover:bg-red-50
          transition-colors
        "
      >
        <Trash2 size={16} />
        Delete
      </button>

      {/* Close + Update */}
      <div className="flex flex-1 justify-end gap-2 sm:flex-none">
        <button
          onClick={() => setSelectedTicket?.(undefined)}
          type="button"
          className="
            inline-flex items-center gap-2
            px-3 py-2.5 sm:px-4
            rounded-lg
            border border-slate-200
            bg-white
            text-slate-700
            text-sm font-medium
            hover:bg-slate-50
            transition-colors
          "
        >
          <X size={16} />
          Close
        </button>

        <button
          //   onClick={() => onUpdate(data.id)}
          onClick={() => onUpdate()}
          type="button"
          className="
            inline-flex items-center gap-2
            px-3 py-2.5 sm:px-4
            rounded-lg
            bg-slate-900
            text-white
            text-sm font-medium
            hover:bg-slate-800
            transition-colors
          "
        >
          <Pencil size={16} />
          Update
        </button>
      </div>
    </div>
  );
}
