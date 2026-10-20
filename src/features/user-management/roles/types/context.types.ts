import type { Dispatch, SetStateAction } from "react";
import z from "zod";


export interface RolePageContextData {
   list : Array<RoleListData>;
   open : boolean;
   setOpen : Dispatch<SetStateAction<boolean>>;
   selectedRole ?: "owner"|"member";
   setSelectedRole : Dispatch<SetStateAction<"owner"|"member"|undefined>>;
   deleteRoleCallback : (roleId ?: string) => Promise<void>;
}

export const roleSchema = z.object({
    id : z.string().optional(),
    name: z.string().min(2,"Please fill up this field.")
});

export type RoleData = z.infer<typeof roleSchema>;
export interface RoleListData extends RoleData {
    created_at : string;
}