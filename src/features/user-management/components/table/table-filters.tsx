import { CardDescription } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function TableFilters() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <CardDescription>&nbsp;</CardDescription>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="w-full pl-9 sm:w-[250px]"
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[150px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="editor">Editor</SelectItem>
            <SelectItem value="viewer">Viewer</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
