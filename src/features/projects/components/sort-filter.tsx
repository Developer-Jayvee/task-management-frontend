import { Field } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const items = [
  { label: "Select sort", value: null },
  { value: "desc", label: "Newest" },
  { value: "asc", label: "Oldest" },
];

export function SortFilter({ onChange } : { onChange: (sort ?: "asc"|"desc" ) => void; }) {
  return (
  <Field className="w-full max-w-xs">
      {/* <FieldLabel>Department</FieldLabel> */}
       <Select
        items={items}
        onValueChange={(value) => {
          onChange(value as "asc" | "desc");
        }}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  );
}
