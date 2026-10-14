import z from "zod";


export const resetPasswordSchema = z.object({
    password: z.string().min(8,"Password must be more than 8 characters"),
    password_confirmation: z.string().min(8,"Password must be more than 8 characters"),
})
.refine((data) => data.password === data.password_confirmation, {
    message : "Password do not match",
    path: ['password_confirmation']
})


export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;


export interface ResetPasswordAPIData extends ResetPasswordData{
    token : string;
    email : string;
}