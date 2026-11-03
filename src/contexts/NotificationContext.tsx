import useTicketNotif from "@/features/notification/hooks/useTIcketNotif";
import type { NotificationContextData } from "@/features/notification/types/notifContext.types";
import type { NotificationData } from "@/features/notification/types/notif.types";
import React, { createContext, useContext, useEffect, useState } from "react";
import useNotif from "@/features/notification/hooks/useNotif";
import { useNotifStore } from "@/stores/useNotifStore";
import type { NotificationsData } from "@/features/notification/types/api.types";

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
  const [notifs,setNotifs] = useState<NotificationsData[]>([]);
  const notifStore = useNotifStore((state) => state.unread);
  const setUnreads = useNotifStore((state) => state.replaceUnreads);
  const { notifCounts,notifications, fetchNotifications } = useNotif();
  const ticketNotif = useTicketNotif({ setNotifs });

  useEffect(() => {
    if (notifCounts) {
      setUnreads(notifCounts.unread);
    }
  }, [notifCounts]);
  useEffect(() => {
    setNotifs(notifications);
  },[notifications])
  return (
    <NotificationContext.Provider
      value={{
        notifCount:  notifStore ?? 0, 
        notifications: notifs ?? [],
        fetchNotifications
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
