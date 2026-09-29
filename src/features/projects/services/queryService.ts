import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createProject, deleteProject, getProjects, getProjectTickets, viewProject } from "./api/project-api"
import type { TicketStatus } from "@/features/tickets/types/ticket-types";


export const createProjectQuery = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createProject,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['project-list']
            })
        }
    });
}

export const getProjectsQuery = ({ search , sort } : { search ?: string; sort ?: "asc" | "desc"}) => {
    return useQuery({
        queryKey : ['project-list',search,sort],
        queryFn: () => getProjects(search,sort)
    })
}
export const getProjectQuery = (id : string) => {
    return useQuery({
        queryKey: ['project',id],
        queryFn: () => viewProject(id)
    });
}


export const deleteProjectQuery = () => {
    return useMutation({
        mutationFn: ({ id } : {id : string;}) => deleteProject(id),
    });
}

export const getProjectTicketsQuery = (projectId : string|undefined|null , status ?: TicketStatus) => {
    return useQuery({
        queryKey: ['project-tickets',projectId,status],
        queryFn: () => getProjectTickets(projectId,status),
    })
}