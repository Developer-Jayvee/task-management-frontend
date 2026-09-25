import { Field, FieldContent } from "@/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useProjectContext } from "@/contexts/ProjectContext";
import EmptyTicketDetails from "@/features/tickets/components/ticket-detailed-empty";
import { TicketStatusData } from "@/features/tickets/data";
import usePipeline from "@/features/tickets/hooks/usePipeline";
import type { TicketResponseData, TicketStatus } from "@/features/tickets/types/ticket-types";
import {
  MessageSquare,
  LayoutGrid,
  User,
  Clock,
  Send,
  CalendarDays,
  Tag,
  Trash2,
  Pencil,
  X,
} from "lucide-react";

type TicketProps = {
  data: TicketResponseData;
  onStatusUpdate ?: (status : TicketStatus) => void;
};

function TicketHeader({ data , onStatusUpdate }: TicketProps) {
  return (
    <>
      {/* Header Section */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <span className="text-slate-500 font-medium text-sm tracking-wide">
            {data.id}
          </span>

          <span className="bg-[#FDE8E8] text-[#C53030] text-xs font-semibold px-2.5 py-1 rounded-full border border-[#FBD5D5]">
            {data.priority}
          </span>
        </div>
        <div className=" px-2 rounded-md border border-[#BEE3F8] hover:bg-[#E2E8F0] transition-colors">
          <Field>
            <FieldContent>
              {/* <Controller
                name="status"
                control={control}
                render={({ field }) => ( */}
                  <Select value={data.status} onValueChange={(status) => onStatusUpdate?.(status ?? data.status)}>
                    <SelectTrigger id="ticket-status" className="w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>

                    <SelectContent className="">
                      {TicketStatusData.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                {/* )} */}
              {/* /> */}
            </FieldContent>
          </Field>

        </div>

        {/* <button className="flex items-center gap-2 bg-[#EBF8FF] text-[#2B6CB0] text-sm font-medium px-3 py-1.5 rounded-md border border-[#BEE3F8] hover:bg-[#E2E8F0] transition-colors">
          {data.status}
          <ChevronDown size={14} className="opacity-70" />
        </button> */}
      </div>

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 mb-4 tracking-tight">
        {data.title}
      </h1>

      {/* Meta Row */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-slate-500 text-white flex items-center justify-center text-xs font-medium">
            JD
          </div>

          <span className="text-sm text-slate-600">
            <span className="font-medium text-slate-900">John Doe</span>{" "}
            reported 2 hours ago
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-slate-500 text-sm">
          <MessageSquare size={16} />
          <span>3</span>
        </div>
      </div>
    </>
  );
}

function TicketDescription({ data }: TicketProps) {
  return (
    <>
      {/* Divider */}
      <div className="h-px bg-slate-100 w-full mb-6" />

      {/* Description Section */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3 text-slate-700">
          <div className="bg-slate-100 p-1.5 rounded-md">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-slate-500"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </div>

          <h3 className="font-semibold text-sm">Description</h3>
        </div>

        <p className="text-slate-600 text-sm leading-relaxed">
          {data.description}
        </p>
      </div>
    </>
  );
}

function TicketMetadata({ data }: TicketProps) {
  return (
    <>
      {/* Divider */}
      <div className="h-px bg-slate-100 w-full mb-6" />

      {/* Metadata Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12 mb-8">
        {/* Left Column */}
        <div className="space-y-4">
          {/* Project */}
          <div>
            <p className="text-xs text-slate-500 mb-1.5 flex items-center gap-1.5">
              <LayoutGrid size={12} />
              Project
            </p>

            <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <div className="w-2.5 h-2.5 rounded-sm bg-blue-400" />
              Website Redesign
            </div>
          </div>

          {/* Priority */}
          <div>
            <p className="text-xs text-slate-500 mb-1.5 flex items-center gap-1.5">
              <Tag size={12} />
              Priority
            </p>

            <span className="bg-[#FDE8E8] text-[#C53030] text-xs font-semibold px-2 py-0.5 rounded-full border border-[#FBD5D5]">
              {data.priority}
            </span>
          </div>

          {/* Updated */}
          <div>
            <p className="text-xs text-slate-500 mb-1.5 flex items-center gap-1.5">
              <Clock size={12} />
              Updated
            </p>

            <p className="text-sm text-slate-700">Updated</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Assignee */}
          <div>
            <p className="text-xs text-slate-500 mb-1.5 flex items-center gap-1.5">
              <User size={12} />
              Assignee
            </p>

            <div className="flex items-center gap-2 text-sm text-slate-400 font-medium">
              <div className="bg-slate-100 p-1 rounded-full border border-slate-200">
                <User size={14} className="text-slate-400" />
              </div>
              Unassigned
            </div>
          </div>

          {/* Created */}
          <div>
            <p className="text-xs text-slate-500 mb-1.5 flex items-center gap-1.5">
              <CalendarDays size={12} />
              Created
            </p>

            <p className="text-sm text-slate-700">Apr 16, 2025, 12:24 AM</p>
          </div>
        </div>
      </div>
    </>
  );
}

function TicketComment() {
  return (
    /* Comment Input Area - unchanged */
    <div className="flex items-center gap-3 pt-2">
      <div className="w-10 h-10 rounded-full bg-slate-500 text-white flex items-center justify-center text-sm font-medium shrink-0">
        JH
      </div>

      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Add a comment..."
          className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-400 transition-all placeholder:text-slate-400"
        />

        <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-slate-200 text-slate-500 rounded-lg hover:bg-slate-300 transition-colors">
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}

function TicketFooter({
  data,
  onDelete,
  onClose,
  onUpdate,
}: {
  data: TicketResponseData;
  onDelete: (id: string) => void;
  onClose: () => void;
  onUpdate: (id: string) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 mt-6 pt-5 border-t border-slate-100">
      {/* Delete */}
      <button
        onClick={() => onDelete(data.id)}
        type="button"
        className="
          inline-flex items-center gap-2
          px-4 py-2.5
          rounded-lg
          border border-red-200
          bg-white
          text-red-600
          text-sm font-medium
          hover:bg-red-50
          transition-colors
        "
      >
        <Trash2 size={16} />
        Delete
      </button>

      {/* Close + Update */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onClose()}
          type="button"
          className="
            inline-flex items-center gap-2
            px-4 py-2.5
            rounded-lg
            border border-slate-200
            bg-white
            text-slate-700
            text-sm font-medium
            hover:bg-slate-50
            transition-colors
          "
        >
          <X size={16} />
          Close
        </button>

        <button
          onClick={() => onUpdate(data.id)}
          type="button"
          className="
            inline-flex items-center gap-2
            px-4 py-2.5
            rounded-lg
            bg-slate-900
            text-white
            text-sm font-medium
            hover:bg-slate-800
            transition-colors
          "
        >
          <Pencil size={16} />
          Update
        </button>
      </div>
    </div>
  );
}

export default function TicketDetailed({
  data,
  onDelete,
  onClose,
  onUpdate,
}: {
  data: string | null;
  onDelete: (id: string) => void;
  onClose: () => void;
  onUpdate: (id: string) => void;
}) {
  const { fetchList , ticketList } = useProjectContext();
  const { transition, isPending } = usePipeline()
  if (!data) {
    return <EmptyTicketDetails />;
  }
  const details = ticketList?.find((v) => v.id === data) as TicketResponseData;
  if(isPending) fetchList?.();
  return (
    <div className="bg-[#FDFBF7] flex items-center justify-center p-4 sm:p-8 font-sans text-slate-800">
      {/* Main Card */}
      <div className="bg-white w-full max-w-[700px] rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <TicketHeader data={details} onStatusUpdate={(status) => transition(data,status)} />

        <TicketDescription data={details} />

        <TicketMetadata data={details} />

        <TicketComment />

        <TicketFooter
          data={details}
          onDelete={onDelete}
          onClose={onClose}
          onUpdate={(id) => onUpdate(id)}
        />
      </div>
    </div>
  );
}
