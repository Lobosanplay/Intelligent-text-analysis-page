import type { MessageAPIResponse, Message } from "../messages.model";

export function mapMessageFromAPI(data: MessageAPIResponse): Message {
  return {
    id: data.message_id,
    conversation_id: data.conversation_id,
    role: data.role,
    content: data.content,
    created_at: data.message_created_at,

    document: data.document_id
      ? {
          id: data.document_id,
          filename: data.original_filename,
          type: data.document_type,
          status: data.document_status,
        }
      : undefined,

    analysis:
      data.summary || data.sentiment || data.topics
        ? {
            summary: data.summary || undefined,
            sentiment: data.sentiment || undefined,
            topics: data.topics || undefined,
            transcript: data.transcript || undefined,
            duration: data.duration || undefined,
            language: data.language || undefined,
            model_version: data.model_version || undefined,
          }
        : undefined,
  };
}
