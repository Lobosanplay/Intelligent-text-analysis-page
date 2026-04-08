export interface SB_MessagesModel {
  id: string;
  conversation_id: string;
  role: "assistant" | "user" | "system";
  content?: string;
  created_at: string;
  document_id: string;
}

export interface Sentiment {
  negative_chunks: number;
  overall: string;
  positive_chunks: number;
  total_chunks: number;
}

export interface ResponseNewChatModel {
  message_id: string;
  status: string;
  message: SB_MessagesModel;
}

export interface Message {
  id: string;
  conversation_id: string;
  role: "assistant" | "user" | "system";
  content?: string;
  created_at: string;

  document?: {
    id: string;
    filename: string;
    type: string;
    status: "processing" | "completed" | "failed";
  };

  analysis?: {
    summary?: string;
    sentiment?: Sentiment;
    topics?: string[][];
    transcript?: string;
    duration?: number;
    language?: string;
    model_version?: string;
  };
}

export interface MessageAPIResponse {
  message_id: string;
  conversation_id: string;
  role: "assistant" | "user" | "system";
  content?: string;
  message_created_at: string;

  document_id: string;
  original_filename: string;
  document_type: string;
  document_status: "processing" | "completed" | "failed";

  summary?: string | null;
  sentiment?: Sentiment | null;
  topics?: string[][] | null;
  transcript?: string | null;
  duration?: number | null;
  language?: string | null;
  model_version?: string | null;
}
