import type { UserFormData } from "@/features/auth/types/authTypes";

type Roles =  "owner" | "member" | "admin"
export interface UserResponseData { 
    id : string;
    user_id : string;
    tenant_id : string;
    role:Roles;
    user: UserFormData;
}