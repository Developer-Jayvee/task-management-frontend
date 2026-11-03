import { useAuthStore } from "@/stores/useAuthStore";
import { useEchoNotification } from "@laravel/echo-react";
import { useNotifStore } from "@/stores/useNotifStore";
import type { Dispatch, SetStateAction } from "react";
import type { NotificationsData } from "../types/api.types";

export default function useTicketNotif({
  setNotifs
}: { setNotifs: Dispatch<SetStateAction<NotificationsData[]>>; }) {
  const authStore = useAuthStore((state) => state.userData);
  const appendUnread = useNotifStore((state) => state.appendUnread);
  const memberId = authStore?.id ?? "";

  return useEchoNotification(
    `App.Models.User.${memberId}`,
    (notification: NotificationsData) => {
      appendUnread()
      const data = {
        ...notification,
        created_at: '1 second ago'
      }
      setNotifs((prev) => [
        data,
        ...prev
      ])
    },
  );
}
