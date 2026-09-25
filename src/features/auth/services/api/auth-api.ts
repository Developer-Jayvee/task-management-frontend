import http from "@/lib/axios"
import type { LoginFormData, RegisterFormData } from "../../types/authTypes";
import axios from "axios";




export const loginRequest = async (data : LoginFormData) => {
    const response = await http.post('/auth/login', data);

    return response?.data
}


export const registerRequest = async (data: RegisterFormData) => {
    const response = await http.post('/auth/register',data);

    return response?.data;
}

export const registerDevice = async () => {
    const response = await axios.get(`${import.meta.env.VITE_DOMAIN_URL}/sanctum/csrf-cookie`);
    return response?.data;
}

export const logoutRequest = async () => {
      const response = await http.get('/auth/logout');

    return response?.data;
}