import { useState } from "react";
import {
  generateLinkQuery,
  resetPasswordMutation,
  tenantMembersQuery,
  verifyLinkQuery,
} from "../services/queryService";
import { useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { toast } from "react-toastify";
import type { UserDataTableData } from "../types/user-types";

export default function useUserManagement() {
  const [link, setLink] = useState<string | undefined>();
  const [open, setOpen] = useState<boolean>(false);
  const [modalId,setModalId] = useState<string|undefined>()
  const [sort, setSort] = useState<"owner" | "member" | undefined>();
  const [page,setPage] = useState<number | undefined>();
  const [perPage,setPerPage] = useState<number | undefined>();
  const [search,setSearch] = useState<string|undefined>();
  const [selectedUser,setSelectedUser] = useState<UserDataTableData|undefined>();
  const [debounceSearch] = useDebounce(search,500);
  const queryClient = useQueryClient();
  const verifyLink = verifyLinkQuery(link);
  const generateLink = generateLinkQuery();
  const tenantMembers = tenantMembersQuery({sort, search: debounceSearch , page , perPage });
  const resetPassQuery = resetPasswordMutation();
  const confirmLink = (url?: string) => {
    if (!url) return false;
    setLink(url);
  };
  const fetchMembers = () => {
    queryClient.invalidateQueries({
      queryKey: ['tenant-members']
    })
  }
  const generate = async () => {
    try {
      await generateLink.mutateAsync();
    } catch (error) {
      console.warn('Error found in;',error)
    }
  } 
  const filterUserList = ({ role , term , perPage , pageIndex  } : { role ?: "owner" | "member"; term ?: string; perPage ?: number; pageIndex ?: number;  } ) => {
    setSort(role);
    if(pageIndex ) setPage(pageIndex);
    if(perPage) setPerPage(perPage);
    setSearch(term);
  }
  const resetPass =  async () => {
    try {
      if(! selectedUser?.email) return;
      
      await resetPassQuery.mutateAsync({email: selectedUser?.email});
      toast.success('Please check your email for reset link.')
    } catch (error) {
      toast.error('Error occured');
      console.warn('Error in ',error);
    }
  }

  return {
    confirmLink,
    generate,
    verifyLinkResponse: {
      data: verifyLink?.data,
      isSuccess: verifyLink?.isSuccess,
      isError: verifyLink?.isError,
    },
    tenantMembersResponse: {
      data: tenantMembers?.data,
      isSuccess: tenantMembers?.isSuccess,
      isError: tenantMembers?.isError,
    },
    generatedLinkResponse : {
      data: generateLink?.data,
      isSuccess: generateLink?.isSuccess,
      isError: generateLink?.isError,
    },
    fetchMembers,
    open, setOpen,
    modalId,setModalId,
    filterUserList,
    resetPass,
    setSelectedUser,
    selectedUser
  };
}
