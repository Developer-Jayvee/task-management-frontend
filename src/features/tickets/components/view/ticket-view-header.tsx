import { Field, FieldContent } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TicketStatusData } from "../../data";
import { useTicketViewContext } from "@/contexts/TicketViewContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import usePipeline from "../../hooks/usePipeline";
import type { TicketStatus } from "../../types/ticket-types";

export default function TicketViewHeader() {
  const { data } = useTicketViewContext();
  const { transition, isPending } = usePipeline();
  
  return (
    <>
      {/* Header Section */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="break-all rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold tracking-wide text-slate-600">
            Ticket# {data?.id}
          </span>

          <span className="rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs font-semibold capitalize text-rose-700">
            {data?.priority}
          </span>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50/80 px-2 transition-colors hover:border-slate-300 hover:bg-white">
          <Field>
            <FieldContent>
              {/* <Controller
                        name="status"
                        control={control}
                        render={({ field }) => ( */}
              <Select
              onValueChange={(status) => data?.id ? transition(data.id,status as TicketStatus) : ({}) }
              value={data?.status}
              // onValueChange={(status) =>
              //   onStatusUpdate?.(status ?? data.status)
              // }
              >
                <SelectTrigger id="ticket-status" className="h-9 w-37 border-0 bg-transparent text-sm font-medium shadow-none focus:ring-0">
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
      </div>

      {/* Title */}
      <h1 className="mb-4 wrap-break-word font-serif text-2xl font-bold leading-tight tracking-tight text-slate-950 sm:text-3xl">
        {data?.title}
      </h1>

      {/* Meta Row */}
      <div className="mb-6 flex flex-wrap items-center gap-3 sm:gap-4">
        <div className="flex min-w-0 items-center gap-2">
          <Avatar className="size-9 ring-2 ring-white shadow-sm">
            <AvatarImage
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(data?.createdBy?.name ?? "Unknown")}`}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <span className="min-w-0 wrap-break-word text-xs leading-relaxed text-slate-500 sm:text-sm">
            <span className="font-medium text-slate-900">
              {data?.createdBy?.name}
            </span>{" "}
            {data?.created_at &&
              new Date(data.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-slate-500 text-sm">
          {/* <MessageSquare size={16} /> */}
          {/* <span>3</span> */}
        </div>
      </div>
    </>
  );
}
