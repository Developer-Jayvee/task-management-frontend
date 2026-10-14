import { useMutation } from "@tanstack/react-query"
import { resetPasswordAPI } from "./api/resetPassword.api"
import type { ResetPasswordAPIData } from "../types/resetPassword.types"


export const resetPasswordMutation = () => {
    return useMutation({
        mutationFn: (data : ResetPasswordAPIData) => resetPasswordAPI(data)
    })
}