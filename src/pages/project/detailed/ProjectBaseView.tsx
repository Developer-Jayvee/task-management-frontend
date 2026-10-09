import { ProjectViewProvider } from "@/contexts/ProjectViewContext";
import ProjectView from "./ProjectView";
import useTicketDataTable from "@/features/tickets/hooks/useTicketDataTable";
import type { TicketDataTableData } from "@/features/tickets/types/ticket-types";
import useTicketForm from "@/features/tickets/hooks/useTicketForm";
import useUser from "@/features/common/hooks/useUser";
import TicketBaseView from "@/pages/tickets/view/TicketBaseView";
import useProjectView from "@/features/projects/hooks/useProjectView";
import { Navigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export default function ProjectBaseView() {
  const { id } = useParams()
  const { data: projectViewData , setSelectedProject } = useProjectView();
  const {
    listQuery: { data: ticketTableList, isLoading },
    tab,
    updatePage,
    page,
    perPage,
    refetchTicketTable
  } = useTicketDataTable();
  const {
    confirmFormSubmit,
    createFormSubmit,
    updateFormSubmit,
    form,
    open,
    setOpen,
    isFormSuccess
  } = useTicketForm();
  const { assigneeList } = useUser();
  const ticketList = ticketTableList?.data as Array<TicketDataTableData>;
  useEffect(() => {
    if(id) setSelectedProject(id);
    else if (!id) setSelectedProject(undefined);
  },[]);

  if(projectViewData === undefined) return <Navigate to="/" replace/>
  if(projectViewData === null) return null;

  return (
    <ProjectViewProvider
      data={{
        data_table_config: {
          data: ticketList,
          isLoading,
          updatePage: (perPage, pageIndex) => updatePage(perPage, pageIndex),
          page : ticketTableList?.meta.current_page ?? page,
          perPage: ticketTableList?.meta.per_page ?? perPage,
          paginationData: ticketTableList,
          refetchTableData: refetchTicketTable
        },
        form_config: {
          confirmPrompt: confirmFormSubmit,
          createFormSubmit,
          updateFormSubmit,
          ticketForm: form,
          isFormSuccess
        },
        modal_config: {
          open,setOpen
        },
        assignees: assigneeList,
        currentTabStatus: tab,
        projectData: projectViewData
      }}
    >
      <TicketBaseView>
        <ProjectView />
      </TicketBaseView>
    </ProjectViewProvider>
  );
}
