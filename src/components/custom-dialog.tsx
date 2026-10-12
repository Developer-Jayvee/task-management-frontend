import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import type { CustomDialogI } from "@/features/common/types/componentTypes";
import { Button } from "./ui/button";

export function CustomDialog({
  children,
  buttonElement,
  open,
  setOpen,
  hasTriggerBtn = true,
  buttonElementCallBack
}: CustomDialogI) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {hasTriggerBtn && (
        <DialogTrigger
          render={<Button variant="default" onClick={() => buttonElementCallBack?.()}>{buttonElement}</Button>}
        />
      )}
      {children}
    </Dialog>
  );
}
