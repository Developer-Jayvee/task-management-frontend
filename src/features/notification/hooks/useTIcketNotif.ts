import { useEchoNotification } from "@laravel/echo-react"

export default function useTicketNotif({ memberId } : { memberId : string }) {
    
    return useEchoNotification(
        `App.Models.User.${memberId}`,
        (notification) => {
            console.log(notification)
        }
    )
}