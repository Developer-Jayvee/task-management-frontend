import { useQuery } from "@tanstack/react-query";
import { logoutRequest } from "../services/api/auth-api";


export default function useLogout() {

    return useQuery({
        queryKey:['logout-user'],
        queryFn: logoutRequest,
        enabled:false
        
    })
}