import { useState } from "react";
import { getTicketListQuery } from "../services/queryService";
import type { TicketStatus } from "../types/ticket-types";

export default function useTicketDataTable() {
  const [page,setPage] = useState<number>(0);
  const [perPage,setPerPage] = useState<number>(10);
  const listQuery = getTicketListQuery({ page , perPage});
  const [tab, setTab] = useState<"all" | TicketStatus>("all");
  const updatePage = (page: number|null = null , perPage: number|null = null) => {
    if( page !== null) setPage(page);
    if(perPage !== null) setPerPage(perPage);
  }
  return {
    listQuery,
    tab,
    setTab,
    updatePage,
    page,
    perPage
  };
}
