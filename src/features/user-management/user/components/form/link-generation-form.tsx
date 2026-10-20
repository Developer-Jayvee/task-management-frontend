
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, RefreshCw, Copy } from "lucide-react";
import { toast } from "react-toastify";

export default function LinkGenerationForm({ onGenerate, link }: {
  onGenerate?: () => Promise<void>;
  link ?: string;
}) {
  const copyText = async (  ) => {
    if(!link) return;
    toast.success('Copied successfully.');
    await navigator.clipboard.writeText(link);
  }
  return (
    <DialogContent className="sm:max-w-125">
      <DialogHeader>
        <DialogTitle>Generate Invitation Link</DialogTitle>
        <DialogDescription>
          Generate a unique invitation link that you can share with a user to
          join your organization.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4 py-4">
        <div className="rounded-lg border bg-muted/40 p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-md border bg-background">
              <Link className="size-4 text-muted-foreground" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">Invitation Link</p>
              <p className="text-sm text-muted-foreground">
                Generate a link below, then copy it to share with the user.
              </p>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <Input
              readOnly
              value={link ?? ""}
              placeholder="Your invitation link will appear here"
              className="min-w-0"
            />

            <Button type="button" variant="outline" size="icon" onClick={copyText}>
              <Copy className="size-4" />
              <span className="sr-only">Copy invitation link</span>
            </Button>
          </div>
        </div>

        {typeof onGenerate === "function" && (
          <Button
            type="button"
            className="w-full"
            onClick={() => onGenerate()}
          >
            <RefreshCw className="mr-2 size-4" />
            Generate Invitation Link
          </Button>
        )}
      </div>

      <DialogFooter>
        <Button type="button" variant="outline">
          Cancel
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

