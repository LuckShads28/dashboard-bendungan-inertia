import * as React from "react";
import {
    Bolt,
    CircleUser,
    DoorClosed,
    GalleryVerticalEnd,
    SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import { route } from "ziggy-js";

// This is sample data.
const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "dashboard.index",
            // url: route("dashboard.index"),
            icon: SquareTerminal,
            // isActive: route().current() == "dashboard.index" ? true : false,
        },
        {
            title: "Bendungan",
            url: "dam.index",
            // url: route("dam.index"),
            icon: DoorClosed,
            // isActive: route().current() == "dam.index" ? true : false,
        },
        {
            title: "Master User",
            url: "master-user.index",
            // url: route("master-user.index"),
            icon: CircleUser,
            // isActive: route().current() == "master-user.index" ? true : false,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div className="flex items-center justify-center rounded-lg aspect-square size-8 bg-primary text-sidebar-primary-foreground">
                                    <GalleryVerticalEnd className="size-4" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-semibold">
                                        Control Bendungan
                                    </span>
                                    <span className="">v1.0.0-beta</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
