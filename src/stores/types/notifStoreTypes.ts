

export interface NotificationStoreData {
    read: number;
    unread: number;
    appendRead: () => void;
    appendUnread: () => void;
    replaceUnreads: (unread: number) => void;
    clearNotifCounts: () => void;
}