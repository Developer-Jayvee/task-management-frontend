import type { QueryObserverResult } from "@tanstack/react-query";


export interface NotifiCountAPIData {
    read: number;
    unread: number;
}

export interface NotificationsData { 
    id: string;
    type: string;
    title: string;
    message: string;
    is_read: boolean;
    created_at: string;
}

export type NotificationRefetch  = Promise<QueryObserverResult<NotificationsData[],Error>>