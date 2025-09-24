import AppSidebar from "@/components/AppSidebar/AppSidebar";
import Navbar from "@/components/Navbar/Navbar";
import {Outlet} from "react-router-dom";

export default function AppLayout(): JSX.Element {

    return (
        <div className="flex w-full">
            <AppSidebar/>
            <div className="flex flex-col flex-1 w-full">
                <Navbar/>
                <main className="flex-1 w-full p-4">
                    <Outlet/>
                </main>
            </div>
        </div>
    );
}
