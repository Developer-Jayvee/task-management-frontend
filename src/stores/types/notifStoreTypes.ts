

export interface NotificationStoreData {
    read: number;
    unread: number;
    setRead: (n : number) => void;
    setUnread: (n : number) => void;
    replaceUnreads: (unread: number) => void;
}