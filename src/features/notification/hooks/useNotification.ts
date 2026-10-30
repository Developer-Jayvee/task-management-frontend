import useTicketNotif from "./useTIcketNotif";


export default function useNotification() {
    const ticketNotif = useTicketNotif();
    return {
        ticketNotif
    }
}