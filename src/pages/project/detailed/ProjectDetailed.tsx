import { CustomDialog } from "@/components/custom-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectProvider } from "@/contexts/ProjectContext";
import useUser from "@/features/common/hooks/useUser";
import { ProjectTicketsTable } from "@/features/projects/components/project-tickets-table";
import {  getProjectTicketsQuery } from "@/features/projects/services/queryService";
import type { ProjectDataI } from "@/features/projects/types/projectTypes";
import TicketForm from "@/features/tickets/components/ticket-form";
import useTickets from "@/features/tickets/hooks/useTickets";
import { type TicketStatus } from "@/features/tickets/types/ticket-types";
import TicketDetailed from "@/pages/tickets/detailed/TicketDetailed";
import { ArrowLeft, FolderKanban, Ticket } from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDebounce } from "use-debounce";

export default function ProjectDetailed() {
  const { id } = useParams();
  const navigate = useNavigate();
  if(!id) return <Navigate to="/" replace/>

  const [selected, setSelected] = useState<string | null>(null);
  const {
    open,
    setOpen,
    ticketForm,
    confirmDelete,
    setProjectId,
    onUpdateTIcket,
    confirmPrompt,
  } = useTickets();
  const { getAssignees, assigneeList } = useUser();
  const [currentProject] = useState<string | undefined>(id);
  const [currentStatus,setCurrentStatus] = useState<TicketStatus|"all"|undefined>();
  const [debounceStatus] = useDebounce(currentStatus,500);
  const { data: projectTickets, refetch } =
    getProjectTicketsQuery(currentProject,debounceStatus);
  const details = projectTickets as ProjectDataI;
  const setSelectedTicket = (id: string | null) => {
    if (!id) return setSelected(null);
    setSelected(id);
  };
  const deleteTicketFn = (id: string) => {
    try {
      confirmDelete(id);
    } finally {
      setSelectedTicket(null);
    }
  };
  const closeTicket = () => setSelectedTicket(null);

  const filterTickets = (status : TicketStatus|"all" = "to-do") => {
    setCurrentStatus(status);
    setSelectedTicket(null)
  }
  useEffect(() => {
    refetch();
    getAssignees();
    if (id) {
      setProjectId(id);
    }
  }, []);

  return (
    <ProjectProvider
      data={{
        fetchList: () => refetch(),
        ticketList:[],
        projectData : projectTickets,
        setOpen,
        assigneeList,
      }}
    >
      <div className="grid grid-rows-[auto_1fr]">
        <div>
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft />
            Back
          </Button>
        </div>
        <div className="grid grid-rows-[150px_1fr] grid-cols-[1fr_500px] gap-2 flex-1">
          <div className="col-span-2 grid grid-cols-[1fr_auto] items-center-safe ">
            <div className="flex items-start gap-4">
              <div className="flex size-24 shrink-0 items-center justify-center rounded-lg bg-muted">
                <FolderKanban className="size-12 text-muted-foreground" />
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2 ">
                  {details?.name}
                  {/* <Badge variant="default">Actives</Badge> */}
                </div>

                <p className="text-sm text-muted-foreground">{details?.description}</p>
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
                  <TicketForm
                    assigneeList={assigneeList}
                    submitForm={confirmPrompt}
                  />
                </FormProvider>
              </CustomDialog>
            </div>
          </div>
          <div className=" flex flex-col">
            <div>
              <Tabs defaultValue="all">
                <TabsList variant="line">
                  <TabsTrigger value="all" onClick={() => filterTickets('all')}>All</TabsTrigger>
                  <TabsTrigger value="to-do" onClick={() => filterTickets('to-do')}>Open</TabsTrigger>
                  <TabsTrigger value="in-progress" onClick={() => filterTickets('in-progress')} >In-progress</TabsTrigger>
                  <TabsTrigger value="completed" onClick={() => filterTickets('completed')}>Completed</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <ProjectTicketsTable
              viewTicketDetails={(id) => setSelectedTicket(id)}
              data={projectTickets ?? []}
            />
          </div>
          <TicketDetailed
            data={selected}
            onUpdate={(id) => onUpdateTIcket(id)}
            onDelete={(id) => deleteTicketFn(id)}
            onClose={() => closeTicket()}
          />
        </div>
      </div>
    </ProjectProvider>
  );
}
