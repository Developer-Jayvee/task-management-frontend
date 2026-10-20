import { useTicketViewContext } from "@/contexts/TicketViewContext";

export default function TicketViewDescription() {
  const { data } = useTicketViewContext()
  return (
    <>
      {/* Divider */}
      <div className="mb-5 h-px w-full bg-gradient-to-r from-slate-200 via-slate-100 to-transparent" />

      {/* Description Section */}
      <div className="mb-6 rounded-xl border border-slate-100 bg-slate-50/70 p-4 sm:p-5">
        <div className="mb-3 flex items-center gap-2 text-slate-700">
          <div className="rounded-lg bg-white p-1.5 shadow-sm ring-1 ring-slate-200/70">
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

          <h3 className="text-sm font-semibold tracking-wide text-slate-800">Description</h3>
        </div>

        <p className="whitespace-pre-wrap break-words text-sm leading-7 text-slate-600">
          {data?.description}
        </p>
      </div>
    </>
  );
}
