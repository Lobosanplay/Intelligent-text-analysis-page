import { useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";
import { useParams } from "react-router-dom";
import {
  chatService,
  type CreateMessage,
} from "../../../shared/services/chat/chatService";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../../shared/hooks/useAuth";

export default function ChatWindow() {
  const { chatId } = useParams();
  const { username } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const isNewChat = chatId === undefined;

  const { data: messages = [] } = useQuery({
    queryFn: async () => await chatService.fetchConversationById(chatId || ""),
    queryKey: ["messages", chatId],
    enabled: !!chatId,
  });

  const hasMessages = messages.length > 0;

  const { mutateAsync: createChatMutation } = useMutation({
    mutationFn: (data: CreateMessage) => chatService.createChatService(data),

    onSuccess: (newMessage) => {
      const newChatId = newMessage.message.conversation_id;
      queryClient.invalidateQueries({ queryKey: ["chats"] });
      navigate(`/dashboard/chat/${newChatId}`);
    },
  });

  const { mutateAsync: sendMessageMutation } = useMutation({
    mutationFn: ({ data, chatId }: { data: CreateMessage; chatId: string }) =>
      chatService.sendMessage(data, chatId),

    onSuccess: (newMessage, variables) => {
      queryClient.setQueryData(
        ["messages", variables.chatId],
        (old: any[] = []) => [...old, newMessage],
      );
    },
  });

  const sendMessage = async (data: CreateMessage) => {
    if (isNewChat) {
      await createChatMutation(data);
      return;
    }

    await sendMessageMutation({
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
        <div className="absolute top-55">
          <h3 className="text-3xl text-white">How can I help, {username}?</h3>
        </div>
      )}

      <ChatInput onSend={sendMessage} />
    </div>
  );
}
