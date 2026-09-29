import { useQuery } from "@tanstack/react-query"
import { generateLinkAPI, tenantMembersAPI, verifyLinkAPI } from "./api/user-api"



export const verifyLinkQuery = (link ?: string) => {
    if(! link) return null;
    return useQuery({
        queryKey: ['link-verify',link],
        queryFn: () => verifyLinkAPI(link)
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
        queryFn: tenantMembersAPI
    });
}