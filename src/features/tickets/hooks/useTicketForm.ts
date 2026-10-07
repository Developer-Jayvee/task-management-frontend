import { useForm, type SubmitHandler } from "react-hook-form";
import { ticketSchema, type TicketFormData } from "../types/ticket-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTicketQuery, updateTicketQuery } from "../services/queryService";
import { toast } from "react-toastify";
import { usePromptContext } from "@/contexts/PromptDialogContext";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

export default function useTicketForm() {
  const queryClient = useQueryClient();
  const createQuery = createTicketQuery();
  const updateQuery = updateTicketQuery();
  const form = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
  });
  const { configurePrompt, showPrompt } = usePromptContext();
  const [open,setOpen] = useState<boolean>(false);
  const [isFormSuccess,setFormSuccess] = useState<boolean>(false);

  const resetForm = () => {
    form.setValues({
      title: "",
      description: "",
      status: "to-do",
      priority: "low",
      assignee_id: undefined,
      due_date: "",
    });
  };
  const confirmFormSubmit = ({ data, id, }: { data: TicketFormData; id?: string; }) => {
    configurePrompt?.({
      title: `Are you sure you want to proceed?`,
      promptId: "#ticketForm",
      callback: async () => {
        if(!id) {
          await createFormSubmit(data)
        } else {
          await updateFormSubmit({ id, data });
        }
      }
    });
    showPrompt?.();
  };

  const updateFormSubmit = async ({ id, data, }: { id: string; data: TicketFormData; }) => {
    try {
      const update = await updateQuery.mutateAsync({ id, data });
      if(update) {
        setFormSuccess(prev => true);
        toast.success("Update success");
        resetForm()
        await queryClient.invalidateQueries({
          queryKey: ['ticket-list']
        })
      } 
    } catch (error) {
      console.warn("Error found in :", error);
    } finally {
      
      setFormSuccess(prev => false);
    }
  };
  const createFormSubmit: SubmitHandler<TicketFormData> = async ( data: TicketFormData ) => {
    try {
      const create = await createQuery.mutateAsync({ data });

      if(create) {
        setFormSuccess(prev => true);
        toast.success("Save success");
        resetForm();
        await queryClient.invalidateQueries({
          queryKey: ['ticket-list']
        })
      }
    } catch (error) {
      console.warn("Error found in :", error);
    } finally {
     
      setFormSuccess(prev => false);
    }
  };

  return {
    confirmFormSubmit,
    createFormSubmit,
    updateFormSubmit,
    form,
    open,
    setOpen,
    isFormSuccess
  }
}
