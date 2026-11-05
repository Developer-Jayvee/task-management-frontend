import type { Dispatch, SetStateAction } from "react";
import type { NotificationsData } from "./api.types";
import type {  PaginationMetaData } from "@/features/common/types/paginationTypes";

export type NotificationPaginationData = PaginationMetaData; 
export interface NotificationContextData {
    notifications: Array<NotificationsData>;
    notifCount: number;
    fetchNotifications:() => void;
    setPerPage: Dispatch<SetStateAction<number>>;
    notificationPagination:NotificationPaginationData;
    markAllRead: () => Promise<void>;
}