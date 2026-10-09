import { TicketViewContextProvider } from "@/contexts/TicketViewContext";
import useTicketView from "@/features/tickets/hooks/useTicketView";
import type { TicketResponseData } from "@/features/tickets/types/ticket-types";



export default function TicketBaseView({ children } : { children : React.ReactNode; }) {

    const {
        setSelectedTicket,
        details,
        selected,
        deleteTicketConfirm
    } = useTicketView();
    return <TicketViewContextProvider data={{
        data: details as TicketResponseData,
        setSelectedTicket,
        ticketSelected: selected,
        deleteTicketConfirm
    }}>
        <>
            {children}
        </>
    </TicketViewContextProvider>

}