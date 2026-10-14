import http from "@/lib/axios"
import type { ResetPasswordAPIData } from "../../types/resetPassword.types"


export const resetPasswordAPI = async (data : ResetPasswordAPIData) => {
    const response = await http.post('auth/reset-password',data);
    return response?.data;
}