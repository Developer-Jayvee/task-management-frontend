import { UserProvider } from "@/contexts/UserContext";
import UserManagementContent from "./UserManagementContent";
import useUserManagement from "@/features/user-management/hooks/useUserManagement";

export default function UserManagementPage() {
  const { tenantMembersResponse, fetchMembers, open, setOpen, generate, generatedLinkResponse, sortUserList } =
    useUserManagement();

  return (
    <UserProvider
      data={{
        list: tenantMembersResponse.data,
        fetchMembers,
        open,
        setOpen,
        generateInvitation: generate,
        generatedLinkData: generatedLinkResponse,
        sortUserList
      }}
    >
      <UserManagementContent />
    </UserProvider>
  );
}
