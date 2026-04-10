import { Link, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Search,
  Plus,
  Folder,
  MoreHorizontal,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../../../shared/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { chatService } from "../../../../shared/services/chat/chatService";
import { useQuery } from "@tanstack/react-query";

type Props = {
  collapsed: boolean;
};

export default function Sidebar({ collapsed }: Props) {
  const [openMenu, setOpenMenu] = useState(false);
  const { username, signOut, plan_id, user } = useAuth();
  const navigate = useNavigate();

  const { data = [], isLoading } = useQuery({
    queryFn: async () =>
      await chatService.fetchConversationServiceByUserId(user?.id || ""),
    queryKey: ["chats"],
  });

  const navItemBase =
    "flex items-center rounded-lg transition-colors text-neutral-400 hover:bg-neutral-900";

  const navItemSpacing = collapsed ? "justify-center p-3" : "gap-3 px-4 py-3";

  return (
    <aside
      className={`
        h-screen border-r border-neutral-800 flex flex-col transition-all duration-300
        ${collapsed ? "w-20" : "w-64"}
      `}
    >
      <div className="p-6 border-b border-neutral-800">
        <h2 className="text-2xl font-semibold"> {!collapsed && "Dashboard"}</h2>
      </div>

      <nav className="flex flex-col gap-2 p-4">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `${navItemBase} ${navItemSpacing} ${
              isActive ? "bg-neutral-800 text-white" : ""
            }`
          }
        >
          <LayoutDashboard size={18} />

          {!collapsed && "Overview"}
        </NavLink>

        <NavLink
          to="/dashboard/chat/new"
          className={({ isActive }) =>
            `${navItemBase} ${navItemSpacing} ${
              isActive ? "bg-neutral-800 text-white" : ""
            }`
          }
        >
          <Plus size={18} />
          {!collapsed && "New Chat"}
        </NavLink>

        <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:bg-neutral-900 transition-colors">
          <Search size={18} />
          {!collapsed && "Search Chats"}
        </button>

        <NavLink
          to="/dashboard/folders"
          className={({ isActive }) =>
            `${navItemBase} ${navItemSpacing} ${
              isActive ? "bg-neutral-800 text-white" : ""
            }`
          }
        >
          <Folder size={18} />
          {!collapsed && "Folders"}
        </NavLink>
      </nav>

      {!collapsed && (
        <div className="flex-1 px-4 overflow-hidden">
          <h3 className="text-sm text-neutral-500 mb-2 px-2">Chat History</h3>

          {isLoading ? (
            <span className="px-4">Loading...</span>
          ) : (
            <div className="flex flex-col gap-1 overflow-y-auto max-h-full pr-1">
              {data.map((chat, i) => (
                <Link
                  className="text-left text-sm text-neutral-400 hover:bg-neutral-900 px-3 py-2 rounded-md"
                  key={i}
                  to={`chat/${chat.id}`}
                >
                  {chat.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="p-4 border-t border-neutral-800 relative mt-auto">
        {collapsed ? (
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="w-full flex justify-center p-2 hover:bg-neutral-800 rounded-lg"
          >
            <MoreHorizontal />
          </button>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{username}</p>
                <p className="text-xs text-neutral-500">{plan_id} plan</p>
              </div>

              <button
                onClick={() => setOpenMenu(!openMenu)}
                className="p-2 hover:bg-neutral-800 rounded-full"
              >
                <MoreHorizontal size={18} />
              </button>
            </div>
          </>
        )}
        {openMenu && (
          <div
            className={`absolute w-36 bg-neutral-900 border border-neutral-800 rounded-lg shadow-lg py-1 ${collapsed ? "bottom-16 left-4" : "bottom-16 right-4"}`}
          >
            <button className="w-full text-left px-3 py-2 text-sm hover:bg-neutral-800">
              Upgrade
            </button>

            <button
              onClick={() => signOut(navigate)}
              className="w-full flex gap-4 text-left px-3 py-2 text-sm hover:bg-neutral-800 text-red-400"
            >
              <LogOut />
              Log Out
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
