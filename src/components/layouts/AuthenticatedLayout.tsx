import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  // BreadcrumbPage,
  // BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
// import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import useVerifyIdentity from "@/features/common/hooks/useVerifyIdentity";
import { Navigate, Outlet } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Label } from "../ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import useLogout from "@/features/auth/hooks/useLogout";
import { PromptProvider } from "@/contexts/PromptDialogContext";
import { useAuthStore } from "@/stores/useAuthStore";
import { ProjectProvider } from "@/contexts/ProjectContext";

export default function AuthenticatedLayout() {
  const { isError, isPending } = useVerifyIdentity();
  const { refetch, isSuccess } = useLogout();
  const authStore = useAuthStore((state) => state.userData);
  const clearAuthStore = useAuthStore((state) => state.clearUserData)
  if (isSuccess) {
    window.location.reload();
  }
  if (isPending) {
    return null;
  }

  if (isError) {
    return <Navigate to="/login" replace />;
  }

  const logoutUser = () => {
    clearAuthStore?.();
    refetch()
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
          <div className="flex items-center">
            <SidebarTrigger className="-ml-1" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Multi-tenant Ticket Management
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {/* <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                  </BreadcrumbItem> */}
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuButton
                    size="lg"
                    className="data-open:bg-sidebar-accent data-open:text-sidebar-accent-foreground"
                  />
                }
              >
                <Avatar>
                  <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(authStore?.name ?? "Unknown")}`} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Label>{authStore?.name}</Label>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => logoutUser()}>
                  <Label>Logout</Label>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <PromptProvider>
            <ProjectProvider>
              <Outlet />
            </ProjectProvider>
          </PromptProvider>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
