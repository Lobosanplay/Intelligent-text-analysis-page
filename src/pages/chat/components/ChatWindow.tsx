import { useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";
import { useParams } from "react-router-dom";
import {
  chatService,
  type CreateMessage,
} from "../../../shared/services/chat/chatService";
import type { SB_MessagesModel } from "../../../shared/models/messages/messages.model";
import { useNavigate } from "react-router-dom";

export default function ChatWindow() {
  const { chatId } = useParams();
  const navigate = useNavigate();

  const isNewChat = chatId === undefined;

  const [messages, setMessages] = useState<SB_MessagesModel[]>([]);

  useEffect(() => {
    const fetchChatMessages = async () => {
      if (chatId) {
        const messages = await chatService.fetchConversationById(chatId);
        setMessages(messages);
      }
    };

    fetchChatMessages();
  }, [chatId]);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const sendMessage = async (data: CreateMessage) => {
    if (isNewChat) {
      const newMessage = await chatService.createChatService(data);

      const newChatId = newMessage.conversation_id;

      navigate(`/dashboard/chat/${newChatId}`);
      return;
    }

    const userMessage = await chatService.sendMessage(data, chatId);

    setMessages((prev) => [...prev, userMessage]);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col justify-center text-center h-full">
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
        {messages.map((m, i) => (
          <MessageBubble key={i} message={m} />
        ))}

        <div ref={bottomRef} />
      </div>

      <ChatInput onSend={sendMessage} />
    </div>
  );
}
