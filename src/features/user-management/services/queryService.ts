import { useQuery } from "@tanstack/react-query"
import { generateLinkAPI, tenantMembersAPI, verifyLinkAPI } from "./api/user-api"



export const verifyLinkQuery = (link ?: string) => {
    return useQuery({
        queryKey: ['link-verify',link],
        queryFn: () => verifyLinkAPI(link),
        enabled:false
    });
}

export const generateLinkQuery = () => {
    return useQuery({
        queryKey: ['link-generate'],
        queryFn: generateLinkAPI,
        enabled: false
    });
}

export const tenantMembersQuery = () => {
    return useQuery({
        queryKey:['tenant-members'],
        queryFn: tenantMembersAPI,
    });
}