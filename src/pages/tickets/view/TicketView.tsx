import { useTicketViewContext } from "@/contexts/TicketViewContext";
import EmptyTicketDetails from "@/features/tickets/components/ticket-detailed-empty";
import TicketViewDescription from "@/features/tickets/components/view/ticket-view-description";
import TicketViewFooter from "@/features/tickets/components/view/ticket-view-footer";
import TicketViewHeader from "@/features/tickets/components/view/ticket-view-header";
import TicketViewMetaData from "@/features/tickets/components/view/ticket-view-metadata";

export default function TicketView() {
  const { data } = useTicketViewContext();
  if (!data) return <EmptyTicketDetails />;
  return (
    <div className="flex min-w-0 items-start justify-center font-sans text-slate-800">
      <div className="w-full min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
        <TicketViewHeader/>
        <TicketViewDescription/>
        <TicketViewMetaData/>
        <TicketViewFooter/>
      </div>
    </div>
  );
}
