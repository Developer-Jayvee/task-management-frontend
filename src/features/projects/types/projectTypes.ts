import type { MemberFormData } from "@/features/auth/types/authTypes";
import type { PaginationData } from "@/features/common/types/paginationTypes";
import type { TicketDataTableData, TicketResponseData, TicketStatus } from "@/features/tickets/types/ticket-types";
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
    confirmProject ?: SubmitHandler<ProjectFormData>;
    setProjectForm ?: (data : ProjectFormData) => void;
    deleteProject ?: (id : string) => void;
    searchProject ?: (search ?: string) => void;
    sortProject ?: (sort ?: "asc"|"desc") => void;
}

export interface ProjectContextI {
    fetchList ?: () => void;
    ticketList : TicketResponseData[] | [];
    projectData ?: ProjectDataI;
    open ?: boolean;
    setOpen ?: Dispatch<SetStateAction<boolean>>;
    assigneeList ?: MemberFormData[];
}

export interface ProjectDataI {
    id : string;
    tenant_id : string;
    name: string;
    description ?: string;
    tickets: Array<TicketResponseData>;
}

export interface ProjectViewContextI {
    data_table_config: {
        data: TicketDataTableData[],
        isLoading : boolean;
        updatePage : (page : number|null, perPage : number|null) => void; 
        page: number;
        perPage: number;
        paginationData ?: PaginationData<TicketDataTableData[]>;
    };
    currentTabStatus: 'all' | TicketStatus;
}