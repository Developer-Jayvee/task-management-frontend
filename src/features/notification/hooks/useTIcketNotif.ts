import { useAuthStore } from "@/stores/useAuthStore";
import { useEchoNotification } from "@laravel/echo-react";
import { type Dispatch, type SetStateAction } from "react";
import type { NotificationData } from "../types/notif.types";
import { useNotifStore } from "@/stores/useNotifStore";

export default function useTicketNotif({
  setNotifs,
}: {
  setNotifs: Dispatch<SetStateAction<Array<NotificationData>>>;
}) {
  const authStore = useAuthStore((state) => state.userData);
  const appendUnread = useNotifStore((state) => state.appendUnread);
  const memberId = authStore?.id ?? "";

  return useEchoNotification(
    `App.Models.User.${memberId}`,
    (notification: NotificationData) => {
      appendUnread()
      setNotifs((prev) => {
        const exists = prev.some((notif) => notif.id === notification.id);
        if (exists) return prev;
       
        return [...prev, notification];
      });
    },
  );
}
