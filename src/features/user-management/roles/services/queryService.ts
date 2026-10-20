import { useQuery } from "@tanstack/react-query";
import { roleListAPI } from "./api/roles.api";


export const useGetRoleList = () => useQuery({
    queryKey:['role-list'],
    queryFn: roleListAPI
})