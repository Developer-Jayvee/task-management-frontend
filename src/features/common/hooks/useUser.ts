import type { MemberFormData } from "@/features/auth/types/authTypes";
import { getAssgineeQuery } from "../services/userQuery";


export default function useUser() {
    const assigneeQuery = getAssgineeQuery();

    const assigneeList: MemberFormData[] = assigneeQuery.data;
    const getAssignees = () =>  assigneeQuery.refetch();
    
    
    return {
        getAssignees,
        assigneeList
    }
}