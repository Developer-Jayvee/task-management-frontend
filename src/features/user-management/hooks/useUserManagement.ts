import { useState } from "react";
import {
  generateLinkQuery,
  tenantMembersQuery,
  verifyLinkQuery,
} from "../services/queryService";
import { useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

export default function useUserManagement() {
  const [link, setLink] = useState<string | undefined>();
  const [open, setOpen] = useState<boolean>(false);
  const [sort, setSort] = useState<"owner" | "member" | undefined>();
  const [search,setSearch] = useState<string|undefined>();
  const [debounceSearch] = useDebounce(search,500);
  const queryClient = useQueryClient();
  const verifyLink = verifyLinkQuery(link);
  const generateLink = generateLinkQuery();
  const tenantMembers = tenantMembersQuery({sort, search: debounceSearch});
  
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
  const filterUserList = ({ role , term  } : { role ?: "owner" | "member"; term ?: string} ) => {
    if(role) setSort(role);
    if(term) setSearch(term);
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
    filterUserList
  };
}
