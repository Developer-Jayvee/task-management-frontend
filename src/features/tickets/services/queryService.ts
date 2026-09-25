import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createtTicket,
  deleteTicket,
  getTicketList,
  showTicketDetails,
  updateTicket,
} from "./api/ticket-api";
import { TicketQueryKeys } from "../data";
import type { TicketFormData } from "../types/ticket-types";

const { list, show } = TicketQueryKeys;

export const getTicketListQuery = () => {
  return useQuery({
    queryKey: [list],
    queryFn: getTicketList,
    enabled: false
  });
};

export const showTicketQuery = (id: string) => {
  return useQuery({
    queryKey: [show, id],
    queryFn: () => showTicketDetails(id),
  });
};

export const createTicketQuery = () => {
  return useMutation({
    mutationFn: ({ data }: { data: TicketFormData }) => createtTicket(data),
  });
};


export const deleteTicketQuery = () => {
    return useMutation({
        mutationFn: ({ id } : { id : string }) => deleteTicket(id)
    });
}

export const updateTicketQuery = () => {
    return useMutation({
        mutationFn: ({ id , data } : { id: string; data: TicketFormData }) => updateTicket(id,data)
    })
}