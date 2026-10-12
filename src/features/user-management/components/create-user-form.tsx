import { CustomDialog } from "@/components/custom-dialog";
import LinkGenerationForm from "./form/link-generation-form";
import { useUserContext } from "@/contexts/UserContext";
import { User } from "lucide-react";
import { INVITE_USER_MODAL_ID } from "../data/defaultValues";

export default function CreateUserForm() {
  const { open, setOpen, generateInvitation, generatedLinkData, modalId } =
    useUserContext();

  if(modalId !== INVITE_USER_MODAL_ID) return null;
  return (
    <CustomDialog
      open={open ?? false}
      setOpen={setOpen ?? (() => {})}
      hasTriggerBtn={false}
      buttonElement={
        <>
          <User size={16} /> Invite User
        </>
      }
    >
      <LinkGenerationForm
        link={generatedLinkData?.data}
        onGenerate={async () => await generateInvitation?.()}
      />
    </CustomDialog>
  );
}
