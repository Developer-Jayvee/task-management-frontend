import type { ProjectCardContextI } from "@/features/projects/types/projectTypes";
import { createContext, useContext } from "react";


export const ProjectCardContext = createContext<ProjectCardContextI>({
    projectList: undefined,
    open: false,
    setOpen: () => false,
    projectForm : undefined,
    submitForm : undefined,
    setProjectForm : undefined,
    deleteProject: undefined
});

export const useProjectCardContext = (): ProjectCardContextI => {
    const context = useContext(ProjectCardContext);

    if(! context || context === undefined ) {
        throw new Error("Context is out of scope");
    }
    return context;
}

export const ProjectCardProvider = ({ children, data } : { 
    children : React.ReactNode;
    data : ProjectCardContextI;
}) => { 
    
    return <ProjectCardContext.Provider value={data}>
        {children}
    </ProjectCardContext.Provider>
}