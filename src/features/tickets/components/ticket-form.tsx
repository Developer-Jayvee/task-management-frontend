import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PriorityData, TicketStatusData } from "../data";
import type { TicketComponentTypes } from "../types/componentTypes";
import { Controller, useFormContext } from "react-hook-form";
import { type TicketFormData } from "../types/ticket-types";

export default function TicketForm({ assigneeList, submitForm }: TicketComponentTypes) {
  const { register, handleSubmit, control } = useFormContext<TicketFormData>();
  return (
    <DialogContent className="sm:max-w-125">
      <form onSubmit={handleSubmit(submitForm,(err) => console.log(err))}>
        <DialogHeader>
          <DialogTitle>Create Ticket</DialogTitle>

          <DialogDescription>
            Create a new ticket by providing the details below.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-6">
          {/* Title */}
          <Field>
            <FieldLabel htmlFor="ticket-title">Title</FieldLabel>

            <FieldContent>
              <Input
                id="ticket-title"
                placeholder="Enter ticket title"
                {...register("title")}
              />
            </FieldContent>
          </Field>

          {/* Description */}
          <Field>
            <FieldLabel htmlFor="ticket-description">Description</FieldLabel>

            <FieldContent>
              <Textarea
                id="ticket-description"
                placeholder="Describe the issue or task..."
                className="min-h-28 resize-none"
                {...register("description")}
              />
            </FieldContent>
          </Field>

          {/* Status + Priority */}
          <div className="grid grid-cols-2 gap-4">
            {/* Status */}
            <Field>
              <FieldLabel htmlFor="ticket-status">Status</FieldLabel>

              <FieldContent>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id="ticket-status" className="w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>

                      <SelectContent>
                        {TicketStatusData.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </FieldContent>
            </Field>

            {/* Priority */}
            <Field>
              <FieldLabel htmlFor="ticket-priority">Priority</FieldLabel>

              <FieldContent>
                <Controller
                  name="priority"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id="ticket-status" className="w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>

                      <SelectContent>
                        {PriorityData.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </FieldContent>
            </Field>
          </div>

          {/* Assignee */}
          <Field>
            <FieldLabel htmlFor="ticket-assignee">Assignee</FieldLabel>

            <FieldContent>
              <Controller
                name="assignee_id"
                control={control}
                render={({ field }) => {
                  const selectedUser = assigneeList?.find(
                    (user) => user.user.id === field.value
                  );
                  return (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="ticket-status" className="w-full">
                       <SelectValue
                        placeholder="Select assignee"
                      >
                        {selectedUser?.user.name}
                      </SelectValue>
                    </SelectTrigger>

                    <SelectContent>
                      {typeof assigneeList === "object" &&
                        assigneeList.map((user) => (
                          <SelectItem key={user.user.id} value={user.user.id}>
                            {user.user.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>

                  )
                }}
              />
            </FieldContent>
          </Field>

          {/* Due Date */}
          <Field>
            <FieldLabel htmlFor="ticket-due-date">Due Date</FieldLabel>

            <FieldContent>
              <Input id="ticket-due-date" type="date" {...register('due_date')}/>
            </FieldContent>
          </Field>
        </div>

        <DialogFooter>
          <Button type="submit">Create Ticket</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
