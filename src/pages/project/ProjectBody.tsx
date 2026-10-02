import { CustomDialog } from "@/components/custom-dialog";
import { useProjectCardContext } from "@/contexts/ProjectCardContext";
import CreateForm from "@/features/projects/components/create-form";
import ProjectCard from "@/features/projects/components/project-card";
import SearchField from "@/features/projects/components/search-field";
import { SortFilter } from "@/features/projects/components/sort-filter";
import { FolderKanban, Plus } from "lucide-react";
import { FormProvider } from "react-hook-form";


export default function ProjectBody() {
    const {
        setOpen,
        open,
        projectForm,
        projectList,
        confirmProject,
        searchProject,
        sortProject
    } = useProjectCardContext()
    return (
        
      <div className="grid grid-rows-[100px_auto_1fr] gap-2 flex-1">
        <div className="flex justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
            <p className="text-sm text-muted-foreground">
              Manage your projects and track progress across your team
            </p>
          </div>
          <div>

            <CustomDialog
              open={open ?? false}
              setOpen={setOpen ?? (() => {})}
              buttonElement={<><Plus/> Create Project</>}>
                {
                    projectForm && (
                        <FormProvider {...projectForm}>
                            <CreateForm submitHandler={confirmProject ?? (() => {})} />
                        </FormProvider>
                    )
                }
            </CustomDialog>

          </div>
        </div>
        <div className="">
          <div className="flex justify-between">
            <div className="flex items-center gap-10">
              <SearchField onSearch={(value) => searchProject?.(value)} />
              <SortFilter onChange={(value) => sortProject?.(value)} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))]">
          {Array.isArray(projectList) && projectList.length === 0 && (
            <div className="col-span-full flex min-h-72 flex-col items-center justify-center rounded-xl border border-dashed bg-card px-6 py-10 text-center">
              <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                <FolderKanban className="size-7" aria-hidden="true" />
              </div>
              <h2 className="text-lg font-semibold tracking-tight">No projects yet</h2>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                Create a project to organize your team’s tickets and track work in one place.
              </p>
              <button
                type="button"
                onClick={() => setOpen?.(true)}
                className="mt-5 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <Plus className="size-4" aria-hidden="true" />
                Create your first project
              </button>
            </div>
          )}
          {Array.isArray(projectList) && projectList.length > 0 &&
            projectList.map((data, index) => {
              return <ProjectCard data={data} key={index} />;
            })}
        </div>
      </div>
    )
}