import http from "@/lib/axios";
import axios from "axios";

export const generateLinkAPI = async () => {
  const response = await http.get("link/generate");
  return response?.data;
};

export const verifyLinkAPI = async (link: string| undefined) => {
  if(! link) return null;
  const response = await http.get("auth/link/verify", { params: { link } });
  return response?.data;
};

export const tenantMembersAPI = async ({ sort, search, perPage ,page } : { sort ?: string; search ?: string; perPage ?: number; page ?: number;}) => {
   const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/users/list`,
    { 
        headers: { Accept:'application/json' },
        withCredentials: true,
        params: { sort, search, perPage ,page} },
  );
  return response?.data;
}


export const toggleStatusAPI = async({ status, id }: { status: "activate" | "deactivate"; id : string; }) => {
  const response = await http.patch(`users/${id}/${status}`);

  return response?.data;
}