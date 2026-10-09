import type { Dispatch, SetStateAction } from "react";
import type { PaginationData, PaginationMetaData } from "@/features/common/types/paginationTypes";



export interface QueryResponseData  {
    data : any;
    isSuccess : boolean;
    isError : boolean;
}

export interface UserContextI {
    list ?: PaginationData;
    meta ?: PaginationMetaData;
    fetchMembers ?: () => void;
    open ?: boolean;
    setOpen ?: Dispatch<SetStateAction<boolean>>;
    generateInvitation ?: () => Promise<void>;
  generatedLinkData?: QueryResponseData;
  filterUserList ?: ({ role , term, pageIndex , perPage  } : { role ?: "owner" | "member"; term ?: string; perPage ?: number; pageIndex ?: number; } ) => void; 
}