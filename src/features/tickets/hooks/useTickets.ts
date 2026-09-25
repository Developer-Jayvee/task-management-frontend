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

export default function useTickets() {
  const { list, show } = TicketQueryKeys;
  const [open, setOpen] = useState<boolean>(false);
  const [projectId, setProjectId] = useState<string | undefined>(undefined);
  const queryClient = useQueryClient();
  const ticketForm = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
  });

  const createQuery = createTicketQuery();
  const updateQuery = updateTicketQuery();
  const getQuery = getTicketListQuery();
  const deleteQuery = deleteTicketQuery();

  const ticketList = getQuery.data;

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
      fetchList();
    } catch (error) {
      console.warn("Error found in :", error);
    }
  };

  const refetchList = () => queryClient.invalidateQueries({ queryKey: [list] });
  const fetchList = () => getQuery.refetch();
  const showDetails = (id: string) => queryClient.getQueryData([show, id]);
  const onUpdateTIcket = (id: string) => {
    setOpen(true);
    const selectedData = ticketList?.find((data) => data.id === id);
    if (!selectedData) return;
    ticketForm.reset({
      id: String(selectedData.id),
      project_id: String(selectedData.project_id),
      title: selectedData.title,
      description: selectedData.description ?? "",
      status: selectedData.status,
      priority: selectedData.priority,
      assignee_id: Number(selectedData.assignee_id),
      due_date: selectedData.due_date,
    });
  };
  const deleteTicket = async (id: string) => {
    try {
      await deleteQuery.mutateAsync({ id });
      toast.success("Deleted success");
      fetchList();
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
  };
}
