import type { UserFormData } from "@/features/auth/types/authTypes";


export interface AuthStoreI {
  userData?: UserFormData;
  setUserData?: (userData: UserFormData) => void;
  clearUserData?: () => void;
}
