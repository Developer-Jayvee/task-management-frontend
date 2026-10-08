import type { TicketViewContextI } from "@/features/tickets/types/ticketContextTypes";
import { createContext, useContext } from "react";


export const TicketViewContext = createContext<TicketViewContextI>({});
export const useTicketViewContext = () => {
    const context = useContext(TicketViewContext);
    if(! context) throw new Error("Context is out of scope.");
    return context;
}
export const TicketViewContextProvider = ({
    children,
    data
} : {
    children : React.ReactNode;
    data : TicketViewContextI;
}) => <TicketViewContext.Provider value={data}>{children}</TicketViewContext.Provider>

