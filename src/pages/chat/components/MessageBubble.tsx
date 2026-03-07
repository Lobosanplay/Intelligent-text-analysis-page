import type { Message } from "../../../shared/types/chat.types";

type Props = {
  message: Message;
};

export default function MessageBubble({ message }: Props) {
  const isUser = message.role === "user";

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] px-4 py-2 rounded-lg text-sm ${
          isUser ? "bg-blue-600 text-white" : "bg-neutral-800 text-neutral-200"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}
