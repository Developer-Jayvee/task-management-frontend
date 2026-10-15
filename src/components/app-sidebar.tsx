import * as React from "react"
import { ChevronDown } from "lucide-react"

import { VersionSwitcher } from "@/components/version-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useNavigate, useParams } from "react-router-dom"
import { useAuthStore } from "@/stores/useAuthStore"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible"

const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Main",
      url: "#",
      items: [
        {
          title: "Project Management",
          url: "project-management",
          isActive: true
        },
        {
          title: "User Management",
          url: "user-management",
          except: ['member'],
          children: [
            {
              title:"All Users",
              url : "users"
            },
            {
              title: "Roles",
              url:"#"
            }
          ]
        }
      ],
    },
  ],
}
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {slug} = useParams()
  const navigate = useNavigate()
  const authData = useAuthStore((state) => state.userData)
  const role = authData?.member?.role;
  const navList = data.navMain.map(list => ({
    ...list,
    items: list.items.filter((item) => !role || !item.except?.includes(role))
  }))

  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        />
      </SidebarHeader>
      <SidebarContent>
        {navList.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((navItem) => {
                  if (navItem.children?.length) {
                    return (
                      <SidebarMenuItem key={navItem.title}>
                        <Collapsible
                          open={isOpen}
                          onOpenChange={setIsOpen}
                          className="group/collapsible"
                        >
                          <CollapsibleTrigger
                            render={
                              <SidebarMenuButton
                                isActive={window.location.pathname.split("/").at(-1) === navItem.url}
                              />
                            }
                          >
                            {navItem.title}
                            <ChevronDown className="ml-auto transition-transform group-data-open/collapsible:rotate-180" />
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenu>
                              {navItem.children.map((child) => {
                                const childUrl = child.url ?? navItem.url
                                
                                return (
                                  <SidebarMenuItem key={`${navItem.title}-${child.title}`}>
                                    <SidebarMenuButton
                                      isActive={window.location.pathname.split("/").at(-1) === childUrl}
                                      onClick={() => navigate(`/${slug}/${navItem.url}/${childUrl}`)}
                                    >
                                      {child.title}
                                    </SidebarMenuButton>
                                  </SidebarMenuItem>
                                )
                              })}
                            </SidebarMenu>
                          </CollapsibleContent>
                        </Collapsible>
                      </SidebarMenuItem>
                    )
                  }
                  return (
                    <SidebarMenuItem key={navItem.title}>
                      <SidebarMenuButton
                        isActive={window.location.pathname.split("/").at(-1) === navItem.url}
                        onClick={() => navigate(`/${slug}//${navItem.url}`)}
                      >
                        {navItem.title}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
