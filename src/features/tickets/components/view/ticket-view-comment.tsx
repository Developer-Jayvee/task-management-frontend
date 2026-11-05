import { Send } from "lucide-react";


export default function TicketViewComment() {
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