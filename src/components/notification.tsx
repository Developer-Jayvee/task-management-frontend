import { Button } from "@base-ui/react";
import { Bell, CheckCheck,Ticket } from "lucide-react";
import { Badge } from "./ui/badge";
import { useNotificationContext } from "@/contexts/NotificationContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useNotifStore } from "@/stores/useNotifStore";


export default function NotificationComponent() {
  const notifData = useNotificationContext();
  const notifStore = useNotifStore((state) => state.unread);
  
  return (
    <DropdownMenu>
      <div className="flex items-center">
        <div className="relative">
          <DropdownMenuTrigger
            render={
              <Button className="relative cursor-pointer">
                <Bell />
              </Button>
            }
          />
          <Badge
            className="absolute -top-2 -right-2 h-5 min-w-5 rounded-full 
              bg-red-500 text-white border-2 border-background 
              flex items-center justify-center px-1 text-xs"
          >
            {notifData?.notifCount ?? 0}
          </Badge>
          <DropdownMenuContent
            className="w-90 max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl p-0 shadow-xl"
            align="end"
            sideOffset={10}
          >
            <div className="flex items-center justify-between border-b px-4 py-3.5">
              <div>
                <h2 className="text-sm font-semibold tracking-normal normal-case">Notifications</h2>
                <p className="mt-0.5 text-xs font-normal tracking-normal text-muted-foreground normal-case">
                  Stay up to date with your workspace
                </p>
              </div>
              <button
                onClick={() => notifData?.markAllRead()}
                type="button"
                disabled={notifStore === 0}
                className={`
                  ${notifStore === 0 ? 'text-gray-500!' : 'hover:bg-accent'}
                  flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium tracking-normal text-primary transition-colors  normal-case
                  `}
              >
                <CheckCheck className="size-3.5" />
                Mark all read
              </button>
            </div>

            <div className="max-h-90 overflow-y-auto py-1">
              {typeof notifData?.notifications === 'object' && notifData?.notifications.map((notification,index) => {

                return ( 
                  <DropdownMenuItem
                    key={index}
                    className="h-auto items-start gap-3 rounded-none px-4 py-3 text-left tracking-normal normal-case focus:bg-accent/70"
                  >
                    <span className={`mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-600 dark:bg-violet-950 dark:text-violet-300`}>
                      <Ticket className="size-4" />
                    </span>
                    <span className="min-w-0 flex-1 whitespace-normal">
                      <span className="flex items-start justify-between gap-2">
                        <span className="text-xs font-semibold leading-4">{notification.title}</span>
                        {!notification.is_read && (
                          <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" aria-label="Unread" />
                        )}
                      </span>
                      <span className="mt-1 block text-xs font-normal leading-4 text-muted-foreground">
                        {notification.message}
                      </span>
                      <span className="mt-1.5 block text-[11px] font-normal text-muted-foreground/80">
                        {notification.created_at}
                      </span>
                    </span>
                  </DropdownMenuItem>
                );
              })}
            </div>

            <div className={`${notifData?.notificationPagination?.next_page_url === null ? 'hidden' : ''} border-t p-2`} >
              <button
                onClick={() => {
                  notifData?.setPerPage(prev => prev + 5);
                }}
                type="button"
                className="w-full rounded-md py-2 text-center text-xs font-medium tracking-normal text-muted-foreground transition-colors hover:bg-accent hover:text-foreground normal-case"
              >
                View all notifications
              </button>
            </div>
          </DropdownMenuContent>
        </div>
      </div>
    </DropdownMenu>
  );
}
