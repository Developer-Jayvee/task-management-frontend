// import { Button } from "@/components/ui/button";
import { ProjectCardProvider } from "@/contexts/ProjectCardContext";
import useProjects from "@/features/projects/hooks/useProjects";
import { useEffect } from "react";
import ProjectBody from "./ProjectBody";



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
    sortProject
  } = useProjects();

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
