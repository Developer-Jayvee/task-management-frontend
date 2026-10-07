import { useState } from "react";
import { getTicketListQuery } from "../services/queryService";
import type { TicketStatus } from "../types/ticket-types";

export default function useTicketDataTable() {
  const [page,setPage] = useState<number | undefined>();
  const [perPage,setPerPage] = useState<number | undefined>();
  const listQuery = getTicketListQuery({ page , perPage});
  const [tab, setTab] = useState<"all" | TicketStatus>("all");
  const updatePage = (perPage ?: number , pageIndex ?: number) => {
    if( pageIndex !== null) setPage(pageIndex);
    if(perPage !== null) setPerPage(perPage);
  }
  const refetchTicketTable = () => { 
    console.log(1);
    
    listQuery.refetch();
   };
  return {
    listQuery,
    tab,
    setTab,
    updatePage,
    page,
    perPage,
    refetchTicketTable
  };
}
