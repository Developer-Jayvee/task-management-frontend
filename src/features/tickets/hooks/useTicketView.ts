import { useState } from "react";
import { deleteTicketQuery, showTicketQuery } from "../services/queryService";
import type { TicketResponseData } from "../types/ticket-types";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useProjectViewContext } from "@/contexts/ProjectViewContext";
import { usePromptContext } from "@/contexts/PromptDialogContext";
import { showTicketDetails } from "../services/api/ticket-api";

export default function useTicketView() {
  const { configurePrompt, showPrompt } = usePromptContext();
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState<string | undefined>();
  const showQuery = showTicketQuery(selected);
  const deleteQuery = deleteTicketQuery();
  const details = showQuery.data as TicketResponseData;

  const {
    form_config: { ticketForm },
  } = useProjectViewContext();

  const deletePrompt = async () => {
    try {
      await deleteQuery.mutateAsync({ id: details.id });
      await queryClient.invalidateQueries({
        queryKey: ["ticket-list"],
      });
      toast.success("Deleted success.");
    } catch (error) {
      toast.error("Error upon delete.");
      console.warn("Error found in:", error);
    } finally {
      ticketForm?.setValues({
        title: "",
        description: "",
        status: "to-do",
        priority: "low",
        assignee_id: undefined,
        due_date: "",
      });
    }
  };

  const onUpdateTIcket = async (id: string) => {
      const ticket = await showTicketDetails(id);
      if (!ticket) return;
      ticketForm?.reset({
        project_id: String(ticket.project_id),
        title: ticket.title,
        description: ticket.description ?? "",
        status: ticket.status,
        priority: ticket.priority,
        assignee_id: Number(ticket.assignee_id),
        due_date: ticket.due_date,
      });

      await queryClient.invalidateQueries({
        queryKey: ["ticket-list"],
      });
    };
  return {
    details,
    selected,
    setSelectedTicket: (id?: string) => {
      setSelected(id);
    },
    deleteTicketConfirm:  () => {
      configurePrompt?.({
        title: `Are you sure you want to proceed?`,
        promptId: "#ticketDeleteForm",
        callback: async () => deletePrompt(),
      });
      showPrompt?.();
    },
    onUpdateTIcket
  };
}
