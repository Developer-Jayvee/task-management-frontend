import useTicketNotif from "@/features/notification/hooks/useTIcketNotif";
import type { NotificationContextData } from "@/features/notification/types/notifContext.types";
import type { NotificationData } from "@/features/notification/types/notif.types";
import React, { createContext, useContext, useEffect, useState } from "react";
import useNotif from "@/features/notification/hooks/useNotif";
import { useNotifStore } from "@/stores/useNotifStore";

export const NotificationContext =
  createContext<NotificationContextData | null>(null);
export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (context === null) {
    console.warn("Context is out of scope.");
    return;
  }
  return context;
};
export const NotificationContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const notifStore = useNotifStore((state) => state.unread);
  const setUnreads = useNotifStore((state) => state.replaceUnreads);
  const [notifs, setNotifs] = useState<Array<NotificationData>>([]);
  const { notifCounts } = useNotif();
  useTicketNotif({ setNotifs });

  useEffect(() => {
    if (notifCounts) {
      setUnreads(notifCounts.unread);
    }
  }, [notifCounts]);
  return (
    <NotificationContext.Provider
      value={{
        notifCount: notifStore,
        notifications: notifs,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
