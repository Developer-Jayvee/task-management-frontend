import type { UserResponseData } from "./user-types";



export interface UserContextI {
    list : UserResponseData[] | [];
    fetchMembers ?: () => void;
}