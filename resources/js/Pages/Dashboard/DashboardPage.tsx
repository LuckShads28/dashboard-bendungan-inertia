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
import Layout from "./Layout";
import InfoCardWidget from "./Components/info-card-widget";

const DashboardPage = () => {
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
        <div className="flex flex-col flex-1 gap-4 m-4">
            <h1>Informasi Bendungan</h1>
            <div className="grid gap-4 auto-rows-min md:grid-cols-4">
                <InfoCardWidget title="Jumlah Bendungan" data={2} />
                <InfoCardWidget title="Bendungan Aktif" data={1} />
            </div>
            <hr />
            <div className="grid gap-4 auto-rows-min md:grid-cols-2">
                <BendunganWidget bendunganId={1} />
                <BendunganWidget bendunganId={2} />
            </div>
            {/* <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
        </div>
    );
};

DashboardPage.layout = (page: React.ReactNode) => <Layout children={page} />;

export default DashboardPage;
