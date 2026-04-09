import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

const queryClient = new QueryClient();
export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className="flex h-screen bg-black text-white">
      <QueryClientProvider client={queryClient}>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`absolute z-50 hover:bg-neutral-800 p-2 rounded ${collapsed ? "top-1 left-5" : "top-5 left-50"}`}
        >
          {collapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
        </button>

        <Sidebar collapsed={collapsed} />

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </QueryClientProvider>
    </div>
  );
}
