import type { Dispatch, SetStateAction } from "react";
import type { PaginationData, PaginationMetaData } from "@/features/common/types/paginationTypes";
import type { UserDataTableData } from "./user-types";



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
    modalId ?: string;
    setModalId ?: Dispatch<SetStateAction<string|undefined>>;
    generateInvitation ?: () => Promise<void>;
    generatedLinkData?: QueryResponseData;
    filterUserList ?: ({ role , term, pageIndex , perPage  } : { role ?: "owner" | "member"; term ?: string; perPage ?: number; pageIndex ?: number; } ) => void; 
    resetPass ?: () => Promise<void>;
    setSelectedUser ?: Dispatch<SetStateAction<UserDataTableData|undefined>>;
    selectedUser ?: UserDataTableData;
}