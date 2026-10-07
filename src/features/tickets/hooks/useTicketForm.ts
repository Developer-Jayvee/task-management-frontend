import { useForm, type SubmitHandler } from "react-hook-form";
import { ticketSchema, type TicketFormData } from "../types/ticket-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTicketQuery, updateTicketQuery } from "../services/queryService";
import { toast } from "react-toastify";
import { usePromptContext } from "@/contexts/PromptDialogContext";
import { useState } from "react";

export default function useTicketForm() {
  const createQuery = createTicketQuery();
  const updateQuery = updateTicketQuery();
  const form = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
  });
  const { configurePrompt, showPrompt } = usePromptContext();
  const [open,setOpen] = useState<boolean>(false);
  const [isFormSuccess,setFormSuccess] = useState<boolean>(false);

  const confirmFormSubmit = ({ data, id, }: { data: TicketFormData; id?: string; }) => {
    configurePrompt?.({
      title: `Are you sure you want to proceed?`,
      promptId: "#ticketForm",
      callback: () =>
        !id ? createFormSubmit(data) : updateFormSubmit({ id, data }),
    });
    showPrompt?.();
  };

  const updateFormSubmit = async ({ id, data, }: { id: string; data: TicketFormData; }) => {
    try {
      const update = await updateQuery.mutateAsync({ id, data });
      if(update) {
        setFormSuccess(prev => true);
        toast.success("Update success");
        form.reset();
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
        console.log(create,1);
        
        toast.success("Save success");
        form.reset();
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
