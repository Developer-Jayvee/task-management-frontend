import { useQueryClient } from "@tanstack/react-query";
import { useTransitionQuery } from "../services/pipelineService";
import type { TicketStatus } from "../types/ticket-types";


export default function usePipeline() {

    const queryClient = useQueryClient();
    const query = useTransitionQuery();
    const { isSuccess , isPending , isError } = query;
    
    const transition = async (id: string ,status : TicketStatus) => {
        try {
            await query.mutateAsync({ id , status });

            // await queryClient.invalidateQueries({
            //     queryKey: ['project-tickets',data?.ticket?.project_id]
            // })
        } catch (error) {
            console.warn('Error found in', error);
        }
    }

    return { 
        isSuccess,
        isPending,
        isError,
        transition 
    }
}