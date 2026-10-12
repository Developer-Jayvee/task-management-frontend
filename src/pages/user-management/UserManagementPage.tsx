import { UserProvider } from "@/contexts/UserContext";
import UserManagementContent from "./UserManagementContent";
import useUserManagement from "@/features/user-management/hooks/useUserManagement";
import { useEffect } from "react";

export default function UserManagementPage() {
  const {
    tenantMembersResponse,
    fetchMembers,
    open,
    setOpen,
    generate,
    generatedLinkResponse,
    filterUserList,
    modalId,
    setModalId,
  } = useUserManagement();

  useEffect(() => {
    if(! open) setModalId(undefined);
  },[modalId,open])
  return (
    <UserProvider
      data={{
        list: tenantMembersResponse.data?.data,
        meta: tenantMembersResponse?.data?.meta,
        fetchMembers,
        open,
        setOpen,
        generateInvitation: generate,
        generatedLinkData: generatedLinkResponse,
        filterUserList,
        modalId,
        setModalId,
      }}
    >
      <UserManagementContent />
    </UserProvider>
  );
}
