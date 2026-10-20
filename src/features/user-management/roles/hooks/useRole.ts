import { useState } from "react";
import { useGetRoleList } from "../services/queryService";
import type { RoleListData } from "../types/context.types";


export default function useRole() {
    const getRolesQuery = useGetRoleList();
    const roleList = getRolesQuery.data as Array<RoleListData>;
    const [open,setOpen] = useState<boolean>(false);
    const [selectedRole,setSelectedRole] = useState<"owner"|"member"|undefined>(undefined)
    return { 
        list: roleList,
        open,setOpen,
        selectedRole, setSelectedRole
    };
}