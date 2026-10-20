import { useState } from "react";
import { useDeleteRoleMutation, useGetRoleList } from "../services/queryService";
import type { RoleListData } from "../types/context.types";
import { toast } from "react-toastify";


export default function useRole() {
    const getRolesQuery = useGetRoleList();
    const roleList = getRolesQuery.data as Array<RoleListData>;
    const deleteRole = useDeleteRoleMutation();
    const [open,setOpen] = useState<boolean>(false);
    const [selectedRole,setSelectedRole] = useState<"owner"|"member"|undefined>(undefined)


    const deleteRoleCallback = async (roleId ?: string) => {
        try {
            if(! roleId) return;
            deleteRole.mutateAsync({ roleId });
            
            if(deleteRole.isError) {
                toast.error(deleteRole.error.message);
                return;
            }
            
            toast.success('Successfully role deleted');
        } catch (error) {
            toast.error('Error found in query');
            console.warn('Error found in',error);
            
        }
    }
    return { 
        list: roleList,
        open,setOpen,
        selectedRole, setSelectedRole,
        deleteRoleCallback
    };
}