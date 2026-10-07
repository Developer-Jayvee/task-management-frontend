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

export const getTicketListQuery = ({ page = 1 , perPage = 10 } : {
  page?: number;
  perPage?: number;
}) => {
  return useQuery({
    queryKey: [list,page ,perPage],
    queryFn: () => getTicketList({ page: page , perPage }),
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
    retry: false,
  });
};

export const deleteTicketQuery = () => {
  return useMutation({
    mutationFn: ({ id }: { id: string }) => deleteTicket(id),
    retry: false,
  });
};

export const updateTicketQuery = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: TicketFormData }) =>
      updateTicket(id, data),
    retry: false,
  });
};
