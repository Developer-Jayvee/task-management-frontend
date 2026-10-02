import type { UserFormData } from "@/features/auth/types/authTypes";


export interface AuthStoreI {
  userData?: AuthStoreUserData<AuthStoreMemberData<AuthStoreTenantData>>;
  setUserData?: (userData: UserFormData) => void;
  clearUserData?: () => void;
}


export interface AuthStoreUserData<M = any> {
  id: string;
  name: string;
  email: string;
  member?: M;
}
export interface AuthStoreMemberData<T = any> {
  id: string;
  user_id: string;
  tenant_id: string;
  role: "owner" | "member" | "admin";
  tenant?: T;
}

export interface AuthStoreTenantData {
  id: string;
  name: string;
  slug: string;
  plan: string;
}
