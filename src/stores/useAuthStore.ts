
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthStoreI, AuthStoreMemberData, AuthStoreTenantData, AuthStoreUserData } from './types/authStoreTypes';
export const useAuthStore = create(
  persist<AuthStoreI>(
    (set) => ({
      userData: undefined,
      setUserData: (userData: AuthStoreUserData<AuthStoreMemberData<AuthStoreTenantData>>) => set({ userData }),
      clearUserData: () => {
        set({ userData: undefined })
        useAuthStore.persist.clearStorage();
      }
    }),
    {
      name:"auth-store"
    }
  )
)


