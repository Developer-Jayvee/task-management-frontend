import type { MemberFormData } from "@/features/auth/types/authTypes";
import type { TicketResponseData } from "@/features/tickets/types/ticket-types";
import type { Dispatch, SetStateAction } from "react";
import type { SubmitHandler, UseFormReturn } from "react-hook-form";
import z from "zod";

export const projectSchema = z.object({
    id : z.string().optional(),
    name: z.string().min(1,"Project name is required."),
    description: z.string().optional()
});


export type ProjectFormData = z.infer<typeof projectSchema>;


export interface ProjectCardI {
    id : string;
    name: string;
    description?: string;
    created_at: string;   
}

export interface ProjectCardContextI {
    projectList ?: Array<ProjectCardI>;
    open ?: boolean;
    setOpen ?: Dispatch<SetStateAction<boolean>>;
    projectForm ?: UseFormReturn<ProjectFormData>;
    submitForm ?: SubmitHandler<ProjectFormData>;
    setProjectForm ?: (data : ProjectFormData) => void;
    deleteProject ?: (id : string) => void;
}

export interface ProjectContextI {
    fetchList ?: () => void;
    ticketList : TicketResponseData[] | [];
    open ?: boolean;
    setOpen ?: Dispatch<SetStateAction<boolean>>;
    assigneeList ?: MemberFormData[];
}