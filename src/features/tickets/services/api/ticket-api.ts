import http from "@/lib/axios";
import type {
  TicketFormData,
} from "../../types/ticket-types";
import type { PaginationData } from "@/features/common/types/paginationTypes";
import axios from "axios";

const PREFIX = "ticket";

export const createtTicket = async (data: TicketFormData) => {
  const response = await http.post(PREFIX, data);

  return response?.data;
};

export const getTicketList = async ({
  page = 1,
  perPage = 10,
  status = "all"
}: {
  page ?: number;
  perPage ?: number;
  status ?: "all" | "to-do" | "in-progress" | "completed"
}): Promise<PaginationData> => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/${PREFIX}`,
    { 
        headers: { Accept:'application/json' },
        withCredentials: true,
        params: { page, perPage, status } },
  );
  return response?.data;
};

export const showTicketDetails = async (id ?: string) => {
  const response = await http.get(`${PREFIX}/${id}/details`);

  return response?.data;
};

export const updateTicket = async (id: string, data: TicketFormData) => {
  const response = await http.patch(`${PREFIX}/${id}`, data);

  return response?.data;
};

export const deleteTicket = async (id: string) => {
  const response = await http.delete(`${PREFIX}/${id}/delete`);

  return response?.data;
};
