import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";

export default function UserTableActions() {
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

        <PopoverContent align="end" className="w-40 p-1">
          <Button
            variant="ghost"
            className="w-full justify-start"
            // onClick={() => setProjectForm?.(data)}
          >
            <Pencil className="mr-2 size-4" />
            Edit
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start text-destructive hover:text-destructive"
            // onClick={() => onDelete(data.id)}
          >
            <Trash2 className="mr-2 size-4" />
            Delete
          </Button>
        </PopoverContent>
      </Popover>
    </>
  );
}
