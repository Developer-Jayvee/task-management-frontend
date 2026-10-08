import { useState } from "react";
import { showTicketQuery } from "../services/queryService";
import type { TicketResponseData } from "../types/ticket-types";

export default function useTicketView() {
  const [selected, setSelected] = useState<string | undefined>();
  const showQuery = showTicketQuery(selected);
  const details =  showQuery.data as TicketResponseData;

  
  return {
    details,
    selected,
    setSelectedTicket: (id ?: string) => {
      setSelected(id);
    },
  };
}
