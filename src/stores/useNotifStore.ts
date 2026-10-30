import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { NotificationStoreData } from "./types/notifStoreTypes";

export const useNotifStore = create(
  persist<NotificationStoreData>(
    (set) => ({
      read: 0,
      unread: 0,
      setUnread: (n: number) => set((state) => ({ unread: state.unread + n })),
      setRead: (n: number) => set((state) => ({ read: state.read + n })),
      replaceUnreads: (unread: number) => set({ unread }),
    }),
    { name: "notif-count" },
  ),
);
