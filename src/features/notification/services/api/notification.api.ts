import http from "@/lib/axios";
import type { NotifiCountAPIData } from "../../types/api.types";

const PREFIX = "notification";
export const getNotificationCounts = async (): Promise<NotifiCountAPIData> => {
  const response = await http.get(`${PREFIX}/count`);

  return await response?.data;
};
