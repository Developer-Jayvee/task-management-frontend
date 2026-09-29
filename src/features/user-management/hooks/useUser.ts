import { useState } from "react";
import {
  generateLinkQuery,
  tenantMembersQuery,
  verifyLinkQuery,
} from "../services/queryService";

export default function useUser() {
  const [link, setLink] = useState<string | undefined>();

  const verifyLink = verifyLinkQuery(link);
  const generateLink = generateLinkQuery();
  const tenantMembers = tenantMembersQuery();

  const confirmLink = (url?: string) => {
    if (!url) return false;
    const uri = window.location.pathname.split("/")?.[2];
    if (!uri) return false;
    setLink(uri);
  };
  
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
  };
}
