import type { SB_ConversationsModel } from "../../models/conversations/conversations.model";
import type {
  ResponseNewChatModel,
  SB_MessagesModel,
} from "../../models/messages/messages.model";

const API_URL = import.meta.env.VITE_API_URL;

export type CreateMessage = {
  user_id: string;
  content?: string;
  file: File;
};

class ChatServices {
  async fetchConversationServiceByUserId(
    userId: string,
  ): Promise<SB_ConversationsModel[]> {
    try {
      const response = await fetch(`${API_URL}/chat/me?user_id=${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error fetching conversations");
      }

      const data = await response.json();
      return data || [];
    } catch (error) {
      console.error("Error fetching conversations:", error);
      throw error;
    }
  }

  async fetchConversationById(id: string): Promise<SB_MessagesModel[]> {
    try {
      const response = await fetch(`${API_URL}/chat/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error fetching conversations");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching conversations:", error);
      throw error;
    }
  }

  async createChatService(data: CreateMessage): Promise<ResponseNewChatModel> {
    try {
      const formData = new FormData();
      formData.append("user_id", data.user_id);
      formData.append("file", data.file);
      formData.append("content", data.content || "");
      const response = await fetch(`${API_URL}/chat/new`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error generating create conversations");
      }

      const json = await response.json();
      console.log(json);
      return json;
    } catch (error) {
      console.error("Error generating create conversations:", error);
      throw error;
    }
  }

  async deletedConversations(chatId: string): Promise<SB_MessagesModel> {
    try {
      const response = await fetch(`${API_URL}/chat/delete/${chatId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error generating deleting conversation");
      }

      const json = await response.json();
      return json;
    } catch (error) {
      console.error("Error Deleting conversation", error);
      throw error;
    }
  }

  async sendMessage(
    data: CreateMessage,
    chatId: string,
  ): Promise<SB_MessagesModel> {
    try {
      const formData = new FormData();
      formData.append("user_id", data.user_id);
      formData.append("conversation_id", chatId);
      formData.append("file", data.file);
      formData.append("content", data.content || "");

      const response = await fetch(`${API_URL}/chat/message`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error generating create conversations");
      }

      const json = await response.json();
      return json;
    } catch (error) {
      console.error("Error generating create conversations:", error);
      throw error;
    }
  }
}

export const chatService = new ChatServices();
