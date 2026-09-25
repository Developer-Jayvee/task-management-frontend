import type { MemberFormData } from "@/features/auth/types/authTypes";
import type { SubmitHandler } from "react-hook-form";
import type { TicketFormData } from "./ticket-types";


export interface TicketComponentTypes {
    assigneeList: MemberFormData[];
    submitForm : SubmitHandler<TicketFormData>;
}