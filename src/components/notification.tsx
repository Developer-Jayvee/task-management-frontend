import { Button } from "@base-ui/react";
import { Bell } from "lucide-react";
import { Badge } from "./ui/badge";
import { useNotificationContext } from "@/contexts/NotificationContext";

export default function NotificationComponent() {
  const notifData = useNotificationContext();
  return (
    <div className="flex items-center">
      <div className="relative">
        <Button className="relative cursor-pointer">
          <Bell />
        </Button>
        <Badge
          className="absolute -top-2 -right-2 h-5 min-w-5 rounded-full 
             bg-red-500 text-white border-2 border-background 
             flex items-center justify-center px-1 text-xs"
        >
          {notifData?.notifCount ?? 0}
        </Badge>
      </div>
    </div>
  );
}
