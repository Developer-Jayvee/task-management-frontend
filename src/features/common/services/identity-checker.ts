import http from "@/lib/axios"


export const identityCheck = async () => {
    const slug = window.location.pathname.split('/')[1];
    const response = await http.get(`identity-check`, {
        params: { slug }
    });

    return response?.data;
}