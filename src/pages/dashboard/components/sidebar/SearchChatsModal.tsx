import { XIcon, MessageCircle } from "lucide-react";
import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  chats: any[];
  onSelect: (id: string) => void;
};

export default function SearchChatsModal({
  open,
  onClose,
  chats,
  onSelect,
}: Props) {
  const [query, setQuery] = useState("");

  const filtered = chats.filter((chat) =>
    chat.title.toLowerCase().includes(query.toLowerCase()),
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-start justify-center pt-32 z-50">
      <div className="relative w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-xl shadow-xl">
        <XIcon
          onClick={() => {
            setQuery("");
            onClose();
          }}
          className="absolute right-5 top-3 cursor-pointer"
        />
        <input
          autoFocus
          placeholder="Search chats..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-3 bg-transparent outline-none border-b border-neutral-800 text-white"
        />

        <div className="flex max-h-80 p-2 overflow-y-auto">
          {filtered.length === 0 ? (
            <p className="p-4 text-sm text-neutral-500">No results</p>
          ) : (
            filtered.map((chat) => (
              <button
                key={chat.id}
                onClick={() => {
                  onSelect(chat.id);
                  setQuery("");
                  onClose();
                }}
                className="w-full flex items-center gap-4 text-left px-4 py-3 hover:bg-neutral-800 rounded-lg text-sm"
              >
                <MessageCircle />
                {chat.title}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
