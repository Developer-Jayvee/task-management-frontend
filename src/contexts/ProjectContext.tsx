import type { ProjectContextI } from "@/features/projects/types/projectTypes";
import { createContext, useContext } from "react";

export const ProjectContext = createContext<ProjectContextI>({
  ticketList: []
});

export const useProjectContext = () => {
  const context = useContext(ProjectContext);

  if (!context) throw new Error("Context is out of scope.");

  return context;
};
export const ProjectProvider = ({
  children,
  data,
}: {
  children: React.ReactNode;
  data: ProjectContextI;
}) => {
    return <ProjectContext.Provider value={data}>
        {children}
    </ProjectContext.Provider>
};
