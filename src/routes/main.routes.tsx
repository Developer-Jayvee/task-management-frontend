import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";




const AuthenticatedLayout = lazy(
  () => import("@/components/layouts/AuthenticatedLayout")
)
const GuestLayout = lazy(() => import("@/components/layouts/GuestLayout"))
const LoginPage = lazy(() => import("@/pages/auth/LoginPage"))
const RegisterPage = lazy(() => import("@/pages/auth/RegisterPage"))
const ProjectBaseView = lazy(
  () => import("@/pages/project/detailed/ProjectBaseView")
)
const ProjectPage = lazy(() => import("@/pages/project/ProjectPage"))
const ResetPasswordPage = lazy(
  () => import("@/pages/reset-password/ResetPasswordPage")
)
const UserManagementPage = lazy(
  () => import("@/pages/user-management/users/UserManagementPage")
)
const RolePage = lazy(() => import("@/pages/user-management/roles/RolesPage"))

const routeLoading = (
  <div className="flex min-h-screen items-center justify-center" role="status">
    Loading...
  </div>
)
const MainRoutes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={routeLoading}>
        <GuestLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="login" replace />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "reset-password",
        element: <ResetPasswordPage />,
      },
    ],
  },
  {
    path: ":slug",
    element: (
      <Suspense fallback={routeLoading}>
        <AuthenticatedLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="project-management" replace />,
      },
      {
        path: "project-management",
        element: <ProjectPage />,
      },
      {
        path: "project-management/:id/tickets",
        element: <ProjectBaseView />,
      },
      {
        path: "user-management",
        children: [
          {
            index: true,
            element: <Navigate to="users" replace />,
          },
          {
            path: "users",
            element: <UserManagementPage />,
          },
          {
            path: "roles",
            element: <RolePage />,
          }
        ],
      },
    ],
  },
]);

export default MainRoutes;
