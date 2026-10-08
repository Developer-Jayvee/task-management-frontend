import { Field, FieldContent } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TicketStatusData } from "../../data";

export default function TicketViewHeader() {
  return (
    <>
      {/* Header Section */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <span className="break-all text-slate-500 font-medium text-sm tracking-wide">
            Ticket#
          </span>

          <span className="bg-[#FDE8E8] text-[#C53030] text-xs font-semibold px-2.5 py-1 rounded-full border border-[#FBD5D5]">
            {/* {data.priority} */}
          </span>
        </div>
        <div className=" px-2 rounded-md border border-[#BEE3F8] hover:bg-[#E2E8F0] transition-colors">
          <Field>
            <FieldContent>
              {/* <Controller
                        name="status"
                        control={control}
                        render={({ field }) => ( */}
              <Select
              // value={data.status}
              // onValueChange={(status) =>
              //   onStatusUpdate?.(status ?? data.status)
              // }
              >
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
      </div>

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 mb-4 tracking-tight">
        {/* {data.title} */}
      </h1>

      {/* Meta Row */}
      <div className="mb-6 flex flex-wrap items-center gap-3 sm:gap-4">
        <div className="flex min-w-0 items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-slate-500 text-white flex items-center justify-center text-xs font-medium">
            JD
          </div>

          <span className="min-w-0 break-words text-sm text-slate-600">
            <span className="font-medium text-slate-900">John Doe</span>{" "}
            reported 2 hours ago
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
