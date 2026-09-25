import z from 'zod';

export const loginSchema = z.object({
    email : z.email(),
    password : z.string().min(8,"Minimum password is 8 characters") 
});

export const registerSchema = z.object({
    name : z.string(),
    email : z.email(),
    password: z.string().min(8,"Password must not be less than 8 characters"),
    cpassword: z.string(),
    company: z.string()
})
.refine((data) => data.password === data.cpassword, {
    message : "Password do not match",
    path: ['cpassword']
})

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;

export interface UserFormData {
    id : string;
    name: string;
    email : string;
}

export interface MemberFormData {
    id: string;
    role : string;
    user: UserFormData
}