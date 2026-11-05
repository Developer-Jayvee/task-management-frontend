import { useState } from "react";
import { useCreateCommentMutation, useGetCommentsQuery, useUpdateCommentMutation } from "../services/comment.query";
import type { CommentData } from "../types/commentApi.types";
import { useQueryClient } from "@tanstack/react-query";


export default function useComment() {
    const [perPage, setPerPage] = useState<number>(5);
    const [ticketId, setTicketId] = useState<number | null>(null);
    const commentsQuery = useGetCommentsQuery({ ticketId, perPage });
    const createCommentMutation = useCreateCommentMutation();
    const updateCommentMutation = useUpdateCommentMutation();
    const queryClient = useQueryClient();


    const createComment = async (data: CommentData) => {
        try {
            if (!ticketId) return;

            const response = await createCommentMutation.mutateAsync({ ticketId, data: { content: "" } });
            if (response) {
                await queryClient.invalidateQueries({
                    queryKey: ['ticket-list', 1, 10]
                });
            }
        } catch (error) {
            console.warn('Error creating comment');
        }
    }
    const updateComment = async ({ data, commentId }: { data: CommentData; commentId: number; }) => {
        try {
            if (!ticketId) return;
            const response = await updateCommentMutation.mutateAsync({ data, commentId });
            if (response) {
                await queryClient.invalidateQueries({
                    queryKey: ['ticket-list', 1, 10]
                });
            }
        } catch (error) {
            console.warn('Error creating comment');
        }
    }
    return {
        setPerPage,
        setTicketId,
        createComment,
        updateComment,
        commentsQuery

    }

}