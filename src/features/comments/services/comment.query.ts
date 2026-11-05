import { useMutation, useQuery } from "@tanstack/react-query";
import { createTicketComment, getTicketComments, updateTicketComment } from "./api/comment.api";
import type { CommentData } from "../types/commentApi.types";


export const useCreateCommentMutation = () => {
    return useMutation({
        mutationFn: ({ ticketId , data } : { data: CommentData; ticketId: number; }) => createTicketComment({ ticketId , data})
    });
}

export const useGetCommentsQuery = ({ ticketId = null, perPage = 5 }: { ticketId: number|null; perPage ?: number;}) => {
    return useQuery({
        queryKey:['ticket-comments',ticketId, perPage],
        queryFn:() => getTicketComments({ ticketId: ticketId ?? 0, perPage }),
        enabled: !!ticketId
    });
}

export const useUpdateCommentMutation = () => {
    return useMutation({
        mutationFn: ({ commentId , data } : { data: CommentData; commentId: number; }) => updateTicketComment({ commentId , data})
    });
}