import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { DynamicBreadcrumb } from "@/resources/js/Pages/Dashboard/Components/dynamic-breadcrumb";
import { BendunganWidget } from "./Components/bendungan-widget";
import { Toaster } from "sonner";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem("darkMode");
        return savedTheme ? JSON.parse(savedTheme) : true; // Default to true (dark mode)
    });

    useEffect(() => {
        // Update the class on the body element based on the isDarkMode state
        if (isDarkMode) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }

        // Save the current theme to localStorage
        localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
    }, [isDarkMode]);

    function changeDarkMode() {
        setIsDarkMode((prev: boolean) => !prev);
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex items-center justify-between h-16 px-4 border-b shrink-0">
                    <div className="flex items-center gap-2">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="h-4 mr-2"
                        />
                        <DynamicBreadcrumb />
                    </div>
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="dark-mode-toggle"
                            checked={isDarkMode}
                            onCheckedChange={changeDarkMode}
                        />
                        <Label htmlFor="dark-mode-toggle">Dark Mode</Label>
                    </div>
                </header>

                {children}

                <Toaster />
            </SidebarInset>
        </SidebarProvider>
    );
}
