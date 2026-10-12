import { CustomDialog } from "@/components/custom-dialog";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/contexts/UserContext";
import { LockKeyhole } from "lucide-react";
import { EDIT_USER_MODAL_ID } from "../data/defaultValues";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ResetPasswordForm() {
  const { open, setOpen, modalId } = useUserContext();
  
  const handleResetPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
  };
  console.log(modalId);

  if (modalId !== EDIT_USER_MODAL_ID) return null;
  return (
    <CustomDialog
      open={open ?? false}
      setOpen={setOpen ?? (() => {})}
      hasTriggerBtn={false}
      buttonElement={<></>}
    >
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle>Generate Invitation Link</DialogTitle>
          <DialogDescription>
            Generate a unique invitation link that you can share with a user to
            join your organization.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center py-6 text-center">
          {/* Icon */}
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
            <LockKeyhole className="h-7 w-7 text-blue-600" />
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold tracking-tight">Reset Password</h3>

          {/* Description */}
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Click the button below to reset your password. We will send you an
            email with instructions to securely update your password.
          </p>

          {/* Form */}
          <form onSubmit={handleResetPassword} className="mt-6 w-full">
            <Button type="submit" className="w-full">
              Reset Password
            </Button>
          </form>
        </div>
      </DialogContent>
    </CustomDialog>
  );
}
