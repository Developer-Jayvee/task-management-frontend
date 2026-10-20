import { RolePageContextProvider } from "@/contexts/RolePageContext";
import useRole from "@/features/user-management/roles/hooks/useRole";
import RolesPage from "./RolesPage";


export default function RolesLayout() {
    const data = useRole()
    return <RolePageContextProvider
    data={{...data}}
    >
        <RolesPage/>
    </RolePageContextProvider>
}