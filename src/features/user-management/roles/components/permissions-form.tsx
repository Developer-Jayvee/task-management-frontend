import { CustomDialog } from "@/components/custom-dialog";
import {
  DialogContent,
  DialogFooter,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRoleContext } from "@/contexts/RolePageContext";
import usePermissions from "@/features/permissions/hooks/usePermissions";
import PermissionList from "./permission-list";
import { Save, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function PermissionsForm() {
  const { open, setOpen, selectedRole } = useRoleContext();
  const {
    permissionList,
    updatePermissionCallback,
    isUpdating,
    isLoading,
    hasError,
  } = usePermissions(selectedRole);
  const [selectedPermissionIds, setSelectedPermissionIds] = useState<number[]>([]);

  useEffect(() => {
    setSelectedPermissionIds(
      Object.values(permissionList)
        .flat()
        .filter((permission) => permission.is_active)
        .map((permission) => Number(permission.permission_id))
    );
  }, [open, permissionList]);

  const handlePermissionChange = (permissionId: number, checked: boolean) => {
    console.log(permissionId);
    
    setSelectedPermissionIds((current) =>
      checked
        ? [...new Set([...current, permissionId])]
        : current.filter((id) => id !== permissionId)
    );
  };

  const handleUpdate = async () => {
    if (!selectedRole) return;

    const updated = await updatePermissionCallback({
      role: selectedRole,
      permission_ids: selectedPermissionIds,
    });

    if (updated) setOpen(false);
  };

  return (
    <CustomDialog
      {...{
        open,
        setOpen,
        buttonElement: <></>,
        hasTriggerBtn: false,
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="flex max-h-[min(85vh,48rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-2xl"
      >
        <DialogHeader className="border-b px-6 py-5">
          <DialogTitle>Manage permissions</DialogTitle>
          <DialogDescription>
            Choose which actions are available to the {selectedRole ?? "selected"} role.
          </DialogDescription>
        </DialogHeader>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
          <PermissionList
            permissionList={permissionList}
            selectedPermissionIds={selectedPermissionIds}
            onPermissionChange={handlePermissionChange}
            isLoading={isLoading}
            hasError={hasError}
          />
        </div>

        <DialogFooter className="border-t bg-muted/30 px-6 py-4">
          <DialogClose render={<Button variant="outline" disabled={isUpdating} />}>
            <X aria-hidden="true" />
            Close
          </DialogClose>
          <Button
            onClick={handleUpdate}
            disabled={!selectedRole || isLoading || hasError || isUpdating}
          >
            <Save aria-hidden="true" />
            {isUpdating ? "Updating…" : "Update permissions"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </CustomDialog>
  );
}
