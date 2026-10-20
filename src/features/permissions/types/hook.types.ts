

export interface UpdatePermissionData {
    role : "owner" | "member";
    permission_ids: Array<number>;
}