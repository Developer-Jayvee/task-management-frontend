import http from "@/lib/axios"


export const getAssignees = async () => {
    const response = await http.get('assignee');

    return response?.data;
}