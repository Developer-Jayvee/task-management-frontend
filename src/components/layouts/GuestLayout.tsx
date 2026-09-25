import { Navigate, Outlet } from "react-router-dom";
import useVerifyIdentity from "@/features/common/hooks/useVerifyIdentity";
import {  PromptProvider } from "@/contexts/PromptDialogContext";

export default function GuestLayout() {
  const { isPending , isSuccess ,data } = useVerifyIdentity()
  if(isPending) {
    return null;
  }
  
  if(isSuccess) {
    return <Navigate to={`/${data?.slug}/project-management`} replace/>
  }
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 ">
      <div className="w-full max-w-sm">
        <PromptProvider>
          <Outlet />
        </PromptProvider>
      </div>
    </div>
  );
}
