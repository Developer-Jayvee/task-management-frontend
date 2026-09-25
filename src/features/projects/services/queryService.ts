import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createProject, deleteProject, getProjects, getProjectTickets, viewProject } from "./api/project-api"


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

export const getProjectsQuery = () => {
    return useQuery({
        queryKey : ['project-list'],
        queryFn: getProjects
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

export const getProjectTicketsQuery = (projectId : string) => {
    return useQuery({
        queryKey: ['project-tickets',projectId],
        queryFn: () => getProjectTickets(projectId),
        enabled: false
    })
}