import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

const queryClient = new QueryClient();
export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);

    check();
    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);

  const showSidebar = isMobile ? mobileOpen : !collapsed;

  return (
    <div className="flex h-screen bg-black text-white">
      <QueryClientProvider client={queryClient}>
        <button
          onClick={() =>
            isMobile
              ? setMobileOpen((prev) => !prev)
              : setCollapsed((prev) => !prev)
          }
          className={`
              fixed z-100 p-2 rounded-lg transition bg-neutral-900/80 backdrop-blur hover:bg-neutral-800
              lg:top-1
              ${mobileOpen ? "top-4 right-4" : "top-1 lg:left-0 left-5"}
              ${collapsed ? "lg:left-5" : "lg:left-50 lg:top-5"}
            `}
        >
          {showSidebar ? <PanelLeftOpen /> : <PanelLeftClose />}
        </button>

        <Sidebar
          collapsed={collapsed}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          isMobile={isMobile}
        />

        <main
          className={`
            flex-1 overflow-y-auto transition-all duration-300 w-full
            ${collapsed ? "lg:ml-20" : "lg:ml-64"}
          `}
        >
          <Outlet />
        </main>
      </QueryClientProvider>
    </div>
  );
}
