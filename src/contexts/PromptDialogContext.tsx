import { PromptDialog } from "@/components/prompt-dialog";
import usePrompt from "@/features/common/hooks/usePrompt";
import type { PromptDialogContextI } from "@/features/common/types/componentTypes";
import { createContext, useContext } from "react";

export const PromptDialogContext = createContext<PromptDialogContextI>({
  open: false,
  setOpen: () => false,
  details: { title: "" },
  setDetails: () => {},
  isCancelled: false,
  isConfirm: false,
});

export const usePromptContext = () => {
  const context = useContext(PromptDialogContext);

  if (!context) throw new Error("Context is out of scope.");

  return context;
};
export const PromptProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    open,
    setOpen,
    promptDetails,
    setPromptDetails,
    isCancelled,
    isConfirm,
    confirm,
    cancel,
    configurePrompt,
    showPrompt
  } = usePrompt();
  return (
    <PromptDialogContext.Provider
      value={{
        open,
        setOpen,
        details: promptDetails,
        setDetails: setPromptDetails,
        isCancelled,
        isConfirm,
        confirm,
        cancel,
        configurePrompt,
        showPrompt
      }}
    >
      <PromptDialog
        open={open}
        setOpen={setOpen}
        title={promptDetails.title}
        description={promptDetails?.description}
      />
      {children}
    </PromptDialogContext.Provider>
  );
};
