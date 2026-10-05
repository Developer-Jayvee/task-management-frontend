import type { ProjectCardI } from "@/features/projects/types/projectTypes";


export interface TicketStoreData {
    ticketList : ProjectCardI[] | [];
    setTicketList : (ticketList : ProjectCardI[] | []) => void;
}