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
    <div className="flex min-h-svh w-full items-center justify-center bg-linear-to-br from-slate-50 via-sky-50 to-indigo-100 p-6 md:p-10">
      <div className="w-full max-w-sm rounded-2xl border border-white/80 bg-white/60 p-3 shadow-[0_24px_60px_-20px_rgba(79,70,229,0.3)] backdrop-blur-sm">
        <PromptProvider>
          <Outlet />
        </PromptProvider>
      </div>
    </div>
  );
}
