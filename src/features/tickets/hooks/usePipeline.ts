import { useTransitionQuery } from "../services/pipelineService";
import type { TicketStatus } from "../types/ticket-types";


export default function usePipeline() {

    const query = useTransitionQuery();
    const { isSuccess , isPending , isError } = query;
    
    const transition = async (id: string ,status : TicketStatus) => {
        try {
            await query.mutateAsync({ id , status });
            
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