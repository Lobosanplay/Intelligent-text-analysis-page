import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import { useEffect, useRef, useState } from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { chatService } from "../../../../shared/services/chat/chatService";
import { useAuth } from "../../../../shared/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import SearchChatsModal from "../sidebar/SearchChatsModal";
import { useQuery } from "@tanstack/react-query";

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const searchModelRef = useRef<HTMLDivElement | null>(null);

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);

    check();
    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "f") {
        e.preventDefault();
        setSearchOpen(true);
      }

      if (e.key === "Escape") {
        setSearchOpen(false);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      if (
        searchOpen &&
        searchModelRef.current &&
        !searchModelRef.current.contains(target)
      ) {
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchOpen]);

  const { data = [] } = useQuery({
    queryFn: async () =>
      await chatService.fetchConversationServiceByUserId(user?.id || ""),
    queryKey: ["chats"],
  });

  const showSidebar = isMobile ? mobileOpen : !collapsed;

  return (
    <div className="flex h-screen bg-black text-white">
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
        setSearchOpen={setSearchOpen}
      />

      {searchOpen && (
        <SearchChatsModal
          open={searchOpen}
          onClose={() => setSearchOpen(false)}
          chats={data}
          onSelect={(id) => navigate(`/dashboard/chat/${id}`)}
          searchRef={searchModelRef}
        />
      )}

      <main
        className={`
            flex-1 overflow-y-auto transition-all duration-300 w-full
            ${collapsed ? "lg:ml-20" : "lg:ml-64"}
          `}
      >
        <Outlet />
      </main>
    </div>
  );
}
