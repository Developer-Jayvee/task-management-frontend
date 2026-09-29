import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  UserPlus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import UserTable from "@/features/user-management/components/table/user-table";
import TableFilters from "@/features/user-management/components/table/table-filters";
const users: [] = [];

export default function UserManagementPage() {
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
          <div className="flex items-center gap-2">
            <Button size="sm">
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </div>
        </div>


        {/* Table Card */}
        <Card>
          <CardHeader>
            <TableFilters />
          </CardHeader>
          <CardContent>
            <UserTable users={users} />
            {/* Pagination */}
            <div className="flex flex-col items-center justify-between gap-4 pt-4 sm:flex-row">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">8</span> of{" "}
                <span className="font-medium">2,420</span> users
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
