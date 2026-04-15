import { Link, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Search,
  Plus,
  MoreHorizontal,
  LogOut,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../../shared/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { chatService } from "../../../../shared/services/chat/chatService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

type Props = {
  collapsed: boolean;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
  isMobile: boolean;
};

export default function Sidebar({
  collapsed,
  setMobileOpen,
  mobileOpen,
  isMobile,
}: Props) {
  const [openMenu, setOpenMenu] = useState(false);
  const [activeChatMenu, setActiveChatMenu] = useState<string | null>(null);
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState("");

  const { username, signOut, plan_id, user } = useAuth();

  const chatMenuRef = useRef<HTMLDivElement | null>(null);
  const userMenuRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const queryClient = useQueryClient();

  const currentChatId = location.pathname.split("/chat/")[1];
  const showLabels = isMobile ? mobileOpen : !collapsed;

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, setMobileOpen]);

  const { data = [], isLoading } = useQuery({
    queryFn: async () =>
      await chatService.fetchConversationServiceByUserId(user?.id || ""),
    queryKey: ["chats"],
  });

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "F2") {
        const selected = data?.find((i) => i.id === currentChatId);
        if (selected) {
          setEditingChatId(selected.id);
          setEditingValue(selected.title);
        }
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [data, currentChatId]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      if (
        activeChatMenu &&
        chatMenuRef.current &&
        !chatMenuRef.current.contains(target)
      ) {
        setActiveChatMenu(null);
      }

      if (
        openMenu &&
        userMenuRef.current &&
        !userMenuRef.current.contains(target)
      ) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeChatMenu, openMenu]);

  const navItemBase =
    "flex items-center rounded-lg transition-colors text-neutral-400 hover:bg-neutral-900";
  const navItemSpacing = showLabels ? "gap-3 px-4 py-3" : "justify-center p-3";

  const handleRename = (chat: any) => {
    setEditingChatId(chat.id);
    setEditingValue(chat.title);
    setActiveChatMenu(null);
  };

  const handleSaveRename = (id: string) => {
    renameMutation.mutate({ id, title: editingValue });
    setEditingChatId(null);
  };

  const renameMutation = useMutation({
    mutationFn: ({ id, title }: { id: string; title: string }) =>
      chatService.changeChatName(id, title),

    onMutate: async ({ id, title }) => {
      await queryClient.cancelQueries(["chats"]);

      const previousChats = queryClient.getQueryData<any[]>(["chats"]);

      queryClient.setQueryData(["chats"], (old: any[] = []) =>
        old.map((chat) => (chat.id === id ? { ...chat, title } : chat)),
      );

      return { previousChats };
    },

    onError: (_err, _vars, context) => {
      if (context?.previousChats) {
        queryClient.setQueryData(["chats"], context.previousChats);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries(["chats"]);
    },
  });

  const handleDelete = async (id: string) => {
    await chatService.deletedConversations(id);
    setActiveChatMenu(null);
  };

  return (
    <aside
      className={`
          fixed top-0 left-0 h-screen z-50 bg-black border-r border-neutral-800 flex flex-col transition-all duration-300
          ${isMobile ? "w-full" : collapsed ? "w-20" : "w-64"}
          ${
            isMobile
              ? mobileOpen
                ? "translate-x-0"
                : "-translate-x-full"
              : "translate-x-0"
          }
        `}
    >
      <div className="p-6 border-b border-neutral-800">
        <h2 className="text-2xl font-semibold"> {showLabels && "Dashboard"}</h2>
      </div>

      <nav className="flex flex-col justify-center gap-2 p-4">
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

          {showLabels && "Overview"}
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
          {showLabels && "New Chat"}
        </NavLink>

        <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:bg-neutral-900 transition-colors">
          <Search size={18} />
          {showLabels && "Search Chats"}
        </button>
      </nav>

      {showLabels && (
        <div className="flex-1 px-4 overflow-hidden flex flex-col">
          <h3 className="text-sm text-neutral-500 mb-2 px-2">Chat History</h3>

          <div className="flex-1 overflow-y-auto pr-1 relative">
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-neutral-500 border-t-white rounded-full animate-spin" />
              </div>
            ) : (
              <div className="flex flex-col gap-1 transition-opacity duration-300 opacity-100">
                {data.map((chat) => (
                  <div
                    key={chat.id}
                    className="group flex items-center justify-between px-3 py-2 rounded-md hover:bg-neutral-900"
                  >
                    {editingChatId === chat.id ? (
                      <input
                        autoFocus
                        value={editingValue}
                        onChange={(e) => setEditingValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleSaveRename(chat.id);
                          if (e.key === "Escape") setEditingChatId(null);
                        }}
                        className="bg-transparent text-sm text-white outline-none w-full"
                      />
                    ) : (
                      <Link
                        to={`chat/${chat.id}`}
                        className="text-sm text-neutral-400 truncate"
                      >
                        {chat.title}
                      </Link>
                    )}

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setActiveChatMenu((prev) =>
                          prev === chat.id ? null : chat.id,
                        );
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-neutral-800 rounded"
                    >
                      <MoreHorizontal size={16} />
                    </button>

                    {activeChatMenu === chat.id && (
                      <div
                        ref={chatMenuRef}
                        className="absolute top-7 right-2 mt-2 w-32 bg-neutral-900 border border-neutral-800 rounded-md shadow-lg z-50"
                      >
                        <button
                          onClick={() => handleRename(chat)}
                          className="w-full text-left px-3 py-2 text-sm hover:bg-neutral-800"
                        >
                          Rename
                        </button>
                        <button
                          onClick={() => handleDelete(chat.id)}
                          className="w-full text-left px-3 py-2 text-sm hover:bg-neutral-800 text-red-400"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="p-4 border-t border-neutral-800 relative mt-auto">
        {showLabels ? (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">{username}</p>
              <p className="text-xs text-neutral-500">{plan_id} plan</p>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpenMenu((prev) => !prev);
              }}
              className="p-2 hover:bg-neutral-800 rounded-full"
            >
              <MoreHorizontal size={18} />
            </button>
          </div>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpenMenu((prev) => !prev);
            }}
            className="w-full flex justify-center p-2 hover:bg-neutral-800 rounded-lg"
          >
            <MoreHorizontal />
          </button>
        )}
        {openMenu && (
          <div
            ref={userMenuRef}
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
