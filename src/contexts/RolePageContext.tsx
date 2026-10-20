import type { RolePageContextData } from "@/features/user-management/roles/types/context.types";
import { createContext, useContext } from "react";


export const RoleContext = createContext<RolePageContextData | undefined>(undefined);
export const useRoleContext = () => {
    const context = useContext(RoleContext);
    if(! context) throw new Error("Context is out of scope");
    return context;
}
export const RolePageContextProvider = ({
    children,
    data
}: { children: React.ReactNode; data: RolePageContextData; }) => {
    return <RoleContext.Provider value={data}>
        {children}
    </RoleContext.Provider>
}