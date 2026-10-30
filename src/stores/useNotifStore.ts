import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { NotificationStoreData } from "./types/notifStoreTypes";

export const useNotifStore = create(
  persist<NotificationStoreData>(
    (set) => ({
      read: 0,
      unread: 0,
      appendUnread: () => set((state) => ({ unread: state.unread + 1 })),
      appendRead: () => set((state) => ({ read: state.read + 1 })),
      replaceUnreads: (unread: number) => set({ unread }),
    }),
    { name: "notif-count" },
  ),
);
