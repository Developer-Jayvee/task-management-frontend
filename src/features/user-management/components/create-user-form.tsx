import { CustomDialog } from "@/components/custom-dialog";
import LinkGenerationForm from "./form/link-generation-form";
import { useUserContext } from "@/contexts/UserContext";
import { User } from "lucide-react";

export default function CreateUserForm() {
  const { open, setOpen, generateInvitation, generatedLinkData } =
    useUserContext();

  return (
    <CustomDialog
      open={open ?? false}
      setOpen={setOpen ?? (() => {})}
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
