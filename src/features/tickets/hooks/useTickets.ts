import { useForm, type SubmitHandler } from "react-hook-form";
import { type TicketFormData, ticketSchema } from "../types/ticket-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { TicketQueryKeys } from "../data";
import {
  createTicketQuery,
  deleteTicketQuery,
  getTicketListQuery,
  updateTicketQuery,
} from "../services/queryService";
import { useState } from "react";
import { toast } from "react-toastify";
import { usePromptContext } from "@/contexts/PromptDialogContext";
import { getProjectTickets } from "@/features/projects/services/api/project-api";
import { showTicketDetails } from "../services/api/ticket-api";

export default function useTickets() {
  const { list, show } = TicketQueryKeys;
  const [open, setOpen] = useState<boolean>(false);
  const [projectId, setProjectId] = useState<string | undefined>(undefined);
  const { configurePrompt , showPrompt } = usePromptContext()
  const queryClient = useQueryClient();
  const ticketForm = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
  });

  const createQuery = createTicketQuery();
  const updateQuery = updateTicketQuery();
  const getQuery = getTicketListQuery();
  const deleteQuery = deleteTicketQuery();

  const ticketList = getQuery.data;
  const confirmPrompt = (data : TicketFormData) => {
    configurePrompt?.({
      title: `Are you sure you want to proceed?`,
      promptId: "#ticketForm",
      callback: () => submitForm(data)
    })
    showPrompt?.()
  }
  const submitForm: SubmitHandler<TicketFormData> = async (
    data: TicketFormData,
  ) => {
    try {
      const formData = {
        ...data,
        project_id: projectId,
      };

      if (data.id)
        await updateQuery.mutateAsync({ id: data.id, data: formData });
      else await createQuery.mutateAsync({ data: formData });

      toast.success("Save success");
      setOpen(false);
      ticketForm.reset();

      queryClient.invalidateQueries({
        queryKey: ['project-tickets',projectId]
      });
    } catch (error) {
      console.warn("Error found in :", error);
    }
  };

  const refetchList = () => queryClient.invalidateQueries({ queryKey: [list] });
  const fetchList = () => getQuery.refetch();
  const showDetails = (id: string) => queryClient.getQueryData([show, id]);
  const onUpdateTIcket =  async (id: string) => {
    const ticket  = await showTicketDetails(id);
    setOpen(true);
    if (!ticket) return;
    ticketForm.reset({
      id: String(ticket.id),
      project_id: String(ticket.project_id),
      title: ticket.title,
      description: ticket.description ?? "",
      status: ticket.status,
      priority: ticket.priority,
      assignee_id: Number(ticket.assignee_id),
      due_date: ticket.due_date,
    });
  };
  const confirmDelete = async (id : string) => {
    configurePrompt?.({
      title:"Are you sure you want to delete this ticket?",
      promptId: "#deleteticket",
      callback: async () => await deleteTicket(id)
    })
    showPrompt?.();
  }
  const deleteTicket = async (id: string) => {
    try {
      await deleteQuery.mutateAsync({ id });
      toast.success("Deleted success");
      queryClient.invalidateQueries({
        queryKey: ['project-tickets',projectId]
      });
    } catch (error) {
      console.warn(error);
    }
  };
  return {
    submitForm,
    ticketForm,
    fetchList,
    showDetails,
    refetchList,
    open,
    setOpen,
    ticketList,
    projectId,
    setProjectId,
    deleteTicket,
    onUpdateTIcket,
    confirmPrompt,
    confirmDelete
  };
}
