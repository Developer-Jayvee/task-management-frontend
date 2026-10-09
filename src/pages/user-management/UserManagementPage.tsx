import { UserProvider } from "@/contexts/UserContext";
import UserManagementContent from "./UserManagementContent";
import useUserManagement from "@/features/user-management/hooks/useUserManagement";

export default function UserManagementPage() {
  const { tenantMembersResponse, fetchMembers, open, setOpen, generate, generatedLinkResponse, filterUserList } =
    useUserManagement();

  return (
    <UserProvider
      data={{
        list: tenantMembersResponse.data?.data,
        meta:  tenantMembersResponse?.data?.meta,
        fetchMembers,
        open,
        setOpen,
        generateInvitation: generate,
        generatedLinkData: generatedLinkResponse,
        filterUserList,
      }}
    >
      <UserManagementContent />
    </UserProvider>
  );
}
