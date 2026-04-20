import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { chatService, type CreateMessage } from "./chatService";
import type { SB_ConversationsModel } from "../../models/conversations/conversations.model";
import type {
  Message,
  ResponseNewChatModel,
  SB_MessagesModel,
} from "../../models/messages/messages.model";
import { mapMessageFromAPI } from "../../models/messages/mappers/message.mapper";

type RenameChatInput = {
  id: string;
  title: string;
};

type SendMessageInput = {
  data: CreateMessage;
  chatId: string;
};

export function useChats(userId: string) {
  return useQuery({
    queryKey: ["chats"],
    queryFn: async () =>
      await chatService.fetchConversationServiceByUserId(userId),
  });
}

export function useMessage(chatId: string) {
  return useQuery({
    queryFn: async () => await chatService.fetchConversationById(chatId || ""),
    queryKey: ["messages", chatId],
    enabled: !!chatId,
  });
}

export function useRenameChat() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, title }: RenameChatInput) =>
      chatService.changeChatName(id, title),

    onMutate: async ({ id, title }) => {
      await queryClient.cancelQueries({
        queryKey: ["chats"],
      });

      const previousChats = queryClient.getQueryData<SB_ConversationsModel[]>([
        "chats",
      ]);

      queryClient.setQueryData(["chats"], (old: SB_ConversationsModel[]) =>
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
      queryClient.invalidateQueries({
        queryKey: ["chats"],
      });
    },
  });
}

export function useDeleteChat() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => chatService.deletedConversations(id),
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({
        queryKey: ["chats"],
      });

      const previousChats = queryClient.getQueryData<SB_ConversationsModel[]>([
        "chats",
      ]);

      queryClient.setQueryData(["chats"], (old: SB_ConversationsModel[]) =>
        old.filter((chat) => chat.id !== id),
      );

      return { previousChats };
    },

    onError: (_err, _vars, context) => {
      if (context?.previousChats) {
        queryClient.setQueryData(["chats"], context.previousChats);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["chats"],
      });
    },
  });
}

export function useCreateChat(navigate: any) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMessage) => chatService.createChatService(data),

    onSuccess: (newMessage: ResponseNewChatModel) => {
      const newChatId = newMessage.message_response.conversation_id;
      queryClient.invalidateQueries({ queryKey: ["chats"] });
      navigate(`/dashboard/chat/${newChatId}`);
    },
  });
}

export function useSendMessageChat() {
  const queryClient = useQueryClient();

  return useMutation<
    ResponseNewChatModel,
    Error,
    SendMessageInput,
    { previousMessages?: Message[] }
  >({
    mutationFn: ({ data, chatId }) => chatService.sendMessage(data, chatId),

    onMutate: async ({ data, chatId }) => {
      await queryClient.cancelQueries({ queryKey: ["messages", chatId] });
      const previousMessages = queryClient.getQueryData<Message[]>([
        "messages",
        chatId,
      ]);

      const optimisticUserMessage: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content: data.content || "",
        created_at: new Date().toISOString(),
        conversation_id: chatId,

        document: data.file
          ? {
              id: "temp-doc",
              filename: data.file.name,
              type: data.file.type,
              status: "processing",
            }
          : undefined,
      };

      const optimisticAssistantMessage: Message = {
        id: "processing-temp",
        role: "assistant",
        content: "Processing...",
        created_at: new Date().toISOString(),
        conversation_id: chatId,

        document: data.file
          ? {
              id: "temp-doc",
              filename: data.file.name,
              type: data.file.type,
              status: "processing",
            }
          : undefined,
      };

      queryClient.setQueryData<Message[]>(["messages", chatId], (old = []) => [
        ...old,
        optimisticUserMessage,
        optimisticAssistantMessage,
      ]);

      return { previousMessages };
    },

    onSuccess: (response, variables) => {
      const assistantMessage = mapMessageFromAPI({
        message_id: response.message_response.id,
        conversation_id: response.message_response.conversation_id,
        role: response.message_response.role,
        content: response.message_response.content,
        message_created_at: new Date().toISOString(),

        document_id: response.message_response.document_id,
        original_filename: variables.data.file.name,
        document_type: variables.data.file.type,
        document_status: "processing",
      });

      queryClient.setQueryData<Message[]>(
        ["messages", variables.chatId],
        (old = []) =>
          old.map((m) => (m.id === "processing-temp" ? assistantMessage : m)),
      );
    },

    onError: (_err, variables, context) => {
      if (context?.previousMessages) {
        queryClient.setQueryData(
          ["messages", variables.chatId],
          context.previousMessages,
        );
      }
    },
  });
}
