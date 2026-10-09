import type { TicketResponseData } from "./ticket-types";


export interface TicketViewContextI  {
    data ?: TicketResponseData;
    setSelectedTicket ?: (id ?: string) => void;
    ticketSelected ?: string;
    deleteTicketConfirm ?: () => void;
}