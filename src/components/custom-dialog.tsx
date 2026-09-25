import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import type { CustomDialogI } from "@/features/common/types/componentTypes";
import { Button } from "./ui/button";

export function CustomDialog({
  children,
  buttonElement,
  open,
  setOpen,
}: CustomDialogI) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={
        <Button variant="default" >
          {buttonElement}
        </Button>
      } />
      {children}
    </Dialog>
  );
}
