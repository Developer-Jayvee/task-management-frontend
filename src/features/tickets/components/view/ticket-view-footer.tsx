import { Pencil, Trash2 } from "lucide-react";

export default function TicketViewFooter() {
  return (
    <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
      {/* Delete */}
      <button
        // onClick={() => onDelete(data.id)}
        type="button"
        className="
          inline-flex items-center gap-2
          px-3 py-2 sm:px-4 sm:py-2.5
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
      <div className="flex flex-1 justify-end gap-2 sm:flex-none">
        <button
          //   onClick={() => onClose()}
          type="button"
          className="
            inline-flex items-center gap-2
            px-3 py-2.5 sm:px-4
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
          //   onClick={() => onUpdate(data.id)}
          type="button"
          className="
            inline-flex items-center gap-2
            px-3 py-2.5 sm:px-4
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
