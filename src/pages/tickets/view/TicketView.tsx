import { useTicketViewContext } from "@/contexts/TicketViewContext";
import { useProjectContext } from "@/contexts/ProjectContext";
import EmptyTicketDetails from "@/features/tickets/components/ticket-detailed-empty";
import TicketViewComment from "@/features/tickets/components/view/ticket-view-comment";
import TicketViewDescription from "@/features/tickets/components/view/ticket-view-description";
import TicketViewFooter from "@/features/tickets/components/view/ticket-view-footer";
import TicketViewHeader from "@/features/tickets/components/view/ticket-view-header";
import { CalendarDays, Clock3, FolderKanban, Tag, UserRound } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect } from "react";

function formatDate(value?: string, includeTime = false) {
  if (!value) return "Not available";

  // Parse date-only values as local dates to avoid shifting the day by timezone.
  const date = new Date(/^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T00:00:00` : value);
  if (Number.isNaN(date.getTime())) return "Not available";

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    ...(includeTime ? { timeStyle: "short" as const } : {}),
  }).format(date);
}

function DetailItem({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof CalendarDays;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0 rounded-xl border border-slate-100 bg-white p-3.5 sm:p-4">
      <dt className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
        <Icon size={14} aria-hidden="true" />
        {label}
      </dt>
      <dd className="min-w-0 wrap-break-word text-sm font-medium leading-6 text-slate-700">
        {children}
      </dd>
    </div>
  );
}

export default function TicketView() {
  const { data, commentsData } = useTicketViewContext();
  const { data: project } = useProjectContext();

  useEffect(() => {
    commentsData.setTicketId(data?.id ? Number(data.id) : null);
  }, [data?.id, commentsData.setTicketId]);

  if (!data) return <EmptyTicketDetails />;

  const projectName = project?.id === data.project_id ? project.name : undefined;
  const updatedAt = (data as typeof data & { updated_at?: string }).updated_at;

  return (
    <div className="w-full min-w-0 font-sans text-slate-800">
      <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xl shadow-slate-200/60 ring-1 ring-slate-900/5">
        <div className="h-1 w-full bg-linear-to-r from-sky-500 via-indigo-500 to-violet-500" />
        <div className="min-w-0 p-4 sm:p-6 lg:p-7">
          <TicketViewFooter />
          <TicketViewHeader />
          <TicketViewDescription />

          <section aria-labelledby="ticket-details-heading" className="mb-6">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 id="ticket-details-heading" className="text-sm font-semibold text-slate-800 sm:text-base">
                Ticket details
              </h2>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium capitalize text-slate-600">
                {data.status || "Status unavailable"}
              </span>
            </div>

            <dl className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
              <DetailItem icon={FolderKanban} label="Project">
                {projectName ?? `Project #${data.project_id}`}
              </DetailItem>

              <DetailItem icon={Tag} label="Priority">
                <span className="capitalize">{data.priority || "Not available"}</span>
              </DetailItem>

              <DetailItem icon={UserRound} label="Assignee">
                {data.assignee?.name || "Unassigned"}
                {data.assignee?.email && (
                  <span className="block wrap-break-word text-xs font-normal text-slate-500">
                    {data.assignee.email}
                  </span>
                )}
              </DetailItem>

              <DetailItem icon={UserRound} label="Created by">
                {data.createdBy?.name || "Not available"}
                {data.createdBy?.email && (
                  <span className="block wrap-break-word text-xs font-normal text-slate-500">
                    {data.createdBy.email}
                  </span>
                )}
              </DetailItem>

              <DetailItem icon={CalendarDays} label="Due date">
                {formatDate(data.due_date)}
              </DetailItem>

              <DetailItem icon={Clock3} label="Created">
                {formatDate(data.created_at, true)}
              </DetailItem>

              <DetailItem icon={Clock3} label="Last updated">
                {formatDate(updatedAt, true)}
              </DetailItem>
            </dl>
          </section>

          <TicketViewComment />
        </div>
      </div>
    </div>
  );
}
