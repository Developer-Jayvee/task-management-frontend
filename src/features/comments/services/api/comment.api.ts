import http from "@/lib/axios";
import type { CommentData } from "../../types/commentApi.types";


const PREFIX = "comment";

export const getTicketComments = async ({ ticketId, perPage = 5 }: { ticketId: number; perPage ?: number;}) => {
    const response = await http.get(`${PREFIX}/${ticketId}/list`, { params: { perPage }});
    return await response?.data;
}

export const createTicketComment = async ({ ticketId , data } : { data: CommentData; ticketId: number; }) => {
    const response = await http.post(`${PREFIX}/${ticketId}/store`,data);
    return await response?.data;
}

export const updateTicketComment = async ({ commentId , data }: { data: CommentData; commentId: number}) => {
    const response = await http.patch(`${PREFIX}/${commentId}/update`,data);
    return await response?.data;
}