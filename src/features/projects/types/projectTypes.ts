import type { MemberFormData } from "@/features/auth/types/authTypes";
import type { PaginationData } from "@/features/common/types/paginationTypes";
import type {
  TicketDataTableData,
  TicketFormData,
  TicketResponseData,
  TicketStatus,
} from "@/features/tickets/types/ticket-types";
import type { Dispatch, SetStateAction } from "react";
import type { SubmitHandler, UseFormReturn } from "react-hook-form";
import z from "zod";

export const projectSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Project name is required."),
  description: z.string().optional(),
});

export type ProjectFormData = z.infer<typeof projectSchema>;

export interface ProjectCardI {
  id: string;
  name: string;
  description?: string;
  created_at: string;
}

export interface ProjectCardContextI {
  projectList?: Array<ProjectCardI>;
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  projectForm?: UseFormReturn<ProjectFormData>;
  submitForm?: SubmitHandler<ProjectFormData>;
  confirmProject?: SubmitHandler<ProjectFormData>;
  setProjectForm?: (data: ProjectFormData) => void;
  deleteProject?: (id: string) => void;
  searchProject?: (search?: string) => void;
  sortProject?: (sort?: "asc" | "desc") => void;
}

export interface ProjectContextI {
  data ?: ProjectDataI;
  setSelectedProject ?: (id ?: string) => void;
}

export interface ProjectDataI {
  id: string;
  tenant_id: string;
  name: string;
  description?: string;
}

export interface ProjectViewContextI {
  data_table_config: {
    data: TicketDataTableData[];
    isLoading: boolean;
    updatePage: (page ?: number , perPage ?: number) => void;
    page ?: number;
    perPage ?: number;
    paginationData?: PaginationData<TicketDataTableData[]>;
    refetchTableData ?: () => void;
  };
  form_config: {
    ticketForm?: UseFormReturn<TicketFormData>;
    confirmPrompt?: ({ data,id }: { data: TicketFormData; id?: string; }) => void;
    updateFormSubmit?: ({ id, data }: { id: string; data: TicketFormData; }) => void;
    createFormSubmit?: SubmitHandler<TicketFormData>;
    isFormSuccess ?: boolean;
    isFormError ?: boolean;
  };
  modal_config : {
    open : boolean;
    setOpen : Dispatch<SetStateAction<boolean>>;
  }
  assignees ?: MemberFormData[];
  currentTabStatus: "all" | TicketStatus;
  projectData ?: {
    id: string;
    tenant_id: string;
    name: string;
    description?: string;
  };
}
