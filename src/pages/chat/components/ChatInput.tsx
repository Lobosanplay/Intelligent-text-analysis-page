import { useState } from "react";
import { Send } from "lucide-react";

type Props = {
  onSend: (message: string) => void;
};

export default function ChatInput({ onSend }: Props) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (!value.trim()) return;

    onSend(value);
    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 border-t border-neutral-800">
      <div className="relative flex items-center">
        <textarea
          rows={1}
          value={value}
          placeholder="Send a message..."
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full resize-none bg-neutral-900 border border-neutral-700 rounded-full px-4 pr-12 py-2 text-sm focus:outline-none"
        />

        <button
          onClick={handleSend}
          className="absolute right-2 p-2 rounded-full hover:bg-neutral-800 transition"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
