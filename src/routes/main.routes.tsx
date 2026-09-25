import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout";
import GuestLayout from "@/components/layouts/GuestLayout";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ProjectDetailed from "@/pages/project/detailed/ProjectDetailed";
import ProjectPage from "@/pages/project/ProjectPage";
import UserManagementPage from "@/pages/user-management/UserManagementPage";
import { createBrowserRouter, Navigate } from "react-router-dom";


const MainRoutes = createBrowserRouter([
    {
        path:"/",
        element: <GuestLayout/>,
        children: [
            {
                index:true,
                element:<Navigate to="login" replace/>
            },
            {
                path:"login",
                element:<LoginPage/>
            },
            {
                path:"register",
                element: <RegisterPage/>
            }
        ]
    },
    {
        path:':slug',
        element:<AuthenticatedLayout/>,
        children: [
            {
                index:true,
                element:<Navigate to="project-management" replace/>
            },
            {
                path:"project-management",
                element:<ProjectPage/>,
            },
            {
                path:"project-management/:id/tickets",
                element: <ProjectDetailed/>
            },
            {
                path: "user-management",
                element:<UserManagementPage/>
            }
        ]
    }
])

export default MainRoutes;