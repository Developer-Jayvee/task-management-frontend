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
import { useUserContext } from "@/contexts/UserContext";
export default function TableFilters() {
  const { filterUserList } = useUserContext()
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
            onKeyUp={(event) => filterUserList?.({term : event.currentTarget.value})}
          />
        </div>
        <Select defaultValue="" onValueChange={(value) => filterUserList?.({ role : value})}>
          <SelectTrigger className="w-full sm:w-[150px]" >
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Roles</SelectItem>
            <SelectItem value="owner">Owner</SelectItem>
            <SelectItem value="member">Member</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
