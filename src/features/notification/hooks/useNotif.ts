import { useState } from "react";
import { useGetNotifCount, useGetNotifications } from "../services/query.service";


export default function useNotif() {
    const [perPage,setPerPage] = useState<number>(4);
    const notifCount = useGetNotifCount();
    const notifications = useGetNotifications({ perPage })
    
    
    return {
        notifCounts : notifCount.data,
        notifications : notifications.data,
        fetchNotifications : () => {
            notifications.refetch()
        },
        setPerPage
    }
}