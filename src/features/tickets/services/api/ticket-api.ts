import http from "@/lib/axios";
import type { TicketFormData, TicketResponseData } from "../../types/ticket-types";


const PREFIX = "ticket";


export const createtTicket = async (data: TicketFormData) => {
    const response = await http.post(PREFIX,data);

    return response?.data;
}


export const getTicketList = async (): Promise<TicketResponseData[] >=> {
    const response = await http.get(PREFIX);
    return response?.data;
}

export const showTicketDetails = async (id : string) => {
    const response = await http.get(`${PREFIX}/${id}`);

    return response?.data;
}


export const updateTicket = async (id : string , data: TicketFormData) => {
    const response = await http.patch(`${PREFIX}/${id}`,data);

    return response?.data;
}

export const deleteTicket = async (id : string) => {
    const response = await http.delete(`${PREFIX}/${id}`);

    return response?.data;
}