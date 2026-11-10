import { useTicketViewContext } from "@/contexts/TicketViewContext";
import EmptyTicketDetails from "@/features/tickets/components/ticket-detailed-empty";
import TicketViewComment from "@/features/tickets/components/view/ticket-view-comment";
import TicketViewDescription from "@/features/tickets/components/view/ticket-view-description";
import TicketViewFooter from "@/features/tickets/components/view/ticket-view-footer";
import TicketViewHeader from "@/features/tickets/components/view/ticket-view-header";
import TicketViewMetaData from "@/features/tickets/components/view/ticket-view-metadata";
import { useEffect } from "react";

export default function TicketView() {
  const { data, commentsData } = useTicketViewContext();
  if (!data) return <EmptyTicketDetails />;

  useEffect(() => {
    if(data.id) commentsData.setTicketId(Number(data.id))
  },[data]);
  return (
    <div className="min-w-0 font-sans text-slate-800">
      <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xl shadow-slate-200/60 ring-1 ring-slate-900/5">
        <div className="h-1 w-full bg-linear-to-r from-sky-500 via-indigo-500 to-violet-500" />
        <div className="p-4 sm:p-6 lg:p-7">
          <TicketViewFooter />
          <TicketViewHeader />
          <TicketViewDescription />
          <TicketViewComment/>
          <TicketViewMetaData />
        </div>
      </div>
    </div>
  );
}
