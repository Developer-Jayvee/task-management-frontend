import { useState } from "react";
import { getTicketListQuery } from "../services/queryService";
import type { TicketStatus } from "../types/ticket-types";

export default function useTicketDataTable() {
  const [page,setPage] = useState<number | undefined>();
  const [perPage,setPerPage] = useState<number | undefined>();
  const [status,setStatus] = useState<"all" | "to-do" | "in-progress" | "completed">("all");
  const listQuery = getTicketListQuery({ page , perPage, status });
  const [tab, setTab] = useState<"all" | TicketStatus>("all");
  const updatePage = (perPage ?: number , pageIndex ?: number , status ?: "all" | "to-do" | "in-progress" | "completed") => {
    if( pageIndex !== null) setPage(pageIndex);
    if(perPage !== null) setPerPage(perPage);
    if(status || status !== undefined) setStatus(prev => status) 
  }
  const refetchTicketTable = () => { 
    listQuery.refetch();
   };
  return {
    listQuery,
    tab,
    setTab,
    updatePage,
    page,
    perPage,
    refetchTicketTable,
    setStatus
  };
}
