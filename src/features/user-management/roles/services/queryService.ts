import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteRoleAPI, roleListAPI } from "./api/roles.api";


export const useGetRoleList = () => useQuery({
    queryKey:['role-list'],
    queryFn: roleListAPI
})

export const useDeleteRoleMutation = () => useMutation({
    mutationFn: ({ roleId }: { roleId : string; }) => deleteRoleAPI({ roleId })
})