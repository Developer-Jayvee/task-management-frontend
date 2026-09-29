import { Field, FieldContent } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SearchField({ onSearch } : { onSearch : (search ?: string) => void; } ) {
  return (
    <Field>
      {/* <FieldLabel htmlFor="search">Search</FieldLabel> */}
      <FieldContent>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            id="search"
            type="search"
            placeholder="Search..."
            className="pl-9"
            onKeyUp={(event) => onSearch(event.currentTarget.value)}
            
          />
        </div>
      </FieldContent>
    </Field>
  );
}
