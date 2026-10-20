import { useProjectContext } from "@/contexts/ProjectContext";
import { useTicketViewContext } from "@/contexts/TicketViewContext";
import { CalendarDays, LayoutGrid, Tag, User } from "lucide-react";

export default function TicketViewMetaData() {
  const { data: projectDetails } = useProjectContext()  
  const { data: ticketDetails } = useTicketViewContext();
  return (
    <>
      {/* Divider */}
      <div className="mb-5 h-px w-full bg-gradient-to-r from-slate-200 via-slate-100 to-transparent" />

      {/* Metadata Grid */}
      <div className="mb-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-3">
          {/* Project */}
          <div className="rounded-xl border border-slate-100 bg-white p-3.5">
            <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              <LayoutGrid size={12} />
              Project
            </p>

            <div className="flex min-w-0 items-center gap-2 text-sm font-medium text-slate-700">
              <div className="size-2.5 shrink-0 rounded-sm bg-sky-500" />
              {projectDetails?.name}
            </div>
          </div>

          {/* Priority */}
          <div className="rounded-xl border border-slate-100 bg-white p-3.5">
            <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              <Tag size={12} />
              Priority
            </p>

            <span className="rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs font-semibold capitalize text-rose-700">
              {ticketDetails?.priority}
            </span>
          </div>

          {/* Updated */}
        </div>

        {/* Right Column */}
        <div className="space-y-3">
          {/* Assignee */}
          <div className="rounded-xl border border-slate-100 bg-white p-3.5">
            <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              <User size={12} />
              Assignee
            </p>

            <div className="flex min-w-0 items-center gap-2 text-sm font-medium text-slate-600">
              <div className="bg-slate-100 p-1 rounded-full border border-slate-200">
                <User size={14} className="text-slate-400" />
              </div>
              {ticketDetails?.assignee?.name}
            </div>
          </div>

          {/* Created */}
          <div className="rounded-xl border border-slate-100 bg-white p-3.5">
            <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              <CalendarDays size={12} />
              Created
            </p>

            <p className="text-sm text-slate-700">
              {ticketDetails?.created_at &&
                new Date(ticketDetails?.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
