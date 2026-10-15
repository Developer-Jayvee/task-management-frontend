import { Card, CardContent, CardHeader } from "@/components/ui/card";
import UserTable from "@/features/user-management/components/table/user-table";
import TableFilters from "@/features/user-management/components/table/table-filters";
import CreateUserForm from "@/features/user-management/components/create-user-form";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { useUserContext } from "@/contexts/UserContext";
import { INVITE_USER_MODAL_ID } from "@/features/user-management/data/defaultValues";
import ResetPasswordForm from "@/features/user-management/components/reset-password-form";

export default function UserManagementContent() {
  const { setOpen, setModalId } = useUserContext();

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
            <Button
              onClick={() => {
                setOpen?.(true);
                setModalId?.(INVITE_USER_MODAL_ID);
              }}
            >
              <User size={16} /> Invite User
            </Button>
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

      <CreateUserForm />
      <ResetPasswordForm />
    </div>
  );
}
