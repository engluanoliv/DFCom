import { SIDEBAR_FOOTER, SIDEBAR_MENU } from "@/constants/sidebar-config";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import { Link } from "react-router-dom";
import { useTheme } from "@/providers/theme-provider";

export default function AppSidebar(): JSX.Element {
  const { isMobile, open } = useSidebar();
  const { theme } = useTheme();
  return (
    <>
      <Sidebar side="left" variant="sidebar" collapsible="icon">
        {/* Header */}
        <SidebarHeader>
          {/* Brand */}
          <Link to="/" className="px-2">
            {isMobile || !open ? (
              <img
                src={theme === "dark" ? "/logo-dark.svg" : "/logo.svg"}
                className="size-16"
                alt="DFCom"
              />
            ) : (
              <img
                src={theme === "dark" ? "/brand-dark.svg" : "/brand.svg"}
                className="w-16 h-12"
                alt="DFCom"
              />
            )}
          </Link>
        </SidebarHeader>

        {/* Content */}
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {SIDEBAR_MENU.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton tooltip={item.title} asChild>
                      <a href={item.url}>
                        <item.icon className="size-24" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* Footer */}
        <SidebarFooter>
          <SidebarMenu>
            {SIDEBAR_FOOTER.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarFooter>
        {/* <SidebarRail /> */}
      </Sidebar>
    </>
  );
}
