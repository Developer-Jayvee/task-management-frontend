import { create } from "zustand";
import type { TicketStoreData } from "./types/ticketStoreTypes";
import { persist } from "zustand/middleware";

export const useTicketStore = create(
  persist<TicketStoreData>(
    (set) => ({
      ticketList: [],
      setTicketList: (ticketList) => set({ ticketList }),
    }),
    {
      name: "ticket-store",
    },
  ),
);
