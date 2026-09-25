import http from "@/lib/axios"
import type { TicketStatus } from "../../types/ticket-types";


export const transitionAPI = async (id : string , status: TicketStatus) => {
    
    const response = await http.patch(`ticket/${id}/status`,{
        ...{ status }
    });
    return response?.data;
}