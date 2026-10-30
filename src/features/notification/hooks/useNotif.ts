import { useGetNotifCount } from "../services/query.service";


export default function useNotif() {
    const notifCount = useGetNotifCount();
    
    return {
        notifCounts : notifCount.data
    }
}