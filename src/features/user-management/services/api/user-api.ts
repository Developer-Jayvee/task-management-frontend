import http from "@/lib/axios";

export const generateLinkAPI = async () => {
  const response = await http.get("link/generate");
  return response?.data;
};

export const verifyLinkAPI = async (link: string| undefined) => {
  if(! link) return null;
  const response = await http.get("link/verify", { params: { link } });
  return response?.data;
};

export const tenantMembersAPI = async () => {
  const response = await http.get('users/list');
  return response?.data;
}