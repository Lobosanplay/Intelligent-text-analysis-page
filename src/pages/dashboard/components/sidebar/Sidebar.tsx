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
import { useEffect } from "react";
import { chatService } from "../../../../shared/services/chat/chatService";
import type { SB_ConversationsModel } from "../../../../shared/models/conversations/conversations.model";

export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState(false);
  const { username, signOut, plan_id, user } = useAuth();
  const navigate = useNavigate();
  const [chatHistory, setChatHistory] = useState<SB_ConversationsModel[]>([]);

  useEffect(() => {
    const fetchChats = async () => {
      const chats = await chatService.fetchConversationServiceByUserId(
        user?.id || "",
      );
      setChatHistory(chats);
    };

    fetchChats();
  }, [user?.id]);

  return (
    <aside className="w-64 h-screen border-r border-neutral-800 flex flex-col">
      <div className="p-6 border-b border-neutral-800">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
      </div>

      <nav className="flex flex-col gap-2 p-4">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive
                ? "bg-neutral-800 text-white"
                : "text-neutral-400 hover:bg-neutral-900"
            }`
          }
        >
          <LayoutDashboard size={18} />
          Overview
        </NavLink>

        <NavLink
          to="/dashboard/chat/new"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive
                ? "bg-neutral-800 text-white"
                : "text-neutral-400 hover:bg-neutral-900"
            }`
          }
        >
          <Plus size={18} />
          New Chat
        </NavLink>

        <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:bg-neutral-900 transition-colors">
          <Search size={18} />
          Search Chats
        </button>

        <NavLink
          to="/dashboard/folders"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive
                ? "bg-neutral-800 text-white"
                : "text-neutral-400 hover:bg-neutral-900"
            }`
          }
        >
          <Folder size={18} />
          Folders
        </NavLink>
      </nav>

      <div className="flex-1 px-4 overflow-hidden">
        <h3 className="text-sm text-neutral-500 mb-2 px-2">Chat History</h3>

        <div className="flex flex-col gap-1 overflow-y-auto max-h-full pr-1">
          {chatHistory.map((chat, i) => (
            <Link
              className="text-left text-sm text-neutral-400 hover:bg-neutral-900 px-3 py-2 rounded-md"
              key={i}
              to={`chat/${chat.id}`}
            >
              {chat.title}
            </Link>
          ))}
        </div>
      </div>

      <div className=" p-2  border-t border-neutral-800 relative">
        <div className="hover:bg-gray-900/20 p-2 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">{username}</p>
              <p className="text-xs text-neutral-500">
                {plan_id} {"plan"}
              </p>
            </div>

            <button
              onClick={() => setOpenMenu(!openMenu)}
              className="p-2 hover:bg-neutral-800 rounded-full"
            >
              <MoreHorizontal size={18} />
            </button>
          </div>
        </div>

        {openMenu && (
          <div className="absolute bottom-16 right-4 w-36 bg-neutral-900 border border-neutral-800 rounded-lg shadow-lg py-1">
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
