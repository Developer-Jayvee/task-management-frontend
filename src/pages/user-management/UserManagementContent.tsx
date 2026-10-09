import { Card, CardContent, CardHeader } from "@/components/ui/card";
import UserTable from "@/features/user-management/components/table/user-table";
import TableFilters from "@/features/user-management/components/table/table-filters";
import CreateUserForm from "@/features/user-management/components/create-user-form";

export default function UserManagementContent() {
  return (
    <div className="min-h-screen bg-background p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              User Management
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage your team members, roles, and permissions.
            </p>
          </div>
          <div className="">
            <CreateUserForm />
          </div>
        </div>
        {/* Table Card */}
        <Card>
          <CardHeader>
            <TableFilters />
          </CardHeader>
          <CardContent>
            <UserTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
