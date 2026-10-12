import type { Dispatch, SetStateAction } from "react";

export interface CustomDialogI {
  children: React.ReactNode;
  buttonElement: React.ReactElement;
  buttonElementCallBack ?: () => void;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  hasTriggerBtn ?: boolean;
}

export interface PromptDialogI extends Omit<
  CustomDialogI,
  "buttonElement" | "children"
> {
  title: string;
  description?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
 
}

export interface PromptDialogContextI {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  details: { title: string; description ?: string };
  setDetails: Dispatch<SetStateAction<{ title: string; description ?: string }>>;
  isConfirm ?: boolean;
  isCancelled ?: boolean;
  confirm ?: () => Promise<void>;
  cancel ?: () => void;
  configurePrompt ?: ({ title , description , promptId , callback } :  {
    title: string;
    description ?: string;
    callback : (() => Promise<void>) | null;
    promptId : string|null;
  }) => Promise<void>;
  showPrompt ?: () => void;
} 
