import type { ProjectViewContextI } from "@/features/projects/types/projectTypes";
import { DefaultDataTableValues } from "@/features/tickets/data/defaultValues";
import { createContext, useContext } from "react";


export const ProjectViewContext = createContext<ProjectViewContextI>({
    data_table_config: {
        data: [DefaultDataTableValues],
        isLoading: false,
        updatePage: () => {},
        page: 1,
        perPage: 10
    },
    currentTabStatus:"all"
});
export const useProjectViewContext = () => {
    const context = useContext(ProjectViewContext);
    if(!context) throw new Error("Project view is out of context");
    return context;
}
export const ProjectViewProvider = ({
    children,
    data
} : {
    children: React.ReactNode;
    data: ProjectViewContextI
}) => {
    return <ProjectViewContext.Provider value={data}>
        {children}
    </ProjectViewContext.Provider>
}