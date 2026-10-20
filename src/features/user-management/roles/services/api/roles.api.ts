import http from "@/lib/axios"


const PREFIX = 'role';
export const roleListAPI = async () => {
    const response = await http.get(PREFIX);
    return response?.data;
}