import type { Dispatch, SetStateAction } from "react";

export interface CustomDialogI {
  children: React.ReactNode;
  buttonElement: React.ReactElement;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
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
}
