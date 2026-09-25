import { CustomDialog } from "@/components/custom-dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectProvider } from "@/contexts/ProjectContext";
import useUser from "@/features/common/hooks/useUser";
import { ProjectTicketsTable } from "@/features/projects/components/project-tickets-table";
import TicketForm from "@/features/tickets/components/ticket-form";
import useTickets from "@/features/tickets/hooks/useTickets";
import TicketDetailed from "@/pages/tickets/detailed/TicketDetailed";
import { FolderKanban, Ticket } from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";
import { useParams } from "react-router-dom";

export default function ProjectDetailed() {
  const [selected, setSelected] = useState<string | null>(null);

  const {
    fetchList,
    open,
    setOpen,
    ticketForm,
    submitForm,
    setProjectId,
    ticketList,
    deleteTicket,
    onUpdateTIcket,
  } = useTickets();
  const { getAssignees, assigneeList } = useUser();
  const { id } = useParams();

  const setSelectedTicket = (id: string | null) => {
    if (!id) return setSelected(null);
    setSelected(id);
    // const selectedData = ticketList?.find((data) => data.id === id) ?? null;
    // setSelected(selectedData);
  };
  
  const deleteTicketFn = (id: string) => {
    setSelectedTicket(null);
    deleteTicket(id);
  };
  const closeTicket = () => setSelectedTicket(null);
  
  useEffect(() => {
    fetchList();
    getAssignees();
    if (id) setProjectId(id);
  }, []);

  
  return (
    <ProjectProvider data={{
      fetchList,
      ticketList: ticketList ?? [],
      setOpen
    }}>
      <div className="grid grid-rows-[150px_1fr] grid-cols-[1fr_500px] gap-2 flex-1">
        <div className="col-span-2 grid grid-cols-[1fr_auto] items-center-safe ">
          <div className="flex items-start gap-4">
            <div className="flex size-24 shrink-0 items-center justify-center rounded-lg bg-muted">
              <FolderKanban className="size-12 text-muted-foreground" />
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2 ">
                Title
                <Badge variant="default">Actives</Badge>
              </div>

              <p className="text-sm text-muted-foreground">asdasdasd</p>
            </div>
          </div>
          <div>
            <CustomDialog
              open={open}
              setOpen={setOpen ?? (() => {})}
              buttonElement={
                <>
                  <Ticket size={16} /> Create Ticket
                </>
              }
            >
              <FormProvider {...ticketForm}>
                <TicketForm assigneeList={assigneeList} submitForm={submitForm} />
              </FormProvider>
            </CustomDialog>
          </div>
        </div>
        <div className=" flex flex-col">
          <div>
            <Tabs defaultValue="overview">
              <TabsList variant="line">
                <TabsTrigger value="overview">Open</TabsTrigger>
                <TabsTrigger value="analytics">Ongoing</TabsTrigger>
                <TabsTrigger value="reports">Completed</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <ProjectTicketsTable
            viewTicketDetails={(id) => setSelectedTicket(id)}
            data={ticketList ?? []}
          />
        </div>
        <TicketDetailed
          data={selected}
          onUpdate={(id) => onUpdateTIcket(id)}
          onDelete={(id) => deleteTicketFn(id)}
          onClose={() => closeTicket()}
        />
      </div>
    </ProjectProvider>
  );
}
