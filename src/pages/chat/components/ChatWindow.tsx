import { useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";
import { useParams } from "react-router-dom";
import { type CreateMessage } from "../../../shared/services/chat/chatService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../shared/hooks/useAuth";
import {
  useCreateChat,
  useMessage,
  useSendMessageChat,
} from "../../../shared/services/chat/chat.queries";

export default function ChatWindow() {
  const { chatId } = useParams();
  const { username } = useAuth();
  const navigate = useNavigate();

  const { data: messages = [] } = useMessage(chatId ?? "");
  const createChat = useCreateChat(navigate);
  const sendMessage = useSendMessageChat();

  const isNewChat = chatId === undefined;

  const hasMessages = messages.length > 0;

  const handleSendMessage = async (data: CreateMessage) => {
    if (isNewChat) {
      await createChat.mutateAsync(data);
      return;
    }

    await sendMessage.mutateAsync({
      data,
      chatId: chatId!,
    });
  };

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (hasMessages) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, hasMessages]);

  return (
    <div
      className={`h-full flex flex-col ${
        hasMessages ? "" : "items-center justify-center"
      }`}
    >
      {hasMessages ? (
        <div className="flex-1 overflow-y-auto px-6 py-6 ">
          <div className="max-w-3xl mx-auto space-y-4 w-full mb-20">
            {messages.map((m, i) => (
              <MessageBubble key={i} message={m} />
            ))}
            <div ref={bottomRef} />
          </div>
        </div>
      ) : (
        <div className="absolute top-40 lg:top-45 ">
          <h3 className="text-3xl text-white">How can I help, {username}?</h3>
        </div>
      )}

      <div className="relative w-full">
        <ChatInput onSend={handleSendMessage} />
      </div>
    </div>
  );
}
