import type { UserFormData } from "@/features/auth/types/authTypes";

type Roles = "owner" | "member" | "admin";
export interface UserResponseData {
  id: string;
  user_id: string;
  tenant_id: string;
  role: Roles;
  user: UserFormData;
}

export interface UserDataTableData {
  user_id: string;
  name : string;
  email: string;
  role : Roles;
  created_at : string;
}
