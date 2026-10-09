import { CustomDialog } from "@/components/custom-dialog";
import { useProjectViewContext } from "@/contexts/ProjectViewContext";
import { Ticket } from "lucide-react";
import { FormProvider } from "react-hook-form";
import TicketForm from "./ticket-form";
import { useTicketViewContext } from "@/contexts/TicketViewContext";

export default function CreateTicketForm() {
  const { modal_config, assignees, form_config } = useProjectViewContext();
  const { data: ticketDetails } = useTicketViewContext();
  
  return (
    <CustomDialog
      open={modal_config.open}
      setOpen={modal_config.setOpen ?? (() => {})}
      buttonElement={
        <>
          <Ticket size={16} /> Create Ticket
        </>
      }
    >
      {form_config.ticketForm && (
        <FormProvider {...form_config.ticketForm}>
          <TicketForm
            assigneeList={assignees}
            submitForm={(data) =>
              form_config.confirmPrompt?.({
                data,
                id: ticketDetails?.id ?? undefined,
              })
            }
          />
        </FormProvider>
      )}
    </CustomDialog>
  );
}
