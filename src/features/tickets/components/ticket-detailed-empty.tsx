import { useProjectViewContext } from "@/contexts/ProjectViewContext";
import { Ticket } from "lucide-react";

export default function EmptyTicketDetails() {
  const { modal_config } = useProjectViewContext();
  return (
    // Empty State
    <div className="flex min-w-0 items-start justify-center font-sans text-slate-800">
      {/* Main Card */}
      <div className="w-full min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8 lg:p-12">
        <div className="flex min-h-70 flex-col items-center justify-center text-center sm:min-h-105">
          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-6">
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-slate-400"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="8" y1="13" x2="16" y2="13" />
              <line x1="8" y1="17" x2="13" y2="17" />
            </svg>
          </div>

          {/* Title */}
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 mb-2">
            No ticket selected
          </h2>

          {/* Description */}
          <p className="max-w-md text-sm leading-relaxed text-slate-500 mb-7">
            Select a ticket from the list to view its details, description,
            attachments, and activity.
          </p>

          {/* Optional Action */}
          <button
            onClick={() => modal_config?.setOpen(!modal_config.open)}
            className="
              inline-flex items-center gap-2
              bg-slate-900 text-white
              text-sm font-medium
              px-4 py-2.5
              rounded-lg
              hover:bg-slate-800
              transition-colors
            "
          >
            <Ticket size={16} />
            Create a ticket
          </button>
        </div>
      </div>
    </div>
  );
}
