export interface SB_MessagesModel {
  id: string;
  conversation_id: string;
  role: "assistant" | "user" | "system";
  content?: string;
  created_at: string;
  document_id: string;
}

export interface ResponseNewChatModel {
  message_id: string;
  status: string;
  message: SB_MessagesModel;
}
