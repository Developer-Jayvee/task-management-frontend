import { useTicketViewContext } from "@/contexts/TicketViewContext";

export default function TicketViewDescription() {
  const { data } = useTicketViewContext()
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
          {data?.description}
        </p>
      </div>
    </>
  );
}
