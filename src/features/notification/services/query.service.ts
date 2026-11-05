import { useMutation, useQuery } from "@tanstack/react-query";
import { getNotificationCounts, getNotifications, markAllNotifications } from "./api/notification.api";

export const useGetNotifCount = () =>
  useQuery({
    queryKey: ["notif-count"],
    queryFn: () => getNotificationCounts(),
  });

export const useGetNotifications = ({ perPage = 5 } : { perPage: number; }) => {
  
  return  useQuery({
    queryKey: ["notif-list",perPage],
    queryFn: () => getNotifications({ perPage }),
  });
}

export const useMarkAllReadMutation = () => {
  return useMutation({
    mutationFn: () => markAllNotifications()
  })
}
 
