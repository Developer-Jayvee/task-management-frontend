import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useUserContext } from "@/contexts/UserContext";
import { useDataTableUser } from "../../data/table-data";
import type { UserDataTableData } from "../../types/user-types";
import ServerSidePagination from "@/components/server-side-pagination";
import { DefaultUserData } from "../../data/defaultValues";
import UserTableActions from "./user-table-actions";
export default function UserTable() {
  const { list: data, meta, filterUserList } = useUserContext();
  const datatable = useDataTableUser({
    data: (data as unknown as UserDataTableData[]) ?? [DefaultUserData],
    totalCount: meta?.total ?? 0,
  });
  const list = datatable.getRowModel().rows.map((row) => row?.original);

  const onPerPageChange = ({
    pageIndex,
    perPage,
  }: {
    pageIndex?: number;
    perPage?: number;
  }) => {
    filterUserList?.({ pageIndex, perPage });
  };
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">
              <Checkbox />
            </TableHead>
            <TableHead>User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="hidden md:table-cell">Joined</TableHead>
            <TableHead className="w-17.5 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list?.map((user) => (
            <TableRow key={user.user_id}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name ?? "Unknown")}`}
                      alt={user?.name}
                    />
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{user?.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {user?.email}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="ghost">{user?.role}</Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                {user?.created_at &&
                  new Date(user?.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
              </TableCell>
              <TableCell>
                {
                  user.role !== "owner" && (
                    <UserTableActions />
                  )
                }
               
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {meta && (
        <ServerSidePagination meta={meta} onPerPageChange={onPerPageChange} />
      )}
    </div>
  );
}
