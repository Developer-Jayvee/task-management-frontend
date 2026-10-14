import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useUserContext } from "@/contexts/UserContext";
import { CirclePause, CirclePlay, EllipsisVertical, PencilIcon, ShieldCheck } from "lucide-react";
import { EDIT_USER_MODAL_ID } from "../../data/defaultValues";
import type { UserDataTableData } from "../../types/user-types";



export default function UserTableActions({
  data,
  onChangeStatus
}: {
  data: UserDataTableData;
  onChangeStatus: ({  status } : { status: "activate"|"deactivate"}) => void;
}) {
 const {  setOpen,setModalId,setSelectedUser } =
    useUserContext();
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
            onClick={() => {
              setOpen?.(true);
              setModalId?.(EDIT_USER_MODAL_ID);
              setSelectedUser?.(data)
            }}
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
            onClick={() => onChangeStatus({ status: !data.is_active ? 'activate' : 'deactivate'})}
            variant="ghost"
            className="w-full justify-start text-destructive hover:text-destructive"
          >
            {
              data.is_active ? (<><CirclePause className="mr-2 size-4" /> Deactivate</>) :
              (<><CirclePlay className="mr-2 size-4" />Activate </>)
            }
          </Button>
        </PopoverContent>
      </Popover>
    </>
  );
}
