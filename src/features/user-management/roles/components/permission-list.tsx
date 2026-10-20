import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import type { PermissionData } from "@/features/permissions/types/data.types";

type PermissionListProps = {
  permissionList: Record<string, PermissionData[]>;
  selectedPermissionIds: number[];
  onPermissionChange: (permissionId: number, checked: boolean) => void;
  isLoading: boolean;
  hasError: boolean;
};

export default function PermissionList({
  permissionList,
  selectedPermissionIds,
  onPermissionChange,
  isLoading,
  hasError,
}: PermissionListProps) {
  if (isLoading) {
    return <p className="py-10 text-center text-sm text-muted-foreground">Loading permissions…</p>;
  }

  if (hasError) {
    return <p className="py-10 text-center text-sm text-destructive">Unable to load permissions. Please try again.</p>;
  }

  if (Object.keys(permissionList).length === 0) {
    return <p className="py-10 text-center text-sm text-muted-foreground">No permissions are available for this role.</p>;
  }

  return (
    <FieldGroup className="w-full gap-4">
      {Object.entries(permissionList).map(([category, permissions]) => (
        <FieldSet key={category} className="rounded-md border bg-card p-4">
          <FieldLegend variant="label" className="mb-4 text-muted-foreground">
            {category}
          </FieldLegend>

          <FieldGroup className="flex-row flex-wrap gap-x-6 gap-y-4">
            {permissions.map((permission) => {
              const permissionId = Number(permission.permission_id);
              const id = `permission-${permission.permission_id}`;

              return (
                <Field
                  key={permission.permission_id}
                  orientation="horizontal"
                  className="w-fit items-center gap-2"
                >
                  <Checkbox
                    id={id}
                    value={permission.permission_id}
                    checked={selectedPermissionIds.includes(permissionId)}
                    onCheckedChange={(checked) =>
                      onPermissionChange(permissionId, checked === true)
                    }
                  />
                  <FieldLabel htmlFor={id} className="cursor-pointer font-normal">
                    {permission.description}
                  </FieldLabel>
                </Field>
              );
            })}
          </FieldGroup>
        </FieldSet>
      ))}
    </FieldGroup>
  );
}
