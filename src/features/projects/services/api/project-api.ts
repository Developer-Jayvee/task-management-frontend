import http from "@/lib/axios";
import type { ProjectFormData } from "../../types/projectTypes";


const BASE_URL = "project";

export const getProjects = async (search ?: string, sort ?: "asc" | "desc" ) => {
    const response = await http.get(BASE_URL, {params : { search , sort }});

    return response?.data;
}

export const createProject = async (data: ProjectFormData) => {
    const response = await http.post(BASE_URL, data);

    return response?.data;
}

export const updateProject = async (id : string ,data : ProjectFormData) => {
    const response = await http.patch(`${BASE_URL}/${id}`,data);

    return response?.data;
}

export  const viewProject = async (id : string) => {
    const response = await http.get(`${BASE_URL}/${id}`);

    return response?.data;
}

export const deleteProject = async (id : string) => {
    const response = await http.delete(`${BASE_URL}/${id}`);

    return response?.data;
}

export const getProjectTickets = async (projectId : string|undefined|null) => {
    const response = await http.get(`project/${projectId}/tickets`);

    return response?.data;
}