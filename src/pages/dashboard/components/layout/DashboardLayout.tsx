import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar />

      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
}
