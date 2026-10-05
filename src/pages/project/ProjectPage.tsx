// import { Button } from "@/components/ui/button";
import { ProjectCardProvider } from "@/contexts/ProjectCardContext";
import useProjects from "@/features/projects/hooks/useProjects";
import { useEffect } from "react";
import ProjectBody from "./ProjectBody";
import { useTicketStore } from "@/stores/useTicketStore";



export default function ProjectPage() {
  const {
    getProjects,
    projectForm,
    setIsOpen,
    open,
    submitForm,
    projectList,
    setProjectForm,
    deleteProject,
    confirmProject,
    searchProject,
    sortProject,
  } = useProjects();
  const setTicketStore = useTicketStore((state) => state.setTicketList)

  useEffect(() => {
    setTicketStore(projectList)
  },[projectList]);
  
  useEffect(() => {
    getProjects();
  }, []);

  return (
    <ProjectCardProvider data={{ 
      projectList: projectList,
      setOpen : setIsOpen,
      open: open, 
      projectForm: projectForm,
      submitForm: submitForm,
      setProjectForm: setProjectForm,
      deleteProject: deleteProject,
      confirmProject,
      searchProject,
      sortProject
     }}>
      <ProjectBody/>
    </ProjectCardProvider>
  );
}
