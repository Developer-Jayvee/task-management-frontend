import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useProjectCardContext } from "@/contexts/ProjectCardContext";

import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import type { ProjectCardI } from "../types/projectTypes";
import { usePromptContext } from "@/contexts/PromptDialogContext";
export default function VerticalOptions({ data } : { data : ProjectCardI}) {
  const { setProjectForm, deleteProject } = useProjectCardContext()
  const { configurePrompt,showPrompt } = usePromptContext();
  const onDelete = (id : string) => {

    configurePrompt?.({
      title: "Are you sure you want to delete this project?",
      promptId:"#deletePrompt",
      callback: () => deleteProject?.(id)
    });
    showPrompt?.()
  }
  return (
    <>
      <Popover>
        <PopoverTrigger
          render={
            <Button variant="ghost" size="icon">
              <EllipsisVertical />
            </Button>
          }
        />

        <PopoverContent align="end" className="w-40 p-1">
          <Button variant="ghost" className="w-full justify-start" onClick={() => setProjectForm?.(data)}>
            <Pencil className="mr-2 size-4" />
            Edit
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start text-destructive hover:text-destructive"
            onClick={() => onDelete(data.id)}
          >
            <Trash2 className="mr-2 size-4" />
            Delete
          </Button>
        </PopoverContent>
      </Popover>
    </>
  );
}
