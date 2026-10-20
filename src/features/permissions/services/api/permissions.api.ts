import http from "@/lib/axios"
import type { UpdatePermissionData } from "../../types/hook.types";

const PREFIX = 'permission'
export const getPermissionsAPI = async ({ role } : { role ?: "owner" | "member"; }) => {
    const response = await http.get(`${PREFIX}/list`, { params: { role }});
    return response?.data;
}

export const updatePermissionAPI = async ({ role , permission_ids } : UpdatePermissionData) => {
    const formData = {
        role,
        permission_ids
    }
    const response = await http.post(`${PREFIX}/update`,formData);
    return response?.data
}