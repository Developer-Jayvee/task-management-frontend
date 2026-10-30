import { useAuthStore } from "@/stores/useAuthStore";
import { useEchoNotification } from "@laravel/echo-react"
import { type Dispatch, type SetStateAction } from "react";
import type { NotificationData } from "../types/notif.types";

export default function useTicketNotif({ setNotifs }: { setNotifs: Dispatch<SetStateAction<Array<NotificationData>>> }) {
    const authStore = useAuthStore((state) => state.userData);
    const memberId = authStore?.id ?? "";
    if (memberId === "") return null;

    return useEchoNotification(
        `App.Models.User.${memberId}`,
        (notification: NotificationData) => {
            
            setNotifs(prev => {
                const exists = prev.some(
                    notif => notif.id === notification.id
                );
                if (exists) return prev;
                return [...prev, notification];
            });
        }
    );
    
}