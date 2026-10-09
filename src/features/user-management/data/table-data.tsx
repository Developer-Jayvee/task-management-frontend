import { features, useDataTable } from "@/lib/tanstack-table";
import { type ColumnDef } from "@tanstack/react-table";
import type { UserDataTableData } from "../types/user-types";

export const columns: ColumnDef<typeof features,UserDataTableData>[] = [
    {
        accessorKey: 'id',
        header:"#"
    },
    {
        accessorFn: (row) => row.name,
        accessorKey: 'name',
        header: 'Name'
    },
    {
        accessorKey: 'role',
        header: 'Role'
    },
    {
        accessorFn: (row) => row.created_at,
        accessorKey: 'created_at',
        header: 'Joined'
    },
]

export const useDataTableUser = ({ 
    data,
    pageIndex = 0,
    pageSize = 10,
    totalCount
} : {
    data: Array<UserDataTableData>;
    pageIndex ?: number;
    pageSize ?: number;
    totalCount : number;
    isManualPagination ?: boolean;
}) => {
    return useDataTable<UserDataTableData>({
        key: "user-table",
        data,
        columns,
        pageIndex: pageIndex ?? 0,
        pageSize: pageSize ?? 10,
        rowCount: totalCount
    });
}