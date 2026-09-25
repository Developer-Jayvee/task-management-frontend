import { useQuery } from "@tanstack/react-query"
import { getAssignees } from "./api/user-api"


export const getAssgineeQuery = () => {
    return useQuery({
        queryKey: ['assignee-list'],
        queryFn: getAssignees,
        enabled: false
    });
}