import { z } from "zod";


export const commentSchema = z.object({
    content: z.string().min(1,"Please fill up the required field.")
});

export type CommentData = z.infer<typeof commentSchema>;
