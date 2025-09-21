import Navbar from "@/components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

export default function AppLayout(): JSX.Element {
  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 flex-col">
        <Navbar />
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
