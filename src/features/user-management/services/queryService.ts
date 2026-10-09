import { useMutation, useQuery } from "@tanstack/react-query"
import { generateLinkAPI, tenantMembersAPI, verifyLinkAPI } from "./api/user-api"



export const verifyLinkQuery = (link ?: string) => {
    return useQuery({
        queryKey: ['link-verify',link],
        queryFn: () => verifyLinkAPI(link),
        retry:false
    });
}

export const generateLinkQuery = () => {
    return useMutation({
        mutationKey: ['link-generate'],
        mutationFn: generateLinkAPI,
    });
}

export const tenantMembersQuery = ({sort,search , perPage ,page} : { sort ?: string; search ?: string; perPage ?: number; page ?: number; }) => {
    return useQuery({
        queryKey:['tenant-members',sort, search,perPage,page],
        queryFn: () =>  tenantMembersAPI({sort ,search, page ,perPage}),
    });
}