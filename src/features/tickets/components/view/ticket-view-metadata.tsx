import { CalendarDays, LayoutGrid, Tag, User } from "lucide-react";

export default function TicketViewMetaData() {
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
              {/* {data.title} */}
            </div>
          </div>

          {/* Priority */}
          <div>
            <p className="text-xs text-slate-500 mb-1.5 flex items-center gap-1.5">
              <Tag size={12} />
              Priority
            </p>

            <span className="bg-[#FDE8E8] text-[#C53030] text-xs font-semibold px-2 py-0.5 rounded-full border border-[#FBD5D5]">
              {/* {data.priority} */}
            </span>
          </div>

          {/* Updated */}
         
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
              {/* {assignee?.user?.name} */}
            </div>
          </div>

          {/* Created */}
          <div>
            <p className="text-xs text-slate-500 mb-1.5 flex items-center gap-1.5">
              <CalendarDays size={12} />
              Created
            </p>

            <p className="text-sm text-slate-700">
              {/* {data.created_at &&
                new Date(data.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })} */}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}