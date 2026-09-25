import { CustomDialog } from "@/components/custom-dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProjectCardContext } from "@/contexts/ProjectCardContext";
import CreateForm from "@/features/projects/components/create-form";
import ProjectCard from "@/features/projects/components/project-card";
import SearchField from "@/features/projects/components/search-field";
import { SortFilter } from "@/features/projects/components/sort-filter";
import { Plus } from "lucide-react";
import { FormProvider } from "react-hook-form";


export default function ProjectBody() {
    const {
        setOpen,
        open,
        projectForm,
        projectList,
        submitForm
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
                            <CreateForm submitHandler={submitForm ?? (() => {})} />
                        </FormProvider>
                    )
                }
            </CustomDialog>

          </div>
        </div>
        <div className="">
          <div className="flex justify-between">
            <div className="flex items-center gap-10">
              <SearchField />
              <SortFilter />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(420px,1fr))] gap-4">
          {typeof projectList === "object" &&
            projectList.map((data, index) => {
              return <ProjectCard data={data} key={index} />;
            })}
        </div>
      </div>
    )
}