import { ProjectViewProvider } from "@/contexts/ProjectViewContext";
import ProjectView from "./ProjectView";
import useTicketDataTable from "@/features/tickets/hooks/useTicketDataTable";
import type { TicketDataTableData } from "@/features/tickets/types/ticket-types";

export default function ProjectBaseView() {
  const {
    listQuery: { data: ticketTableList, isLoading },
    tab,
    updatePage,
    page,
    perPage
  } = useTicketDataTable();
  
  const ticketList = ticketTableList?.data as Array<TicketDataTableData>;
  return (
    <ProjectViewProvider
      data={{
        data_table_config: {
          data: ticketList,
          isLoading,
          updatePage: (page, perPage) => updatePage(page, perPage),
          page : ticketTableList?.meta.current_page ?? page,
          perPage: ticketTableList?.meta.per_page ?? perPage,
          paginationData: ticketTableList
        },
        currentTabStatus: tab,
      }}
    >
      <ProjectView />
    </ProjectViewProvider>
  );
}
