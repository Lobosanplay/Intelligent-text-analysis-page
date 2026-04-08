import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function DashboardLayout() {
  const queryClient = new QueryClient();
  return (
    <div className="flex h-screen bg-black text-white">
      <QueryClientProvider client={queryClient}>
        <Sidebar />

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </QueryClientProvider>
    </div>
  );
}
