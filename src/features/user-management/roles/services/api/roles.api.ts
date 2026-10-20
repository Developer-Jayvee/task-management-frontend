import http from "@/lib/axios"


const PREFIX = 'role';
export const roleListAPI = async () => {
    const response = await http.get(PREFIX);
    return response?.data;
}

export const deleteRoleAPI = async ({ roleId } : { roleId : string; }) => {
    const response = await http.delete(`${PREFIX}/${roleId}/delete`);
    return response?.data;
}