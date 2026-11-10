import { TicketViewContextProvider } from "@/contexts/TicketViewContext";
import useComment from "@/features/comments/hooks/useComment";
import useTicketView from "@/features/tickets/hooks/useTicketView";
import type { TicketResponseData } from "@/features/tickets/types/ticket-types";



export default function TicketBaseView({ children } : { children : React.ReactNode; }) {

    const {
        setSelectedTicket,
        details,
        selected,
        deleteTicketConfirm,
        onUpdateTIcket
    } = useTicketView();

    const { 
        setPerPage,
        setTicketId,
        createComment,
        updateComment,
        commentsQuery
    } = useComment();
    return <TicketViewContextProvider data={{
        data: details as TicketResponseData,
        setSelectedTicket,
        ticketSelected: selected,
        deleteTicketConfirm,
        onUpdateTIcket,
        commentsData: {
            setPerPage,
            setTicketId,
            createComment,
            updateComment,
            commentsQuery
        }
    }}>
        <>
            {children}
        </>
    </TicketViewContextProvider>

}