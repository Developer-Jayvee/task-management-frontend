import type { Dispatch, SetStateAction } from "react";

export interface CustomDialogI {
  children: React.ReactNode;
  buttonElement: React.ReactElement;
  open : boolean;
  setOpen : Dispatch<SetStateAction<boolean>>;
}