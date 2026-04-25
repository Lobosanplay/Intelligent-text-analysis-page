import type { Sentiment } from "../messages/messages.model";

export interface SB_DocumentModel {
  id: string;
  created_at: string;
  user_id: string | null;
  type: string | null;
  original_filename: string | null;
  storage_path: string | null;
  file_hash: string | null;
  status: string;
}

export interface RecentDocument {
  id: string;
  name: string | null;
  created_at: string;
  type: string | null;
}

export type UploadedDocumentLastDays = {
  day: string;
  total: number;
};

export interface DocumentModalModel {
  document: {
    id: string;
    original_filename: string;
    type: string;
    status: string;
    created_at: string;
  };

  analysis?: {
    summary?: string;
    sentiment?: Sentiment;
    topics?: string[][];
    model_version?: string;
  };

  transcription?: {
    transcript?: string;
    duration?: number;
    language?: string;
  };

  conversation_id?: string | null;
}
