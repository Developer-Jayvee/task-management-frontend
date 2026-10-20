import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPermissionsAPI, updatePermissionAPI } from "./api/permissions.api";
import type { UpdatePermissionData } from "../types/hook.types";

export const getPermissionQuery = ({ role } : { role ?: "owner" | "member"; }) => useQuery({
    queryKey:['permission-list', role],
    queryFn: () =>  getPermissionsAPI({ role }),
    enabled: !!role
})
export const updatePermissionMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ role , permission_ids}: UpdatePermissionData ) => updatePermissionAPI({ role , permission_ids}),
        onSuccess: (_data, variables) => queryClient.invalidateQueries({
            queryKey: ['permission-list', variables.role],
        }),
    });
}