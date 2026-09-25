import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { usePromptContext } from "@/contexts/PromptDialogContext"
import type { PromptDialogI } from "@/features/common/types/componentTypes"

export function PromptDialog({
    open,
    setOpen,
    title,
    description = "",
    confirmButtonText = "Continue",
    cancelButtonText = "Cancel"
} : PromptDialogI) {
  const { confirm ,cancel } = usePromptContext()
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent >
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => cancel?.()}>{cancelButtonText}</AlertDialogCancel>
          <AlertDialogAction onClick={() => confirm?.()}>{confirmButtonText}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
