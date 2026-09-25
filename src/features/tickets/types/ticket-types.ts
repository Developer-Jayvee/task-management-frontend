import z from "zod";
import { PriorityData, TicketStatusData } from "../data";

export type TicketStatus = 'to-do' | 'in-progress' | 'completed';
export type TicketPriority = 'low' | 'medium' | 'high';

export const ticketSchema = z.object({
    'id' : z.string().optional(),
    'project_id': z.string().optional(),
    'title' : z.string().min(1,'Title required'),
    'description' : z.string().optional(),
    'status' : z.enum(TicketStatusData,'Status required'),
    'priority' : z.enum(PriorityData,'Priority Required'),
    'assignee_id' : z.number().optional(),
    'due_date' : z.string().min(7,'Due date required')
});

export type TicketFormData = z.infer<typeof ticketSchema>;


export interface TicketResponseData  {
  id: string;
  tenant_id: string;
  project_id: string;
  assignee_id: string;
  created_by: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  due_date: string;
}
