
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthStoreI } from './types/authStoreTypes';
import type { UserFormData } from '@/features/auth/types/authTypes';
export const useAuthStore = create(
  persist<AuthStoreI>(
    (set) => ({
      userData: undefined,
      setUserData: (userData: UserFormData) => set({ userData }),
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


