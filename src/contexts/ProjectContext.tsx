import useProjectView from "@/features/projects/hooks/useProjectView";
import type { ProjectContextI } from "@/features/projects/types/projectTypes";
import { createContext, useContext } from "react";

export const ProjectContext = createContext<ProjectContextI>({});

export const useProjectContext = () => {
  const context = useContext(ProjectContext);

  if (!context) throw new Error("Context is out of scope.");

  return context;
};
export const ProjectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data, setSelectedProject } = useProjectView();
  return (
    <ProjectContext.Provider
      value={{
        data,
        setSelectedProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
