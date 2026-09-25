import { useForm, type SubmitHandler } from "react-hook-form";
import {
  type ProjectCardI,
  type ProjectFormData,
  projectSchema,
} from "../types/projectTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  deleteProjectQuery,
  getProjectQuery,
  getProjectsQuery,
} from "../services/queryService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProject, updateProject } from "../services/api/project-api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function useProjects() {
  const queryClient = useQueryClient();
  const fetchQuery = getProjectsQuery();
  const [open, setIsOpen] = useState<boolean>(false);

  const projectForm = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
  });

  const createMutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      toast.success("Saved success");
      setIsOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["project-list"],
      });
    },
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: ProjectFormData }) =>
      updateProject(id, data),
    onSuccess: () => {
      toast.success("Update success");
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: ["project-list"] });
    },
  });
  const deleteMutation = deleteProjectQuery();

  const projectList: Array<ProjectCardI> = fetchQuery.data;
  const getProjects = () => fetchQuery.refetch();
  const getProjectDetails = (id: string) => getProjectQuery(id);
  const deleteProject = async (id: string) => {
    try {
      await deleteMutation.mutateAsync({ id });
      queryClient.invalidateQueries({ queryKey: ["project-list"] });
      toast.success("Delete success");
    } catch (error) {
      toast.error("Error found on delete");
    }
  };

  const submitForm: SubmitHandler<ProjectFormData> = (
    data: ProjectFormData,
  ) => {
    if (data.id) {
      updateMutation.mutate({ id: data.id, data: data });

      return;
    }
    createMutation.mutate(data);
  };

  const setProjectForm = (data: ProjectFormData) => {
    setIsOpen(true);
    projectForm.reset({
      id: String(data?.id),
      name: data.name,
      description: data.description,
    });
  };

  useEffect(() => {
    if (!open)
      projectForm.reset({
        id: undefined,
        name: "",
        description: undefined,
      });
  }, [open]);

  return {
    projectForm,
    submitForm,
    getProjects,
    createMutation,
    open,
    setIsOpen,
    projectList,
    getProjectDetails,
    setProjectForm,
    deleteProject,
  };
}
