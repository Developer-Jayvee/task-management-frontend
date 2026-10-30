import { useAuthStore } from "@/stores/useAuthStore";
import { useEchoNotification } from "@laravel/echo-react"

export default function useTicketNotif() {
    const authStore = useAuthStore((state) => state.userData);
    const memberId = authStore?.id ?? "";

    
    return useEchoNotification(
        `App.Models.User.${memberId}`,
        (notification) => {
            console.log(notification)
        }
    )
}