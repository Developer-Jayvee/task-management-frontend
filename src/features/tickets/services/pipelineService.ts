import { useMutation } from "@tanstack/react-query";
import { transitionAPI } from "./api/pipeline";
import type { TicketStatus } from "../types/ticket-types";


export const useTransitionQuery = () => {
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: TicketStatus }) =>
      transitionAPI(id, status),
  });
};
