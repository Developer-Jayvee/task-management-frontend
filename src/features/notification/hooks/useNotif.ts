import { useGetNotifCount, useGetNotifications } from "../services/query.service";


export default function useNotif() {
    const notifCount = useGetNotifCount();
    const notifications = useGetNotifications()
    return {
        notifCounts : notifCount.data,
        notifications : notifications.data,
        fetchNotifications : () => {
            notifications.refetch()
        }
    }
}