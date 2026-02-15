export interface SB_AudioTranscriptionModel {
  id: number;
  created_at: string;
  document_id: string | null;
  transcript: string | null;
  language: string | null;
  duration: number | null;
}
