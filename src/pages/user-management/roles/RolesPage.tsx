import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRoleContext } from "@/contexts/RolePageContext";
import PermissionsForm from "@/features/user-management/roles/components/permissions-form";
import VerticalOptions from "@/features/user-management/roles/components/vertical-options";

type RoleList = "owner" | "member" | undefined;
function RolesTable() {
  const { list } = useRoleContext();
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Role</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className=" md:table-cell"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {typeof list === "object" && list.length > 0 ? (
            list.map((role) => (
              <TableRow key={role.id}>
                <TableCell >
                  <Badge variant="ghost">{role.name}</Badge>
                </TableCell>

                <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                  {role?.created_at &&
                    new Date(role?.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                </TableCell>
                <TableCell>
                  <VerticalOptions role={role.name as unknown as RoleList}  roleId={role.id}/>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={3}
                className="h-24 text-center text-muted-foreground"
              >
                No Role found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default function RolesPage() {
  return (
    <div className="min-h-screen bg-background p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Role Management
            </h1>
            <p className="text-sm text-muted-foreground">
              View team members and filter by their assigned role.
            </p>
          </div>
        </div>
        <Card>
          <CardHeader>{/* <TableFilters /> */}</CardHeader>
          <CardContent>
            <RolesTable />
          </CardContent>
        </Card>
      </div>
      <PermissionsForm/>
    </div>
  );
}
