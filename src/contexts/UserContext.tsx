import type { UserContextI } from "@/features/user-management/types/context-types";
import { createContext, useContext } from "react";

export const UserContext = createContext<UserContextI>({
  list: []
});

export const useUserContext = () => {
  const context = useContext(UserContext);
  
  if (!context) throw new Error("Context out of scope.");

  return context;
};

export const UserProvider = ({
  children,
  data,
}: {
  children: React.ReactNode;
  data: UserContextI;
}) => {
  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};
