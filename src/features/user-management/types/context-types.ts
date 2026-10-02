import type { Dispatch, SetStateAction } from "react";
import type { UserResponseData } from "./user-types";



export interface QueryResponseData  {
    data : any;
    isSuccess : boolean;
    isError : boolean;
}

export interface UserContextI {
    list : UserResponseData[] | [];
    fetchMembers ?: () => void;
    open ?: boolean;
    setOpen ?: Dispatch<SetStateAction<boolean>>;
    generateInvitation ?: () => Promise<void>;
  generatedLinkData?: QueryResponseData;
  sortUserList ?: (role ?: "owner" | "member" ) => void; 
}