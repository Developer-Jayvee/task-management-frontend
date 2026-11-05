import useTicketNotif from "@/features/notification/hooks/useTIcketNotif";
import type {
  NotificationContextData,
  NotificationPaginationData,
} from "@/features/notification/types/notifContext.types";
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
  const [notifs, setNotifs] = useState<NotificationsData[]>([]);
  const notifStore = useNotifStore((state) => state.unread);
  const setUnreads = useNotifStore((state) => state.replaceUnreads);
  const {
    notifCounts,
    notifications,
    fetchNotifications,
    setPerPage,
    markAllRead,
    resetPagination
  } = useNotif();
  const ticketNotif = useTicketNotif({ setNotifs });

  useEffect(() => {
    if (notifCounts) {
      setUnreads(notifCounts.unread);
    }
  }, [notifCounts]);
  useEffect(() => {
    setNotifs(notifications?.data);
  }, [notifications]);

  return (
    <NotificationContext.Provider
      value={{
        notifCount: notifStore ?? 0,
        notifications: notifs ?? [],
        fetchNotifications,
        setPerPage,
        notificationPagination:
          notifications as unknown as NotificationPaginationData,
        markAllRead,
        resetPagination,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
