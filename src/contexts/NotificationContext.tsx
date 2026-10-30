import useTicketNotif from "@/features/notification/hooks/useTIcketNotif";
import type { NotificationContextData } from "@/features/notification/types/notifContext.types";
import type { NotificationData } from "@/features/notification/types/notif.types";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";


export const NotificationContext = createContext<NotificationContextData | null>(null);
export const useNotificationContext = () => {
    const context = useContext(NotificationContext);
    if (context === null) {
        console.warn('Context is out of scope.');
        return;
    }
    return context;
}
export const NotificationContextProvider = ({ children }: {
    children: React.ReactNode;
}) => {
    const [notifs, setNotifs] = useState<Array<NotificationData>>([]);
    const ticketNotifData = useTicketNotif({ setNotifs });

    return <NotificationContext.Provider value={{ 
         notifCount: notifs.length,
        notifications: notifs
     }}>
        {children}
    </NotificationContext.Provider>
}