import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRoleContext } from "@/contexts/RolePageContext";
import { AccessibilityIcon, EllipsisVertical, Trash2 } from "lucide-react";
export default function VerticalOptions({ role }: { role ?: "owner" | "member"}) {
  const { setOpen, setSelectedRole } = useRoleContext();
  return (
    <>
      <Popover>
        <PopoverTrigger
          render={
            <Button variant="ghost" size="icon">
              <EllipsisVertical />
            </Button>
          }
        />
        <PopoverContent align="end" className="w-45 p-1">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => {
              setOpen(true);
              setSelectedRole(role)
            }}
          >
            <AccessibilityIcon className="mr-2 size-4" />
            Permissions
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start text-destructive hover:text-destructive"
          >
            <Trash2 className="mr-2 size-4" />
            Delete
          </Button>
        </PopoverContent>
      </Popover>
    </>
  );
}
