import { UserProvider } from "@/contexts/UserContext";
import UserManagementContent from "./UserManagementContent";
import useUserManagement from "@/features/user-management/hooks/useUserManagement";


export default function UserManagementPage() {

    const { tenantMembersResponse, fetchMembers } = useUserManagement();
    
    return <UserProvider data={{
        list: tenantMembersResponse.data,
        fetchMembers
    }}>
        <UserManagementContent/>
    </UserProvider>
}