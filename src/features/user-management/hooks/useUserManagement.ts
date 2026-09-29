import { useState } from "react";
import {
  generateLinkQuery,
  tenantMembersQuery,
  verifyLinkQuery,
} from "../services/queryService";
import { useQueryClient } from "@tanstack/react-query";

export default function useUserManagement() {
  const [link, setLink] = useState<string | undefined>();

  const queryClient = useQueryClient();
  const verifyLink = verifyLinkQuery(link);
  const generateLink = generateLinkQuery();
  const tenantMembers = tenantMembersQuery();
  
  const confirmLink = (url?: string) => {
    if (!url) return false;
    const uri = window.location.pathname.split("/")?.[2];
    if (!uri) return false;
    setLink(uri);
  };
  const fetchMembers = () => {
    queryClient.invalidateQueries({
      queryKey: ['tenant-members']
    })
  }
  
  return {
    confirmLink,
    generateLinkResponse: {
      data: generateLink.data,
      isSuccess: generateLink.isSuccess,
      isError: generateLink.isError,
    },
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
    fetchMembers
  };
}
