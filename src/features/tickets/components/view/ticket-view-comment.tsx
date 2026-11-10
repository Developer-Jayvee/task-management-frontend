import { useTicketViewContext } from "@/contexts/TicketViewContext";
import { Send } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";


export default function TicketViewComment() {
  const { commentsData } = useTicketViewContext();
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const commentsQuery = commentsData.commentsQuery;
  const responseData = commentsQuery.data;
  const comments = Array.isArray(responseData?.data)
    ? responseData.data
    : Array.isArray(responseData)
      ? responseData
      : [];

  const formatDate = (value?: string) => {
    if (!value) return "";
    const date = new Date(value);
    return Number.isNaN(date.getTime())
      ? ""
      : new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(date);
  };

  const sendComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const content = comment.trim();
    if (!content || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await commentsData.createComment({ content });
      await commentsQuery.refetch();
      toast.success("Comment created.");
      setComment("");
    } catch {
      toast.error("Couldn't create comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section aria-labelledby="ticket-comments-heading" className="mt-6 border-t border-slate-200 pt-5 sm:mt-8 sm:pt-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 id="ticket-comments-heading" className="text-base font-semibold text-slate-900 sm:text-lg">
          Comments
        </h2>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
          {comments.length}
        </span>
      </div>
      <form onSubmit={sendComment} className="mt-4 flex w-full items-start gap-2.5 sm:gap-3">
        <div
          aria-hidden="true"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-800 text-xs font-semibold tracking-wide text-white sm:h-10 sm:w-10 sm:text-sm"
        >
          JH
        </div>

        <div className="flex min-w-0 flex-1 items-end gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-1.5 transition-colors focus-within:border-slate-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-slate-200 sm:p-2">
          <input
            onChange={(event) => setComment(event.target.value)}
            value={comment}
            type="text"
            placeholder="Add a comment..."
            aria-label="Add a comment"
            disabled={isSubmitting}
            className="min-w-0 flex-1 bg-transparent px-2.5 py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400 disabled:opacity-60 sm:px-3"
          />

          <button
            type="submit"
            disabled={!comment.trim() || isSubmitting}
            aria-label="Send comment"
            className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-900 px-3 text-white transition-colors hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 sm:px-3.5"
          >
            <Send size={16} aria-hidden="true" />
            <span className="hidden text-sm font-medium sm:inline">
              {isSubmitting ? "Sending…" : "Send"}
            </span>
          </button>
        </div>
      </form>
      <div className="space-y-3" aria-live="polite">
        {commentsQuery.isLoading ? (
          <p className="rounded-xl bg-slate-50 px-4 py-5 text-center text-sm text-slate-500">
            Loading comments…
          </p>
        ) : commentsQuery.isError ? (
          <p role="alert" className="rounded-xl bg-rose-50 px-4 py-5 text-center text-sm text-rose-700">
            Comments couldn’t be loaded. Please try again later.
          </p>
        ) : comments.length === 0 ? (
          <p className="rounded-xl bg-slate-50 px-4 py-5 text-center text-sm text-slate-500">
            No comments yet. Start the conversation.
          </p>
        ) : (
          comments.map((item: any, index: number) => {
            const author = item.user?.name ?? item.author?.name ?? item.createdBy?.name ?? "Team member";
            const initials = author
              .split(/\s+/)
              .filter(Boolean)
              .slice(0, 2)
              .map((part: string) => part[0])
              .join("")
              .toUpperCase();
            const timestamp = formatDate(item.created_at ?? item.createdAt);

            return (
              <article
                key={item.id ?? `${index}-${item.content}`}
                className="flex min-w-0 gap-3 rounded-xl border border-slate-100 bg-white p-3 sm:p-4"
              >
                <div
                  aria-hidden="true"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700"
                >
                  {initials || "TM"}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    <p className="text-sm font-semibold text-slate-800">{author}</p>
                    {timestamp && <time className="text-xs text-slate-400">{timestamp}</time>}
                  </div>
                  <p className="whitespace-pre-wrap wrap-break-word text-sm leading-6 text-slate-600">
                    {item.content}
                  </p>
                </div>
              </article>
            );
          })
        )}
      </div>


    </section>
  );
}