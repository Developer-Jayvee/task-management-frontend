import { toast } from "react-toastify";
import { getPermissionQuery, updatePermissionMutation } from "../services/queryService";
import type { UpdatePermissionData } from "../types/hook.types";
import type { PermissionData } from "../types/data.types";
import { useMemo } from "react";

const formatPermission = (data : Array<PermissionData>): Record<string,Array<PermissionData>> => {
    return data.reduce<Record<string, Array<PermissionData>>>((response, permission) => {
        (response[permission.label] ??= []).push(permission);
        return response;
    }, {});
}

export default function usePermissions(role?: "owner" | "member") {
    const getPermissions = getPermissionQuery({ role });
    const updatePermission = updatePermissionMutation();
    const permissionList = useMemo(
        () => formatPermission(getPermissions.data ?? []),
        [getPermissions.data]
    );

    const updatePermissionCallback = async ({role , permission_ids} : UpdatePermissionData) => {
        try {
            await updatePermission.mutateAsync({ role , permission_ids});
            toast.success('Updated permission successfully');
            return true;
        } catch (error) {
            toast.error('Error occured upon updating permissions');
            console.warn('Error in:',error);
            return false;
        }
    }

    return {
        permissionList,
        updatePermissionCallback,
        isUpdating: updatePermission.isPending,
        isLoading: getPermissions.isLoading,
        hasError: getPermissions.isError,
    };
}