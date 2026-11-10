import type { CommentData } from "@/features/comments/types/commentApi.types";
import type { TicketResponseData } from "./ticket-types";
import type { UseQueryResult } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";


export interface TicketCommentData {
        setPerPage : Dispatch<SetStateAction<number>>;
        setTicketId : Dispatch<SetStateAction<number|null>>;
        createComment: (data: CommentData) => Promise<void>;
        updateComment: ({ data, commentId }: { data: CommentData; commentId: number; }) => Promise<void>;
        commentsQuery: UseQueryResult<any,Error>;
}

export interface TicketViewContextI  {
    data ?: TicketResponseData;
    setSelectedTicket ?: (id ?: string) => void;
    ticketSelected ?: string;
    deleteTicketConfirm ?: () => void;
    onUpdateTIcket ?: (id: string) => Promise<void>;
    commentsData : TicketCommentData
}