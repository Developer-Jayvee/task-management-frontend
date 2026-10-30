import { useQuery } from "@tanstack/react-query";
import { getNotificationCounts } from "./api/notification.api";

export const useGetNotifCount = () =>
  useQuery({
    queryKey: ["notif-count"],
    queryFn: () => getNotificationCounts(),
  });
