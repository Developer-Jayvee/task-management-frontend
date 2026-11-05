import { useState } from "react";
import { useGetNotifCount, useGetNotifications, useMarkAllReadMutation } from "../services/query.service";

const INITIAL_PERPAGE = 4;

export default function useNotif() {
    const [perPage,setPerPage] = useState<number>(INITIAL_PERPAGE);
    const notifCount = useGetNotifCount();
    const notifications = useGetNotifications({ perPage })
    const mutateAllRead = useMarkAllReadMutation();


    const markAllRead = async () => {
        try {
            await mutateAllRead.mutateAsync();
            await notifications.refetch()
        } catch (error) {
            console.warn('Error marking all read notification.');
        }
    }
    const resetPagination = () => setPerPage(INITIAL_PERPAGE);
    
    return {
        notifCounts : notifCount.data,
        notifications : notifications.data,
        fetchNotifications : () => {
            notifications.refetch()
        },
        setPerPage,
        markAllRead,
        resetPagination
    }
}