import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProjectViewContext } from "@/contexts/ProjectViewContext";
import TicketDataTableComponent from "@/features/tickets/components/table/ticket-table";
import { ArrowLeft, FolderKanban } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProjectView() {
  const navigate = useNavigate();
  const { data_table_config, currentTabStatus } = useProjectViewContext();
  return (
    <div className="grid min-w-0 grid-rows-[auto_1fr]">
      <div>
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft />
          Back
        </Button>
      </div>
      <div className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,500px)] lg:gap-3">
        <div className="grid min-w-0 grid-cols-1 items-start gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center lg:col-span-2">
          <div className="flex min-w-0 items-start gap-3 sm:gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-lg bg-muted sm:size-24">
              <FolderKanban className="size-8 text-muted-foreground sm:size-12" />
            </div>

            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex min-w-0 items-center gap-2 wrap-break-word">
                TITLE
              </div>

              <p className="wrap-break-word text-sm text-muted-foreground">
                DESCRIPTION
              </p>
            </div>
          </div>
          <div className="sm:justify-self-end">
            CREATE BUTTON HERE
            {/* <CustomDialog
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
              </CustomDialog> */}
          </div>
        </div>
        <div className="flex min-w-0 flex-col lg:col-start-1">
          <div className="mb-2 min-w-0 overflow-x-auto">
            <Tabs defaultValue="all">
              <TabsList
                variant="line"
                className="w-max min-w-full justify-start"
              >
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="to-do">Open</TabsTrigger>
                <TabsTrigger value="in-progress">In-progress</TabsTrigger>
                <TabsTrigger value="completed"> Completed</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <TicketDataTableComponent
            meta={data_table_config.paginationData?.meta}
            total={data_table_config.paginationData?.meta.total ?? 0}
            data={data_table_config.data}
            isLoading={data_table_config.isLoading}
            activeStatus={currentTabStatus}
            updatePage={(perPage) => data_table_config.updatePage(null,perPage)}
            pageIndex={data_table_config.page}
            pageSize={data_table_config.perPage}
          />
        </div>
        {/* TICKET DETAILED */}
      </div>
    </div>
  );
}
