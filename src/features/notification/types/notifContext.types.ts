import type { NotificationsData } from "./api.types";


export interface NotificationContextData {
    notifications: Array<NotificationsData>;
    notifCount: number;
    fetchNotifications:() => void;
}