import AuthenticatedLayout from "@/components/layouts/AuthenticatedLayout";
import GuestLayout from "@/components/layouts/GuestLayout";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ProjectDetailed from "@/pages/project/detailed/ProjectDetailed";
import ProjectPage from "@/pages/project/ProjectPage";
import TicketsPage from "@/pages/tickets/TicketsPage";
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
                element:<Navigate to="projects" replace/>
            },
            {
                path:"projects",
                element:<ProjectPage/>,
            },
            {
                path:"projects/:id/tickets",
                element: <ProjectDetailed/>
            },
            {
                path: "tickets",
                element: <TicketsPage/>
            }
        ]
    }
])

export default MainRoutes;