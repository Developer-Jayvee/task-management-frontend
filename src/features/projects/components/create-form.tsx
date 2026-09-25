import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext, type SubmitHandler } from "react-hook-form";
import { type ProjectFormData } from "../types/projectTypes";

export default function CreateForm({ submitHandler } : { submitHandler : SubmitHandler<ProjectFormData>}) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useFormContext<ProjectFormData>();
  return (
    <DialogContent className="sm:max-w-125">
      <form onSubmit={handleSubmit(submitHandler,(err) => console.log(err))}>
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>
            Create a new project by providing a name and description.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          {/* Name */}
          <Field>
            <FieldLabel htmlFor="project-name">Name</FieldLabel>

            <FieldContent>
              <Input
                id="project-name"
                placeholder="Enter project name"
                {...register("name")}
              />

              <FieldError errors={[errors.name]} />
            </FieldContent>
          </Field>

          {/* Description */}
          <Field>
            <FieldLabel htmlFor="project-description">Description</FieldLabel>

            <FieldContent>
              <Textarea
                id="project-description"
                placeholder="Enter project description"
                className="min-h-24 resize-none"
                {...register("description")}
              />
            </FieldContent>
          </Field>
        </div>

        <DialogFooter>
          <Button type="submit">Create Project</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
