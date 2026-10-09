import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CirclePause, CirclePlay, EllipsisVertical, PencilIcon, ShieldCheck } from "lucide-react";



export default function UserTableActions({
  status,
  onChangeStatus
}: {
  status: boolean;
  onChangeStatus: ({  status } : { status: "activate"|"deactivate"}) => void;
}) {
  console.log(status);
  
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
          >
            <PencilIcon className="mr-2 size-4" />
            Edit
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
          >
            <ShieldCheck className="mr-2 size-4" />
            Access
          </Button>

          <Button
            onClick={() => onChangeStatus({ status: !status ? 'activate' : 'deactivate'})}
            variant="ghost"
            className="w-full justify-start text-destructive hover:text-destructive"
          >
            {
              status ? (<><CirclePause className="mr-2 size-4" /> Deactivate</>) :
              (<><CirclePlay className="mr-2 size-4" />Activate </>)
            }
          </Button>
        </PopoverContent>
      </Popover>
    </>
  );
}
