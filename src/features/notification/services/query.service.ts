import { useQuery } from "@tanstack/react-query";
import { getNotificationCounts, getNotifications } from "./api/notification.api";

export const useGetNotifCount = () =>
  useQuery({
    queryKey: ["notif-count"],
    queryFn: () => getNotificationCounts(),
  });

export const useGetNotifications = () =>
  useQuery({
    queryKey: ["notif-list"],
    queryFn: () => getNotifications(),
  });
